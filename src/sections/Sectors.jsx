/* =============================================================
   AETHER — Sectors Section
   Interactive tabbed showcase of real-world industry deployments.
   ============================================================= */

import { useState, useRef } from 'react'
import { sound } from '../utils/sound'
import { useGSAP } from '../hooks/useGSAP'
import './Sectors.css'

const SECTORS = [
  {
    id: 'aerospace',
    num: '01',
    name: 'AEROSPACE & ORBITAL',
    heading: 'Autonomous Deep Space Trajectory Navigation',
    desc: 'Real-time telemetry adjustment for satellite constellations and interplanetary probes operating outside Earth-moon relay windows.',
    stats: [
      { label: 'Trajectory Drift', value: '< 0.0001mm' },
      { label: 'Correction Latency', value: '0.04ms' },
      { label: 'Active Satellites', value: '4,200+' },
    ],
    highlight: 'Deployed across low-Earth orbit constellations, preventing high-velocity orbital collisions without human controller intervention.',
    tag: 'FLIGHT-TESTED',
  },
  {
    id: 'biology',
    num: '02',
    name: 'SYNTHETIC BIOLOGY',
    heading: 'Sub-Atomic Molecular Folding & Protein Design',
    desc: 'Simulates 3D spatial conformation of therapeutic proteins and CRISPR guide sequences down to quantum electron shell states.',
    stats: [
      { label: 'Design Velocity', value: '10,000x' },
      { label: 'Fold Accuracy', value: '99.991%' },
      { label: 'Candidate Screening', value: '1.2B / hr' },
    ],
    highlight: 'Reduced therapeutic compound discovery cycles from 6 years to 72 hours for rare genetic mutation targets.',
    tag: 'CLINICAL GRADE',
  },
  {
    id: 'finance',
    num: '03',
    name: 'QUANTUM MARKETS',
    heading: 'High-Frequency Multi-Asset Liquidity Optimization',
    desc: 'Processes global order books and macro liquidity shifts across sovereign debt markets at sub-microsecond tick resolution.',
    stats: [
      { label: 'Order Execution', value: '< 100ns' },
      { label: 'Risk Model Horizon', value: 'T+30 Days' },
      { label: 'System Uptime', value: '99.9999%' },
    ],
    highlight: 'Simulates Black-Swan systemic liquidity events across 10,000 parallel market topologies simultaneously.',
    tag: 'SECURE ENCLAVE',
  },
  {
    id: 'climate',
    num: '04',
    name: 'CLIMATE SIMULATION',
    heading: 'Planetary Micro-Climate & Severe Weather Prediction',
    desc: 'Hyper-resolution atmospheric fluid dynamic modeling predicting localized extreme weather events weeks in advance.',
    stats: [
      { label: 'Grid Resolution', value: '10 Meters' },
      { label: 'Prediction Horizon', value: '21 Days' },
      { label: 'Variance Rate', value: '0.02%' },
    ],
    highlight: 'Accurately forecasted supercell convective paths 14 days prior to landfall, enabling zero-loss emergency evacuations.',
    tag: 'GLOBAL MODEL',
  },
]

export default function Sectors() {
  const [activeTab, setActiveTab] = useState(0)
  const tabButtonsRef = useRef([])

  const currentSector = SECTORS[activeTab]

  const handleTabChange = (index) => {
    sound.playClick()
    setActiveTab(index)
  }

  // WAI-ARIA Keyboard navigation between sector tabs
  const handleKeyDown = (e, index) => {
    let nextIndex = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (index + 1) % SECTORS.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (index - 1 + SECTORS.length) % SECTORS.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = SECTORS.length - 1
    }

    if (nextIndex !== index) {
      handleTabChange(nextIndex)
      tabButtonsRef.current[nextIndex]?.focus()
    }
  }

  /* ── GSAP Scroll-Reveal Choreography ── */
  const sectorsRef = useGSAP((gsap, element) => {
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
      '.sectors__header',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0
    )

    tl.fromTo(
      '.sectors__tab-btn',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out' },
      0.1
    )

    tl.fromTo(
      '.sectors__showcase',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
      0.16
    )
  }, [])

  return (
    <section
      ref={sectorsRef}
      id="sectors"
      className="sectors"
      aria-labelledby="sectors-heading"
    >
      <div className="sectors__inner">

        {/* Header */}
        <div className="sectors__header">
          <div className="sectors__index" aria-hidden="true">
            <span className="sectors__index-num">04</span>
            <span className="sectors__index-rule" />
            <span className="sectors__index-label">SECTORS</span>
          </div>

          <h2 id="sectors-heading" className="sectors__title">
            TRANSFORMING CRITICAL DOMAINS
          </h2>
          <p className="sectors__subtitle">
            Engineered for environment-critical missions where precision, safety, and sub-millisecond execution are mandatory.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="sectors__tabs" role="tablist" aria-label="Target Sectors">
          {SECTORS.map((sector, index) => {
            const isActive = index === activeTab
            return (
              <button
                key={sector.id}
                ref={(el) => (tabButtonsRef.current[index] = el)}
                id={`sector-tab-${sector.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`sector-panel-${sector.id}`}
                tabIndex={isActive ? 0 : -1}
                className={['sectors__tab-btn', isActive ? 'sectors__tab-btn--active' : ''].join(' ')}
                onClick={() => handleTabChange(index)}
                onMouseEnter={() => sound.playHover()}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <span className="sectors__tab-num">{sector.num}</span>
                <span className="sectors__tab-name">{sector.name}</span>
              </button>
            )
          })}
        </div>

        {/* Active Content Showcase Box */}
        <div
          id={`sector-panel-${currentSector.id}`}
          role="tabpanel"
          aria-labelledby={`sector-tab-${currentSector.id}`}
          tabIndex={0}
          className="sectors__showcase"
        >

          <div className="sectors__showcase-main">
            <div className="sectors__showcase-badge">
              <span className="sectors__badge-dot" />
              <span>{currentSector.tag}</span>
            </div>

            <h3 className="sectors__showcase-heading">{currentSector.heading}</h3>
            <p className="sectors__showcase-desc">{currentSector.desc}</p>

            <div className="sectors__highlight-box">
              <span className="sectors__highlight-title">FIELD IMPACT VERIFICATION</span>
              <p className="sectors__highlight-text">&ldquo;{currentSector.highlight}&rdquo;</p>
            </div>
          </div>

          {/* Right Stats Sidebar */}
          <div className="sectors__showcase-stats">
            <span className="sectors__stats-title">DEPLOYMENT METRICS</span>
            <div className="sectors__stats-list">
              {currentSector.stats.map((stat) => (
                <div key={stat.label} className="sectors__stat-card">
                  <span className="sectors__stat-label">{stat.label}</span>
                  <span className="sectors__stat-value">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
