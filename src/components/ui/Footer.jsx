/* =============================================================
   AETHER — Footer Component
   Futuristic footer with live UTC clock, system build status,
   sound audio toggle, and dispatch newsletter input.
   ============================================================= */

import { useState, useEffect } from 'react'
import { sound } from '../../utils/sound'
import { NAV_LINKS } from '../../utils/constants'
import './Footer.css'

export default function Footer() {
  const [utcTime, setUtcTime] = useState('')
  const [isMuted, setIsMuted] = useState(sound.isMuted())
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  /* Update UTC clock every second */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setUtcTime(now.toUTCString().split(' ')[4] + ' UTC')
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleToggleSound = () => {
    const muted = sound.toggleMute()
    setIsMuted(muted)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    sound.playClick()
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">

        {/* Top Section */}
        <div className="footer__top">

          {/* Logo & Vision */}
          <div className="footer__brand">
            <a href="#hero" className="footer__logo">AETHER</a>
            <p className="footer__tagline">
              Intelligence Beyond the Visible.
              <br />
              Sub-atomic neural matrix topology.
            </p>
            <div className="footer__time-badge">
              <span className="footer__time-dot" />
              <span>TIME: {utcTime}</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="footer__nav">
            <span className="footer__nav-title">SYSTEM NAVIGATION</span>
            <ul className="footer__nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="footer__nav-link" onClick={() => sound.playClick()}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Dispatch Input */}
          <div className="footer__dispatch">
            <span className="footer__nav-title">SYSTEM DISPATCHES</span>
            <p className="footer__dispatch-text">
              Subscribe to sub-atomic model research logs and system updates.
            </p>

            {subscribed ? (
              <div className="footer__dispatch-success">
                &check; SUBSCRIBED TO QUANTUM DISPATCHES
              </div>
            ) : (
              <form className="footer__dispatch-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder="enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer__dispatch-input"
                />
                <button type="submit" className="footer__dispatch-btn">
                  JOIN &rarr;
                </button>
              </form>
            )}

            {/* Sound Synthesizer Control */}
            <div className="footer__sound-toggle">
              <button
                className={['footer__sound-btn', isMuted ? 'footer__sound-btn--muted' : ''].join(' ')}
                onClick={handleToggleSound}
                aria-label="Toggle UI audio effects"
              >
                <span className="footer__sound-icon">{isMuted ? '🔇' : '🔊'}</span>
                <span>UI SOUND SYNTH: {isMuted ? 'OFF' : 'ON'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <div className="footer__status">
            <span>KERNEL: v4.0.9-QUANTUM</span>
            <span>&bull;</span>
            <span>COHERENCE: 99.994%</span>
            <span>&bull;</span>
            <span>LEVEL 5 SECURITY</span>
          </div>

          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} AETHER LABS. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  )
}
