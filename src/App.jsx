/* =============================================================
   AETHER — Main App Container
   Root composition: Loader → SmoothScroll → PageContainer
   → Navbar + Hero + Intro + Capabilities + Telemetry
   + Sectors + Terminal + CallToAction + Footer + AccessModal.
   ============================================================= */

import { useState, useCallback, useRef } from 'react'
import SmoothScroll  from './components/layout/SmoothScroll'
import PageContainer from './components/layout/PageContainer'
import Navbar        from './components/ui/Navbar'
import Loader        from './components/ui/Loader'
import AccessModal   from './components/ui/AccessModal'
import Footer        from './components/ui/Footer'
import AetherCore    from './3d/AetherCore'
import { createScrollState } from './3d/AetherCoreController'
import Hero          from './sections/Hero'
import Intro         from './sections/Intro'
import Capabilities  from './sections/Capabilities'
import Telemetry     from './sections/Telemetry'
import Sectors       from './sections/Sectors'
import Terminal      from './sections/Terminal'
import CallToAction  from './sections/CallToAction'
import './App.css'

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Single shared mutable scroll state driving the persistent 3D AetherCore Canvas
  const scrollStateRef = useRef(createScrollState())

  // Unmount loader after exit animation
  const handleLoadComplete = useCallback(() => {
    setShowLoader(false)
  }, [])

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      {/* Cinematic intro screen — unmounts after exit animation */}
      {showLoader && <Loader onComplete={handleLoadComplete} />}

      {/* Access Clearance Key Request Modal */}
      <AccessModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Lenis smooth scroll wraps entire page */}
      <SmoothScroll>
        <PageContainer>

          {/* Persistent fixed AetherCore 3D Canvas — single instance across all sections */}
          <div className="aether-core-fixed-bg" aria-hidden="true">
            <AetherCore scrollStateRef={scrollStateRef} />
          </div>

          {/* Fixed navigation */}
          <Navbar onOpenModal={handleOpenModal} />

          {/* Main page sections */}
          <main id="main-content" aria-label="AETHER main content">
            <Hero scrollStateRef={scrollStateRef} />
            <Intro scrollStateRef={scrollStateRef} />
            <Capabilities />
            <Telemetry />
            <Sectors />
            <Terminal />
            <CallToAction onOpenModal={handleOpenModal} />
          </main>

          {/* Footer */}
          <Footer />

        </PageContainer>
      </SmoothScroll>
    </>
  )
}
