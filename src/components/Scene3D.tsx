import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Particle WebSphere
function ParticleWebSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Generate particle positions
  const count = 1200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const radius = 2.4;
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius + (Math.random() - 0.5) * 0.4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.12;
      pointsRef.current.rotation.x += delta * 0.05;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group>
      {/* Outer Distorted Glass Mesh */}
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={0.9}
          distort={0.35}
          speed={1.5}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Particle Web */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#06b6d4"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// 2. Floating Metallic Geometries
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neon Cyan Octahedron */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[-3.8, 2.2, -1]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            roughness={0.2}
            metalness={0.9}
            wireframe
          />
        </mesh>
      </Float>

      {/* Neon Purple Torus Knot */}
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1.8}>
        <mesh position={[4, -1.8, -1.5]} scale={0.6}>
          <torusKnotGeometry args={[0.8, 0.22, 128, 16]} />
          <meshStandardMaterial
            color="#a855f7"
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>
      </Float>

      {/* Floating Cyan Icosahedron */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2}>
        <mesh position={[3.5, 2.5, -2]}>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            roughness={0.3}
            metalness={0.8}
            wireframe
          />
        </mesh>
      </Float>

      {/* Small Floating Nodes */}
      <Float speed={3} rotationIntensity={1} floatIntensity={2.5}>
        <mesh position={[-3.2, -2.5, -1]}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#ec4899"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </Float>
    </group>
  );
}

// 3. Mouse Inertia Controller using Lerp
function MouseInertiaController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    camera.position.x = mouse.current.x * 0.8;
    camera.position.y = mouse.current.y * 0.8;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 4. Main Scene Export
export const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#070a0f]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        {/* Dramatic Volumetric Lighting */}
        <ambientLight intensity={0.4} />
        
        {/* Top-Left Directional Spotlight */}
        <directionalLight
          position={[-5, 8, 5]}
          intensity={2.2}
          color="#ffffff"
          castShadow
        />

        {/* Neon Cyan Rim Light */}
        <pointLight
          position={[-6, -3, 3]}
          intensity={3.5}
          color="#06b6d4"
          distance={15}
        />

        {/* Neon Purple Rim Light */}
        <pointLight
          position={[6, 3, 2]}
          intensity={3.5}
          color="#a855f7"
          distance={15}
        />

        {/* 3D Meshes & Mouse Interaction */}
        <ParticleWebSphere />
        <FloatingShapes />
        <MouseInertiaController />
      </Canvas>
    </div>
  );
};
