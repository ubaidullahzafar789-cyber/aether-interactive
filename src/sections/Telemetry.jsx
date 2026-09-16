/* =============================================================
   AETHER — Telemetry Section
   Real-time system matrix and node spectrum visualizer.
   Features interactive mode toggles and live animated gauges.
   ============================================================= */

import { useState, useEffect } from 'react'
import { sound } from '../utils/sound'
import { useGSAP } from '../hooks/useGSAP'
import './Telemetry.css'

const MODES = [
  { id: 'quantum', label: 'QUANTUM VECTOR', color: '#b8c8e8', freq: 440 },
  { id: 'thermal', label: 'THERMAL SPECTRUM', color: '#f89878', freq: 660 },
  { id: 'subspace', label: 'SUB-SPACE FREQ', color: '#78d8d0', freq: 880 },
  { id: 'harmonic', label: 'CORE HARMONIC', color: '#d4b4f8', freq: 1100 },
]

const INITIAL_NODES = [
  {
    id: 'alpha',
    name: 'NODE 01 // ALPHA',
    location: 'NORAD ORBITAL RELAY',
    memory: 94.2,
    latency: '0.04ms',
    coherence: '99.99%',
    throughput: '4.8 TB/s',
    status: 'OPTIMAL',
    spectrumBars: [85, 92, 78, 95, 60, 88, 94, 72, 90, 84],
  },
  {
    id: 'beta',
    name: 'NODE 02 // BETA',
    location: 'ZURICH QUANTUM HUB',
    memory: 81.6,
    latency: '0.07ms',
    coherence: '99.98%',
    throughput: '3.9 TB/s',
    status: 'OPTIMAL',
    spectrumBars: [70, 85, 90, 65, 82, 95, 78, 88, 92, 60],
  },
  {
    id: 'gamma',
    name: 'NODE 03 // GAMMA',
    location: 'TOKYO NEURAL ARRAY',
    memory: 88.9,
    latency: '0.05ms',
    coherence: '99.99%',
    throughput: '5.2 TB/s',
    status: 'SYNCHRONIZED',
    spectrumBars: [90, 75, 88, 94, 82, 70, 96, 85, 91, 78],
  },
  {
    id: 'delta',
    name: 'NODE 04 // DELTA',
    location: 'PACIFIC SUBSEA GRID',
    memory: 76.4,
    latency: '0.11ms',
    coherence: '99.95%',
    throughput: '3.1 TB/s',
    status: 'BALANCED',
    spectrumBars: [60, 72, 80, 85, 90, 68, 75, 82, 89, 70],
  },
]

