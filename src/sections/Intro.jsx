/* =============================================================
   AETHER — Intro Section
   First content section below Hero. Cinematic large-type
   statement: "IT DOESN'T JUST PROCESS. IT UNDERSTANDS."

   Phase 5 additions:
   - Scrubbed editorial typography reveal driven by GSAP ScrollTrigger.
   - Information Field settling: transitions the 3D field from active
     deconstruction to a calm, ambient atmospheric environment.
   - Fully accessible fallback under prefers-reduced-motion.
   ============================================================= */

import { useGSAP } from '../hooks/useGSAP'
import './Intro.css'

export default function Intro({ scrollStateRef }) {
  const introRef = useGSAP((gsap, element) => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Keep static resting state under reduced motion
      return
    }

    // Master scrubbed timeline for section reveal & field settling
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start:   'top 82%',
        end:     'top 22%',
        scrub:   1.0,
      },
    })

    // Section index (01 FOUNDATION)
    tl.fromTo(
      '.intro__index',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.28 },
      0
    )

    // Statement Line 1: Subdued intro line
    tl.fromTo(
      '.intro__line--dim',
      { opacity: 0, y: 26 },
      { opacity: 0.65, y: 0, ease: 'power2.out', duration: 0.38 },
      0.08
    )

    // Statement Line 2: "IT UNDERSTANDS." — receives prime visual emphasis & radiant glow
    tl.fromTo(
      '.intro__line--bright',
      {
        opacity: 0,
        y: 34,
        textShadow: '0 0 0px rgba(184, 200, 232, 0)',
      },
      {
        opacity: 1,
        y: 0,
        textShadow: '0 0 35px rgba(184, 200, 232, 0.24)',
        ease: 'power2.out',
        duration: 0.44,
      },
      0.18
    )

    // Body copy blocks
    tl.fromTo(
      '.intro__body',
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.34 },
      0.32
    )

    // Right decorative vertical line
    tl.fromTo(
      '.intro__vline',
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, transformOrigin: 'top center', ease: 'power1.out', duration: 0.4 },
      0.15
    )

    // ── Phase 5: Ambient Information Field Settling ──────────
    // Subtly transition the 3D field from Hero's high-energy deconstruction
    // into a tranquil ambient data fog behind the typography.
    if (scrollStateRef?.current) {
      tl.to(
        scrollStateRef.current,
        {
          rotationSpeed:     1.15,  // gentle ambient orbit (Hero ended at 3.4)
          dustDispersion:    1.60,  // particles settle inward (Hero ended at 2.0)
          emissiveIntensity: 0.42,  // softer ambient glow (Hero ended at 0.78)
          cameraZ:           5.35,  // subtle breathing camera drift (Hero ended at 5.0)
          ease:              'power1.inOut',
          duration:          0.6,
        },
        0.05
      )
    }
  }, [scrollStateRef])

  return (
    <section
      ref={introRef}
      id="intro"
      className="intro"
      aria-labelledby="intro-heading"
    >
      <div className="intro__inner">

        {/* Section identifier */}
        <div className="intro__index" aria-hidden="true">
          <span className="intro__index-num">01</span>
          <span className="intro__index-rule" />
          <span className="intro__index-label">FOUNDATION</span>
        </div>

        {/* Primary cinematic statement */}
        <h2 id="intro-heading" className="intro__statement">
          <span className="intro__line intro__line--dim">
            IT DOESN&apos;T JUST PROCESS.
          </span>
          <span className="intro__line intro__line--bright">
            IT UNDERSTANDS.
          </span>
        </h2>

        {/* Supporting body copy */}
        <div className="intro__body">
          <p className="intro__copy">
            AETHER operates beyond conventional intelligence frameworks.
            Where systems compute, AETHER perceives.
            Where algorithms execute, AETHER interprets.
          </p>
          <p className="intro__copy intro__copy--accent">
            This is the threshold between machine and mind.
          </p>
        </div>

      </div>

      {/* Decorative vertical rule — right edge */}
      <div className="intro__vline" aria-hidden="true" />
    </section>
  )
}
