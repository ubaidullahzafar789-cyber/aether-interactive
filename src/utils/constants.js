/* =============================================================
   AETHER — Constants
   Site-wide copy, navigation config, and layout breakpoints.
   ============================================================= */

export const SITE = {
  name:        'AETHER',
  tagline:     'Intelligence Beyond the Visible',
  description: 'A new class of machine intelligence. Not seen. Felt.',
}

/** Primary navigation links — used by Navbar (desktop + mobile) */
export const NAV_LINKS = [
  { id: 'nav-core',         label: 'CORE',          href: '#hero'         },
  { id: 'nav-foundation',   label: 'FOUNDATION',    href: '#intro'        },
  { id: 'nav-capabilities', label: 'CAPABILITIES',  href: '#capabilities' },
  { id: 'nav-telemetry',    label: 'TELEMETRY',     href: '#telemetry'    },
  { id: 'nav-sectors',      label: 'SECTORS',       href: '#sectors'      },
  { id: 'nav-terminal',     label: 'CLI TERMINAL',  href: '#terminal'     },
]

/** Section IDs — single source of truth for scroll targets */
export const SECTION_IDS = {
  HERO:         'hero',
  INTRO:        'intro',
  CAPABILITIES: 'capabilities',
  TELEMETRY:    'telemetry',
  SECTORS:      'sectors',
  TERMINAL:     'terminal',
  CTA:          'access',
}

/** Responsive breakpoints (px) — mirrors CSS token overrides */
export const BREAKPOINTS = {
  mobile:  480,
  tablet:  768,
  desktop: 1024,
  wide:   1440,
}
