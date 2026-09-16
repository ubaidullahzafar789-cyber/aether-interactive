/* =============================================================
   AETHER — Interactive CLI Simulator Section
   In-browser interactive terminal for running synthetic commands.
   ============================================================= */

import { useState, useRef, useEffect } from 'react'
import { sound } from '../utils/sound'
import { useGSAP } from '../hooks/useGSAP'
import './Terminal.css'

const INITIAL_LOGS = [
  { type: 'sys', text: 'AETHER SYNTHETIC KERNEL v4.0.9 (x86_64-quantum-linux)' },
  { type: 'sys', text: 'INITIALIZING SUB-ATOMIC NEURAL MATRIX... DONE.' },
  { type: 'sys', text: 'TYPE "help" OR CLICK PRESET ACTIONS TO INTERACT.' },
  { type: 'sys', text: '---------------------------------------------------------' },
]

export default function Terminal() {
  const [inputVal, setInputVal] = useState('')
  const [logs, setLogs] = useState(INITIAL_LOGS)
  const [isProcessing, setIsProcessing] = useState(false)
  const logEndRef = useRef(null)
  const inputRef = useRef(null)

  /* Auto-scroll to bottom of logs */
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs, isProcessing])

  const executeCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase()
    if (!cmd) return

    sound.playClick()

    // Add user command log
    const userLog = { type: 'user', text: `aether@mesh:~ $ ${cmdStr}` }
    setLogs((prev) => [...prev, userLog])
    setInputVal('')

    setIsProcessing(true)

    setTimeout(() => {
      let outputLogs = []

      switch (cmd) {
        case 'help':
          outputLogs = [
            { type: 'out', text: 'AVAILABLE AETHER COMMANDS:' },
            { type: 'out', text: '  status       - View live cluster telemetry & coherence scores' },
            { type: 'out', text: '  analyze      - Initiate deep sub-atomic tensor scan' },
            { type: 'out', text: '  quantum-scan - Scan orbital entanglement relays' },
            { type: 'out', text: '  synthesize   - Generate synthetic thought hypothesis' },
            { type: 'out', text: '  version      - Print kernel build architecture' },
            { type: 'out', text: '  matrix       - Render live vector flux streams' },
            { type: 'out', text: '  clear        - Reset terminal window history' },
          ]
          break

        case 'status':
          outputLogs = [
            { type: 'out', text: '=== AETHER KERNEL STATUS READOUT ===' },
            { type: 'out', text: 'COHERENCE RATE  : 99.994% [OPTIMAL]' },
            { type: 'out', text: 'ACTIVE VECTORS  : 1,048,576 TENSORS' },
            { type: 'out', text: 'BUS LATENCY     : 0.08ms' },
            { type: 'out', text: 'ACTIVE NODES    : 4 GLOBAL RELAYS (ALPHA, BETA, GAMMA, DELTA)' },
            { type: 'out', text: 'SECURITY INDEX  : LEVEL 5 (ENTANGLED LOCK)' },
          ]
          break

        case 'analyze':
          outputLogs = [
            { type: 'out', text: '[SCANNING] Processing 10.4 PFLOPS neural array...' },
            { type: 'out', text: '[SCANNING] Entanglement verified across 4,096 logic layers.' },
            { type: 'out', text: '[RESULT]   Zero phase drift detected. System operating at max efficiency.' },
          ]
          break

        case 'quantum-scan':
          outputLogs = [
            { type: 'out', text: '[QUANTUM SCAN] Ping sent to NORAD Orbital & Zurich Nodes...' },
            { type: 'out', text: '-> NODE 01 (NORAD)   : 0.04ms | 99.99% Coherence' },
            { type: 'out', text: '-> NODE 02 (ZURICH)  : 0.07ms | 99.98% Coherence' },
            { type: 'out', text: '-> NODE 03 (TOKYO)   : 0.05ms | 99.99% Coherence' },
            { type: 'out', text: '-> NODE 04 (PACIFIC) : 0.11ms | 99.95% Coherence' },
          ]
          break

        case 'synthesize':
          outputLogs = [
            { type: 'out', text: '[SYNTHESIZING] Evaluating non-linear solution space...' },
            { type: 'out', text: 'HYPOTHESIS: "Sub-atomic neural topology resolves continuous entropy in O(1) time."' },
          ]
          break

        case 'version':
          outputLogs = [
            { type: 'out', text: 'AETHER Kernel Build: v4.0.9-release-quantum' },
            { type: 'out', text: 'Compiler: Sub-Atomic Rust/C++ Vector Toolchain' },
          ]
          break

        case 'matrix':
          outputLogs = [
            { type: 'out', text: '01000001 01000101 01010100 01001000 01000101 01010010' },
            { type: 'out', text: '[VECTOR FLUX Stream active: 14.8 PB/s]' },
          ]
          break

        case 'clear':
          setLogs(INITIAL_LOGS)
          setIsProcessing(false)
          return

        default:
          outputLogs = [
            { type: 'err', text: `Command not recognized: "${cmdStr}". Type "help" for valid commands.` },
          ]
          break
      }

      setLogs((prev) => [...prev, ...outputLogs])
      setIsProcessing(false)
    }, 250)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    executeCommand(inputVal)
  }

  const handleInputChange = (e) => {
    setInputVal(e.target.value)
    sound.playTerminalKey()
  }

  /* ── GSAP Scroll-Reveal Choreography ── */
  const terminalRef = useGSAP((gsap, element) => {
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
      '.terminal__header',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0
    )

    tl.fromTo(
      '.terminal__window',
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
      0.1
    )

    tl.fromTo(
      '.terminal__presets',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      0.18
    )
  }, [])

  return (
    <section
      ref={terminalRef}
      id="terminal"
      className="terminal"
      aria-labelledby="terminal-heading"
    >
      <div className="terminal__inner">

        {/* Section Header */}
        <div className="terminal__header">
          <div className="terminal__index" aria-hidden="true">
            <span className="terminal__index-num">05</span>
            <span className="terminal__index-rule" />
            <span className="terminal__index-label">INTERFACE</span>
          </div>

          <h2 id="terminal-heading" className="terminal__title">
            SYNTHETIC CLI SIMULATOR
          </h2>
          <p className="terminal__subtitle">
            Query the AETHER core directly in your browser via quantum terminal commands.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="terminal__window">

          {/* Window Bar */}
          <div className="terminal__window-bar">
            <div className="terminal__window-dots">
              <span className="terminal__dot terminal__dot--red" />
              <span className="terminal__dot terminal__dot--yellow" />
              <span className="terminal__dot terminal__dot--green" />
            </div>
            <span className="terminal__window-title">aether-kernel-cli — bash — 80x24</span>
            <span className="terminal__window-status">ENCRYPTED</span>
          </div>

          {/* Log Stream */}
          <div className="terminal__body" onClick={() => inputRef.current?.focus()}>
            {logs.map((log, index) => (
              <div
                key={index}
                className={[
                  'terminal__line',
                  log.type === 'user' ? 'terminal__line--user' : '',
                  log.type === 'err' ? 'terminal__line--err' : '',
                  log.type === 'sys' ? 'terminal__line--sys' : '',
                ].join(' ')}
              >
                {log.text}
              </div>
            ))}

            {isProcessing && (
              <div className="terminal__line terminal__line--sys">
                [SYNTHESIZING THOUGHT VECTOR...]
              </div>
            )}

            <div ref={logEndRef} />
          </div>

          {/* Input Form */}
          <form className="terminal__input-row" onSubmit={handleSubmit}>
            <span className="terminal__prompt">aether@mesh:~ $</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal__input"
              value={inputVal}
              onChange={handleInputChange}
              placeholder="type 'help', 'status', 'analyze'..."
              spellCheck="false"
              autoComplete="off"
            />
            <button type="submit" className="terminal__submit-btn">
              RUN
            </button>
          </form>

        </div>

        {/* Quick Action Presets */}
        <div className="terminal__presets">
          <span className="terminal__presets-title">QUICK ACTIONS:</span>
          <div className="terminal__preset-btns">
            {['status', 'analyze', 'quantum-scan', 'synthesize', 'clear'].map((cmd) => (
              <button
                key={cmd}
                className="terminal__preset-btn"
                onClick={() => executeCommand(cmd)}
                onMouseEnter={() => sound.playHover()}
              >
                [{cmd.toUpperCase()}]
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
