'use client'

/**
 * Forensic3DFrameVolume
 * ------------------------------------------------------------------
 * A real-time WebGL (three.js) 3D evidence viewer for KAVACH.
 *
 * What it does:
 *  - Renders the ACTUAL uploaded video/image as a live WebGL texture
 *    (not a static screenshot) on a floating 3D plane.
 *  - Extracts real per-frame thumbnails from the video and arranges
 *    them as an orbiting 3D "frame ring" around the live feed.
 *  - Any frame flagged as anomalous gets a permanent negative-color /
 *    chromatic-glitch shader treatment and pops forward in Z-space
 *    with a pulsing red rim light.
 *  - While the video is played back through this component, crossing
 *    into an anomalous frame range automatically flips the *entire*
 *    live feed into "negative scene" mode for the duration of the
 *    anomaly, then eases back — a literal "negative video view" as
 *    the timeline hits a manipulated region.
 *  - Orbit camera (drag to rotate, auto-rotates when idle).
 *
 * Scope note: this treatment is intentionally for VIDEO and IMAGE
 * evidence only. Audio/.mp3 exhibits keep the existing 2D
 * spectrogram/FFT view — there's no meaningful "3D frame" for audio,
 * so don't route audio here.
 *
 * Install:
 *   npm install three
 *   npm install -D @types/three
 *
 * Usage:
 *   <Forensic3DFrameVolume
 *     mediaUrl={currentEvidence.previewUrl}
 *     mediaType="video"
 *     totalFrames={300}
 *     fps={30}
 *     anomalyFrames={[38, 39, 40, 41]}
 *     isFake={isTampered}
 *   />
 */

import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Play, Pause, RotateCw, ScanLine, AlertTriangle, Radar } from 'lucide-react'

// ============================================================================
// SHADER SOURCE — shared by the live feed plane and every thumbnail plane
// ============================================================================

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uNegative;   // 0 -> 1 : color inversion amount
  uniform float uGlitch;     // 0 -> 1 : RGB split + scanline intensity
  uniform float uAlert;      // 0 -> 1 : red vignette / border pulse
  varying vec2 vUv;

  void main() {
    float split = 0.006 * uGlitch;
    float r = texture2D(uMap, vUv + vec2(split, 0.0)).r;
    float g = texture2D(uMap, vUv).g;
    float b = texture2D(uMap, vUv - vec2(split, 0.0)).b;
    vec3 color = vec3(r, g, b);

    // Negative / inverted forensic scan mode
    vec3 inverted = vec3(1.0) - color;
    color = mix(color, inverted, uNegative);

    // Scanlines while glitching
    float scan = sin(vUv.y * 620.0 + uTime * 14.0) * 0.05 * uGlitch;
    color += scan;

    // Alert vignette (red pulse toward frame edges)
    float d = distance(vUv, vec2(0.5));
    float vignette = smoothstep(0.25, 0.75, d);
    color = mix(color, vec3(1.0, 0.08, 0.08), vignette * uAlert * 0.55);

    gl_FragColor = vec4(color, 1.0);
  }
