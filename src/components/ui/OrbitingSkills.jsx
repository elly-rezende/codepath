import { useEffect, useState, memo } from 'react';

const iconComponents = {
  brain: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.5" className="w-full h-full">
        <path d="M9.5 2a5.5 5.5 0 0 0-4.9 8 5.5 5.5 0 0 0 1.9 6.5V20h3v-3h4v3h3v-3.5a5.5 5.5 0 0 0 1.9-6.5A5.5 5.5 0 0 0 14.5 2h-5z"/>
        <path d="M12 2v8M8 6h8M9 20h6"/>
      </svg>
    ),
    color: '#D4A853'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  server: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#68D391" strokeWidth="1.5" className="w-full h-full">
        <rect x="2" y="2" width="20" height="8" rx="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2"/>
        <circle cx="6" cy="6" r="1" fill="#68D391"/>
        <circle cx="6" cy="18" r="1" fill="#68D391"/>
      </svg>
    ),
    color: '#68D391'
  },
  rocket: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F56565" strokeWidth="1.5" className="w-full h-full">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      </svg>
    ),
    color: '#F56565'
  },
  architecture: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#B794F4" strokeWidth="1.5" className="w-full h-full">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4"/>
      </svg>
    ),
    color: '#B794F4'
  },
  code: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2" className="w-full h-full">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: '#4ADE80'
  }
};

const SkillIcon = memo(({ type }) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

const skillsConfig = [
  { id: 'brain', orbitRadius: 100, size: 40, speed: 1, iconType: 'brain', phaseShift: 0, glowColor: 'cyan', label: 'CS Fundamentals' },
  { id: 'react', orbitRadius: 100, size: 45, speed: 1, iconType: 'react', phaseShift: (2 * Math.PI) / 3, glowColor: 'cyan', label: 'Frontend' },
  { id: 'server', orbitRadius: 100, size: 40, speed: 1, iconType: 'server', phaseShift: (4 * Math.PI) / 3, glowColor: 'cyan', label: 'Backend' },
  { id: 'rocket', orbitRadius: 180, size: 50, speed: -0.6, iconType: 'rocket', phaseShift: 0, glowColor: 'purple', label: 'DevOps' },
  { id: 'architecture', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'architecture', phaseShift: (2 * Math.PI) / 3, glowColor: 'purple', label: 'System Design' },
  { id: 'code', orbitRadius: 180, size: 40, speed: -0.6, iconType: 'code', phaseShift: (4 * Math.PI) / 3, glowColor: 'purple', label: 'Full Stack' },
];

const OrbitingSkill = memo(({ config, angle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;
  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full p-2 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isHovered ? 'scale-125' : ''}`}
        style={{
          background: 'rgba(30, 34, 53, 0.9)',
          backdropFilter: 'blur(4px)',
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : '0 4px 15px rgba(0,0,0,0.3)'
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none"
            style={{ background: 'rgba(18, 20, 28, 0.95)', color: '#E8E6F0', fontSize: '11px' }}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }) => {
  const colors = glowColor === 'purple'
    ? { primary: 'rgba(147, 51, 234, 0.3)', secondary: 'rgba(147, 51, 234, 0.15)', border: 'rgba(147, 51, 234, 0.2)' }
    : { primary: 'rgba(74, 222, 128, 0.3)', secondary: 'rgba(74, 222, 128, 0.15)', border: 'rgba(74, 222, 128, 0.2)' };

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 40px ${colors.primary}, inset 0 0 40px ${colors.secondary}`,
          animation: `pulse 4s ease-in-out infinite`,
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: `1px solid ${colors.border}`, boxShadow: `inset 0 0 20px ${colors.secondary}` }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime(prev => prev + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 180, glowColor: 'purple', delay: 1.5 },
  ];

  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <div
        className="relative flex items-center justify-center"
        style={{ width: 'min(420px, calc(100vw - 40px))', height: 'min(420px, calc(100vw - 40px))' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Central icon */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center z-10 relative"
          style={{ background: 'linear-gradient(135deg, #1A1D2B 0%, #12141C 100%)', boxShadow: '0 0 40px rgba(74,222,128,0.15), 0 0 80px rgba(183,148,244,0.1)' }}>
          <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(74,222,128,0.15)', filter: 'blur(20px)' }} />
          <div className="relative z-10">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#cpgradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="cpgradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#B794F4" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
        </div>

        {orbitConfigs.map(c => (
          <GlowingOrbitPath key={`path-${c.radius}`} radius={c.radius} glowColor={c.glowColor} animationDelay={c.delay} />
        ))}

        {skillsConfig.map(config => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return <OrbitingSkill key={config.id} config={config} angle={angle} />;
        })}
      </div>
    </div>
  );
}
