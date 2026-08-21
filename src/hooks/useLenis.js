/* =============================================================
   AETHER — useLenis hook
   Initializes Lenis smooth scroll and synchronizes with
   GSAP ScrollTrigger on the GSAP ticker.
   ============================================================= */

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../animations/gsap'

/**
 * @param {object} [options]
 * @param {number} [options.duration=1.2]     — scroll duration multiplier
 * @param {boolean} [options.smoothWheel=true] — smooth mouse wheel
 * @returns {React.RefObject<Lenis>}
 */
export function useLenis({ duration = 1.2, smoothWheel = true } = {}) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration,
      easing:         (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel,
      touchMultiplier: 2,
      infinite:        false,
    })

    lenisRef.current = lenis

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Notify Lenis to resize bounds whenever ScrollTrigger refreshes pin spacers
    const onSTRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onSTRefresh)

    // Run Lenis RAF inside GSAP Ticker for frame-accurate sync
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      ScrollTrigger.removeEventListener('refresh', onSTRefresh)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [duration, smoothWheel])

  return lenisRef
}
