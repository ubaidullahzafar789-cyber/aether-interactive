/* =============================================================
   AETHER — DustField
   Subtle microscopic ambient information particles around the core.
   Responds to scroll-driven dispersion and drift.
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
      const radius = 2.0 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
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
      rotationSpeed: 1.0,
    }

    const speedMult = scrollState.rotationSpeed || 1.0
    const dispersion = scrollState.dustDispersion || 1.0

    if (!isReducedMotion) {
      pointsRef.current.rotation.y += 0.0006 * speedMult
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }

    // Scroll-driven particle field dispersion
    pointsRef.current.scale.setScalar(dispersion)
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
