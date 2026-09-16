/* =============================================================
   AETHER — SceneLighting
   Cinematic lighting and atmospheric fog setup for the Aether Core.
   ============================================================= */

import { useRef } from 'react'

export default function SceneLighting() {
  const pointLightRef = useRef(null)

  return (
    <>
      {/* Background depth fog matching system background (#080a12) */}
      <color attach="background" args={['#080a12']} />
      <fog attach="fog" args={['#080a12', 6, 18]} />

      {/* Ambient shadow/fill light */}
      <ambientLight color="#121826" intensity={1.2} />

      {/* Primary directional key light highlighting specular edges */}
      <directionalLight
        position={[8, 10, 6]}
        color="#e6e8f0"
        intensity={2.2}
      />

      {/* Secondary fill light from opposite angle */}
      <directionalLight
        position={[-6, -8, -4]}
        color="#3a4a68"
        intensity={0.8}
      />

      {/* Central point light inside core for soft emissive glow */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 0]}
        color="#b8c8e8"
        intensity={2.5}
        distance={8}
        decay={2}
      />
    </>
  )
}