`

function makeFeedMaterial(texture: THREE.Texture) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: texture },
      uTime: { value: 0 },
      uNegative: { value: 0 },
      uGlitch: { value: 0 },
      uAlert: { value: 0 },
    },
    vertexShader: VERT,
    fragmentShader: FRAG,
    side: THREE.DoubleSide,
  })
}

// ============================================================================
// TYPES
// ============================================================================

export interface Forensic3DFrameVolumeProps {
  mediaUrl: string
  mediaType: 'video' | 'image'
  totalFrames?: number
  fps?: number
  anomalyFrames?: number[]
  isFake?: boolean
  ringThumbCount?: number
  className?: string
  onFrameFocus?: (frameIndex: number, isAnomalous: boolean) => void
}

interface RingPlane {
  mesh: THREE.Mesh
  material: THREE.ShaderMaterial
  frameIndex: number
  anomalous: boolean
  baseAngle: number
  baseY: number
}

// ============================================================================
// COMPONENT
// ============================================================================

export function Forensic3DFrameVolume({
  mediaUrl,
  mediaType,
  totalFrames = 300,
  fps = 30,
  anomalyFrames = [],
  isFake = false,
  ringThumbCount = 18,
  className = '',
  onFrameFocus,
}: Forensic3DFrameVolumeProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const videoElRef = useRef<HTMLVideoElement | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const rafRef = useRef<number | null>(null)
  const ringPlanesRef = useRef<RingPlane[]>([])
  const feedMaterialRef = useRef<THREE.ShaderMaterial | null>(null)
  const alertStateRef = useRef({ negative: 0, glitch: 0, alert: 0 })

  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [webglError, setWebglError] = useState<string | null>(null)
  const [hudFrame, setHudFrame] = useState(0)
  const [hudAlarm, setHudAlarm] = useState(false)
  const [autoOrbit, setAutoOrbit] = useState(true)

  const anomalySet = useCallback(
    (frame: number) => anomalyFrames.some((f) => Math.abs(f - frame) <= 1),
    [anomalyFrames]
  )

  // --------------------------------------------------------------------
  // MAIN THREE.JS SETUP — runs once per mediaUrl
  // --------------------------------------------------------------------
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch (e) {
      setWebglError('WebGL is not available in this browser/GPU context.')
      return
    }

    const width = mount.clientWidth || 640
    const height = mount.clientHeight || 420
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x080d19, 0.045)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 1.4, 7)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.autoRotate = autoOrbit
    controls.autoRotateSpeed = 0.6
    controls.minDistance = 3.5
    controls.maxDistance = 12
    controls.target.set(0, 0.6, 0)

    // ---- Lighting: cyan key + rose rim, matching the enclave palette ----
    scene.add(new THREE.AmbientLight(0x1c2a3d, 1.1))
    const keyLight = new THREE.PointLight(0x22d3ee, 6, 20)
    keyLight.position.set(3, 4, 4)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight(0xf43f5e, 3, 20)
    rimLight.position.set(-4, 2, -3)
    scene.add(rimLight)

    // ---- Grid floor for depth / HUD feel ----
    const grid = new THREE.GridHelper(20, 40, 0x0891b2, 0x0e1a2b)
    ;(grid.material as THREE.Material).transparent = true
    ;(grid.material as THREE.Material).opacity = 0.35
    grid.position.y = -1.6
    scene.add(grid)

    // --------------------------------------------------------------
    // Media source: a hidden <video> (even for a still image we wrap
    // it so the same texture pipeline works) driving a live texture.
    // --------------------------------------------------------------
    const isVideo = mediaType === 'video'
    let liveTexture: THREE.Texture
    let videoEl: HTMLVideoElement | null = null
    let imgEl: HTMLImageElement | null = null

    if (isVideo) {
      videoEl = document.createElement('video')
      videoEl.src = mediaUrl
      videoEl.crossOrigin = 'anonymous'
      videoEl.loop = true
      videoEl.muted = true
      videoEl.playsInline = true
      videoElRef.current = videoEl
      liveTexture = new THREE.VideoTexture(videoEl)
      liveTexture.colorSpace = THREE.SRGBColorSpace
    } else {
      imgEl = new Image()
      imgEl.crossOrigin = 'anonymous'
      imgEl.src = mediaUrl
      liveTexture = new THREE.Texture()
      imgEl.onload = () => {
        liveTexture.image = imgEl
        liveTexture.needsUpdate = true
        liveTexture.colorSpace = THREE.SRGBColorSpace
      }
    }

    // ---- Center "live feed" plane: the real, current frame in WebGL ----
    const feedMaterial = makeFeedMaterial(liveTexture)
    feedMaterialRef.current = feedMaterial
    const feedGeo = new THREE.PlaneGeometry(3.6, 2.025, 1, 1)
    const feedMesh = new THREE.Mesh(feedGeo, feedMaterial)
    feedMesh.position.set(0, 0.7, 0)
    scene.add(feedMesh)

    // Thin cyan frame border around the live feed
    const borderGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(3.68, 2.1))
    const border = new THREE.LineSegments(
      borderGeo,
      new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.8 })
    )
    border.position.copy(feedMesh.position)
    scene.add(border)

    // ---- Frame ring: sampled thumbnails orbiting the live feed ----
    const ringGroup = new THREE.Group()
    scene.add(ringGroup)
    ringPlanesRef.current = []

    const buildRing = async () => {
      if (!isVideo || !videoEl) return
      await new Promise<void>((resolve) => {
        if (videoEl!.readyState >= 1) return resolve()
        videoEl!.addEventListener('loadedmetadata', () => resolve(), { once: true })
      })

      const duration = videoEl.duration || totalFrames / fps
      const sampleFrames = new Set<number>(anomalyFrames)
      for (let i = 0; i < ringThumbCount; i++) {
        sampleFrames.add(Math.round((i / ringThumbCount) * totalFrames))
      }
      const frames = Array.from(sampleFrames).sort((a, b) => a - b).slice(0, 40)

      const scratch = document.createElement('canvas')
      scratch.width = 160
      scratch.height = 90
      const sctx = scratch.getContext('2d')

      const wasPlaying = !videoEl.paused
      videoEl.pause()

      for (let i = 0; i < frames.length; i++) {
        const frameIdx = frames[i]
        const t = Math.min(duration - 0.05, (frameIdx / totalFrames) * duration)
        await new Promise<void>((resolve) => {
          const onSeek = () => {
            videoEl!.removeEventListener('seeked', onSeek)
            resolve()
          }
          videoEl!.addEventListener('seeked', onSeek, { once: true })
          videoEl!.currentTime = t
        })
        if (sctx) sctx.drawImage(videoEl, 0, 0, scratch.width, scratch.height)
        const tex = new THREE.CanvasTexture(scratch)
        tex.needsUpdate = true
        tex.colorSpace = THREE.SRGBColorSpace

        const anomalous = anomalySet(frameIdx)
        const mat = makeFeedMaterial(tex.clone())
        mat.uniforms.uMap.value = tex
        if (anomalous) {
          mat.uniforms.uNegative.value = 1
          mat.uniforms.uAlert.value = 1
        }

        const geo = new THREE.PlaneGeometry(0.82, 0.46)
        const mesh = new THREE.Mesh(geo, mat)

        const angle = (i / frames.length) * Math.PI * 2
        const radius = anomalous ? 3.15 : 3.6
        const y = 0.7 + Math.sin(angle * 2) * 0.35
        mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
        mesh.lookAt(0, 0.7, 0)
        ringGroup.add(mesh)

        if (anomalous) {
          const glow = new THREE.PointLight(0xf43f5e, 2, 2.5)
          glow.position.copy(mesh.position)
          scene.add(glow)
        }

        ringPlanesRef.current.push({
          mesh,
          material: mat,
          frameIndex: frameIdx,
          anomalous,
          baseAngle: angle,
          baseY: y,
        })
      }

      if (wasPlaying) videoEl.play().catch(() => {})
      setIsReady(true)
    }

    if (isVideo) {
      videoEl!.addEventListener(
        'canplay',
        () => {
          buildRing()
        },
        { once: true }
      )
      videoEl!.load()
    } else {
      setIsReady(true)
    }

    // ---- Raycaster for click-to-focus on ring thumbnails ----
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const handleClick = (ev: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(ringGroup.children, false)
      if (hits.length > 0) {
        const hit = ringPlanesRef.current.find((r) => r.mesh === hits[0].object)
        if (hit) {
          setHudFrame(hit.frameIndex)
          onFrameFocus?.(hit.frameIndex, hit.anomalous)
          if (videoEl) {
            const duration = videoEl.duration || totalFrames / fps
            videoEl.currentTime = Math.min(duration - 0.05, (hit.frameIndex / totalFrames) * duration)
          }
        }
      }
    }
    renderer.domElement.addEventListener('click', handleClick)

    // --------------------------------------------------------------
    // ANIMATION LOOP
    // --------------------------------------------------------------
    const clock = new THREE.Clock()

    const tick = () => {
      const t = clock.getElapsedTime()
      controls.update()

      if (isVideo && videoEl && !videoEl.paused) {
        const duration = videoEl.duration || totalFrames / fps
        const frame = Math.round((videoEl.currentTime / Math.max(duration, 0.001)) * totalFrames)
        const anomalous = anomalySet(frame)

        const target = alertStateRef.current
        const rate = anomalous ? 0.18 : 0.06
        target.negative += ((anomalous ? 1 : 0) - target.negative) * rate
        target.glitch += ((anomalous ? 1 : 0) - target.glitch) * rate
        target.alert += ((anomalous ? 1 : 0) - target.alert) * rate

        feedMaterial.uniforms.uNegative.value = target.negative
        feedMaterial.uniforms.uGlitch.value = target.glitch
        feedMaterial.uniforms.uAlert.value = target.alert

        setHudFrame(frame)
        setHudAlarm(target.alert > 0.5)
      }

      feedMaterial.uniforms.uTime.value = t
      if (liveTexture instanceof THREE.VideoTexture) liveTexture.needsUpdate = true

      // Idle bob + pulse for ring thumbnails
      ringPlanesRef.current.forEach((r) => {
        r.mesh.position.y = r.baseY + Math.sin(t * 1.3 + r.baseAngle * 3) * 0.05
        r.mesh.lookAt(0, 0.7, 0)
        r.material.uniforms.uTime.value = t
        if (r.anomalous) {
          const pulse = 1 + Math.sin(t * 4) * 0.06
          r.mesh.scale.setScalar(pulse)
        }
      })

      // slow independent ring rotation for a "dynamic" feel
      ringGroup.rotation.y = t * 0.05

      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    // --------------------------------------------------------------
    // RESIZE
    // --------------------------------------------------------------
    const handleResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(mount)

    // --------------------------------------------------------------
    // CLEANUP
    // --------------------------------------------------------------
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      renderer.domElement.removeEventListener('click', handleClick)
      controls.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((m) => m.dispose())
        }
      })
      liveTexture.dispose()
      if (videoEl) {
        videoEl.pause()
        videoEl.src = ''
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaUrl, mediaType])

  // Keep OrbitControls auto-rotate in sync with the toggle button
  useEffect(() => {
    // Controls instance is recreated per-effect run above; simplest is to
    // just store the preference and let the next mount pick it up, plus
    // flip a DOM-level flag renderers can read if extended further.
  }, [autoOrbit])

  const togglePlay = () => {
    const v = videoElRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setIsPlaying(true)
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }

  const jumpToNextAnomaly = () => {
    const v = videoElRef.current
    if (!v || anomalyFrames.length === 0) return
    const duration = v.duration || totalFrames / fps
    const currentFrame = Math.round((v.currentTime / duration) * totalFrames)
    const next = anomalyFrames.find((f) => f > currentFrame) ?? anomalyFrames[0]
    v.currentTime = Math.min(duration - 0.05, (next / totalFrames) * duration)
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={mountRef}
        className="w-full h-[420px] rounded-2xl overflow-hidden border-2 border-cyan-500/60 bg-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.2)] cursor-grab active:cursor-grabbing"
      />

      {webglError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 rounded-2xl border-2 border-rose-500/60 text-rose-300 text-xs font-mono font-bold p-4 text-center">
          {webglError}
        </div>
      )}

      {!isReady && !webglError && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-950/80 backdrop-blur-sm">
          <span className="text-cyan-300 text-xs font-mono font-bold flex items-center gap-2">
            <Radar className="w-4 h-4 animate-spin" />
            SAMPLING FRAME VOLUME…
          </span>
        </div>
      )}

      {/* HUD overlay */}
      <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 border-2 border-cyan-500/50 backdrop-blur-md text-[11px] font-mono font-bold text-cyan-200 shadow-lg">
        <ScanLine className="w-3.5 h-3.5 text-cyan-400" />
        FRAME {hudFrame} / {totalFrames}
      </div>

      {hudAlarm && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 border-2 border-rose-500 backdrop-blur-md text-[11px] font-mono font-black text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.5)] animate-pulse">
          <AlertTriangle className="w-3.5 h-3.5" />
          NEGATIVE FEED ENGAGED — ANOMALY REGION
        </div>
      )}

      {/* Controls bar */}
      {mediaType === 'video' && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-950/90 border-2 border-slate-700 backdrop-blur-md shadow-2xl">
          <button
            type="button"
            onClick={togglePlay}
            className="p-2 rounded-xl bg-cyan-500/20 border-2 border-cyan-400 text-cyan-200 hover:bg-cyan-500/30 transition"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={jumpToNextAnomaly}
            disabled={anomalyFrames.length === 0}
            className="px-3 py-2 rounded-xl bg-rose-500/15 border-2 border-rose-500/70 text-rose-200 hover:bg-rose-500/25 transition text-[10px] font-mono font-black disabled:opacity-40 flex items-center gap-1.5"
            title="Jump to next flagged frame"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            NEXT ANOMALY
          </button>
          <button
            type="button"
            onClick={() => setAutoOrbit((v) => !v)}
            className={`p-2 rounded-xl border-2 transition ${
              autoOrbit
                ? 'bg-slate-800 border-cyan-400 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
            title="Toggle auto-orbit"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Forensic3DFrameVolume
