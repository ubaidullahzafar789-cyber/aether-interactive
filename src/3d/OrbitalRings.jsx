/* =============================================================
   AETHER — OrbitalRings
   Concentric structural orbits revolving around the central core.
   Responds to scroll-driven expansion and rotation acceleration.

   Phase 4B additions:
   - ringTilt: each ring drifts off-axis as Instability rises
   - dissolution: rings fade and dissolve into the information field
   ============================================================= */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function OrbitalRings({ isMobile = false, isReducedMotion = false, scrollStateRef }) {
  const groupRef = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)
  const ring3Ref = useRef(null)
  const ring4Ref = useRef(null)

  // —— Initial rotation values for each ring (mirrors JSX props below) ——
  // Used to apply ringTilt as a clean additive offset on the ring's
  // 'unused' axis (the one not continuously incremented).
  // Ring 1: increments x,y → tilt on z (initial z=0)
  // Ring 2: increments y,z → tilt on x (initial x=-PI/3)
  // Ring 3: increments x,z → tilt on y (initial y=-PI/4)
  // Ring 4: increments y,x → tilt on z (initial z=-PI/6)

  useFrame(() => {
    if (!groupRef.current) return

    const scrollState = scrollStateRef?.current || {
      ringExpansion: 1.0,
      rotationSpeed: 1.0,
      ringTilt:      0.0,
      dissolution:   0.0,
    }

    const speedMult  = scrollState.rotationSpeed || 1.0
    const expansion  = scrollState.ringExpansion  || 1.0
    const ringTilt   = scrollState.ringTilt       ?? 0.0
    const dissolution = scrollState.dissolution   ?? 0.0

    if (!isReducedMotion) {
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x += 0.002 * speedMult
        ring1Ref.current.rotation.y += 0.003 * speedMult
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.y -= 0.0025 * speedMult
        ring2Ref.current.rotation.z += 0.002  * speedMult
      }
      if (ring3Ref.current) {
        ring3Ref.current.rotation.x -= 0.0018 * speedMult
        ring3Ref.current.rotation.z -= 0.003  * speedMult
      }
      if (ring4Ref.current && !isMobile) {
        ring4Ref.current.rotation.y += 0.0035 * speedMult
        ring4Ref.current.rotation.x += 0.0015 * speedMult
      }
    }

    // ── Phase 4B: Ring axis drift (Instability) ───────────────
    // Apply tilt offset on each ring's unused rotation axis.
    // Outer rings drift more (higher multiplier = losing coherent orbit).
    // Reverse scroll reverses tilt cleanly (ringTilt → 0 = no offset).
    if (ring1Ref.current) ring1Ref.current.rotation.z  = ringTilt * 0.40
    if (ring2Ref.current) ring2Ref.current.rotation.x  = -Math.PI / 3 + ringTilt * 0.70
    if (ring3Ref.current) ring3Ref.current.rotation.y  = -Math.PI / 4 + ringTilt * 1.10
    if (ring4Ref.current && !isMobile) {
      ring4Ref.current.rotation.z = -Math.PI / 6 + ringTilt * 1.50
    }

    // Expand orbital ring radii based on scroll progress
    if (ring1Ref.current) ring1Ref.current.scale.setScalar(1 + (expansion - 1) * 0.40)
    if (ring2Ref.current) ring2Ref.current.scale.setScalar(1 + (expansion - 1) * 0.75)
    if (ring3Ref.current) ring3Ref.current.scale.setScalar(1 + (expansion - 1) * 1.10)
    if (ring4Ref.current) ring4Ref.current.scale.setScalar(1 + (expansion - 1) * 1.45)

    // ── Phase 4B: Ring dissolution fade ─────────────────────
    // Rings fade out when dissolution exceeds 0.7, dissolving into the
    // information field. Base opacity values match JSX material props.
    if (dissolution > 0) {
      const ringFade = Math.max(0, (dissolution - 0.7) / 0.3)  // 0 → 1
      if (ring1Ref.current?.material) ring1Ref.current.material.opacity = 0.75 * (1 - ringFade)
      if (ring2Ref.current?.material) ring2Ref.current.material.opacity = 0.55 * (1 - ringFade)
      if (ring3Ref.current?.material) ring3Ref.current.material.opacity = 0.35 * (1 - ringFade)
      if (ring4Ref.current?.material && !isMobile) {
        ring4Ref.current.material.opacity = 0.25 * (1 - ringFade)
      }
    }
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
