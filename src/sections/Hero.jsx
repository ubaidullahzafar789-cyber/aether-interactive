/* =============================================================
   AETHER — Hero Section
   Full-viewport hero with the AETHER wordmark, subtitle,
   and the interactive 3D Aether Core (R3F) background scene.
   Pinned 4-state scroll sequence driven by GSAP ScrollTrigger.
   ============================================================= */

import { useRef } from 'react'
import AetherCore from '../3d/AetherCore'
import { createScrollState } from '../3d/AetherCoreController'
import { useGSAP } from '../hooks/useGSAP'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)

  // Mutable 3D scroll state object — updated by GSAP without triggering React re-renders
  const scrollStateRef = useRef(createScrollState())

  useGSAP((gsap, element) => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const isMobile = window.innerWidth <= 768
    const targetCameraZEnd = isMobile ? 6.4 : 5.2
    const targetRingExpansionEnd = isMobile ? 1.6 : 2.2

    // Master ScrollTrigger timeline pinned over 220% viewport distance (~250vh total scroll)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top top',
        end: '+=220%',
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
      },
    })

    const state = scrollStateRef.current

    // ── STATE 1 -> 2: AWAKEN (0% - 30%) ──
    tl.to(
      '.hero__eyebrow, .hero__scroll',
      { opacity: 0, y: -16, duration: 0.25, ease: 'power2.out' },
      0
    )
      .to(
        state,
        {
          rotationSpeed: 1.8,
          emissiveIntensity: 0.45,
          cameraZ: 7.6,
          coreScale: 1.18,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0
      )

    // ── STATE 2 -> 3: ORBITAL EXPANSION (30% - 70%) ──
      .to(
        '.hero__descriptor',
        { opacity: 0, y: 24, duration: 0.3, ease: 'power2.out' },
        0.25
      )
      .to(
        '.hero__subtitle',
        { opacity: 0.35, y: 12, duration: 0.35, ease: 'power2.out' },
        0.35
      )
      .to(
        state,
        {
          ringExpansion: targetRingExpansionEnd * 0.8,
          rotationSpeed: 2.6,
          dustDispersion: 1.6,
          coreScale: 1.38,
          emissiveIntensity: 0.62,
          cameraZ: 6.4,
          duration: 0.4,
          ease: 'power1.inOut',
        },
        0.3
      )

    // ── STATE 3 -> 4: APPROACH (70% - 100%) ──
      .to(
        '.hero__wordmark',
        { opacity: 0.15, scale: 0.9, duration: 0.35, ease: 'power2.out' },
        0.65
      )
      .to(
        '.hero__subtitle',
        { opacity: 0.1, duration: 0.25, ease: 'power2.out' },
        0.75
      )
      .to(
        state,
        {
          cameraZ: targetCameraZEnd,
          rotationSpeed: 3.2,
          coreScale: 1.52,
          ringExpansion: targetRingExpansionEnd,
          emissiveIntensity: 0.75,
          dustDispersion: 2.0,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.65
      )

    // Refresh ScrollTrigger so Lenis updates total scrollable height with pin spacer
    setTimeout(() => {
      gsap.ScrollTrigger?.refresh()
    }, 100)
  }, [])

  return (
    <section ref={heroRef} id="hero" className="hero" aria-label="AETHER — Hero">

      {/* ── Interactive 3D Aether Core Scene (R3F) ── */}
      <AetherCore scrollStateRef={scrollStateRef} />

      {/* ── Content ── */}
      <div className="hero__content">

        {/* Eyebrow */}
        <div className="hero__eyebrow" aria-hidden="true">
          <span className="hero__eyebrow-rule" />
          <span className="hero__eyebrow-label">SYSTEM ONLINE</span>
          <span className="hero__eyebrow-rule" />
        </div>

        {/* Primary heading */}
        <h1 className="hero__heading">
          <span className="hero__wordmark">AETHER</span>
          <span className="hero__subtitle">
            INTELLIGENCE
            <br />
            BEYOND THE VISIBLE
          </span>
        </h1>

        {/* Supporting descriptor */}
        <p className="hero__descriptor">
          A new class of machine intelligence.
          <br />
          Not seen. Felt.
        </p>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero__scroll" aria-label="Scroll to explore">
        <div className="hero__scroll-line" aria-hidden="true" />
        <span className="hero__scroll-label">SCROLL</span>
      </div>

    </section>
  )
}
