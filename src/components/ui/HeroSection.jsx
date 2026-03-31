import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onStart }) {
  const { lang, toggleLang, t } = useLang();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollProgressRef = useRef(null);
  const heroContentRef = useRef(null);
  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;

  const threeRefs = useRef({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null, mountains: [], animationId: null,
    targetCameraX: 0, targetCameraY: 30, targetCameraZ: 300, locations: [],
  });

  useEffect(() => {
    const refs = threeRefs.current;

    // Scene
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    // Camera
    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    refs.camera.position.set(0, 20, 100);

    // Renderer
    refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const isMobile = window.innerWidth < 768;
    refs.renderer.toneMappingExposure = isMobile ? 0.5 : 0.8;

    // Post-processing
    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    const bloomStrength = isMobile ? 0.6 : 1.2;
    refs.composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), bloomStrength, 0.4, 0.85));

    // Stars
    for (let i = 0; i < 3; i++) {
      const count = 5000;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let j = 0; j < count; j++) {
        const r = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        pos[j * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[j * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[j * 3 + 2] = r * Math.cos(phi);

        const c = new THREE.Color();
        const ch = Math.random();
        if (ch < 0.7) c.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        else if (ch < 0.9) c.setHSL(0.08, 0.5, 0.8);
        else c.setHSL(0.6, 0.5, 0.8);
        col[j * 3] = c.r; col[j * 3 + 1] = c.g; col[j * 3 + 2] = c.b;
        sizes[j] = Math.random() * 2 + 0.5;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `
          attribute float size; attribute vec3 color; varying vec3 vColor; uniform float time; uniform float depth;
          void main() {
            vColor = color; vec3 pos = position;
            float angle = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, d));
          }
        `,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      });

      const stars = new THREE.Points(geo, mat);
      refs.scene.add(stars);
      refs.stars.push(stars);
    }

    // Nebula
    const nebSize = isMobile ? [4000, 2000] : [8000, 4000];
    const nebGeo = new THREE.PlaneGeometry(nebSize[0], nebSize[1], 100, 100);
    const nebMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, color1: { value: new THREE.Color(0x0033ff) }, color2: { value: new THREE.Color(0xff0066) }, opacity: { value: isMobile ? 0.25 : 0.5 } },
      vertexShader: `
        varying vec2 vUv; varying float vEl; uniform float time;
        void main() { vUv = uv; vec3 p = position; float el = sin(p.x*0.01+time)*cos(p.y*0.01+time)*20.0; p.z += el; vEl = el; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }
      `,
      fragmentShader: `
        uniform vec3 color1; uniform vec3 color2; uniform float opacity; uniform float time; varying vec2 vUv; varying float vEl;
        void main() { float m = sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time); vec3 c = mix(color1,color2,m*0.5+0.5); float a = opacity*(1.0-length(vUv-0.5)*2.0); a *= 1.0+vEl*0.01; gl_FragColor = vec4(c,a); }
      `,
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebGeo, nebMat);
    nebula.position.z = isMobile ? -1400 : -1050;
    refs.scene.add(nebula);
    refs.nebula = nebula;

    // Mountains
    const layers = [
      { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
      { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
      { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
      { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
    ];
    layers.forEach((layer, idx) => {
      const pts = [];
      for (let i = 0; i <= 50; i++) {
        const x = (i / 50 - 0.5) * 1000;
        const y = Math.sin(i * 0.1) * layer.height + Math.sin(i * 0.05) * layer.height * 0.5 + Math.random() * layer.height * 0.2 - 100;
        pts.push(new THREE.Vector2(x, y));
      }
      pts.push(new THREE.Vector2(5000, -300));
      pts.push(new THREE.Vector2(-5000, -300));
      const shape = new THREE.Shape(pts);
      const m = new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: layer.opacity, side: THREE.DoubleSide }));
      m.position.z = layer.distance;
      m.position.y = layer.distance;
      m.userData = { baseZ: layer.distance, index: idx };
      refs.scene.add(m);
      refs.mountains.push(m);
    });

    // Store locations
    refs.locations = refs.mountains.map(m => m.position.z);

    // Atmosphere
    const atmoGeo = new THREE.SphereGeometry(600, 32, 32);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `varying vec3 vNormal; uniform float time; void main() { float i = pow(0.7 - dot(vNormal, vec3(0,0,1)), 2.0); vec3 a = vec3(0.3,0.6,1.0)*i*(sin(time*2.0)*0.1+0.9); gl_FragColor = vec4(a, i*0.25); }`,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true,
    });
    refs.scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    // Animate
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      refs.stars.forEach(s => { if (s.material.uniforms) s.material.uniforms.time.value = t; });
      if (refs.nebula?.material.uniforms) refs.nebula.material.uniforms.time.value = t * 0.5;

      const sm = smoothCameraPos.current;
      sm.x += (refs.targetCameraX - sm.x) * 0.05;
      sm.y += (refs.targetCameraY - sm.y) * 0.05;
      sm.z += (refs.targetCameraZ - sm.z) * 0.05;
      refs.camera.position.set(sm.x + Math.sin(t * 0.1) * 2, sm.y + Math.cos(t * 0.15), sm.z);
      refs.camera.lookAt(0, 10, -600);

      refs.mountains.forEach((m, i) => {
        const pf = 1 + i * 0.5;
        m.position.x = Math.sin(t * 0.1) * 2 * pf;
      });

      refs.composer?.render();
    };
    animate();
    setIsReady(true);

    const handleResize = () => {
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      refs.stars.forEach(s => { s.geometry.dispose(); s.material.dispose(); });
      refs.mountains.forEach(m => { m.geometry.dispose(); m.material.dispose(); });
      if (refs.nebula) { refs.nebula.geometry.dispose(); refs.nebula.material.dispose(); }
      refs.renderer?.dispose();
    };
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    if (!isReady) return;
    gsap.set([titleRef.current, subtitleRef.current, scrollProgressRef.current], { visibility: 'visible' });
    const tl = gsap.timeline();
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.title-char');
      tl.from(chars, { y: 200, opacity: 0, duration: 1.5, stagger: 0.05, ease: 'power4.out' });
    }
    if (subtitleRef.current) {
      tl.from(subtitleRef.current.querySelectorAll('.subtitle-line'), { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=0.8');
    }
    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' }, '-=0.5');
    }
    return () => tl.kill();
  }, [isReady]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
      const newSection = Math.floor(progress * totalSections);
      setCurrentSection(newSection);

      const refs = threeRefs.current;
      const totalProgress = progress * totalSections;
      const sectionProgress = totalProgress % 1;

      const positions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 },
      ];
      const cur = positions[newSection] || positions[0];
      const next = positions[newSection + 1] || cur;
      refs.targetCameraX = cur.x + (next.x - cur.x) * sectionProgress;
      refs.targetCameraY = cur.y + (next.y - cur.y) * sectionProgress;
      refs.targetCameraZ = cur.z + (next.z - cur.z) * sectionProgress;

      refs.mountains.forEach((m, i) => {
        if (progress > 0.7) m.position.z = 600000;
        else m.position.z = refs.locations[i];
      });
      if (refs.nebula) refs.nebula.position.z = refs.mountains[3]?.position.z || -1050;

      // Fade out hero content as user scrolls into sections
      if (heroContentRef.current) {
        const fadeOut = Math.max(0, 1 - (scrollY / (window.innerHeight * 0.5)));
        heroContentRef.current.style.opacity = fadeOut;
        heroContentRef.current.style.pointerEvents = fadeOut < 0.1 ? 'none' : '';
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  const splitTitle = (text) => text.split('').map((char, i) => (
    <span key={i} className="title-char">{char}</span>
  ));

  const sections = [
    { title: t('heroLearnTitle'), line1: t('heroLearnLine1'), line2: t('heroLearnLine2') },
    { title: t('heroBuildTitle'), line1: t('heroBuildLine1'), line2: t('heroBuildLine2') },
  ];

  return (
    <div ref={containerRef} className="hero-container">
      <canvas ref={canvasRef} className="hero-canvas" />

      <button className="hero-lang-toggle" onClick={toggleLang}>
        {lang === 'en' ? '🇧🇷 PT' : '🇺🇸 EN'}
      </button>

      <div ref={heroContentRef} className="hero-content">
        <h1 ref={titleRef} className="hero-title" style={{ visibility: 'hidden' }}>
          {splitTitle('CodePath')}
        </h1>
        <div ref={subtitleRef} className="hero-subtitle" style={{ visibility: 'hidden' }}>
          <p className="subtitle-line">{t('heroSubtitle1')}</p>
          <p className="subtitle-line">{t('heroSubtitle2')}</p>
          <button className="hero-start-btn" onClick={onStart}>{t('heroStartBtn')}</button>
        </div>
      </div>

      <div ref={scrollProgressRef} className="scroll-progress" style={{ visibility: 'hidden' }}>
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
        <div className="section-counter">
          {String(currentSection).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
        </div>
      </div>

      <div className="scroll-sections">
        {sections.map((s, i) => (
          <section key={i} className="content-section">
            <h1 className="hero-title">{s.title}</h1>
            <div className="hero-subtitle">
              <p className="subtitle-line">{s.line1}</p>
              <p className="subtitle-line">{s.line2}</p>
              {i === sections.length - 1 && (
                <button className="hero-start-btn" onClick={onStart}>{t('heroStartBtn')}</button>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
