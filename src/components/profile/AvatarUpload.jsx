// AvatarUpload — circular profile picture with upload, preview, and remove
// Stores image as base64 in user.avatarUrl (localStorage-backed)
// Auto-resizes to 256x256 to keep localStorage small

import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';

// Resize image to a square then base64-encode it
function resizeImageToBase64(file, size = 256) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Center-crop to square
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        const base64 = canvas.toDataURL('image/jpeg', 0.85);
        resolve(base64);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AvatarUpload({ size = 120, editable = true }) {
  const { user, updateUser } = useAuth();
  const { play, pushToast } = useGamification();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    // Validation
    if (!file.type.startsWith('image/')) {
      setError('Tem que ser uma imagem (PNG, JPG, etc.)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Imagem grande demais — máximo 5 MB');
      return;
    }

    setUploading(true);
    try {
      const base64 = await resizeImageToBase64(file, 256);
      updateUser({ avatarUrl: base64 });
      play('pop');
      pushToast({ title: 'Foto atualizada!', subtitle: 'Ficou massa 📸', type: 'default' });
    } catch (err) {
      setError('Erro ao processar a imagem. Tenta outra.');
    } finally {
      setUploading(false);
      // Reset input so the same file can be re-uploaded
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    if (!window.confirm('Quer mesmo remover sua foto?')) return;
    updateUser({ avatarUrl: null });
    play('click');
  };

  const handleClick = () => {
    if (!editable) return;
    fileInputRef.current?.click();
  };

  const initials = (user?.name || '?')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="avatar-upload-wrap" style={{ width: size }}>
      <div
        className={`avatar-circle ${editable ? 'editable' : ''}`}
        style={{ width: size, height: size }}
        onClick={handleClick}
        role={editable ? 'button' : undefined}
        tabIndex={editable ? 0 : undefined}
        aria-label={editable ? 'Trocar foto de perfil' : 'Foto de perfil'}
      >
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt="Avatar" />
        ) : (
          <div className="avatar-initials" style={{ fontSize: size * 0.36 }}>
            {initials}
          </div>
        )}

        {editable && (
          <div className="avatar-overlay">
            <span style={{ fontSize: size * 0.18 }}>📷</span>
            <span className="avatar-overlay-text">
              {user?.avatarUrl ? 'Trocar' : 'Adicionar foto'}
            </span>
          </div>
        )}

        {uploading && (
          <div className="avatar-loading">
            <div className="avatar-spinner" />
          </div>
        )}
      </div>

      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      )}

      {editable && user?.avatarUrl && (
        <button
          className="avatar-remove-btn"
          onClick={handleRemove}
          aria-label="Remover foto"
        >
          🗑 Remover foto
        </button>
      )}

      {error && (
        <div className="avatar-error">{error}</div>
      )}
    </div>
  );
}
