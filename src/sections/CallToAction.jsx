/* =============================================================
   AETHER — CallToAction Section
   High-impact final section prompting users to request clearance.
   ============================================================= */

import Button from '../components/ui/Button'
import { sound } from '../utils/sound'
import { useGSAP } from '../hooks/useGSAP'
import './CallToAction.css'

export default function CallToAction({ onOpenModal }) {
  const handleOpenClick = () => {
    sound.playModalOpen()
    if (onOpenModal) onOpenModal()
  }

  /* ── GSAP Scroll-Reveal Choreography (Climactic Closing Beat) ── */
  const ctaRef = useGSAP((gsap, element) => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.fromTo(
      '.cta-section__glow',
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: 'power1.inOut' },
      0
    )

    tl.fromTo(
      '.cta-section__index',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      0.05
    )

    tl.fromTo(
      '.cta-section__title',
      { opacity: 0, y: 24, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
      0.1
    )

    tl.fromTo(
      '.cta-section__desc',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.18
    )

    tl.fromTo(
      '.cta-section__actions',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
      0.24
    )

    tl.fromTo(
      '.cta-section__footer-info',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      0.3
    )
  }, [])

  return (
    <section
      ref={ctaRef}
      id="access"
      className="cta-section"
      aria-labelledby="cta-heading"
    >
      <div className="cta-section__inner">

        {/* Ambient glow background */}
        <div className="cta-section__glow" aria-hidden="true" />

        <div className="cta-section__content">
          <div className="cta-section__index" aria-hidden="true">
            <span className="cta-section__index-num">06</span>
            <span className="cta-section__index-rule" />
            <span className="cta-section__index-label">CLEARANCE</span>
          </div>

          <h2 id="cta-heading" className="cta-section__title">
            ENTER THE QUANTUM EPOCH
          </h2>

          <p className="cta-section__desc">
            Access to AETHER is restricted to verified enterprise research labs, defense entities, and sovereign compute grids.
          </p>

          <div className="cta-section__actions">
            <Button
              id="cta-request-btn"
              variant="primary"
              size="lg"
              onClick={handleOpenClick}
            >
              REQUEST CLEARANCE KEY &rarr;
            </Button>
          </div>

          <div className="cta-section__footer-info">
            <span>ISOLATED CLUSTER DEPLOYMENT AVAILABLE ON-PREMISE</span>
            <span>&bull;</span>
            <span>POST-QUANTUM CRYPTOGRAPHIC ENCLAVE</span>
          </div>
        </div>

      </div>
    </section>
  )
}
