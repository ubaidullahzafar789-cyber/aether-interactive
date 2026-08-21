/* =============================================================
   AETHER — PageContainer
   Root layout wrapper for the entire page. Provides
   a consistent background and positioning context.
   ============================================================= */

import './PageContainer.css'

/**
 * Wraps the full page. Place Navbar + <main> inside.
 */
export default function PageContainer({ children }) {
  return (
    <div className="page-container">
      {children}
    </div>
  )
}
