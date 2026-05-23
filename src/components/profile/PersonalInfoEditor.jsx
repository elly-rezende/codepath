// PersonalInfoEditor — edits user's name, age range, parental email (if minor)
// All fields validate inline. Saves to AuthContext on confirm.

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';

const AGE_OPTIONS = [
  { value: 9,  label: '8-10 anos',  icon: '🧒' },
  { value: 12, label: '11-13 anos', icon: '🎒' },
  { value: 15, label: '14-16 anos', icon: '🎮' },
  { value: 17, label: '17+',        icon: '🚀' },
];

export default function PersonalInfoEditor() {
  const { user, updateUser } = useAuth();
  const { play, pushToast } = useGamification();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    name: user?.name || '',
    age: user?.age || null,
    parentalEmail: user?.parentalEmail || '',
  });
  const [errors, setErrors] = useState({});

  const requiresParental = draft.age !== null && draft.age <= 12;

  const startEditing = () => {
    setDraft({
      name: user?.name || '',
      age: user?.age || null,
      parentalEmail: user?.parentalEmail || '',
    });
    setErrors({});
    setEditing(true);
    play('click');
  };

  const cancelEditing = () => {
    setEditing(false);
    setErrors({});
    play('click');
  };

  const save = () => {
    const newErrors = {};
    if (!draft.name || draft.name.trim().length < 2) {
      newErrors.name = 'Nome precisa de pelo menos 2 letras';
    }
    if (draft.age === null) {
      newErrors.age = 'Escolha sua idade';
    }
    if (requiresParental && (!draft.parentalEmail || !/^[^@]+@[^@]+\.[^@]+$/.test(draft.parentalEmail))) {
      newErrors.parentalEmail = 'Email do responsável é obrigatório e precisa ser válido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateUser({
      name: draft.name.trim(),
      age: draft.age,
      ...(requiresParental ? { parentalEmail: draft.parentalEmail, requiresParentalConsent: true } : {}),
    });
    setEditing(false);
    play('correct');
    pushToast({ title: 'Salvo!', subtitle: 'Suas informações foram atualizadas', type: 'default' });
  };

  if (!user) return null;

  if (!editing) {
    // Read-only view
    return (
      <div className="info-editor read-only">
        <div className="info-rows">
          <div className="info-row">
            <span className="info-label">Nome</span>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Idade</span>
            <span className="info-value">
              {AGE_OPTIONS.find(o => o.value === user.age)?.icon} {AGE_OPTIONS.find(o => o.value === user.age)?.label || `${user.age} anos`}
            </span>
          </div>
          {user.email && (
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
          )}
          {user.parentalEmail && (
            <div className="info-row">
              <span className="info-label">Email do responsável</span>
              <span className="info-value">{user.parentalEmail}</span>
            </div>
          )}
          {user.isGuest && (
            <div className="info-guest-badge">👤 Visitante — sem conta criada</div>
          )}
        </div>
        <button className="info-edit-btn" onClick={startEditing}>
          ✏️ Editar informações
        </button>
      </div>
    );
  }

  // Edit mode
  return (
    <div className="info-editor edit-mode">
      <div className="info-field">
        <label className="info-field-label">Nome</label>
        <input
          type="text"
          className="info-input"
          value={draft.name}
          onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
          maxLength={30}
          placeholder="Seu nome ou apelido"
        />
        {errors.name && <div className="info-field-error">{errors.name}</div>}
      </div>

      <div className="info-field">
        <label className="info-field-label">Faixa de idade</label>
        <div className="info-age-grid">
          {AGE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`info-age-btn ${draft.age === opt.value ? 'selected' : ''}`}
              onClick={() => setDraft(d => ({ ...d, age: opt.value }))}
            >
              <span className="age-icon">{opt.icon}</span>
              <span className="age-label">{opt.label}</span>
            </button>
          ))}
        </div>
        {errors.age && <div className="info-field-error">{errors.age}</div>}
      </div>

      {requiresParental && (
        <div className="info-field">
          <label className="info-field-label">
            Email do responsável
            <span className="info-required-badge">obrigatório</span>
          </label>
          <input
            type="email"
            className="info-input"
            value={draft.parentalEmail}
            onChange={e => setDraft(d => ({ ...d, parentalEmail: e.target.value }))}
            placeholder="responsavel@email.com"
          />
          {errors.parentalEmail && <div className="info-field-error">{errors.parentalEmail}</div>}
          <div className="info-field-hint">
            🔒 Menores de 13 anos precisam ter um responsável cadastrado (LGPD)
          </div>
        </div>
      )}

      <div className="info-actions">
        <button className="info-btn-cancel" onClick={cancelEditing}>
          Cancelar
        </button>
        <button className="info-btn-save" onClick={save}>
          Salvar mudanças
        </button>
      </div>
    </div>
  );
}
