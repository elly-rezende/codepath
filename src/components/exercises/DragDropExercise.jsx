import { useState, useEffect } from 'react';
import { useLang } from '../../context/LanguageContext';

export default function DragDropExercise({ exercise, onComplete }) {
  const { t } = useLang();
  const [order, setOrder] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setOrder(exercise.items.map((_, i) => i));
    setChecked(false);
    setCorrect(false);
    setAttempts(0);
  }, [exercise]);

  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setOverIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    const newOrder = [...order];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(dropIndex, 0, removed);
    setOrder(newOrder);
    setDragIndex(null);
    setOverIndex(null);
    setChecked(false);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const checkOrder = () => {
    const correctArrangement = exercise.correctOrder.map(i => exercise.items[i]);
    const userArrangement = order.map(i => exercise.items[i]);
    const isCorrect = JSON.stringify(userArrangement) === JSON.stringify(correctArrangement);
    setChecked(true);
    setCorrect(isCorrect);
    setAttempts(a => a + 1);
  };

  return (
    <div className="exercise-card">
      {exercise.title && (
        <div className="exercise-title">{exercise.title}</div>
      )}
      {exercise.description && (
        <p style={{ marginBottom: '16px', fontSize: '15px', color: 'var(--text-secondary)' }}>
          {exercise.description}
        </p>
      )}

      {attempts > 1 && (
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          {t('attemptLabel')} {attempts}
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        {order.map((itemIndex, pos) => (
          <div
            key={itemIndex}
            className={`drag-item${dragIndex === pos ? ' dragging' : ''}${overIndex === pos ? ' over' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, pos)}
            onDragOver={(e) => handleDragOver(e, pos)}
            onDrop={(e) => handleDrop(e, pos)}
            onDragEnd={handleDragEnd}
          >
            <span style={{ color: 'var(--text-muted)', fontSize: '12px', width: '20px', flexShrink: 0 }}>
              {pos + 1}.
            </span>
            <span style={{ cursor: 'grab', color: 'var(--text-muted)', marginRight: '4px' }}>⠿</span>
            <span style={{ fontSize: '14px' }}>{exercise.items[itemIndex]}</span>
          </div>
        ))}
      </div>

      {checked && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            marginBottom: '12px',
            fontSize: '14px',
            background: correct ? 'rgba(0,255,100,0.08)' : 'rgba(255,71,87,0.08)',
            color: correct ? 'var(--accent-green)' : 'var(--accent-red, #ff4757)',
            border: `1px solid ${correct ? 'var(--accent-green)' : 'var(--accent-red, #ff4757)'}`,
          }}
        >
          {correct
            ? t('correctGreatJob')
            : `${t('notQuiteTryAgain')} ${exercise.feedback || ''}`}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {!correct && (
          <button className="run-btn" onClick={checkOrder}>
            {t('checkOrder')}
          </button>
        )}
        {correct && (
          <button className="continue-btn" onClick={onComplete}>
            {t('continueBtn')}
          </button>
        )}
      </div>
    </div>
  );
}
