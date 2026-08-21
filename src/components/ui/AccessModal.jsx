/* =============================================================
   AETHER — AccessModal Component
   Interactive request clearance modal with simulated security key generation.
   ============================================================= */

import { useState, useEffect } from 'react'
import { sound } from '../../utils/sound'
import Button from './Button'
import './AccessModal.css'

export default function AccessModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    clearance: 'Tier 2: Enterprise Matrix',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'generating' | 'success'
  const [accessKey, setAccessKey] = useState('')

  /* Lock body scroll & handle Escape key while modal is open */
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sound.playModalOpen()
    setStatus('generating')

    setTimeout(() => {
      // Generate simulated quantum clearance key
      const part1 = Math.random().toString(36).substring(2, 6).toUpperCase()
      const part2 = Math.random().toString(36).substring(2, 6).toUpperCase()
      const generatedKey = `AETH-KEY-${part1}-${part2}-990X`
      setAccessKey(generatedKey)
      setStatus('success')
    }, 1500)
  }

  const handleReset = () => {
    setStatus('idle')
    onClose()
  }

  return (
    <div className="access-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="access-modal" onClick={(e) => e.stopPropagation()}>

        <button className="access-modal__close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {status === 'idle' && (
          <form className="access-modal__form" onSubmit={handleSubmit}>
            <div className="access-modal__header">
              <span className="access-modal__eyebrow">LEVEL 5 CLEARANCE</span>
              <h3 className="access-modal__title">REQUEST CLEARANCE KEY</h3>
              <p className="access-modal__subtitle">
                Submit credentials for evaluation by the AETHER Quantum Validation Mesh.
              </p>
            </div>

            <div className="access-modal__field">
              <label htmlFor="modal-name">FULL NAME / DESIGNATION</label>
              <input
                id="modal-name"
                name="name"
                type="text"
                required
                placeholder="e.g. Dr. Vance Sterling"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="access-modal__field">
              <label htmlFor="modal-org">ORGANIZATION / ENTITY</label>
              <input
                id="modal-org"
                name="organization"
                type="text"
                required
                placeholder="e.g. NORAD Quantum Division"
                value={formData.organization}
                onChange={handleInputChange}
              />
            </div>

            <div className="access-modal__field">
              <label htmlFor="modal-email">SECURE EMAIL ADDRESS</label>
              <input
                id="modal-email"
                name="email"
                type="email"
                required
                placeholder="vance@sterling-quantum.io"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="access-modal__field">
              <label htmlFor="modal-clearance">DESIRED ACCESS LEVEL</label>
              <select
                id="modal-clearance"
                name="clearance"
                value={formData.clearance}
                onChange={handleInputChange}
              >
                <option value="Tier 1: Research Sandbox">Tier 1: Research Sandbox</option>
                <option value="Tier 2: Enterprise Matrix">Tier 2: Enterprise Matrix</option>
                <option value="Tier 3: Sovereign Quantum Mesh">Tier 3: Sovereign Quantum Mesh</option>
              </select>
            </div>

            <div className="access-modal__actions">
              <Button type="submit" variant="primary" size="md">
                GENERATE CLEARANCE KEY &rarr;
              </Button>
            </div>
          </form>
        )}

        {status === 'generating' && (
          <div className="access-modal__loading">
            <div className="access-modal__spinner" />
            <h4 className="access-modal__loading-title">PERFORMING CRYPTOGRAPHIC HANDSHAKE...</h4>
            <p className="access-modal__loading-sub">
              Establishing hardware-isolated quantum state locks across active nodes.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="access-modal__success">
            <div className="access-modal__success-badge">&check; CLEARANCE GRANTED</div>
            <h3 className="access-modal__title">PROVISIONAL ACCESS ISSUED</h3>
            <p className="access-modal__subtitle">
              Your cryptographic key has been registered in the quantum mesh registry.
            </p>

            <div className="access-modal__key-box">
              <span className="access-modal__key-label">ASSIGNED QUANTUM KEY:</span>
              <code className="access-modal__key-code">{accessKey}</code>
            </div>

            <p className="access-modal__info-text">
              Instructions have been dispatched to <strong>{formData.email}</strong>.
            </p>

            <div className="access-modal__actions">
              <Button onClick={handleReset} variant="outline" size="md">
                RETURN TO DASHBOARD
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
