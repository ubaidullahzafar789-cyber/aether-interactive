/* =============================================================
   AETHER — Capabilities Section
   Interactive 4-pillar showcase of AETHER's architectural foundations.
   Features interactive canvas signal graph & live telemetry readouts.
   ============================================================= */

import { useState, useRef, useEffect } from 'react'
import { sound } from '../utils/sound'
import './Capabilities.css'

const CAPABILITIES = [
  {
    id: 'quantum-mesh',
    num: '01',
    title: 'QUANTUM MESH MATRIX',
    tagline: 'Multi-dimensional state vector routing',
    desc: 'Distributed tensor arrays operating across sub-nanosecond coherence envelopes. AETHER routes mathematical vectors in parallel across dynamic quantum manifolds.',
    metrics: [
      { label: 'Tensor Bandwidth', value: '14.8 PB/s' },
      { label: 'Coherence Score', value: '99.994%' },
      { label: 'Topology Nodes', value: '1,048,576' },
    ],
    signalColor: '#b8c8e8',
  },
  {
    id: 'zero-latency',
    num: '02',
    title: 'ZERO-LATENCY PERCEPTION',
    tagline: 'Real-time multi-modal sensor fusion',
    desc: 'Bypasses standard bus latency by streaming hardware telemetry directly into neural flash layers, delivering continuous environmental perception under 0.12ms.',
    metrics: [
      { label: 'Perception Loop', value: '0.08ms' },
      { label: 'Sensor Streams', value: '65,536 / sec' },
      { label: 'Signal Fidelity', value: '99.999%' },
    ],
    signalColor: '#88a8f8',
  },
  {
    id: 'autonomous-cognition',
    num: '03',
    title: 'AUTONOMOUS REASONING',
    tagline: 'Self-modifying algorithmic logic trees',
    desc: 'Continuously restructures its internal weight topologies based on live operational entropy. Resolves non-linear edge cases without human intervention or gradient retraining.',
    metrics: [
      { label: 'Adaptation Speed', value: 'Real-time' },
      { label: 'Logic Depth', value: '4,096 Layers' },
      { label: 'Entropy Resolution', value: '99.98%' },
    ],
    signalColor: '#78d8d0',
  },
  {
    id: 'entanglement-crypto',
    num: '04',
    title: 'ENTANGLEMENT CRYPTO',
    tagline: 'Hardware-isolated quantum state locks',
    desc: 'Protects model weights and runtime state memory via sub-atomic quantum spin states, rendering adversarial prompt injection and memory probe attacks physically impossible.',
    metrics: [
      { label: 'Isolation Index', value: 'Level 5 (Max)' },
      { label: 'Encryption Standard', value: 'Post-Quantum 8K' },
      { label: 'Zero-Knowledge Probe', value: '100% Secure' },
    ],
    signalColor: '#d4b4f8',
  },
]

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0)
  const canvasRef = useRef(null)

  const activeCap = CAPABILITIES[activeIndex]

  /* Interactive Canvas Signal Animation */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      time += 0.02
      const width = (canvas.width = canvas.parentElement?.clientWidth || 400)
      const height = (canvas.height = 240)

      ctx.clearRect(0, 0, width, height)

      // Draw background cyber grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.lineWidth = 1
      const gridSize = 24
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw animated harmonic wave curves
      const color = activeCap.signalColor
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.shadowColor = color
      ctx.shadowBlur = 12

      ctx.beginPath()
      for (let x = 0; x < width; x++) {
        const freqMultiplier = activeIndex + 1
        const y =
          height / 2 +
          Math.sin(x * 0.015 * freqMultiplier + time) * 35 * Math.cos(time * 0.5) +
          Math.sin(x * 0.03 + time * 1.5) * 15

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Reset shadow
      ctx.shadowBlur = 0

      // Draw floating nodes along the wave
      for (let i = 1; i <= 5; i++) {
        const nodeX = (width / 6) * i + Math.sin(time + i) * 20
        const nodeY =
          height / 2 +
          Math.sin(nodeX * 0.015 * (activeIndex + 1) + time) * 35 * Math.cos(time * 0.5) +
          Math.sin(nodeX * 0.03 + time * 1.5) * 15

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, 10 + Math.sin(time * 3 + i) * 4, 0, Math.PI * 2)
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [activeIndex, activeCap])

  const handleCardClick = (index) => {
    sound.playClick()
    setActiveIndex(index)
  }

  const handleCardHover = () => {
    sound.playHover()
  }

  return (
    <section id="capabilities" className="capabilities" aria-labelledby="capabilities-heading">
      <div className="capabilities__inner">

        {/* Section Index Header */}
        <div className="capabilities__header">
          <div className="capabilities__index" aria-hidden="true">
            <span className="capabilities__index-num">02</span>
            <span className="capabilities__index-rule" />
            <span className="capabilities__index-label">CAPABILITIES</span>
          </div>

          <h2 id="capabilities-heading" className="capabilities__title">
            SUB-ATOMIC NEURAL TOPOLOGY
          </h2>

          <p className="capabilities__subtitle">
            Architected to transcend scalar compute limits through dynamic multi-dimensional tensor routing and zero-latency sensor fusion.
          </p>
        </div>

        {/* Interactive Layout: Cards + Dynamic Visualizer Panel */}
        <div className="capabilities__grid">

          {/* Cards List */}
          <div className="capabilities__cards" role="tablist" aria-label="AETHER Core Capabilities">
            {CAPABILITIES.map((cap, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={cap.id}
                  id={`cap-tab-${cap.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`cap-panel-${cap.id}`}
                  tabIndex={0}
                  className={['capabilities__card', isActive ? 'capabilities__card--active' : ''].join(' ')}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={handleCardHover}
                >
                  <div className="capabilities__card-header">
                    <span className="capabilities__card-num">{cap.num}</span>
                    <span className="capabilities__card-tagline">{cap.tagline}</span>
                  </div>

                  <h3 className="capabilities__card-title">{cap.title}</h3>

                  <p className="capabilities__card-desc">{cap.desc}</p>

                  <div className="capabilities__card-footer">
                    <span className="capabilities__card-indicator">
                      {isActive ? 'ACTIVE SIGNAL // ANALYZING' : 'SELECT TO INSPECT'}
                    </span>
                    <span className="capabilities__card-arrow">&rarr;</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Dynamic Interactive Signal Visualizer Panel */}
          <div
            id={`cap-panel-${activeCap.id}`}
            role="tabpanel"
            aria-labelledby={`cap-tab-${activeCap.id}`}
            className="capabilities__panel"
          >
            <div className="capabilities__panel-header">
              <div className="capabilities__panel-status">
                <span className="capabilities__status-dot" style={{ backgroundColor: activeCap.signalColor }} />
                <span className="capabilities__status-text">LIVE SIGNAL SPECTRUM</span>
              </div>
              <span className="capabilities__panel-id">SYSTEM ID: {activeCap.id.toUpperCase()}</span>
            </div>

            {/* Canvas Signal Graph */}
            <div className="capabilities__canvas-wrapper">
              <canvas ref={canvasRef} className="capabilities__canvas" />
            </div>

            {/* Metrics Breakdown */}
            <div className="capabilities__metrics">
              {activeCap.metrics.map((m) => (
                <div key={m.label} className="capabilities__metric-item">
                  <span className="capabilities__metric-label">{m.label}</span>
                  <span className="capabilities__metric-value" style={{ color: activeCap.signalColor }}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="capabilities__panel-footer">
              <span className="capabilities__footer-code">LOG: TOPOLOGY_HARMONIC_OK</span>
              <span className="capabilities__footer-time">REALTIME LATENCY: 0.08ms</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
