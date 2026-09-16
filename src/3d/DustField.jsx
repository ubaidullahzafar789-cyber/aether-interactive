/* =============================================================
   AETHER — DustField
   Subtle microscopic ambient information particles around the core.
   Responds to scroll-driven dispersion and drift.

   Phase 4B: At high dissolution values the field transitions
   into a denser information field — particles become smaller,
   brighter, and condense inward slightly.
   ============================================================= */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function DustField({ isMobile = false, isReducedMotion = false, scrollStateRef }) {
  const pointsRef = useRef(null)

  const count = isMobile ? 120 : 350

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const radius = 2.0 + Math.random() * 4.5
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * Math.PI * 2
      // eslint-disable-next-line react-hooks/purity
      const phi = Math.acos(Math.random() * 2 - 1)

      pos[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }

    return [pos]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return

    const scrollState = scrollStateRef?.current || {
      dustDispersion: 1.0,
      rotationSpeed:  1.0,
      dissolution:    0.0,
    }

    const speedMult  = scrollState.rotationSpeed  || 1.0
    const dispersion = scrollState.dustDispersion || 1.0
    const dissolution = scrollState.dissolution    ?? 0.0

    if (!isReducedMotion) {
      pointsRef.current.rotation.y += 0.0006 * speedMult
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }

    // ── Phase 4B: Information Field transition ──────────────
    // At high dissolution the ambient dust repurposes as a crisp
    // information field: tighter particles, higher opacity.
    // Particle size 0.032 → 0.018 (precise data points, not haze)
    pointsRef.current.material.size = 0.032 - dissolution * 0.014
    // Opacity 0.38 → 0.65 (field becomes more defined)
    pointsRef.current.material.opacity = 0.38 + dissolution * 0.27
    // Scale: dispersion drives spread; at dissolution=1 it contracts
    // slightly inward (2.0 → 1.6) so the field coalesces rather than scatters
    pointsRef.current.scale.setScalar(dispersion * (1 - dissolution * 0.2))
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        color="#b8c8e8"
        transparent={true}
        opacity={0.38}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  )
}
