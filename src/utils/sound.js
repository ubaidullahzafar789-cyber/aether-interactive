/* =============================================================
   AETHER — Sound Synthesizer (Web Audio API)
   Pure procedural browser sound synthesis for futuristic audio feedback.
   No external MP3/WAV assets required.
   ============================================================= */

class SoundController {
  constructor() {
    this.ctx = null
    this.muted = false
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playHover() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // Ignore audio context autoplay restrictions
    }
  }

  playClick() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(960, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.06)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.06)
    } catch {
      // Ignore audio restrictions
    }
  }

  playTerminalKey() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      const freq = 600 + Math.random() * 400
      osc.type = 'square'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.02)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.02)
    } catch {
      // Ignore audio restrictions
    }
  }

  playModalOpen() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(300, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.15)

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.15)
    } catch {
      // Ignore
    }
  }

  playCapabilitySelect(capabilityId) {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    const t = this.ctx.currentTime
    try {
      if (capabilityId === 'quantum-mesh') {
        // Short resonant harmonic pulse (chime)
        const osc1 = this.ctx.createOscillator()
        const osc2 = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc1.type = 'sine'
        osc2.type = 'sine'
        osc1.frequency.setValueAtTime(520, t)
        osc1.frequency.exponentialRampToValueAtTime(1040, t + 0.05)
        osc2.frequency.setValueAtTime(780, t)
        osc2.frequency.exponentialRampToValueAtTime(1560, t + 0.05)

        gain.gain.setValueAtTime(0.03, t)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(this.ctx.destination)

        osc1.start(t)
        osc2.start(t)
        osc1.stop(t + 0.06)
        osc2.stop(t + 0.06)
      } else if (capabilityId === 'zero-latency') {
        // Crisp dual chirp (snappy micro-bursts)
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(1400, t)
        osc.frequency.exponentialRampToValueAtTime(700, t + 0.025)
        osc.frequency.setValueAtTime(2100, t + 0.03)
        osc.frequency.exponentialRampToValueAtTime(1050, t + 0.055)

        gain.gain.setValueAtTime(0.035, t)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(t)
        osc.stop(t + 0.06)
      } else if (capabilityId === 'autonomous-cognition') {
        // Layered ascending pulse (warm stepped ascent)
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(420, t)
        osc.frequency.exponentialRampToValueAtTime(640, t + 0.03)
        osc.frequency.exponentialRampToValueAtTime(920, t + 0.065)

        gain.gain.setValueAtTime(0.03, t)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(t)
        osc.stop(t + 0.07)
      } else if (capabilityId === 'entanglement-crypto') {
        // Low sub-harmonic lock pulse (resonant lock)
        const osc = this.ctx.createOscillator()
        const sub = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'triangle'
        sub.type = 'sine'
        osc.frequency.setValueAtTime(260, t)
        osc.frequency.exponentialRampToValueAtTime(130, t + 0.06)
        sub.frequency.setValueAtTime(80, t)
        sub.frequency.exponentialRampToValueAtTime(40, t + 0.075)

        gain.gain.setValueAtTime(0.045, t)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08)

        osc.connect(gain)
        sub.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(t)
        sub.start(t)
        osc.stop(t + 0.08)
        sub.stop(t + 0.08)
      } else {
        this.playClick()
      }
    } catch {
      // Ignore audio restriction errors
    }
  }

  toggleMute() {
    this.muted = !this.muted
    return this.muted
  }

  isMuted() {
    return this.muted
  }
}

export const sound = new SoundController()
