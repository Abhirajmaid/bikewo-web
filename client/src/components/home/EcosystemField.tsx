"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Ambient 3D energy field sitting behind the ecosystem graph.
 *
 * Deliberately non-interactive and decorative: the real interaction lives in
 * the DOM layer above so it stays keyboard-accessible and screen-readable.
 */

const COUNT = 900;
const RADIUS = 3.1;

function ParticleShell() {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere — even coverage without clustering at the poles.
      const t = i / COUNT;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = Math.PI * (1 + Math.sqrt(5)) * i;
      // Jitter the radius so the shell reads as a volume, not a wireframe ball.
      const r = RADIUS * (0.82 + Math.random() * 0.28);

      positions[i * 3] = r * Math.sin(inclination) * Math.cos(azimuth);
      positions[i * 3 + 1] = r * Math.sin(inclination) * Math.sin(azimuth);
      positions[i * 3 + 2] = r * Math.cos(inclination);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.045;
    points.current.rotation.x += delta * 0.012;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.028}
        color="#35D68F"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function EcosystemField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      frameloop="always"
      style={{ pointerEvents: "none" }}
    >
      <ParticleShell />
    </Canvas>
  );
}
