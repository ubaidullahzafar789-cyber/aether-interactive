/* =============================================================
   AETHER — SmoothScroll
   Top-level Lenis wrapper. Exposes a LenisContext so any
   descendant component can access the Lenis instance for
   scroll event subscriptions or programmatic scrolling.
   ============================================================= */

import { createContext, useContext } from 'react'
import { useLenis } from '../../hooks/useLenis'

const LenisContext = createContext(null)

/**
 * Access the Lenis instance from any child component.
 * @returns {React.RefObject<import('lenis').default>}
 */
export function useLenisContext() {
  return useContext(LenisContext)
}

/**
 * Wrap your page root in <SmoothScroll> to enable Lenis.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useLenis()

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  )
}
