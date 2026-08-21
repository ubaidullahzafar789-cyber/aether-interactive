/* =============================================================
   AETHER — Navbar
   Fixed header with logo, desktop nav, sound indicator, CTA,
   and mobile full-screen drawer.
   ============================================================= */

import { useState, useEffect } from 'react'
import Button from './Button'
import { sound } from '../../utils/sound'
import { NAV_LINKS } from '../../utils/constants'
import './Navbar.css'

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* Scrolled state — adds frosted background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu when viewport expands past tablet breakpoint */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const toggleMenu = () => {
    sound.playClick()
    setMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleCtaClick = (e) => {
    e.preventDefault()
    sound.playModalOpen()
    closeMenu()
    if (onOpenModal) onOpenModal()
  }

  const handleLinkClick = () => {
    sound.playClick()
    closeMenu()
  }

  return (
    <header
      className={[
        'navbar',
        scrolled ? 'navbar--scrolled' : '',
        menuOpen ? 'navbar--open' : '',
      ].join(' ')}
      role="banner"
    >
      <div className="navbar__inner">

        {/* ── Logo ── */}
        <a
          href="#hero"
          className="navbar__logo"
          aria-label="AETHER — return to top"
          onClick={handleLinkClick}
        >
          AETHER
        </a>

        {/* ── Desktop Navigation ── */}
        <nav className="navbar__nav" aria-label="Primary navigation">
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  id={link.id}
                  href={link.href}
                  className="navbar__link"
                  onClick={handleLinkClick}
                  onMouseEnter={() => sound.playHover()}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Actions ── */}
        <div className="navbar__actions">
          <Button
            id="navbar-cta"
            variant="outline"
            size="sm"
            className="navbar__cta"
            onClick={handleCtaClick}
          >
            ENTER AETHER
          </Button>

          <button
            id="navbar-hamburger"
            className="navbar__hamburger"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={toggleMenu}
          >
            <span className="navbar__bar" aria-hidden="true" />
            <span className="navbar__bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Mobile Navigation ── */}
      <nav
        id="mobile-nav"
        className="navbar__mobile"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul className="navbar__mobile-links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="navbar__mobile-link"
                tabIndex={menuOpen ? 0 : -1}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__mobile-cta">
          <Button
            variant="outline"
            size="md"
            tabIndex={menuOpen ? 0 : -1}
            onClick={handleCtaClick}
          >
            ENTER AETHER
          </Button>
        </div>
      </nav>
    </header>
  )
}
