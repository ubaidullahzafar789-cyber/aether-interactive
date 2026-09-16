/* =============================================================
   AETHER — Loader
   Cinematic intro screen. Renders over everything, displays
   the AETHER wordmark + a progress bar, then fades out.
   Phases: 'entering' → 'visible' → 'exiting'
   ============================================================= */

import { useState, useEffect } from 'react'
import './Loader.css'

/**
 * @param {() => void} [onComplete] — called after exit animation finishes
 */
export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('entering')

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Reduced-motion fast path: brief accessible confirmation, then instantaneous exit
      const t1 = setTimeout(() => setPhase('visible'), 50)
      const t2 = setTimeout(() => setPhase('exiting'), 200)
      const t3 = setTimeout(() => onComplete?.(), 400)

      return () => {
        document.body.style.overflow = originalOverflow
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }

    // Standard cinematic timeline:
    //   0ms    — entering (opacity 0, begin fade-in)
    //  400ms   — visible  (opacity 1, hold)
    // 2200ms   — exiting  (fade out begins)
    // 3100ms   — onComplete (parent unmounts this component)
    const t1 = setTimeout(() => setPhase('visible'),  400)
    const t2 = setTimeout(() => setPhase('exiting'),  2200)
    const t3 = setTimeout(() => onComplete?.(),        3100)

    return () => {
      document.body.style.overflow = originalOverflow
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <div
      className={`loader loader--${phase}`}
      role="status"
      aria-label="Loading AETHER"
      aria-live="polite"
    >
      <div className="loader__inner">
        <p className="loader__eyebrow" aria-hidden="true">INITIALIZING</p>
        <span className="loader__wordmark" aria-label="AETHER">AETHER</span>
        <p className="loader__tagline"  aria-hidden="true">
          INTELLIGENCE BEYOND THE VISIBLE
        </p>
        <div className="loader__progress" aria-hidden="true">
          <div className="loader__bar" />
        </div>
      </div>
    </div>
  )
}
