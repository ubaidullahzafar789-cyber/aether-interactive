/* =============================================================
   AETHER — Navbar
   Fixed header with logo, desktop nav, sound indicator, CTA,
   and mobile full-screen drawer.
   ============================================================= */

import { useState, useEffect } from 'react'
import Button from './Button'
import { sound } from '../../utils/sound'
import { NAV_LINKS } from '../../utils/constants'
import { useLenisContext } from '../layout/SmoothScroll'
import './Navbar.css'

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const lenisRef = useLenisContext()

  /* Scrolled state — adds frosted background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Active section tracking via IntersectionObserver */
  useEffect(() => {
    const sectionIds = ['hero', 'intro', 'capabilities', 'telemetry', 'sectors', 'terminal']
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  /* Close mobile menu when viewport expands past tablet breakpoint */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* Close mobile menu on Escape key */
  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  /* Lock background scroll when mobile menu is open */
  useEffect(() => {
    if (menuOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const lenis = lenisRef?.current   // capture stable ref value for cleanup
      lenis?.stop()

      return () => {
        document.body.style.overflow = originalOverflow
        lenis?.start()
      }
    }
  }, [menuOpen, lenisRef])

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

  const handleNavigation = (e, href) => {
    e.preventDefault()
    sound.playClick()
    closeMenu()

    if (!href) return
    const target = document.querySelector(href)
    if (target && lenisRef?.current) {
      lenisRef.current.scrollTo(target, {
        offset: -24,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
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
          onClick={(e) => handleNavigation(e, '#hero')}
        >
          AETHER
        </a>

        {/* ── Desktop Navigation ── */}
        <nav className="navbar__nav" aria-label="Primary navigation">
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href
              return (
                <li key={link.id}>
                  <a
                    id={link.id}
                    href={link.href}
                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(e) => handleNavigation(e, link.href)}
                    onMouseEnter={() => sound.playHover()}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
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
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => handleNavigation(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
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
