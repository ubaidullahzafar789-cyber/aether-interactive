/* =============================================================
   AETHER — Hero Section
   Full-viewport hero with the AETHER wordmark, subtitle,
   and the interactive 3D Aether Core (R3F) background scene.

   Cinematic 4-state scroll sequence driven by GSAP ScrollTrigger
   + Lenis smooth scroll (synchronized via GSAP ticker in useLenis).

   SCROLL STORY
   ─────────────────────────────────────────────────────────────
   STATE 1 — ARRIVAL      (pinned position; user hasn't scrolled)
   STATE 2 — AWAKENING    (0% → 35%)   Core wakes, eyebrow fades
   STATE 3 — APPROACH     (35% → 72%)  Camera moves in, text recedes
   STATE 4 — THRESHOLD    (72% → 100%) Core dominates; text gone
   ─────────────────────────────────────────────────────────────
   Pin distance: 300vh  (enough for cinematic feel, not exhausting)
   ============================================================= */

import { useRef } from 'react'
import { createScrollState } from '../3d/AetherCoreController'
import { useGSAP } from '../hooks/useGSAP'
import { ScrollTrigger } from '../animations/gsap'
import './Hero.css'

export default function Hero({ scrollStateRef: externalScrollStateRef }) {
  // Use shared scrollStateRef from App layout, or fallback to internal ref
  const internalScrollStateRef = useRef(createScrollState())
  const scrollStateRef = externalScrollStateRef || internalScrollStateRef

  // useGSAP returns the element ref we must attach to the section so that
  // gsap.context() scopes queries to only this component's DOM subtree.
  const heroRef = useGSAP((gsap, element) => {
    // ── Reduced-motion bail-out ──
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Static state — just ensure the Core is alive at resting values
      return
    }

    const isMobile = window.innerWidth <= 768
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024

    // ── Responsive end-state targets ──
    // Mobile: gentler camera approach, smaller scale, less ring expansion
    const cameraZEnd       = isMobile ? 6.6  : isTablet ? 5.8  : 5.0
    const coreScaleEnd     = isMobile ? 1.42 : isTablet ? 1.52 : 1.62
    const ringExpansionEnd = isMobile ? 1.5  : isTablet ? 1.85 : 2.2
    const dustEnd          = isMobile ? 1.6  : 2.0

    const state = scrollStateRef.current

    // ──────────────────────────────────────────────────────────
    // MASTER SCRUBBED TIMELINE
    // pin: true locks the section visually while the scroll
    //      distance extends below it (creates scroll "space").
    // scrub: 1.2  — follows scroll position with slight smoothing
    //              so backward scrolling reverses naturally.
    // anticipatePin: 1 — prevents the Lenis + pin-spacer jump.
    // ──────────────────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start:   'top top',
        end:     '+=300%',      // 300vh of scroll distance (section stays 100vh tall)
        scrub:   1.2,           // smooth lag so it feels physical
        pin:     true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // ── PHASE 1 → 2: AWAKENING  (tl time 0 → 0.35) ───────────
    // The ambient UI elements disappear first — clearing the stage.
    // Core quietly starts to breathe.

    // Eyebrow + scroll indicator vanish together — earliest exit
    tl.to(
      '.hero__eyebrow',
      { opacity: 0, y: -20, duration: 0.18, ease: 'power2.inOut' },
      0
    )
    tl.to(
      '.hero__scroll',
      { opacity: 0, y: 12, duration: 0.18, ease: 'power2.inOut' },
      0
    )

    // Descriptor text recedes slightly before the wordmark
    tl.to(
      '.hero__descriptor',
      { opacity: 0, y: 28, duration: 0.22, ease: 'power2.out' },
      0.08
    )

    // 3D: Core wakes up — subtle initial pulse
    tl.to(
      state,
      {
        rotationSpeed:     1.6,
        emissiveIntensity: 0.42,
        cameraZ:           7.8,
        coreScale:         1.12,
        duration:          0.35,
        ease:              'power1.inOut',
      },
      0
    )

    // ── PHASE 2 → 3: APPROACH  (tl time 0.35 → 0.72) ─────────
    // Camera slowly pushes toward the core.
    // Wordmark begins its long fade.
    // Orbital rings expand outward.

    // Subtitle dims (doesn't disappear yet — still provides context)
    tl.to(
      '.hero__subtitle',
      { opacity: 0.28, y: 14, duration: 0.30, ease: 'power2.out' },
      0.35
    )

    // Wordmark starts receding — scale down very slightly to feel far
    tl.to(
      '.hero__wordmark',
      { opacity: 0.55, scale: 0.96, duration: 0.35, ease: 'power1.inOut' },
      0.38
    )

    // 3D: camera approaches, rings fan out, dust activates
    tl.to(
      state,
      {
        cameraZ:           6.2,
        rotationSpeed:     2.4,
        coreScale:         coreScaleEnd * 0.78,
        ringExpansion:     ringExpansionEnd * 0.65,
        emissiveIntensity: 0.58,
        dustDispersion:    dustEnd * 0.7,
        duration:          0.38,
        ease:              'power1.inOut',
      },
      0.34
    )

    // ── PHASE 3 → 4: THRESHOLD  (tl time 0.72 → 1.0) ─────────
    // Final push. Core fills the viewport.
    // All text dissolves.
    // Rings push beyond their original radius.
    // Dust field becomes active and visible.

    // Wordmark almost gone — barely a whisper
    tl.to(
      '.hero__wordmark',
      { opacity: 0.06, scale: 0.88, duration: 0.28, ease: 'power2.in' },
      0.72
    )

    // Subtitle fully gone
    tl.to(
      '.hero__subtitle',
      { opacity: 0, y: 20, duration: 0.22, ease: 'power2.in' },
      0.76
    )

    // 3D: final threshold approach
    tl.to(
      state,
      {
        cameraZ:           cameraZEnd,
        rotationSpeed:     3.4,
        coreScale:         coreScaleEnd,
        ringExpansion:     ringExpansionEnd,
        emissiveIntensity: 0.78,
        dustDispersion:    dustEnd,
        duration:          0.28,
        ease:              'power2.inOut',
      },
      0.72
    )

    // ── PHASE 4B: INSTABILITY  (tl time 0.55 → 0.72) ─────────
    // Rings begin losing orbital alignment; outer shell thins.
    // Deliberately overlaps Phase 2→3 (Approach) so the transition
    // feels organic — the Core is already destabilising before the
    // camera reaches Threshold.
    tl.to(
      state,
      {
        ringTilt:     1.0,
        shellOpacity: 0.38,
        duration:     0.17,
        ease:         'power1.inOut',
      },
      0.55
    )

    // ── PHASE 4B: DECONSTRUCTION  (tl time 0.68 → 0.88) ──────
    // Surface fragments begin detaching.
    // Information field starts to activate.
    tl.to(
      state,
      {
        dissolution:      0.55,
        fragmentProgress: 0.45,
        duration:         0.20,
        ease:             'power1.inOut',
      },
      0.68
    )

    // ── PHASE 4B: INFORMATION FIELD  (tl time 0.85 → 1.0) ────
    // Core geometry dissolves to a ghost.
    // Particle field dominates the viewport.
    // "Physical matter becoming information."
    tl.to(
      state,
      {
        dissolution:      1.0,
        fragmentProgress: 1.0,
        shellOpacity:     0.08,
        duration:         0.15,
        ease:             'power2.inOut',
      },
      0.85
    )

    // ── Refresh ScrollTrigger after a tick so Lenis can measure
    //    the new total scrollable height (pin spacer is injected
    //    after the first render, so we need a short delay). ──
    gsap.delayedCall(0.15, () => {
      ScrollTrigger.refresh()
    })
  }, []) // empty deps — run once on mount, clean up on unmount

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero"
      aria-label="AETHER — Hero"
    >

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
