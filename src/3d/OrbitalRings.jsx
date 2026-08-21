/* =============================================================
   AETHER — OrbitalRings
   Concentric structural orbits revolving around the central core.
   Responds to scroll-driven expansion and rotation acceleration.
   ============================================================= */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function OrbitalRings({ isMobile = false, isReducedMotion = false, scrollStateRef }) {
  const groupRef = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)
  const ring3Ref = useRef(null)
  const ring4Ref = useRef(null)

  useFrame((state) => {
    if (!groupRef.current) return

    const scrollState = scrollStateRef?.current || {
      ringExpansion: 1.0,
      rotationSpeed: 1.0,
    }

    const speedMult = scrollState.rotationSpeed || 1.0
    const expansion = scrollState.ringExpansion || 1.0

    if (!isReducedMotion) {
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x += 0.002 * speedMult
        ring1Ref.current.rotation.y += 0.003 * speedMult
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.y -= 0.0025 * speedMult
        ring2Ref.current.rotation.z += 0.002 * speedMult
      }
      if (ring3Ref.current) {
        ring3Ref.current.rotation.x -= 0.0018 * speedMult
        ring3Ref.current.rotation.z -= 0.003 * speedMult
      }
      if (ring4Ref.current && !isMobile) {
        ring4Ref.current.rotation.y += 0.0035 * speedMult
        ring4Ref.current.rotation.x += 0.0015 * speedMult
      }
    }

    // Expand orbital ring radii based on scroll progress
    if (ring1Ref.current) ring1Ref.current.scale.setScalar(1 + (expansion - 1) * 0.4)
    if (ring2Ref.current) ring2Ref.current.scale.setScalar(1 + (expansion - 1) * 0.75)
    if (ring3Ref.current) ring3Ref.current.scale.setScalar(1 + (expansion - 1) * 1.1)
    if (ring4Ref.current) ring4Ref.current.scale.setScalar(1 + (expansion - 1) * 1.45)
  })

  // Torus segments scale down for mobile
  const radialSegments = isMobile ? 12 : 24
  const tubularSegments = isMobile ? 48 : 96

  return (
    <group ref={groupRef}>
      {/* ── Inner Ring 1 ── */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[1.85, 0.008, radialSegments, tubularSegments]} />
        <meshStandardMaterial
          color="#a4b6db"
          roughness={0.2}
          metalness={0.9}
          emissive="#728dbf"
          emissiveIntensity={0.15}
          transparent={true}
          opacity={0.75}
        />
      </mesh>

      {/* ── Middle Ring 2 ── */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, 0, Math.PI / 5]}>
        <torusGeometry args={[2.45, 0.01, radialSegments, tubularSegments]} />
        <meshStandardMaterial
          color="#697a9e"
          roughness={0.3}
          metalness={0.8}
          transparent={true}
          opacity={0.55}
        />
      </mesh>

      {/* ── Outer Ring 3 ── */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 4, Math.PI / 3]}>
        <torusGeometry args={[3.15, 0.007, radialSegments, tubularSegments]} />
        <meshStandardMaterial
          color="#42506d"
          roughness={0.4}
          metalness={0.7}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* ── Desktop Ring 4 (Omitted on Mobile) ── */}
      {!isMobile && (
        <mesh ref={ring4Ref} rotation={[0, Math.PI / 3, -Math.PI / 6]}>
          <torusGeometry args={[3.8, 0.006, radialSegments, tubularSegments]} />
          <meshStandardMaterial
            color="#28354c"
            roughness={0.5}
            metalness={0.6}
            transparent={true}
            opacity={0.25}
          />
        </mesh>
      )}
    </group>
  )
}
