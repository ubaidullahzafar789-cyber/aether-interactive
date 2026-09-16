/* =============================================================
   AETHER — Capabilities Section
   Section 02: AETHER Neural Diagnostic Console
   High-density tactical node interface, domain-specific canvas
   visualizers, live telemetry stream, and hardware signal routing.
   ============================================================= */

import { useState, useRef, useEffect, useCallback } from 'react'
import { sound } from '../utils/sound'
import { useGSAP } from '../hooks/useGSAP'
import './Capabilities.css'

const CAPABILITIES = [
  {
    id: 'quantum-mesh',
    num: '01',
    title: 'QUANTUM MESH MATRIX',
    tagline: 'Multi-dimensional state vector routing',
    desc: 'Distributed tensor arrays operating across sub-nanosecond coherence envelopes. AETHER routes mathematical vectors in parallel across dynamic quantum manifolds.',
    metrics: [
      { label: 'Tensor Bandwidth', value: '14.8 PB/s', base: 14.8, unit: ' PB/s', decimals: 1 },
      { label: 'Coherence Score', value: '99.994%', base: 99.994, unit: '%', decimals: 3 },
      { label: 'Topology Nodes', value: '1,048,576', base: 1048576, unit: '', isInt: true },
    ],
    signalColor: '#b8c8e8',
    status: 'ROUTING // SYNCHRONIZED',
    busCode: 'BUS_01: MESH_TENSOR_ARRAY',
    systemState: 'COHERENCE 99.994%',
    quickTelemetry: '14.8 PB/s // 99.994%',
    logMessage: '0x7F // TOPOLOGY_HARMONIC_VERIFIED',
    diagnosticMode: 'PARALLEL_TENSOR_LATTICE',
  },
  {
    id: 'zero-latency',
    num: '02',
    title: 'ZERO-LATENCY PERCEPTION',
    tagline: 'Real-time multi-modal sensor fusion',
    desc: 'Bypasses standard bus latency by streaming hardware telemetry directly into neural flash layers, delivering continuous environmental perception under 0.12ms.',
    metrics: [
      { label: 'Perception Loop', value: '0.08ms', base: 0.08, unit: 'ms', decimals: 2 },
      { label: 'Sensor Streams', value: '65,536 / sec', base: 65536, unit: ' / sec', isInt: true },
      { label: 'Signal Fidelity', value: '99.999%', base: 99.999, unit: '%', decimals: 3 },
    ],
    signalColor: '#88a8f8',
    status: 'PERCEPTION // ACTIVE_STREAM',
    busCode: 'BUS_02: SENSOR_FLASH_FUSION',
    systemState: 'LATENCY 0.08ms',
    quickTelemetry: '0.08ms // 65K STM',
    logMessage: '0xA2 // SIGNAL_COHERENCE_LOCK',
    diagnosticMode: 'SENSOR_OSCILLOSCOPE_STREAM',
  },
  {
    id: 'autonomous-cognition',
    num: '03',
    title: 'AUTONOMOUS REASONING',
    tagline: 'Self-modifying algorithmic logic trees',
    desc: 'Continuously restructures its internal weight topologies based on live operational entropy. Resolves non-linear edge cases without human intervention or gradient retraining.',
    metrics: [
      { label: 'Adaptation Speed', value: 'Real-time', base: null, unit: '' },
      { label: 'Logic Depth', value: '4,096 Layers', base: 4096, unit: ' Layers', isInt: true },
      { label: 'Entropy Resolution', value: '99.98%', base: 99.98, unit: '%', decimals: 2 },
    ],
    signalColor: '#78d8d0',
    status: 'COGNITION // DYNAMIC_REORGANIZATION',
    busCode: 'BUS_03: ENTROPY_LOGIC_ENGINE',
    systemState: 'ENTROPY 0.02%',
    quickTelemetry: '4K LAYERS // REAL-TIME',
    logMessage: '0x31 // ENTROPY_FIELD_STABLE',
    diagnosticMode: 'SYNAPTIC_BRANCHING_GRAPH',
  },
  {
    id: 'entanglement-crypto',
    num: '04',
    title: 'ENTANGLEMENT CRYPTO',
    tagline: 'Hardware-isolated quantum state locks',
    desc: 'Protects model weights and runtime state memory via sub-atomic quantum spin states, rendering adversarial prompt injection and memory probe attacks physically impossible.',
    metrics: [
      { label: 'Isolation Index', value: 'Level 5 (Max)', base: null, unit: '' },
      { label: 'Encryption Standard', value: 'Post-Quantum 8K', base: null, unit: '' },
      { label: 'Zero-Knowledge Probe', value: '100% Secure', base: null, unit: '' },
    ],
    signalColor: '#d4b4f8',
    status: 'CRYPTOGRAPHY // STATE_LOCK_ACTIVE',
    busCode: 'BUS_04: SUBATOMIC_SPIN_LOCK',
    systemState: 'SECURITY LEVEL 5',
    quickTelemetry: 'POST-QUANTUM 8K',
    logMessage: '0xC4 // QUANTUM_LATTICE_COHERENCE_OK',
    diagnosticMode: 'DUAL_SPIN_ENTANGLEMENT_LOCK',
  },
]

