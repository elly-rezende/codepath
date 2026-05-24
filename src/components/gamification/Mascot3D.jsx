// Mascot3D — Three.js version of Bit
// Renders a procedural low-poly robot using primitive geometry.
// No external 3D model needed — built from boxes, spheres, cylinders.
// Mounts in its own canvas; cleans up on unmount.

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAuth } from '../../context/AuthContext';
import { cssVar } from '../../utils/theme';

const SKIN_COLOR_MAP = {
  'skin-cyber':  0x7C5CFF,
  'skin-aqua':   0x06B6D4,
  'skin-fire':   0xEF4444,
  'skin-mint':   0x10D9C4,
  'skin-galaxy': 0xA855F7,
  'skin-golden': 0xF59E0B,
  'skin-holo':   0xEC4899,
};

const MOOD_COLOR_HEX = {
  idle:        null, // uses brand primary from CSS var
  happy:       0x10D9C4,
  sad:         0x6B7280,
  celebrating: 0xF59E0B,
  sleeping:    0x475569,
  thinking:    0x3B82F6,
  waving:      0xEC4899,
};

function hexFromCssVar(name, fallback) {
  const value = cssVar(name, '');
  if (value.startsWith('#')) return parseInt(value.slice(1), 16);
  return fallback;
}

export default function Mascot3D({
  mood = 'idle',
  size = 200,
  autoRotate = true,
  className,
}) {
  const containerRef = useRef(null);
  const sceneStateRef = useRef(null);

  // Read equipped skin for color override
  const { user } = useAuth();
  const equippedSkin = user?.equipped?.['mascot-skin'];

  // === Initialize scene once ===
  useEffect(() => {
    if (!containerRef.current) return;

    const width = size;
    const height = size;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // === Lighting ===
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x7C5CFF, 0.5, 10);
    fillLight.position.set(-2, 1, 3);
    scene.add(fillLight);

    // === Build Bit ===
    const bitGroup = new THREE.Group();
    scene.add(bitGroup);

    // Helper to create rounded box-ish geometry via beveled material
    const matBrand = new THREE.MeshStandardMaterial({
      color: 0x7C5CFF,
      roughness: 0.4,
      metalness: 0.1,
    });
    const matAccent = new THREE.MeshStandardMaterial({
      color: 0xA78BFA,
      roughness: 0.5,
    });
    const matEye = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.2,
      emissive: 0xFFFFFF,
      emissiveIntensity: 0.3,
    });
    const matPupil = new THREE.MeshStandardMaterial({ color: 0x1A1B2E });
    const matScreen = new THREE.MeshStandardMaterial({
      color: 0x1A1B2E,
      roughness: 0.1,
      metalness: 0.4,
    });

    // Body (rounded cube)
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 1.4, 1.2),
      matBrand
    );
    body.position.y = 0;
    bitGroup.add(body);

    // Screen face (slightly inset on the front)
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 0.75, 0.05),
      matScreen
    );
    screen.position.set(0, 0.05, 0.62);
    bitGroup.add(screen);

    // Eyes
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), matEye);
    eyeL.position.set(-0.25, 0.15, 0.66);
    bitGroup.add(eyeL);

    const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), matEye);
    eyeR.position.set(0.25, 0.15, 0.66);
    bitGroup.add(eyeR);

    // Pupils
    const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), matPupil);
    pupilL.position.set(-0.25, 0.15, 0.78);
    bitGroup.add(pupilL);

    const pupilR = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), matPupil);
    pupilR.position.set(0.25, 0.15, 0.78);
    bitGroup.add(pupilR);

    // Mouth (curved line as a thin torus segment)
    const mouthGeom = new THREE.TorusGeometry(0.12, 0.025, 8, 16, Math.PI);
    const mouth = new THREE.Mesh(mouthGeom, matEye);
    mouth.position.set(0, -0.15, 0.66);
    mouth.rotation.z = Math.PI;
    bitGroup.add(mouth);

    // Antenna
    const antennaRod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.35, 8),
      matBrand
    );
    antennaRod.position.set(0, 0.9, 0);
    bitGroup.add(antennaRod);

    const antennaBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 16, 16),
      matAccent
    );
    antennaBall.position.set(0, 1.13, 0);
    bitGroup.add(antennaBall);

    // Arms
    const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.7, 12), matBrand);
    armL.position.set(-0.85, -0.05, 0);
    bitGroup.add(armL);

    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), matAccent);
    handL.position.set(-0.85, -0.45, 0);
    bitGroup.add(handL);

    const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.7, 12), matBrand);
    armR.position.set(0.85, -0.05, 0);
    bitGroup.add(armR);

    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), matAccent);
    handR.position.set(0.85, -0.45, 0);
    bitGroup.add(handR);

    // Legs
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4, 10), matBrand);
    legL.position.set(-0.25, -0.95, 0);
    bitGroup.add(legL);

    const legR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4, 10), matBrand);
    legR.position.set(0.25, -0.95, 0);
    bitGroup.add(legR);

    // Feet
    const footL = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), matAccent);
    footL.position.set(-0.25, -1.15, 0.1);
    footL.scale.set(1, 0.6, 1.2);
    bitGroup.add(footL);

    const footR = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), matAccent);
    footR.position.set(0.25, -1.15, 0.1);
    footR.scale.set(1, 0.6, 1.2);
    bitGroup.add(footR);

    // Save refs we need to animate
    sceneStateRef.current = {
      scene, camera, renderer, bitGroup,
      matBrand, matAccent, mouth, eyeL, eyeR, antennaBall,
      armL, armR,
      startTime: performance.now(),
      animationId: null,
    };

    // === Animation loop ===
    const animate = () => {
      const state = sceneStateRef.current;
      if (!state) return;

      const t = (performance.now() - state.startTime) / 1000;

      // Idle bob
      state.bitGroup.position.y = Math.sin(t * 1.4) * 0.06;

      // Auto-rotate
      if (autoRotate) {
        state.bitGroup.rotation.y = Math.sin(t * 0.5) * 0.4;
      }

      // Antenna wobble
      state.antennaBall.position.x = Math.sin(t * 1.8) * 0.08;

      // Blink occasionally
      const blink = Math.max(0, Math.sin(t * 0.7 + 0.5));
      const eyeScale = blink > 0.95 ? 0.1 : 1;
      state.eyeL.scale.y = eyeScale;
      state.eyeR.scale.y = eyeScale;

      state.renderer.render(state.scene, state.camera);
      state.animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      const state = sceneStateRef.current;
      if (state?.animationId) cancelAnimationFrame(state.animationId);
      if (state?.renderer) {
        state.renderer.dispose();
        if (containerRef.current && state.renderer.domElement?.parentNode) {
          containerRef.current.removeChild(state.renderer.domElement);
        }
      }
      // Dispose geometries + materials
      state?.scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      sceneStateRef.current = null;
    };
  }, [size, autoRotate]);

  // === React to mood / skin changes ===
  useEffect(() => {
    const state = sceneStateRef.current;
    if (!state) return;

    // Color: skin-equipped > mood-specific > brand primary
    let colorHex;
    if (equippedSkin && SKIN_COLOR_MAP[equippedSkin]) {
      colorHex = SKIN_COLOR_MAP[equippedSkin];
    } else if (MOOD_COLOR_HEX[mood] != null) {
      colorHex = MOOD_COLOR_HEX[mood];
    } else {
      colorHex = hexFromCssVar('--color-brand-primary', 0x7C5CFF);
    }

    state.matBrand.color.setHex(colorHex);

    // Lighter accent
    const accentHex = colorHex | 0x303030;
    state.matAccent.color.setHex(accentHex & 0xFFFFFF);

    // Mouth orientation by mood
    if (mood === 'sad') {
      state.mouth.rotation.z = 0;          // frown
    } else if (mood === 'thinking') {
      state.mouth.scale.set(0.3, 0.3, 0.3); // small "o"
      state.mouth.rotation.z = 0;
    } else {
      state.mouth.scale.set(1, 1, 1);
      state.mouth.rotation.z = Math.PI;    // smile
    }

    // Wave arm if mood is waving
    if (mood === 'waving') {
      const wave = () => {
        const state2 = sceneStateRef.current;
        if (!state2) return;
        const t = performance.now() / 1000;
        state2.armR.rotation.z = -0.6 + Math.sin(t * 5) * 0.4;
      };
      const i = setInterval(wave, 16);
      return () => {
        clearInterval(i);
        if (sceneStateRef.current) sceneStateRef.current.armR.rotation.z = 0;
      };
    }
  }, [mood, equippedSkin]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        position: 'relative',
      }}
      aria-label={`Bit 3D — humor ${mood}`}
    />
  );
}
