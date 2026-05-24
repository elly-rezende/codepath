// TeacherDashboard — view for users with role='teacher'
// Lists their classrooms, lets them create new ones, see student progress,
// and (in collapsed sections) assign lessons.

import { useState } from 'react';
import { useTeacher } from '../../context/TeacherContext';
import { useGamification } from '../../context/GamificationContext';

export default function TeacherDashboard() {
  const {
    role, isTeacher,
    upgradeToTeacher, downgradeToStudent,
    myClassrooms,
    createClassroom, deleteClassroom,
    getClassroomProgress,
  } = useTeacher();
  const { play, pushToast } = useGamification();

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // === Upgrade prompt for non-teachers ===
  if (!isTeacher) {
    return (
      <div className="teacher-upgrade">
        <div className="teacher-upgrade-icon">👨‍🏫</div>
        <div className="teacher-upgrade-title">É professor(a) ou educador(a)?</div>
        <div className="teacher-upgrade-desc">
          Ative o <strong>Modo Professor</strong> e crie turmas para seus alunos.
          Acompanhe progresso, atribua lições, veja quem tá engajado.
        </div>
        <ul className="teacher-upgrade-list">
          <li>👥 Criar turmas ilimitadas</li>
          <li>📋 Atribuir lições obrigatórias</li>
          <li>📊 Ver progresso individual e da turma</li>
          <li>🎯 Identificar alunos que precisam de ajuda</li>
        </ul>
        <button
          className="teacher-upgrade-cta"
          onClick={() => { upgradeToTeacher(); play('correct'); pushToast({ title: 'Modo Professor ativado!', subtitle: 'Crie sua primeira turma aqui.' }); }}
        >
          🎓 Ativar Modo Professor
        </button>
        <div className="teacher-upgrade-note">
          Você pode voltar pro modo aluno a qualquer momento nas configurações.
        </div>
      </div>
    );
  }

  // === Create classroom ===
  const handleCreate = () => {
    if (!newName.trim()) {
      pushToast({ title: 'Dá um nome pra turma!', subtitle: 'Ex: "Programação 7º ano A"' });
      return;
    }
    const result = createClassroom(newName.trim());
    if (result.classroom) {
      play('correct');
      pushToast({ title: `Turma "${result.classroom.name}" criada!`, subtitle: `Código: ${result.classroom.code}` });
      setNewName('');
      setCreating(false);
    }
  };

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      pushToast({ title: 'Código copiado!', subtitle: `Mande pros alunos: ${code}` });
      play('pop');
    } catch {
      window.prompt('Código pra colar:', code);
    }
  };

  return (
    <div className="teacher-dashboard">
      <div className="teacher-header">
        <div>
          <div className="teacher-title">👨‍🏫 Suas turmas</div>
          <div className="teacher-subtitle">
            {myClassrooms.length} {myClassrooms.length === 1 ? 'turma' : 'turmas'} ativas
          </div>
        </div>
        <button
          className="teacher-create-btn"
          onClick={() => { setCreating(c => !c); play('click'); }}
        >
          {creating ? 'Cancelar' : '+ Nova turma'}
        </button>
      </div>

      {creating && (
        <div className="teacher-create-form">
          <input
            type="text"
            className="teacher-input"
            placeholder="Nome da turma (ex: Programação 8º A)"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            maxLength={40}
            autoFocus
          />
          <button className="teacher-create-confirm" onClick={handleCreate}>
            Criar turma
          </button>
        </div>
      )}

      {myClassrooms.length === 0 && !creating && (
        <div className="teacher-empty">
          <div className="empty-icon">📚</div>
          <div className="empty-title">Nenhuma turma ainda</div>
          <div className="empty-desc">Clica em "+ Nova turma" pra começar.</div>
        </div>
      )}

      <div className="classroom-list">
        {myClassrooms.map(c => {
          const stats = getClassroomProgress(c.id);
          const isExpanded = expandedId === c.id;
          return (
            <div key={c.id} className={`classroom-card ${isExpanded ? 'expanded' : ''}`}>
              <div className="classroom-summary" onClick={() => setExpandedId(isExpanded ? null : c.id)}>
                <div className="classroom-info">
                  <div className="classroom-name">{c.name}</div>
                  <div className="classroom-meta">
                    👥 {stats?.totalStudents || 0} alunos · 🔥 {stats?.activeStudents || 0} ativos
                  </div>
                </div>
                <div className="classroom-code" onClick={(e) => { e.stopPropagation(); handleCopyCode(c.code); }}>
                  <span className="code-label">CÓDIGO</span>
                  <span className="code-value">{c.code}</span>
                  <span className="code-hint">📋</span>
                </div>
              </div>

              {isExpanded && (
                <div className="classroom-details">
                  <div className="classroom-stats">
                    <div className="cstat">
                      <div className="cstat-value">{Math.round(stats?.averageXp || 0)}</div>
                      <div className="cstat-label">XP médio</div>
                    </div>
                    <div className="cstat">
                      <div className="cstat-value">{stats?.activeStudents || 0}</div>
                      <div className="cstat-label">com streak</div>
                    </div>
                    <div className="cstat">
                      <div className="cstat-value">{c.assignedLessons?.length || 0}</div>
                      <div className="cstat-label">lições atribuídas</div>
                    </div>
                  </div>

                  {stats?.studentStats?.length > 0 ? (
                    <div className="student-list">
                      <div className="student-list-header">Alunos</div>
                      {stats.studentStats.map(s => (
                        <div key={s.id} className="student-row">
                          <div className="student-name">{s.name}</div>
                          <div className="student-stats">
                            <span>⚡ {s.xp} XP</span>
                            {s.streak > 0 && <span className="streak-tag">🔥 {s.streak}d</span>}
                            <span>📚 {s.completedLessons}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-students">
                      Nenhum aluno entrou ainda. Compartilhe o código <strong>{c.code}</strong> pra alunos entrarem.
                    </div>
                  )}

                  <div className="classroom-actions">
                    <button
                      className="classroom-delete-btn"
                      onClick={() => {
                        if (window.confirm(`Apagar a turma "${c.name}"?`)) {
                          deleteClassroom(c.id);
                          pushToast({ title: 'Turma apagada', subtitle: '' });
                        }
                      }}
                    >
                      🗑 Apagar turma
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        className="teacher-mode-toggle"
        onClick={() => {
          if (window.confirm('Sair do Modo Professor? Suas turmas continuam salvas.')) {
            downgradeToStudent();
            pushToast({ title: 'Voltou pro Modo Aluno', subtitle: '' });
          }
        }}
      >
        ← Voltar pro modo aluno
      </button>
    </div>
  );
}
