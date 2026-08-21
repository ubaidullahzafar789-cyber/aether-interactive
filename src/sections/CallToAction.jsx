/* =============================================================
   AETHER — CallToAction Section
   High-impact final section prompting users to request clearance.
   ============================================================= */

import Button from '../components/ui/Button'
import { sound } from '../utils/sound'
import './CallToAction.css'

export default function CallToAction({ onOpenModal }) {
  const handleOpenClick = () => {
    sound.playModalOpen()
    if (onOpenModal) onOpenModal()
  }

  return (
    <section id="access" className="cta-section" aria-labelledby="cta-heading">
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
