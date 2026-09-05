'use client'

import React, { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Html, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Eye, Flame, Grid3X3, Sparkles } from 'lucide-react'

export type InspectionMode = 'pbr' | 'thermal' | 'wireframe'

interface KavachModelMeshProps {
  mode: InspectionMode
}

function GyroRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4
      ring1Ref.current.rotation.x += delta * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.35
      ring2Ref.current.rotation.z += delta * 0.15
    }
  })

  return (
    <group>
      {/* Outer Cyan Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.012, 16, 64]} />
        <meshBasicMaterial color="#0ea5a5" transparent opacity={0.45} />
      </mesh>

      {/* Inner Amber Gyro Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.45, 0.008, 16, 64]} />
        <meshBasicMaterial color="#f5b301" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function KavachModelMesh({ mode }: KavachModelMeshProps) {
  const { scene } = useGLTF('/sample.glb')
  const ref = useRef<THREE.Group>(null)

  // Clone scene to avoid mutating original
  const clonedScene = useMemo(() => {
    if (!scene) return new THREE.Group()
    try {
      return scene.clone()
    } catch {
      return new THREE.Group()
    }
  }, [scene])

  // Apply real-time material shaders based on inspection mode
  useMemo(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh

        if (mode === 'thermal') {
          // False-color thermal shader simulation
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#dc2626'),
            emissive: new THREE.Color('#f59e0b'),
            emissiveIntensity: 0.7,
            roughness: 0.2,
            metalness: 0.8,
            wireframe: false,
          })
        } else if (mode === 'wireframe') {
          // Cyber holographic polygon wireframe
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#0ea5a5'),
            emissive: new THREE.Color('#22d3ee'),
            emissiveIntensity: 0.9,
            wireframe: true,
          })
        } else {
          // Standard Photorealistic Trust PBR
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#0c2a30'),
            emissive: new THREE.Color('#087f8c'),
            emissiveIntensity: 0.25,
            roughness: 0.15,
            metalness: 0.95,
            wireframe: false,
          })
        }
      }
    })
  }, [clonedScene, mode])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3
      ref.current.rotation.x = Math.sin(performance.now() * 0.0006) * 0.08
    }
  })

  const tagLabel =
    mode === 'thermal'
      ? 'THERMAL IR // RESIDUAL ARTIFACTS 87%'
      : mode === 'wireframe'
      ? 'POLYGON MESH // 14,240 VERTICES'
      : 'CRYPTOGRAPHIC PBR // DEFCON 5 SECURE'

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.7}>
      <GyroRings />
      <primitive ref={ref} object={clonedScene} scale={2.3} />
      <Html center distanceFactor={7.5}>
        <div className={`model-tag mode-${mode}`}>
          <Sparkles size={11} className="inline mr-1" />
          {tagLabel}
        </div>
      </Html>
    </Float>
  )
}

function FallbackGeometry({ mode }: { mode: InspectionMode }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.35
      ref.current.rotation.x += delta * 0.18
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
      <GyroRings />
      <mesh ref={ref}>
        <octahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          color={mode === 'thermal' ? '#dc2626' : '#0ea5a5'}
          wireframe={mode === 'wireframe' || mode === 'pbr'}
          emissive={mode === 'thermal' ? '#f59e0b' : '#0ea5a5'}
          emissiveIntensity={0.6}
        />
      </mesh>
      <Html center distanceFactor={7.5}>
        <div className="model-tag">INITIALIZING 3D FORENSIC MATRIX...</div>
      </Html>
    </Float>
  )
}

// Preload GLTF model
if (typeof window !== 'undefined') {
  try {
    useGLTF.preload('/sample.glb')
  } catch (e) {
    console.warn('Preload notice:', e)
  }
}

export function Hero3D() {
  const [mode, setMode] = useState<InspectionMode>('pbr')

  return (
    <div className="hero-3d-top" aria-label="Interactive 3D Forensic Trust Object">
      {/* Multi-Spectrum Mode Switcher */}
      <div className="inspection-mode-toolbar">
        <button
          className={`mode-btn ${mode === 'pbr' ? 'active' : ''}`}
          onClick={() => setMode('pbr')}
          title="Standard PBR Render"
        >
          <Eye size={12} /> PBR TRUST
        </button>
        <button
          className={`mode-btn ${mode === 'thermal' ? 'active' : ''}`}
          onClick={() => setMode('thermal')}
          title="Infrared Thermal Anomaly Shader"
        >
          <Flame size={12} /> THERMAL IR
        </button>
        <button
          className={`mode-btn ${mode === 'wireframe' ? 'active' : ''}`}
          onClick={() => setMode('wireframe')}
          title="Holographic Polygon Wireframe"
        >
          <Grid3X3 size={12} /> WIRE MESH
        </button>
      </div>

      <div className="hero-3d-rings" aria-hidden="true" />

      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={mode === 'thermal' ? 3 : 2.2} />
        <directionalLight
          position={[4, 5, 5]}
          intensity={mode === 'thermal' ? 4.5 : 3.5}
          color={mode === 'thermal' ? '#ef4444' : '#0ea5a5'}
        />
        <pointLight
          position={[-4, -3, 3]}
          intensity={12}
          color={mode === 'thermal' ? '#f59e0b' : '#0ea5a5'}
        />

        <Suspense fallback={<FallbackGeometry mode={mode} />}>
          <KavachModelMesh mode={mode} />
        </Suspense>

        <Environment preset={mode === 'thermal' ? 'sunset' : 'city'} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={3}
          maxDistance={7}
          autoRotate={false}
        />
      </Canvas>

      <div className="orbit-caption">
        <span>INTERACTIVE 3D SHADER</span>
        <b>DRAG TO ROTATE 360°</b>
      </div>
    </div>
  )
}
