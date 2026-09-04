/* =============================================================
   AETHER — AetherCoreController
   Shared mutable state object used to drive 3D scene parameters
   via GSAP ScrollTrigger without triggering React re-renders.
   ============================================================= */

/**
 * Creates the initial scroll animation state object.
 * Passed to GSAP timelines for scrubbing and read inside R3F useFrame loops.
 */
export function createScrollState() {
  return {
    progress:          0.0,  // Overall scroll progress (0.0 to 1.0)
    coreScale:         1.0,  // Scale expansion multiplier
    ringExpansion:     1.0,  // Orbital ring radius expansion factor
    rotationSpeed:     1.0,  // Rotational velocity multiplier
    emissiveIntensity: 0.25, // Inner core emissive glow brightness
    cameraZ:           8.5,  // Camera position along Z-axis
    dustDispersion:    1.0,  // Ambient dust particle spread factor

    // ── Phase 4B: Core → Information Field ────────────────────
    dissolution:      0.0,   // 0→1: overall deconstruction progress
    shellOpacity:     0.75,  // Outer sphere transparency (matches initial material value)
    ringTilt:         0.0,   // 0→1: ring axis drift (Instability state)
    fragmentProgress: 0.0,   // 0→1: surface-fragment ejection amount
  }
}
