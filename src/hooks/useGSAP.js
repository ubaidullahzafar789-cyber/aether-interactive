/* =============================================================
   AETHER — useGSAP hook
   Provides a scoped gsap.context() for components.
   All animations created in the callback are automatically
   cleaned up on unmount, preventing memory leaks.
   ============================================================= */

import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

/**
 * @param {(gsap: gsap, element: HTMLElement) => void} callback
 *   Animation setup — runs once after mount (or when deps change).
 * @param {React.DependencyList} [deps=[]]
 * @returns {React.RefObject<HTMLElement>}
 *   Attach to the root element of the component to scope animations.
 *
 * @example
 *   const ref = useGSAP((gsap, el) => {
 *     gsap.from('.hero__title', { opacity: 0, y: 40 })
 *   }, [])
 *   return <section ref={ref}>...</section>
 */
export function useGSAP(callback, deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      callback(gsap, ref.current)
    }, ref)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
