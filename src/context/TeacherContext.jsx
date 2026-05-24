// TeacherContext — classroom mode for teachers/parents
// A user can have one of three roles: 'student' (default), 'teacher', 'parent'
// Teachers create classrooms, invite students via a code, see aggregate progress
//   and assign specific lessons as "required this week".
// Parents can monitor a single linked child (uses the same parental email
//   captured during onboarding).

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const TeacherContext = createContext(null);

const STORAGE_KEY = 'codepath_teacher_data';

// Generate a 6-char classroom code (e.g. "CLA9X7")
function generateClassCode() {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'CLA' + Array.from({ length: 3 }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
}

function loadData() {
  if (typeof window === 'undefined') return { classrooms: [], joinedClassrooms: [] };
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"classrooms":[],"joinedClassrooms":[]}');
  } catch {
    return { classrooms: [], joinedClassrooms: [] };
  }
}

function saveData(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function TeacherProvider({ children }) {
  const { user, updateUser } = useAuth();
  const [data, setData] = useState(loadData);

  // Persist on change
  useEffect(() => { saveData(data); }, [data]);

  const role = user?.role || 'student';
  const isTeacher = role === 'teacher';
  const isParent = role === 'parent';

  // === Role management ===
  const upgradeToTeacher = useCallback(() => {
    updateUser({ role: 'teacher' });
  }, [updateUser]);

  const downgradeToStudent = useCallback(() => {
    updateUser({ role: 'student' });
  }, [updateUser]);

  // === Classroom management (teacher actions) ===
  const createClassroom = useCallback((name) => {
    if (!user) return { error: 'Faça login primeiro' };
    if (role !== 'teacher') return { error: 'Apenas professores podem criar turmas' };

    const newClassroom = {
      id: `class_${Date.now()}`,
      code: generateClassCode(),
      name: name || 'Minha Turma',
      teacherId: user.id,
      teacherName: user.name,
      createdAt: Date.now(),
      students: [],         // [{ id, name, joinedAt }]
      assignedLessons: [],  // [{ lessonId, assignedAt, dueDate }]
    };
    setData(prev => ({ ...prev, classrooms: [...prev.classrooms, newClassroom] }));
    return { classroom: newClassroom };
  }, [user, role]);

  const deleteClassroom = useCallback((classroomId) => {
    setData(prev => ({
      ...prev,
      classrooms: prev.classrooms.filter(c => c.id !== classroomId),
    }));
  }, []);

  const assignLessons = useCallback((classroomId, lessonIds, dueDate) => {
    setData(prev => ({
      ...prev,
      classrooms: prev.classrooms.map(c => {
        if (c.id !== classroomId) return c;
        const newAssignments = lessonIds.map(lessonId => ({
          lessonId,
          assignedAt: Date.now(),
          dueDate: dueDate || (Date.now() + 7 * 24 * 60 * 60 * 1000), // default 1 week
        }));
        return { ...c, assignedLessons: [...c.assignedLessons, ...newAssignments] };
      }),
    }));
  }, []);

  // === Joining a classroom (student action) ===
  const joinClassroom = useCallback((code) => {
    if (!user) return { error: 'Faça login primeiro' };
    const cleanCode = code.trim().toUpperCase();
    const classroom = data.classrooms.find(c => c.code === cleanCode);
    if (!classroom) return { error: 'Código de turma não encontrado' };

    // Already joined?
    if (classroom.students.some(s => s.id === user.id)) {
      return { error: 'Você já tá nessa turma!' };
    }

    setData(prev => ({
      ...prev,
      classrooms: prev.classrooms.map(c =>
        c.id === classroom.id
          ? { ...c, students: [...c.students, { id: user.id, name: user.name, joinedAt: Date.now() }] }
          : c
      ),
      joinedClassrooms: [...prev.joinedClassrooms, classroom.id],
    }));
    return { classroom };
  }, [user, data.classrooms]);

  const leaveClassroom = useCallback((classroomId) => {
    if (!user) return;
    setData(prev => ({
      ...prev,
      classrooms: prev.classrooms.map(c =>
        c.id === classroomId
          ? { ...c, students: c.students.filter(s => s.id !== user.id) }
          : c
      ),
      joinedClassrooms: prev.joinedClassrooms.filter(id => id !== classroomId),
    }));
  }, [user]);

  // === Queries ===
  const myClassrooms = data.classrooms.filter(c => c.teacherId === user?.id);
  const joinedClassrooms = data.classrooms.filter(c =>
    data.joinedClassrooms.includes(c.id) && c.students.some(s => s.id === user?.id)
  );

  // Get aggregate progress for a classroom (reads each student's progress from the local "DB")
  const getClassroomProgress = useCallback((classroomId) => {
    const classroom = data.classrooms.find(c => c.id === classroomId);
    if (!classroom) return null;

    try {
      const users = JSON.parse(localStorage.getItem('codepath_users') || '{}');
      const usersById = Object.values(users).reduce((acc, u) => { acc[u.id] = u; return acc; }, {});

      // Read each student's progress from their app state. In single-localStorage
      // mode this is approximate — full sync requires Supabase.
      const studentStats = classroom.students.map(s => {
        const u = usersById[s.id];
        return {
          ...s,
          xp: u?.xp || 0,
          streak: u?.streak || 0,
          completedLessons: u?.completedLessons?.length || 0,
        };
      });

      return {
        classroom,
        studentStats,
        averageXp: studentStats.reduce((sum, s) => sum + s.xp, 0) / Math.max(1, studentStats.length),
        totalStudents: studentStats.length,
        activeStudents: studentStats.filter(s => s.streak > 0).length,
      };
    } catch {
      return { classroom, studentStats: [], averageXp: 0, totalStudents: 0, activeStudents: 0 };
    }
  }, [data.classrooms]);

  const value = {
    role,
    isTeacher,
    isParent,
    upgradeToTeacher,
    downgradeToStudent,
    myClassrooms,
    joinedClassrooms,
    createClassroom,
    deleteClassroom,
    assignLessons,
    joinClassroom,
    leaveClassroom,
    getClassroomProgress,
  };

  return <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>;
}

export function useTeacher() {
  const ctx = useContext(TeacherContext);
  if (!ctx) throw new Error('useTeacher must be used within TeacherProvider');
  return ctx;
}
