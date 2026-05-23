// Personalized study plan generator
// Takes onboarding answers and recommends tracks/lessons + difficulty pacing.

// Interest → recommended track mapping
const INTEREST_TO_TRACKS = {
  games:       ['frontend-web', 'cs-fundamentals'],
  apps:        ['frontend-web', 'backend-apis'],
  websites:    ['frontend-web', 'backend-apis'],
  bots:        ['backend-apis', 'devops-infrastructure'],
  ai:          ['cs-fundamentals', 'backend-apis'],
  cybersec:    ['devops-infrastructure', 'backend-apis', 'cs-fundamentals'],
  art:         ['frontend-web'],
  systems:     ['system-design', 'cs-fundamentals'],
};

// Experience → starting difficulty + skip logic
const EXPERIENCE_LEVEL = {
  none:        { startTrack: 'cs-fundamentals', skipBeginner: false, dailyXpGoal: 20 },
  beginner:    { startTrack: 'cs-fundamentals', skipBeginner: false, dailyXpGoal: 30 },
  some:        { startTrack: 'frontend-web',    skipBeginner: false, dailyXpGoal: 50 },
  experienced: { startTrack: 'cs-fundamentals', skipBeginner: true,  dailyXpGoal: 80 },
};

// Time per day → lessons per session pacing
const TIME_TO_PACING = {
  '10min':    { lessonsPerSession: 1, sessionsPerWeek: 5 },
  '30min':    { lessonsPerSession: 2, sessionsPerWeek: 5 },
  '1hour':    { lessonsPerSession: 3, sessionsPerWeek: 5 },
  'weekend':  { lessonsPerSession: 5, sessionsPerWeek: 2 },
};

// Age group affects visual theme + content tone (set elsewhere too)
function getAgeGroup(age) {
  if (age <= 10) return 'kids';        // 8-10
  if (age <= 13) return 'tweens';      // 11-13
  if (age <= 16) return 'teens';       // 14-16
  return 'teens';                       // 17+ still teens for design purposes
}

/**
 * Build a personalized study plan from onboarding answers.
 * @param {Object} answers - { name, age, experience, interests[], motivation, timePerDay }
 * @returns {Object} plan
 */
export function buildStudyPlan(answers) {
  const ageGroup = getAgeGroup(answers.age || 12);

  // Score tracks by how many of the user's interests map to them
  const trackScores = {};
  (answers.interests || []).forEach(interest => {
    const mappedTracks = INTEREST_TO_TRACKS[interest] || [];
    mappedTracks.forEach((trackId, idx) => {
      // First-mapped track for interest gets weight 2, second gets 1
      trackScores[trackId] = (trackScores[trackId] || 0) + (idx === 0 ? 2 : 1);
    });
  });

  const expConfig = EXPERIENCE_LEVEL[answers.experience] || EXPERIENCE_LEVEL.none;
  const pacing = TIME_TO_PACING[answers.timePerDay] || TIME_TO_PACING['30min'];

  // Force the experience-driven starting track to top of recommendation
  if (!trackScores[expConfig.startTrack]) {
    trackScores[expConfig.startTrack] = 1;
  }
  trackScores[expConfig.startTrack] += 3; // boost the starting track

  const recommendedTracks = Object.entries(trackScores)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => id);

  // Pick first lesson based on experience + first recommended track
  const firstTrackId = recommendedTracks[0];

  return {
    ageGroup,
    recommendedTracks,
    firstTrackId,
    startingDifficulty: answers.experience,
    skipBeginner: expConfig.skipBeginner,
    dailyXpGoal: expConfig.dailyXpGoal,
    lessonsPerSession: pacing.lessonsPerSession,
    sessionsPerWeek: pacing.sessionsPerWeek,
    estimatedWeeksToFinish: Math.ceil(50 / (pacing.lessonsPerSession * pacing.sessionsPerWeek)),
    summary: buildSummary(answers, recommendedTracks, expConfig, pacing),
  };
}

function buildSummary(answers, recommendedTracks, expConfig, pacing) {
  const trackLabels = {
    'cs-fundamentals':       'Fundamentos da Computação',
    'frontend-web':          'Frontend & Web',
    'backend-apis':          'Backend & APIs',
    'devops-infrastructure': 'DevOps',
    'system-design':         'Design de Sistemas',
  };
  return {
    welcomeMessage: `Beleza, ${answers.name || 'codador(a)'}! Montei um plano só pra você.`,
    primaryTrack: trackLabels[recommendedTracks[0]] || 'CS Fundamentals',
    weeklyGoal: `${pacing.lessonsPerSession * pacing.sessionsPerWeek} lições por semana`,
    estimatedTime: `Cerca de ${Math.ceil(50 / (pacing.lessonsPerSession * pacing.sessionsPerWeek))} semanas pra dominar tudo`,
    dailyXpGoal: expConfig.dailyXpGoal,
  };
}