// Streaming diagnostic logs cycled procedurally
const LOG_MESSAGES = [
  '0x7F // TOPOLOGY_HARMONIC_VERIFIED',
  '0xA2 // SIGNAL_COHERENCE_LOCK',
  '0x31 // ENTROPY_FIELD_STABLE',
  '0xC4 // QUANTUM_LATTICE_COHERENCE_OK',
  '0x5E // PARALLEL_TENSOR_BUS_OPTIMAL',
  '0xD8 // MULTI_MODAL_TELEMETRY_SYNC',
]

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const isVisibleRef = useRef(true)
  
  // DOM refs for zero-render live telemetry updates
  const metricElsRef = useRef([])
  const statusLogRef = useRef(null)
  const systemStateRef = useRef(null)
  const nodeButtonsRef = useRef([])

  const activeCap = CAPABILITIES[activeIndex]

  // Transition controller
  const handleNodeSelect = useCallback((index) => {
    if (index === activeIndex) return
    const targetCap = CAPABILITIES[index]
    
    // Play bespoke synthesized acoustic profile
    sound.playCapabilitySelect(targetCap.id)
    
    // Start brief diagnostic transition (~400ms)
    setIsTransitioning(true)
    setActiveIndex(index)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 450)
  }, [activeIndex])

  const handleNodeHover = () => {
    sound.playHover()
  }

  // WAI-ARIA Keyboard navigation between capability nodes
  const handleKeyDown = (e, index) => {
    let nextIndex = index
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      nextIndex = (index + 1) % CAPABILITIES.length
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      nextIndex = (index - 1 + CAPABILITIES.length) % CAPABILITIES.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = CAPABILITIES.length - 1
    }

    if (nextIndex !== index) {
      handleNodeSelect(nextIndex)
      nodeButtonsRef.current[nextIndex]?.focus()
    }
  }

  // IntersectionObserver pauses Canvas RAF when section is off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  /* ──────────────────────────────────────────────────────────
     FOUR BESPOKE 2D CANVAS VISUALIZERS (Zero Garbage Collection)
     ────────────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0
    let lastMetricJitter = 0
    let lastLogRotate = 0
    let logIndex = 0

    // Pre-allocated static coordinates for Quantum Mesh (25 nodes)
    const meshCols = 5
    const meshRows = 5
    const meshNodes = []
    for (let r = 0; r < meshRows; r++) {
      for (let c = 0; c < meshCols; c++) {
        meshNodes.push({
          relX: (c + 0.5) / meshCols,
          relY: (r + 0.5) / meshRows,
          phase: (c * 7 + r * 11) % 19,
        })
      }
    }

    // Pre-allocated reasoning tree nodes
    const reasoningTree = [
      { id: 'root', xRel: 0.12, yRel: 0.5, tier: 0 },
      { id: 't1a',  xRel: 0.35, yRel: 0.32, tier: 1, parent: 0 },
      { id: 't1b',  xRel: 0.35, yRel: 0.68, tier: 1, parent: 0 },
      { id: 't2a',  xRel: 0.62, yRel: 0.20, tier: 2, parent: 1 },
      { id: 't2b',  xRel: 0.62, yRel: 0.42, tier: 2, parent: 1 },
      { id: 't2c',  xRel: 0.62, yRel: 0.58, tier: 2, parent: 2 },
      { id: 't2d',  xRel: 0.62, yRel: 0.80, tier: 2, parent: 2 },
      { id: 't3a',  xRel: 0.88, yRel: 0.14, tier: 3, parent: 3 },
      { id: 't3b',  xRel: 0.88, yRel: 0.32, tier: 3, parent: 4 },
      { id: 't3c',  xRel: 0.88, yRel: 0.50, tier: 3, parent: 4 },
      { id: 't3d',  xRel: 0.88, yRel: 0.68, tier: 3, parent: 5 },
      { id: 't3e',  xRel: 0.88, yRel: 0.86, tier: 3, parent: 6 },
    ]

    /* ── Render 01: Quantum Mesh Matrix ── */
    const drawQuantumMesh = (w, h, t, color) => {
      // Background subtle perspective grid
      const horizonY = h * 0.18
      const vanishX = w * 0.5

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.lineWidth = 1
      for (let i = 0; i <= 6; i++) {
        const rayX = (w / 6) * i
        ctx.beginPath()
        ctx.moveTo(vanishX, horizonY)
        ctx.lineTo(rayX, h)
        ctx.stroke()
      }

      // Interconnecting lattice vectors
      ctx.strokeStyle = 'rgba(184, 200, 232, 0.14)'
      ctx.lineWidth = 1
      for (let r = 0; r < meshRows; r++) {
        for (let c = 0; c < meshCols; c++) {
          const idx = r * meshCols + c
          const node = meshNodes[idx]
          const x = node.relX * w + Math.sin(t * 1.5 + node.phase) * 6
          const y = horizonY + (node.relY * (h - horizonY)) + Math.cos(t * 1.2 + node.phase) * 4

          // Connect to right neighbor
          if (c < meshCols - 1) {
            const nextNode = meshNodes[idx + 1]
            const nextX = nextNode.relX * w + Math.sin(t * 1.5 + nextNode.phase) * 6
            const nextY = horizonY + (nextNode.relY * (h - horizonY)) + Math.cos(t * 1.2 + nextNode.phase) * 4
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(nextX, nextY)
            ctx.stroke()
          }

          // Connect to bottom neighbor
          if (r < meshRows - 1) {
            const bottomNode = meshNodes[idx + meshCols]
            const bX = bottomNode.relX * w + Math.sin(t * 1.5 + bottomNode.phase) * 6
            const bY = horizonY + (bottomNode.relY * (h - horizonY)) + Math.cos(t * 1.2 + bottomNode.phase) * 4
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(bX, bY)
            ctx.stroke()
          }
        }
      }

      // Traveling active tensor route
      const activeRoute = [0, 6, 12, 18, 24]
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.shadowColor = color
      ctx.shadowBlur = 10
      ctx.beginPath()
      for (let i = 0; i < activeRoute.length; i++) {
        const node = meshNodes[activeRoute[i]]
        const x = node.relX * w + Math.sin(t * 1.5 + node.phase) * 6
        const y = horizonY + (node.relY * (h - horizonY)) + Math.cos(t * 1.2 + node.phase) * 4
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Traveling tensor data packet
      const packetCycle = (t * 1.8) % 4
      const segIndex = Math.floor(packetCycle)
      const segT = packetCycle - segIndex
      const n1 = meshNodes[activeRoute[segIndex]]
      const n2 = meshNodes[activeRoute[segIndex + 1]]
      const x1 = n1.relX * w + Math.sin(t * 1.5 + n1.phase) * 6
      const y1 = horizonY + (n1.relY * (h - horizonY)) + Math.cos(t * 1.2 + n1.phase) * 4
      const x2 = n2.relX * w + Math.sin(t * 1.5 + n2.phase) * 6
      const y2 = horizonY + (n2.relY * (h - horizonY)) + Math.cos(t * 1.2 + n2.phase) * 4

      const px = x1 + (x2 - x1) * segT
      const py = y1 + (y2 - y1) * segT

      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = color
      ctx.shadowBlur = 12
      ctx.beginPath()
      ctx.arc(px, py, 4.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Render vertex dots
      ctx.fillStyle = color
      for (let i = 0; i < meshNodes.length; i++) {
        const node = meshNodes[i]
        const x = node.relX * w + Math.sin(t * 1.5 + node.phase) * 6
        const y = horizonY + (node.relY * (h - horizonY)) + Math.cos(t * 1.2 + node.phase) * 4
        ctx.beginPath()
        ctx.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    /* ── Render 02: Zero-Latency Perception ── */
    const drawZeroLatency = (w, h, t, color) => {
      const centerY = h * 0.5

      // Cyber background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.lineWidth = 1
      const step = 28
      for (let x = 0; x < w; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }

      // Vertical sensor acquisition gates
      const gates = [w * 0.22, w * 0.45, w * 0.68, w * 0.88]
      ctx.strokeStyle = 'rgba(136, 168, 248, 0.22)'
      ctx.setLineDash([3, 5])
      for (let i = 0; i < gates.length; i++) {
        ctx.beginPath()
        ctx.moveTo(gates[i], 20)
        ctx.lineTo(gates[i], h - 20)
        ctx.stroke()
      }
      ctx.setLineDash([])

      // High-frequency oscilloscope carrier stream
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.shadowColor = color
      ctx.shadowBlur = 10
      ctx.beginPath()
      for (let x = 0; x < w; x += 2) {
        const freqEnvelope = Math.sin((x / w) * Math.PI)
        const y = centerY +
          Math.sin(x * 0.055 + t * 14) * 22 * freqEnvelope +
          Math.sin(x * 0.12 - t * 8) * 8 * freqEnvelope
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Sweeping radar scan line
      const sweepX = (t * 180) % w
      const sweepGrad = ctx.createLinearGradient(sweepX - 50, 0, sweepX, 0)
      sweepGrad.addColorStop(0, 'rgba(136, 168, 248, 0)')
      sweepGrad.addColorStop(1, 'rgba(136, 168, 248, 0.35)')
      ctx.fillStyle = sweepGrad
      ctx.fillRect(Math.max(0, sweepX - 50), 10, 50, h - 20)

      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(sweepX, 10)
      ctx.lineTo(sweepX, h - 10)
      ctx.stroke()

      // Sensor blips on gate intersection
      for (let i = 0; i < gates.length; i++) {
        const dist = Math.abs(sweepX - gates[i])
        if (dist < 30) {
          const intensity = 1 - dist / 30
          ctx.strokeStyle = color
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(gates[i], centerY, 8 + (1 - intensity) * 14, 0, Math.PI * 2)
          ctx.stroke()

          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(gates[i], centerY, 3.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    /* ── Render 03: Autonomous Reasoning ── */
    const drawAutonomousReasoning = (w, h, t, color) => {
      // Connect nodes via smooth bezier inference arcs
      ctx.lineWidth = 1.5
      for (let i = 1; i < reasoningTree.length; i++) {
        const node = reasoningTree[i]
        const parent = reasoningTree[node.parent]
        const x1 = parent.xRel * w
        const y1 = parent.yRel * h
        const x2 = node.xRel * w
        const y2 = node.yRel * h

        // Active dominant inference path pulse
        const isDominant = (Math.floor(t * 0.4) % 3) === (i % 3)
        ctx.strokeStyle = isDominant ? color : 'rgba(120, 216, 208, 0.22)'

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.bezierCurveTo(x1 + (x2 - x1) * 0.5, y1, x1 + (x2 - x1) * 0.5, y2, x2, y2)
        ctx.stroke()

        // Flowing decision pulse
        if (isDominant) {
          const pt = (t * 2 + i * 0.3) % 1
          const bX = (1 - pt) * (1 - pt) * x1 + 2 * (1 - pt) * pt * (x1 + (x2 - x1) * 0.5) + pt * pt * x2
          const bY = (1 - pt) * (1 - pt) * y1 + 2 * (1 - pt) * pt * y1 + pt * pt * y2
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(bX, bY, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw synaptic decision nodes
      for (let i = 0; i < reasoningTree.length; i++) {
        const node = reasoningTree[i]
        const x = node.xRel * w
        const y = node.yRel * h
        const pulse = Math.sin(t * 3 + i) * 1.5

        ctx.fillStyle = node.tier === 0 ? '#ffffff' : color
        ctx.beginPath()
        ctx.arc(x, y, (node.tier === 0 ? 5 : 3.5) + pulse, 0, Math.PI * 2)
        ctx.fill()

        // Outer reticle for terminal decision nodes
        if (node.tier === 3) {
          ctx.strokeStyle = 'rgba(120, 216, 208, 0.4)'
          ctx.beginPath()
          ctx.arc(x, y, 7 + pulse * 2, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    }

    /* ── Render 04: Entanglement Cryptography ── */
    const drawEntanglementCrypto = (w, h, t, color) => {
      const centerY = h * 0.5
      const leftCoreX = w * 0.32
      const rightCoreX = w * 0.68
      const radius = Math.min(w * 0.12, 42)

      // Quantum entangled phase-locked bridge
      ctx.strokeStyle = 'rgba(212, 180, 248, 0.35)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      for (let x = leftCoreX; x <= rightCoreX; x += 2) {
        const y1 = centerY + Math.sin((x - leftCoreX) * 0.08 + t * 6) * 10
        if (x === leftCoreX) ctx.moveTo(x, y1)
        else ctx.lineTo(x, y1)
      }
      ctx.stroke()

      ctx.beginPath()
      for (let x = leftCoreX; x <= rightCoreX; x += 2) {
        const y2 = centerY - Math.sin((x - leftCoreX) * 0.08 + t * 6) * 10
        if (x === leftCoreX) ctx.moveTo(x, y2)
        else ctx.lineTo(x, y2)
      }
      ctx.stroke()

      // Function to render rotating quantum spin dial
      const renderSpinDial = (cx, dir) => {
        // Outer segmented ring
        ctx.strokeStyle = 'rgba(212, 180, 248, 0.3)'
        ctx.lineWidth = 1.5
        ctx.setLineDash([8, 6])
        ctx.beginPath()
        ctx.arc(cx, centerY, radius + 12, t * dir * 1.2, t * dir * 1.2 + Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])

        // Inner solid core ring
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(cx, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()

        // Rotating quantum spin vector line
        const angle = t * dir * 2.2
        const vx = cx + Math.cos(angle) * (radius - 6)
        const vy = centerY + Math.sin(angle) * (radius - 6)
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(cx, centerY)
        ctx.lineTo(vx, vy)
        ctx.stroke()

        // Center spin point
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(cx, centerY, 4, 0, Math.PI * 2)
        ctx.fill()

        // Tactical 4-corner lock brackets
        const bSize = radius + 20
        ctx.strokeStyle = 'rgba(212, 180, 248, 0.45)'
        ctx.lineWidth = 1
        // Top-left
        ctx.beginPath(); ctx.moveTo(cx - bSize, centerY - bSize + 8); ctx.lineTo(cx - bSize, centerY - bSize); ctx.lineTo(cx - bSize + 8, centerY - bSize); ctx.stroke()
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(cx + bSize, centerY + bSize - 8); ctx.lineTo(cx + bSize, centerY + bSize); ctx.lineTo(cx + bSize - 8, centerY + bSize); ctx.stroke()
      }

      renderSpinDial(leftCoreX, 1)
      renderSpinDial(rightCoreX, -1)
    }

    /* ── Main Canvas RAF Loop ── */
    const render = () => {
      if (document.hidden || !isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      time += 0.02
      const width = (canvas.width = canvas.parentElement?.clientWidth || 400)
      const height = (canvas.height = window.innerWidth <= 768 ? 180 : 240)

      ctx.clearRect(0, 0, width, height)

      // Background subtle cyber scanlines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)'
      ctx.lineWidth = 1
      for (let y = 0; y < height; y += 12) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
      }

      // Render the domain-specific visualizer for activeIndex
      const color = activeCap.signalColor
      if (activeIndex === 0) drawQuantumMesh(width, height, time, color)
      else if (activeIndex === 1) drawZeroLatency(width, height, time, color)
      else if (activeIndex === 2) drawAutonomousReasoning(width, height, time, color)
      else if (activeIndex === 3) drawEntanglementCrypto(width, height, time, color)

      // ── Zero-Render Simulated Live Telemetry Jitter ──
      // Updates DOM text directly every ~1.2 seconds without triggering React state
      if (time - lastMetricJitter > 1.2) {
        lastMetricJitter = time
        activeCap.metrics.forEach((m, idx) => {
          const el = metricElsRef.current[idx]
          if (!el) return
          if (m.base !== null && m.base !== undefined) {
            if (m.isInt) {
              const delta = (Math.random() - 0.5) * 8
              el.textContent = Math.round(m.base + delta).toLocaleString() + m.unit
            } else {
              const variance = (Math.random() - 0.5) * (m.base * 0.003)
              el.textContent = (m.base + variance).toFixed(m.decimals) + m.unit
            }
          }
        })
      }

      // Rotate live streaming diagnostic log every ~3.5s
      if (time - lastLogRotate > 3.5) {
        lastLogRotate = time
        logIndex = (logIndex + 1) % LOG_MESSAGES.length
        if (statusLogRef.current) {
          statusLogRef.current.textContent = LOG_MESSAGES[logIndex]
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [activeIndex, activeCap])

  /* ── Subtle GSAP Section Entry Choreography ── */
  const capabilitiesRef = useGSAP((gsap, element) => {
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
      '.capabilities__header',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0
    )

    tl.fromTo(
      '.capabilities__node',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.65, ease: 'power2.out' },
      0.12
    )

    tl.fromTo(
      '.capabilities__panel',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
      0.18
    )
  }, [])

  return (
    <section
      ref={(el) => {
        sectionRef.current = el
        capabilitiesRef.current = el
      }}
      id="capabilities"
      className="capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="capabilities__inner">

        {/* Section Index Header */}
        <div className="capabilities__header">
          <div className="capabilities__index" aria-hidden="true">
            <span className="capabilities__index-num">02</span>
            <span className="capabilities__index-rule" />
            <span className="capabilities__index-label">CAPABILITIES // NEURAL DIAGNOSTIC CONSOLE</span>
          </div>

          <h2 id="capabilities-heading" className="capabilities__title">
            SUB-ATOMIC NEURAL TOPOLOGY
          </h2>

          <p className="capabilities__subtitle">
            Architected to transcend scalar compute limits through dynamic multi-dimensional tensor routing and zero-latency sensor fusion.
          </p>
        </div>

        {/* Tactical Layout: Nodes + Signal Bus + Diagnostic Inspection Panel */}
        <div className={`capabilities__grid ${isTransitioning ? 'capabilities__grid--switching' : ''}`}>

          {/* Tactical Nodes List */}
          <div className="capabilities__nodes" role="tablist" aria-label="AETHER Neural Subsystems">
            {CAPABILITIES.map((cap, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={cap.id}
                  ref={(el) => (nodeButtonsRef.current[index] = el)}
                  id={`cap-tab-${cap.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`cap-panel-${cap.id}`}
                  tabIndex={0}
                  className={[
                    'capabilities__node',
                    isActive ? 'capabilities__node--active' : 'capabilities__node--standby',
                  ].join(' ')}
                  onClick={() => handleNodeSelect(index)}
                  onMouseEnter={handleNodeHover}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  {/* Tactical Corner Brackets */}
                  <span className="capabilities__node-corner capabilities__node-corner--tl" aria-hidden="true" />
                  <span className="capabilities__node-corner capabilities__node-corner--tr" aria-hidden="true" />
                  <span className="capabilities__node-corner capabilities__node-corner--bl" aria-hidden="true" />
                  <span className="capabilities__node-corner capabilities__node-corner--br" aria-hidden="true" />

                  {/* Node Header */}
                  <div className="capabilities__node-header">
                    <div className="capabilities__node-id-group">
                      <span className="capabilities__node-num">[{cap.num}]</span>
                      <span
                        className="capabilities__node-bus"
                        style={{ color: isActive ? cap.signalColor : undefined }}
                      >
                        {isActive ? 'ACTIVE BUS' : 'STANDBY'}
                      </span>
                    </div>
                    <span
                      className="capabilities__node-status"
                      style={{ borderColor: isActive ? cap.signalColor : undefined }}
                    >
                      <span
                        className="capabilities__node-status-dot"
                        style={{ backgroundColor: isActive ? cap.signalColor : '#4a5568' }}
                      />
                      {cap.status}
                    </span>
                  </div>

                  {/* Node Title */}
                  <h3 className="capabilities__node-title">{cap.title}</h3>

                  {/* Tagline */}
                  <div className="capabilities__node-tagline">{cap.tagline}</div>

                  {/* Expanded Content for Dominant Active Node */}
                  {isActive && (
                    <div className="capabilities__node-expanded">
                      <p className="capabilities__node-desc">{cap.desc}</p>
                      <div className="capabilities__node-quick-telemetry">
                        <span className="capabilities__node-quick-label">TELEMETRY STREAM:</span>
                        <span className="capabilities__node-quick-val" style={{ color: cap.signalColor }}>
                          {cap.quickTelemetry}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Node Footer Indicator */}
                  <div className="capabilities__node-footer">
                    <span className="capabilities__node-indicator">
                      {isActive ? 'DIAGNOSTIC LINK ACTIVE // ROUTED' : 'INTERROGATE SUBSYSTEM'}
                    </span>
                    <span className="capabilities__node-port-indicator">
                      {isActive ? '● BUS_ONLINE' : '○ ARMED'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Hardware Signal Routing Rail (Desktop SVG) */}
          <div className="capabilities__bus-rail" aria-hidden="true">
            <svg className="capabilities__bus-svg" viewBox="0 0 44 380" preserveAspectRatio="none">
              {[0, 1, 2, 3].map((i) => {
                const startY = 48 + i * 88
                const endY = 190
                const isThisActive = i === activeIndex
                return (
                  <g key={i}>
                    <path
                      d={`M 0,${startY} C 22,${startY} 22,${endY} 44,${endY}`}
                      fill="none"
                      stroke={isThisActive ? activeCap.signalColor : 'rgba(255, 255, 255, 0.08)'}
                      strokeWidth={isThisActive ? 2 : 1}
                      strokeDasharray={isThisActive ? '4,4' : '2,6'}
                      className={isThisActive ? 'capabilities__bus-active-track' : ''}
                    />
                    {isThisActive && (
                      <circle
                        r="3.5"
                        fill={activeCap.signalColor}
                        className="capabilities__bus-pulse"
                      >
                        <animateMotion
                          path={`M 0,${startY} C 22,${startY} 22,${endY} 44,${endY}`}
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Central Diagnostic Inspection Panel */}
          <div
            id={`cap-panel-${activeCap.id}`}
            role="tabpanel"
            aria-labelledby={`cap-tab-${activeCap.id}`}
            className="capabilities__panel"
          >
            {/* Panel Tactical Corner Markers */}
            <span className="capabilities__panel-corner capabilities__panel-corner--tl" aria-hidden="true" />
            <span className="capabilities__panel-corner capabilities__panel-corner--tr" aria-hidden="true" />
            <span className="capabilities__panel-corner capabilities__panel-corner--bl" aria-hidden="true" />
            <span className="capabilities__panel-corner capabilities__panel-corner--br" aria-hidden="true" />

            {/* System State Header */}
            <div className="capabilities__panel-header">
              <div className="capabilities__panel-status">
                <span className="capabilities__status-dot" style={{ backgroundColor: activeCap.signalColor }} />
                <span className="capabilities__status-label">SYSTEM STATE:</span>
                <span ref={systemStateRef} className="capabilities__status-val" style={{ color: activeCap.signalColor }}>
                  {activeCap.systemState}
                </span>
              </div>
              <span className="capabilities__panel-id">{activeCap.busCode}</span>
            </div>

            {/* Visualizer Canvas Frame */}
            <div className="capabilities__canvas-wrapper">
              <div className="capabilities__canvas-reticle" aria-hidden="true">
                <span className="capabilities__canvas-mode-label">
                  MODE // {activeCap.diagnosticMode}
                </span>
                <span className="capabilities__canvas-fps">60 FPS // SYNCHRONOUS</span>
              </div>
              <canvas ref={canvasRef} className="capabilities__canvas" />
            </div>

            {/* Metrics Breakdown Array */}
            <div className="capabilities__metrics">
              {activeCap.metrics.map((m, idx) => (
                <div key={m.label} className="capabilities__metric-item">
                  <div className="capabilities__metric-header">
                    <span className="capabilities__metric-label">{m.label}</span>
                    <span className="capabilities__metric-index">0{idx + 1}</span>
                  </div>
                  <span
                    ref={(el) => (metricElsRef.current[idx] = el)}
                    className="capabilities__metric-value"
                    style={{ color: activeCap.signalColor }}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Streaming Diagnostic Log */}
            <div className="capabilities__panel-footer">
              <div className="capabilities__footer-log-stream">
                <span className="capabilities__footer-log-dot" />
                <span ref={statusLogRef} className="capabilities__footer-code">
                  {activeCap.logMessage}
                </span>
              </div>
              <span className="capabilities__footer-time">DIAG_SYS: VERIFIED_OK</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
