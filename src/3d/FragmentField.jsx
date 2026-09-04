/* =============================================================
   AETHER - FragmentField
   Controlled surface-fragment detachment component.

   Renders 30-80 micro-tetrahedra (flat-shaded) that appear to
   detach from the Core surface and drift outward in slow, radial
   arcs as fragmentProgress (0->1) rises.

   Architecture:
   - InstancedMesh: 1 draw call regardless of fragment count.
   - Golden-spiral positioning: deterministic, no Math.random.
   - useMemo: rest + drift positions computed once on mount.
   - useFrame: lerps instance matrices + material opacity per frame.
   - No React state, no new dependencies.

   Visual language: silver/charcoal flat chips -- no emissive, no neon.
   ============================================================= */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// -- Module-level scratch objects (avoid per-frame allocation) --
const _matrix   = new THREE.Matrix4()
const _position = new THREE.Vector3()
const _scaleVec = new THREE.Vector3()

// Core outer shell radius -- fragments originate here
const CORE_RADIUS = 1.35

// Golden angle for Fibonacci-sphere distribution (deterministic)
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

export default function FragmentField({
  isMobile        = false,
  isReducedMotion = false,
  scrollStateRef,
}) {
  const meshRef = useRef(null)

  // 30 fragments on mobile (1 draw call either way); 80 on desktop
  const count = isMobile ? 30 : 80

  // -- Pre-compute rest & drift positions, quaternions, chip sizes --
  // All deterministic (Fibonacci sphere + modular arithmetic).
  // Runs once on mount; dep array is [count].
  const { restPositions, driftPositions, quaternions, chipSizes } = useMemo(() => {
    const rest  = []
    const drift = []
    const quats = []
    const sizes = []

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere: evenly distributes points on a sphere
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / count) // inclination
      const theta = GOLDEN_ANGLE * i                         // azimuth

      const x = CORE_RADIUS * Math.sin(phi) * Math.cos(theta)
      const y = CORE_RADIUS * Math.sin(phi) * Math.sin(theta)
      const z = CORE_RADIUS * Math.cos(phi)

      rest.push(new THREE.Vector3(x, y, z))

      // Drift direction: outward along surface normal + tangential curl
      const normal = new THREE.Vector3(x, y, z).normalize()

      // Build a stable tangent (avoid degenerate cross products)
      const up     = Math.abs(normal.y) < 0.9 ? new THREE.Vector3(0, 1, 0)
                                               : new THREE.Vector3(1, 0, 0)
      const tangent = new THREE.Vector3()
        .crossVectors(normal, up)
        .normalize()

      // Index-based variation -- deterministic, no Math.random
      const radial     = 0.8 + ((i * 7 + 3) % 19) / 19 * 0.9    // 0.80 - 1.70
      const tangential = (((i * 13 + 7) % 11) / 11 - 0.5) * 0.28 // +-0.14

      const driftPos = new THREE.Vector3()
        .copy(new THREE.Vector3(x, y, z))
        .addScaledVector(normal,  radial)
        .addScaledVector(tangent, tangential)

      drift.push(driftPos)

      // Per-fragment rotation: deterministic euler angles
      const euler = new THREE.Euler(
        ((i * 5)  % 13) / 13 * Math.PI * 2,
        ((i * 7)  % 11) / 11 * Math.PI * 2,
        ((i * 11) % 17) / 17 * Math.PI * 2
      )
      quats.push(new THREE.Quaternion().setFromEuler(euler))

      // Chip radius: 0.040 - 0.060 (applied as instance scale)
      sizes.push(0.040 + ((i * 3) % 7) / 7 * 0.020)
    }

    return {
      restPositions:  rest,
      driftPositions: drift,
      quaternions:    quats,
      chipSizes:      sizes,
    }
  }, [count])

  useFrame(() => {
    if (!meshRef.current || !scrollStateRef?.current) return

    const fp = scrollStateRef.current.fragmentProgress ?? 0

    // Material opacity: fragments appear progressively
    meshRef.current.material.opacity = Math.max(0, Math.min(1, fp * 0.75))

    // Early exit when fragments are invisible (saves matrix loop)
    if (fp <= 0.001) return

    for (let i = 0; i < count; i++) {
      // Lerp each fragment from rest (on Core surface) to drift position
      _position.lerpVectors(restPositions[i], driftPositions[i], fp)

      // Scale: 0 at fp=0, full chipSize at fp=1
      const s = fp * chipSizes[i]
      _scaleVec.set(s, s, s)

      _matrix.compose(_position, quaternions[i], _scaleVec)
      meshRef.current.setMatrixAt(i, _matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  // Reduced motion: fragment field is purely decorative -- omit entirely
  if (isReducedMotion) return null

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, count]}
      frustumCulled={false}
    >
      {/*
        Tetrahedron (detail=0): flat-faced, minimal vertex count.
        Actual display size is controlled by matrix scale (0.04-0.06 units).
      */}
      <tetrahedronGeometry args={[1, 0]} />

      {/*
        Metallic silver-charcoal chips.
        No emissive -- fragments are physically opaque, not glowing.
        depthWrite false: blends correctly with transparent sphere shell.
      */}
      <meshStandardMaterial
        color="#c8d4e8"
        metalness={0.75}
        roughness={0.25}
        flatShading={true}
        transparent={true}
        opacity={0}
        depthWrite={false}
      />
    </instancedMesh>
  )
}
