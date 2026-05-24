// JoinClassroom — input for students to join a classroom via 6-char code
// Shows the classes they've already joined.

import { useState } from 'react';
import { useTeacher } from '../../context/TeacherContext';
import { useGamification } from '../../context/GamificationContext';

export default function JoinClassroom() {
  const { joinedClassrooms, joinClassroom, leaveClassroom } = useTeacher();
  const { play, pushToast } = useGamification();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    setError('');
    const result = joinClassroom(code);
    if (result.error) {
      setError(result.error);
      play('wrong');
    } else {
      play('correct');
      pushToast({ title: `Entrou em "${result.classroom.name}"!`, subtitle: `Professor: ${result.classroom.teacherName}` });
      setCode('');
    }
  };

  const handleLeave = (classroom) => {
    if (!window.confirm(`Sair da turma "${classroom.name}"?`)) return;
    leaveClassroom(classroom.id);
    pushToast({ title: 'Você saiu da turma', subtitle: '' });
  };

  return (
    <div className="join-classroom">
      <div className="jc-header">
        <div className="jc-title">🎓 Suas turmas</div>
        <div className="jc-subtitle">Entre numa turma com o código do(a) professor(a)</div>
      </div>

      <div className="jc-input-row">
        <input
          type="text"
          className="jc-input"
          placeholder="Código da turma (ex: CLA9X7)"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase().slice(0, 6))}
          onKeyDown={e => e.key === 'Enter' && handleJoin()}
          maxLength={6}
        />
        <button
          className="jc-join-btn"
          onClick={handleJoin}
          disabled={code.length !== 6}
        >
          Entrar
        </button>
      </div>
      {error && <div className="jc-error">{error}</div>}

      {joinedClassrooms.length > 0 && (
        <div className="jc-joined-list">
          {joinedClassrooms.map(c => (
            <div key={c.id} className="jc-row">
              <div>
                <div className="jc-row-name">{c.name}</div>
                <div className="jc-row-teacher">prof: {c.teacherName}</div>
              </div>
              <button className="jc-leave-btn" onClick={() => handleLeave(c)} title="Sair">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
