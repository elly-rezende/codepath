import { useLang } from '../context/LanguageContext';
import { lessonsPt, badgesPt, difficultyPt } from '../data/curriculum-pt';

export function useTranslatedContent() {
  const { lang } = useLang();

  const tLesson = (lesson) => {
    if (lang === 'en' || !lesson) return lesson;
    const pt = lessonsPt[lesson.id];
    if (!pt) return lesson;
    return {
      ...lesson,
      title: pt.title || lesson.title,
      hook: pt.hook || lesson.hook,
      concept: pt.concept || lesson.concept,
      difficulty: difficultyPt[lesson.difficulty] || lesson.difficulty,
    };
  };

  const tBadge = (badge) => {
    if (lang === 'en' || !badge) return badge;
    const pt = badgesPt[badge.id];
    if (!pt) return badge;
    return {
      ...badge,
      name: pt.name || badge.name,
      description: pt.description || badge.description,
    };
  };

  const tDifficulty = (diff) => {
    if (lang === 'en') return diff;
    return difficultyPt[diff] || diff;
  };

  return { tLesson, tBadge, tDifficulty };
}