export default function Telemetry() {
  const [activeMode, setActiveMode] = useState('quantum')
  const [nodes, setNodes] = useState(INITIAL_NODES)

  const currentMode = MODES.find((m) => m.id === activeMode) || MODES[0]

  /* Micro live spectrum jitter simulation */
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          spectrumBars: node.spectrumBars.map((val) => {
            const jitter = (Math.random() - 0.5) * 12
            return Math.min(100, Math.max(30, Math.round(val + jitter)))
          }),
        }))
      )
    }, 400)

    return () => clearInterval(interval)
  }, [])

  const handleModeChange = (modeId) => {
    sound.playClick()
    setActiveMode(modeId)
  }

  /* ── GSAP Scroll-Reveal Choreography ── */
  const telemetryRef = useGSAP((gsap, element) => {
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
      '.telemetry__header',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0
    )

    tl.fromTo(
      '.telemetry__modes',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      0.08
    )

    tl.fromTo(
      '.telemetry__card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.09, duration: 0.65, ease: 'power2.out' },
      0.14
    )

    tl.fromTo(
      '.telemetry__banner',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.2
    )
  }, [])

  return (
    <section
      ref={telemetryRef}
      id="telemetry"
      className="telemetry"
      aria-labelledby="telemetry-heading"
    >
      <div className="telemetry__inner">

        {/* Section Header */}
        <div className="telemetry__header">
          <div className="telemetry__index" aria-hidden="true">
            <span className="telemetry__index-num">03</span>
            <span className="telemetry__index-rule" />
            <span className="telemetry__index-label">TELEMETRY</span>
          </div>

          <div className="telemetry__title-wrapper">
            <h2 id="telemetry-heading" className="telemetry__title">
              REAL-TIME PERCEPTION &amp; SYSTEM MATRIX
            </h2>
            <p className="telemetry__subtitle">
              Live telemetry monitoring across global sub-surface nodes and quantum satellite relays.
            </p>
          </div>
        </div>

        {/* Mode Selector Controls */}
        <div className="telemetry__modes" role="tablist" aria-label="Spectrum Perception Modes">
          {MODES.map((mode) => {
            const isActive = mode.id === activeMode
            return (
              <button
                key={mode.id}
                role="tab"
                aria-selected={isActive}
                className={['telemetry__mode-btn', isActive ? 'telemetry__mode-btn--active' : ''].join(' ')}
                onClick={() => handleModeChange(mode.id)}
                onMouseEnter={() => sound.playHover()}
                style={{
                  '--mode-color': mode.color,
                }}
              >
                <span className="telemetry__mode-dot" style={{ backgroundColor: mode.color }} />
                <span className="telemetry__mode-label">{mode.label}</span>
              </button>
            )
          })}
        </div>

        {/* Telemetry Nodes Display Grid */}
        <div className="telemetry__grid">
          {nodes.map((node) => (
            <div key={node.id} className="telemetry__card">

              <div className="telemetry__card-top">
                <div className="telemetry__node-info">
                  <span className="telemetry__node-name">{node.name}</span>
                  <span className="telemetry__node-loc">{node.location}</span>
                </div>
                <span className="telemetry__node-badge" style={{ color: currentMode.color, borderColor: currentMode.color }}>
                  {node.status}
                </span>
              </div>

              {/* Animated Spectrum Analyzer */}
              <div className="telemetry__spectrum">
                <div className="telemetry__spectrum-header">
                  <span>FREQUENCY SPECTRUM</span>
                  <span>{node.throughput}</span>
                </div>
                <div className="telemetry__bars">
                  {node.spectrumBars.map((height, i) => (
                    <div
                      key={i}
                      className="telemetry__bar-wrapper"
                    >
                      <div
                        className="telemetry__bar"
                        style={{
                          height: `${height}%`,
                          backgroundColor: currentMode.color,
                          boxShadow: `0 0 8px ${currentMode.color}`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Node Telemetry Stats */}
              <div className="telemetry__stats">
                <div className="telemetry__stat">
                  <span className="telemetry__stat-key">MEMORY LOAD</span>
                  <div className="telemetry__progress-bg">
                    <div
                      className="telemetry__progress-fill"
                      style={{
                        width: `${node.memory}%`,
                        backgroundColor: currentMode.color,
                      }}
                    />
                  </div>
                  <span className="telemetry__stat-val">{node.memory}%</span>
                </div>

                <div className="telemetry__stat-row">
                  <div>
                    <span className="telemetry__stat-key">LATENCY</span>
                    <span className="telemetry__stat-val">{node.latency}</span>
                  </div>
                  <div>
                    <span className="telemetry__stat-key">COHERENCE</span>
                    <span className="telemetry__stat-val" style={{ color: currentMode.color }}>
                      {node.coherence}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* System Health Footer Banner */}
        <div className="telemetry__banner">
          <div className="telemetry__banner-item">
            <span className="telemetry__banner-key">GLOBAL NODE STATUS:</span>
            <span className="telemetry__banner-val">100% OPERATIONAL</span>
          </div>
          <div className="telemetry__banner-item">
            <span className="telemetry__banner-key">SYNCHRONIZATION:</span>
            <span className="telemetry__banner-val" style={{ color: currentMode.color }}>
              SUB-NANOSECOND PHASE-LOCK
            </span>
          </div>
          <div className="telemetry__banner-item">
            <span className="telemetry__banner-key">ACTIVE SPECTRUM:</span>
            <span className="telemetry__banner-val">{currentMode.label}</span>
          </div>
        </div>

      </div>
    </section>
  )
}
