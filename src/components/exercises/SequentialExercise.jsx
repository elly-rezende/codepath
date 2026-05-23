import { useState } from 'react';
import CodingExercise from './CodingExercise';
import MultipleChoiceExercise from './MultipleChoiceExercise';
import { useLang } from '../../context/LanguageContext';

export default function SequentialExercise({ assessFinal, onComplete }) {
  const { t } = useLang();
  const [stepIndex, setStepIndex] = useState(0);

  if (!assessFinal || !assessFinal.steps || assessFinal.steps.length === 0) {
    return null;
  }

  const steps = assessFinal.steps;
  const currentStep = steps[stepIndex];
  const totalSteps = steps.length;

  const handleStepComplete = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(i => i + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div>
      {assessFinal.title && (
        <div className="exercise-title" style={{ marginBottom: '8px' }}>
          {assessFinal.title}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div className="phase-progress-bar">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`phase-progress-dot ${i < stepIndex ? 'done' : i === stepIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {t('stepLabel')} {stepIndex + 1} {t('of')} {totalSteps}
        </span>
      </div>

      {currentStep.type === 'coding' && (
        <CodingExercise
          level={{
            level: stepIndex + 1,
            title: currentStep.title || '',
            instructions: currentStep.instructions || [],
            sampleCode: currentStep.sampleCode || '',
            solution: currentStep.solution || '',
            tests: currentStep.tests || [],
            hints: currentStep.hints || [],
          }}
          onComplete={handleStepComplete}
        />
      )}

      {currentStep.type === 'multipleChoice' && (
        <MultipleChoiceExercise
          exercise={currentStep}
          onComplete={handleStepComplete}
          compact
        />
      )}
    </div>
  );
}
