/* =============================================================
   AETHER — AetherCore (Main 3D Scene Wrapper)
   React Three Fiber Canvas hosting:
   - CoreGeometry (central abstract intelligence core)
   - OrbitalRings (concentric structural orbits)
   - DustField (microscopic ambient dust particles)
   - SceneLighting & Atmosphere
   Accepts scrollStateRef to drive camera approach & 3D parameters.
   ============================================================= */

import { useState, useEffect, Component, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import SceneLighting from './SceneLighting'
import CoreGeometry from './CoreGeometry'
import OrbitalRings from './OrbitalRings'
import DustField from './DustField'
import './AetherCore.css'

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.warn('AetherCore WebGL Error:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

function SceneContent({ isMobile, isTablet, isReducedMotion, scrollStateRef }) {
  // Responsive scene scale matching refined typography proportions
  const scale = useMemo(() => {
    if (isMobile) return 0.62
    if (isTablet) return 0.88
    return 1.12
  }, [isMobile, isTablet])

  // Scrubbed scroll-driven camera Z-approach.
  // Lerp factor 0.065: low enough to feel physical and cinematic,
  // high enough to stay tightly in sync with GSAP scrub.
  // Reduced-motion: snap camera to rest without lerp trail.
  useFrame((state) => {
    if (!scrollStateRef?.current) return
    const targetZ = scrollStateRef.current.cameraZ ?? 8.5
    const lerpFactor = isReducedMotion ? 1.0 : 0.065
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      lerpFactor
    )
  })

  return (
    <group position={[0, 0, 0]} scale={scale}>
      <SceneLighting />
      <CoreGeometry isMobile={isMobile} isReducedMotion={isReducedMotion} scrollStateRef={scrollStateRef} />
      <OrbitalRings isMobile={isMobile} isReducedMotion={isReducedMotion} scrollStateRef={scrollStateRef} />
      <DustField isMobile={isMobile} isReducedMotion={isReducedMotion} scrollStateRef={scrollStateRef} />
    </group>
  )
}

export default function AetherCore({ scrollStateRef }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Window resize listener
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize, { passive: true })

    // Reduced motion media query listener
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleMotionChange = (e) => setIsReducedMotion(e.matches)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange)
      }
    }
  }, [])

  const isMobile = windowWidth <= 768
  const isTablet = windowWidth > 768 && windowWidth <= 1024

  return (
    <div className="aether-core-canvas-container" aria-hidden="true">
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          <Suspense fallback={null}>
            <SceneContent
              isMobile={isMobile}
              isTablet={isTablet}
              isReducedMotion={isReducedMotion}
              scrollStateRef={scrollStateRef}
            />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}
