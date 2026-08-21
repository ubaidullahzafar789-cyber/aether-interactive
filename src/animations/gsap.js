/* =============================================================
   AETHER — GSAP Animation System
   Registers plugins and configures global GSAP defaults.
   Import { gsap, ScrollTrigger } from here — never import
   directly from 'gsap' to avoid double-registration.
   ============================================================= */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register all plugins once at module level
gsap.registerPlugin(ScrollTrigger)

// Global GSAP defaults aligned with AETHER motion language
gsap.defaults({
  ease:     'power3.out',
  duration: 0.9,
})

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
})

export { gsap, ScrollTrigger }
