/* =============================================================
   AETHER — CoreGeometry
   Central abstract intelligence core:
   - Outer shell: Translucent, reflective, dark metallic sphere
   - Inner core: Faceted Icosahedron lattice with cool emissive glow
   Responds to scrollStateRef for scroll-driven animations.

   Phase 4B additions:
   - shellOpacity drives outer sphere transparency (0.75 → 0.08 ghost)
   - dissolution fades the inner icosahedron (1.0 → 0.08)
   - wireframe lattice opacity inverts: more visible as shell dissolves
   ============================================================= */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function CoreGeometry({ isMobile = false, isReducedMotion = false, scrollStateRef }) {
  const groupRef       = useRef(null)
  const outerMeshRef   = useRef(null)
  const innerMeshRef   = useRef(null)
  const wireframeRef   = useRef(null)   // Phase 4B: lattice exposure

  // Subdivisions based on mobile state for performance optimization
  const sphereDetail = isMobile ? 32 : 64
  const icosaDetail = isMobile ? 1 : 2

  useFrame((state) => {
    if (!groupRef.current) return

    const scrollState = scrollStateRef?.current || {
      coreScale:         1.0,
      rotationSpeed:     1.0,
      emissiveIntensity: 0.25,
      dissolution:       0.0,
      shellOpacity:      0.75,
    }

    if (!isReducedMotion) {
      const time      = state.clock.getElapsedTime()
      const speedMult = scrollState.rotationSpeed || 1.0

      // Continuous dual rotation accelerated by scroll
      if (outerMeshRef.current) {
        outerMeshRef.current.rotation.y += 0.003 * speedMult
        outerMeshRef.current.rotation.x = Math.sin(time * 0.05) * 0.1
      }

      if (innerMeshRef.current) {
        innerMeshRef.current.rotation.y -= 0.005 * speedMult
        innerMeshRef.current.rotation.z += 0.002 * speedMult
      }

      // Floating motion & scale expansion driven by scroll
      const floatOffset = Math.sin(time * 0.8) * 0.08
      groupRef.current.position.y = floatOffset
    }

    // Scroll-driven scale expansion
    const currentScale = scrollState.coreScale || 1.0
    groupRef.current.scale.setScalar(currentScale)

    // Scroll-driven emissive awakening
    if (innerMeshRef.current?.material) {
      innerMeshRef.current.material.emissiveIntensity =
        scrollState.emissiveIntensity ?? 0.25
    }

    // ── Phase 4B: Dissolution material mutations ──────────────
    const dissolution  = scrollState.dissolution  ?? 0.0
    const shellOpacity = scrollState.shellOpacity ?? 0.75

    // Outer shell: opacity controlled by scrollState.shellOpacity (0.75 → 0.08)
    if (outerMeshRef.current?.material) {
      outerMeshRef.current.material.opacity = shellOpacity
    }

    // Wireframe lattice: inversely exposes as shell dissolves (0.08 → 0.26)
    // The structural skeleton becomes visible as the surface thins.
    if (wireframeRef.current?.material) {
      wireframeRef.current.material.opacity = 0.08 + dissolution * 0.18
    }

    // Inner icosahedron: fades toward 8% ghost as dissolution peaks
    if (innerMeshRef.current?.material) {
      innerMeshRef.current.material.opacity = 1.0 - dissolution * 0.92
    }
  })

  return (
    <group ref={groupRef}>
      {/* ── Outer Shell ── */}
      <mesh ref={outerMeshRef}>
        <sphereGeometry args={[1.35, sphereDetail, sphereDetail]} />
        <meshPhysicalMaterial
          color="#0d111c"
          roughness={0.18}
          metalness={0.85}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          reflectivity={0.9}
          transmission={0.25}
          ior={1.4}
          transparent={true}
          opacity={0.75}
          wireframe={false}
        />
      </mesh>

      {/* ── Outer Subtle Wireframe Lattice Overlay ── */}
      {/* Phase 4B: ref added so useFrame can raise opacity during dissolution */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.38, icosaDetail + 1]} />
        <meshStandardMaterial
          color="#8ca5d7"
          wireframe={true}
          transparent={true}
          opacity={0.08}
        />
      </mesh>

      {/* ── Inner Faceted Luminous Core ── */}
      {/* Phase 4B: transparent+opacity added so dissolution can fade it to 8% */}
      <mesh ref={innerMeshRef}>
        <icosahedronGeometry args={[0.85, icosaDetail]} />
        <meshStandardMaterial
          color="#161f33"
          emissive="#5c7bb5"
          emissiveIntensity={0.25}
          roughness={0.3}
          metalness={0.7}
          flatShading={true}
          transparent={true}
          opacity={1.0}
          depthWrite={false}
        />
      </mesh>

      {/* ── Core Center Glow Dot ── */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#b8c8e8"
          transparent={true}
          opacity={0.35}
        />
      </mesh>
    </group>
  )
}
