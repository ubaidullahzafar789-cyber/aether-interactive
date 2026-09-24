# AETHER — Intelligence Beyond the Visible

AETHER is a cinematic, interactive web experience built to demonstrate a concept for a next-generation machine intelligence platform. It is not a data-entry UI or a marketing page — it is a scroll-driven, WebGL-powered environment in which the visitor moves through a living interface: an orbiting 3D core that reacts to scroll position, procedural audio that responds to interaction, and a sequence of information-dense sections that tell a coherent visual story.

**[Live Demo](https://aether-interactive-9oyesd8gr-study-mate-ai-team.vercel.app)** &nbsp;·&nbsp; **[GitHub Repository](https://github.com/ubaidullahzafar789-cyber/aether-interactive)**

---

## Status

| Item | State |
|---|---|
| Implementation | Complete (Phases 1–10) |
| Build | Passing |
| Deployment | Live on Vercel |
| Repository | Public |

---

## Overview

AETHER frames machine intelligence as something ambient and atmospheric rather than transactional. The experience opens on a full-viewport 3D core — a layered sphere of geometry, orbital rings, and particle fields — and uses scroll to drive the camera deeper into it. Each section that follows has its own visual language and interactive system, while the 3D scene persists as a fixed background layer throughout.

The project combines scroll-driven storytelling, WebGL rendering, procedural audio synthesis, and a carefully maintained accessibility layer across responsive breakpoints.

---

## Experience

The page is composed of eight sequential stages:

| # | Section | What the visitor encounters |
|---|---|---|
| — | Loader | Cinematic intro screen that unmounts after its exit animation |
| 01 | Hero | Full-viewport landing with the AETHER wordmark and the 3D core. Scroll drives a four-state camera choreography pinned across 300vh |
| 02 | Intro / Information Field | Narrative philosophy section. As the core dissolves into fragments, the page transitions from 3D spectacle to information density |
| 03 | Capabilities | Neural diagnostic console: four capability tabs, each with a live canvas visualizer, animated metrics, and signal data |
| 04 | Telemetry | Four-node cluster readout with switchable display modes and spectrum bar animation gated to viewport visibility |
| 05 | Target Sectors | Tabbed showcase of four deployment contexts |
| 06 | AETHER Terminal | In-browser CLI simulator. The visitor types or clicks preset commands and receives synthetic output |
| 07 | Access Clearance | Final call-to-action section that opens an access key request modal |
| — | Footer | Dispatch interface with live UTC clock, navigation links, sound toggle, and newsletter input |

---

## Core Features

**3D / WebGL**
- Persistent single `<Canvas>` (React Three Fiber) fixed behind all page content
- Central core geometry: translucent outer sphere + faceted icosahedron inner lattice
- Instanced orbital rings with scroll-driven tilt and radius expansion
- Instanced dust particle field with scroll-driven dispersion
- Fragment field — instanced mesh particles that eject from the core surface as scroll progresses
- Scene lighting via ambient, directional, and point lights
- Scroll-driven camera Z-approach via lerped `useFrame` loop
- WebGL error boundary — silently degrades if the context fails
- Canvas `frameloop` switches to `'demand'` when the 3D section scrolls off-screen
- Device pixel ratio capped at `[1, 1.5]`
- Responsive scene scale (desktop / tablet / mobile breakpoints)

**Scroll & Animation**
- Lenis smooth scroll (duration 1.2, exponential easing)
- Lenis RAF ticked inside the GSAP ticker for frame-accurate synchronization
- GSAP ScrollTrigger drives all cinematic hero scroll states
- Mutable `scrollStateRef` bridge updates scene parameters without React re-renders
- Per-section scroll-reveal timelines (opacity, translate, scale) on all major sections
- `prefers-reduced-motion` bail-out in every GSAP timeline — camera snaps, animations skip

**Interactive Systems**
- Capabilities section: four tabbed visualizers, each drawing a unique canvas animation
- Telemetry section: four switchable display modes; spectrum bar jitter runs via `setInterval` gated by `IntersectionObserver` and `document.visibilityState`
- Sectors section: four WAI-ARIA tab panels with keyboard navigation
- Terminal: typed or preset commands with synthetic output
- Access modal: multi-field form with simulated key generation sequence

**Audio**
- Fully procedural Web Audio API sound system — no external audio files
- `sound.playHover()` — sine chirp on interactive element hover
- `sound.playClick()` — triangle click on button/tab activation
- `sound.playTerminalKey()` — randomized square-wave keypress ticks
- `sound.playModalOpen()` — ascending sine sweep on modal open
- `sound.playCapabilitySelect(id)` — unique synthesized sound per capability tab
- Global mute toggle exposed in the Footer

**Accessibility**
- Skip-to-main-content link at page top
- Capabilities and Sectors implemented with WAI-ARIA `tablist` / `tab` / `tabpanel` roles
- Arrow key, Home, End keyboard navigation on tab sets
- Access modal: `role="dialog"`, `aria-modal="true"`, focus trap, Escape key dismissal, Lenis scroll lock while open
- Terminal input labelled with `aria-label`
- AetherCore canvas marked `aria-hidden="true"` throughout
- `prefers-reduced-motion` respected in all GSAP timelines and in the R3F `useFrame` lerp factor

**Responsive**
- Three explicit breakpoints: mobile (≤ 768px), tablet (769–1024px), desktop (> 1024px)
- 3D scene scale adjusted per breakpoint
- Navbar collapses to a full-screen mobile drawer at tablet/mobile width
- All sections reflow via CSS for narrower viewports

---

## Technology Stack

**Frontend**

| Library | Version | Role |
|---|---|---|
| React | 19 | UI component model |
| Vite | 8 | Dev server, bundler |
| Vanilla CSS | — | All styling via CSS custom properties |

**3D / Graphics**

| Library | Version | Role |
|---|---|---|
| Three.js | 0.185 | WebGL scene, geometry, materials, lighting |
| React Three Fiber | 9 | Declarative R3F canvas and hooks (`useFrame`) |

> `@react-three/drei` is intentionally absent — all helpers are implemented directly.

**Animation / Interaction**

| Library | Version | Role |
|---|---|---|
| GSAP | 3.15 | ScrollTrigger timelines, section reveals |
| Lenis | 1.3 | Smooth scroll, synced to GSAP ticker |
| Web Audio API | Native | Procedural sound synthesis |

**Tooling**

| Tool | Role |
|---|---|
| ESLint 10 | Linting (react-hooks, react-refresh plugins) |
| @vitejs/plugin-react | Fast Refresh in development |

---

## Technical Architecture

```
App
├── Loader              — cinematic intro, unmounts on complete
├── AccessModal         — dialog, focus-trapped
└── SmoothScroll        — Lenis context provider
    └── PageContainer
        ├── skip-link
        ├── AetherCore (fixed bg, aria-hidden)   ← single persistent Canvas
        ├── Navbar
        └── main
            ├── Hero           ← feeds scrollStateRef to AetherCore
            ├── Intro          ← feeds scrollStateRef to AetherCore
            ├── Capabilities
            ├── Telemetry
            ├── Sectors
            ├── Terminal
            └── CallToAction
        └── Footer
```

**Key design decisions:**

- **Single WebGL context.** One `<Canvas>` is mounted once in `App.jsx` and never remounted. This avoids browser WebGL context limits and GPU overhead that arise from per-section canvases.
- **Mutable ref as scroll bridge.** `scrollStateRef` holds a plain object (`createScrollState()`) mutated directly by GSAP tweens. React state is never updated for per-frame scroll values, keeping the render loop outside React's scheduler.
- **Lenis + GSAP ticker synchronization.** `lenis.raf()` is called inside `gsap.ticker`, not a standalone `requestAnimationFrame`. This ensures Lenis scroll position and GSAP ScrollTrigger evaluate at exactly the same frame.
- **GSAP scoped to component.** A custom `useGSAP` hook creates a GSAP context scoped to each section's DOM node, ensuring ScrollTrigger cleanup on unmount.
- **Vendor chunk separation.** Vite `manualChunks` splits the bundle into `three-vendor`, `animation-vendor`, and `react-vendor` chunks for parallel loading.

---

## 3D / WebGL System

The `src/3d/` directory contains the entire WebGL scene, composed as discrete R3F components under a single `<Canvas>`:

| Component | Responsibility |
|---|---|
| `AetherCore.jsx` | Canvas host; manages responsive breakpoints, reduced-motion state, and canvas visibility gating |
| `AetherCoreController.js` | Defines and exports `createScrollState()` — the shared mutable object that drives all scene parameters |
| `CoreGeometry.jsx` | Outer translucent sphere + inner icosahedron lattice; responds to `coreScale`, `shellOpacity`, `dissolution` |
| `OrbitalRings.jsx` | Instanced concentric rings; responds to `ringExpansion` and `ringTilt` |
| `DustField.jsx` | Instanced ambient particle field; responds to `dustDispersion` |
| `FragmentField.jsx` | Instanced fragment particles ejecting from the core surface; responds to `fragmentProgress` and `dissolution` |
| `SceneLighting.jsx` | Ambient, directional, and point lights |

**Scroll state parameters (driven by GSAP, read in `useFrame`):**

```js
{
  progress:          0.0,   // Overall scroll progress
  coreScale:         1.0,   // Scale expansion multiplier
  ringExpansion:     1.0,   // Orbital ring radius
  rotationSpeed:     1.0,   // Rotation velocity multiplier
  emissiveIntensity: 0.25,  // Inner core glow brightness
  cameraZ:           8.5,   // Camera Z position
  dustDispersion:    1.0,   // Dust particle spread
  dissolution:       0.0,   // Overall deconstruction (0 to 1)
  shellOpacity:      0.75,  // Outer sphere transparency
  ringTilt:          0.0,   // Ring axis drift
  fragmentProgress:  0.0,   // Surface fragment ejection
}
```

Camera approach is handled inside `useFrame` with a lerp factor of `0.065` (or `1.0` for reduced-motion snap).

---

## Interactive Systems

### Capabilities Diagnostic Console

Four capability panels, each containing a canvas-drawn visualizer unique to that capability, animated live metrics, signal color, status code, and bus telemetry readout. A capability-specific sound is synthesized on tab selection. Navigation via WAI-ARIA tab semantics and arrow key handling.

The four capabilities: Quantum Mesh Matrix, Zero-Latency Perception, Autonomous Reasoning, Entanglement Crypto.

### Telemetry

Four node cards (Alpha / Beta / Gamma / Delta) each showing memory usage, latency, coherence, throughput, and an animated spectrum bar array. Spectrum bars jitter at 400ms intervals using `setInterval`, which starts and stops via `IntersectionObserver` (viewport) and `document.visibilityState` (tab focus). Four display mode buttons change the active color accent.

### Target Sectors

Tabbed interface with four sectors: Aerospace & Orbital, Synthetic Biology, Quantum Markets, Climate Simulation. Each tab panel shows a heading, description, three stat items, and a highlight line.

### AETHER Terminal

In-browser CLI simulator with a scrollable output log and a text input form. Recognized commands:

| Command | Output |
|---|---|
| `help` | Lists all available commands |
| `status` | Kernel status readout |
| `analyze` | Neural array scan result |
| `quantum-scan` | Orbital relay ping results for four nodes |
| `synthesize` | Generates a synthetic hypothesis |
| `version` | Kernel build version |
| `matrix` | Vector flux stream output |
| `clear` | Resets terminal log to initial state |

Unrecognized input returns an error line. Preset buttons for `status`, `analyze`, `quantum-scan`, `synthesize`, and `clear` are provided below the terminal window.

### Access Clearance Modal

Triggered by the "Request Access" CTA and the Navbar button. Contains a form (name, organization, email, clearance tier) and a simulated key generation sequence. Implements focus trap, Escape key dismissal, body scroll lock, and Lenis `stop()`/`start()` coordination.

---

## Accessibility

Implemented as a first-class concern across the build:

- **Skip link** — visually hidden until focused; navigates to `#main-content`
- **`prefers-reduced-motion`** — checked at component mount in every GSAP timeline and in the R3F `useFrame` lerp factor; animations skip or snap when the preference is active
- **WAI-ARIA tabs** — Capabilities and Sectors implement `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`
- **Keyboard navigation** — Tab panels respond to Arrow Left/Right, Home, End
- **Terminal input** — labelled with `aria-label="Terminal command input"`
- **Modal** — `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap (Tab / Shift+Tab cycle within modal), Escape key closes
- **Mobile navigation** — drawer open state manages body scroll lock
- **AetherCore canvas** — `aria-hidden="true"` on the canvas container throughout
- **Semantic structure** — `<main>`, `<section>`, `<nav>`, `<footer>`, heading hierarchy used throughout

No WCAG certification has been assessed.

---

## Performance

Optimizations implemented during the build:

- **Single WebGL context** — one persistent `<Canvas>` avoids browser context limits
- **DPR cap** — `dpr={[1, 1.5]}` on the R3F Canvas limits pixel ratio on high-density screens
- **Geometry LOD** — sphere subdivision detail is halved on mobile
- **Canvas visibility gating** — `frameloop` switches from `'always'` to `'demand'` when the 3D section is far off-screen, pausing the render loop
- **Telemetry interval gating** — the 400ms spectrum jitter only runs when the section is intersecting and the browser tab is visible
- **Mutable scroll bridge** — GSAP tweens mutate a plain ref object; no React state updates occur per frame
- **Vendor chunk splitting** — `three-vendor`, `animation-vendor`, and `react-vendor` chunks allow parallel loading and better long-term caching
- **No raster image assets** — all visual assets are SVGs or procedurally generated
- **No external audio files** — all sound is synthesized at runtime via Web Audio API oscillators
- **Font preloading** — `<link rel="preconnect">` hints for Google Fonts in `index.html`
- **`prefers-reduced-motion`** — removes animation workload for users who opt out

---

## Responsive Experience

Responsive behavior is implemented across three breakpoints: mobile (≤ 768px), tablet (769–1024px), and desktop (> 1024px).

- The 3D scene scales down progressively (`0.62` / `0.88` / `1.12` multiplier)
- Hero scroll end-states (camera Z, core scale, ring expansion) use reduced values on mobile
- The Navbar collapses to a full-screen mobile drawer
- All sections reflow their grid and typography via CSS media queries

---

## Project Structure

```
AETHER/
├── public/
│   ├── favicon.svg              # SVG favicon
│   └── og-preview.svg           # 1200x630 Open Graph social card
├── src/
│   ├── 3d/
│   │   ├── AetherCore.jsx       # Canvas host, visibility gating, responsive state
│   │   ├── AetherCoreController.js  # Shared scroll state factory
│   │   ├── CoreGeometry.jsx     # Outer sphere + icosahedron lattice
│   │   ├── DustField.jsx        # Instanced ambient particle field
│   │   ├── FragmentField.jsx    # Instanced fragment ejection particles
│   │   ├── OrbitalRings.jsx     # Instanced concentric rings
│   │   └── SceneLighting.jsx    # Scene lighting setup
│   ├── animations/
│   │   └── gsap.js              # GSAP + ScrollTrigger registration, global defaults
│   ├── components/
│   │   ├── layout/
│   │   │   ├── PageContainer.jsx
│   │   │   └── SmoothScroll.jsx # Lenis context provider
│   │   └── ui/
│   │       ├── AccessModal.jsx  # Focus-trapped clearance modal
│   │       ├── Button.jsx
│   │       ├── Footer.jsx       # UTC clock, sound toggle, dispatch input
│   │       ├── Loader.jsx       # Cinematic intro screen
│   │       └── Navbar.jsx       # Fixed header + mobile drawer
│   ├── hooks/
│   │   ├── useGSAP.js           # Scoped GSAP context hook
│   │   └── useLenis.js          # Lenis init + GSAP ticker sync
│   ├── sections/
│   │   ├── CallToAction.jsx
│   │   ├── Capabilities.jsx     # ARIA tabs + canvas visualizers
│   │   ├── Hero.jsx             # Cinematic 4-state scroll sequence
│   │   ├── Intro.jsx            # Information field / narrative
│   │   ├── Sectors.jsx          # ARIA tabs + deployment contexts
│   │   ├── Telemetry.jsx        # Node readout + visibility-gated jitter
│   │   └── Terminal.jsx         # In-browser CLI simulator
│   ├── utils/
│   │   ├── constants.js         # Nav links, section IDs, breakpoints
│   │   └── sound.js             # Procedural Web Audio API synthesizer
│   ├── App.jsx                  # Root composition
│   ├── index.css                # Design token system, global reset
│   └── main.jsx                 # React DOM entry point
├── index.html                   # HTML shell, SEO meta, OG tags, font preload
├── vite.config.js               # Vite config + manual chunk splitting
└── package.json
```

---

## Getting Started

Requires Node.js 18 or later.

```bash
# Clone
git clone https://github.com/ubaidullahzafar789-cyber/aether-interactive.git
cd aether-interactive

# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Production Build

```bash
npm run build
```

Output is written to `dist/`. The build applies minification, tree-shaking, and the manual chunk strategy defined in `vite.config.js` (three-vendor, animation-vendor, react-vendor). The `dist/` folder is a self-contained static SPA ready for deployment to any CDN or static host.

---

## Deployment

AETHER is deployed on Vercel.

**Live URL:** https://aether-interactive-9oyesd8gr-study-mate-ai-team.vercel.app

To deploy your own instance: import the repository into Vercel, set the framework preset to Vite, build command to `npm run build`, and output directory to `dist`. No environment variables are required.

---

## Design Direction

The visual language is built on restraint and information density:

- Deep near-black backgrounds with no competing gradients in the main viewport
- A cool blue-steel accent palette derived from the 3D scene's lighting
- Two typefaces: Syne (display headings) and Inter (body and UI), loaded from Google Fonts
- Monospaced elements for telemetry readouts, terminal output, and index labels
- WebGL provides atmosphere; the interface elements provide clarity
- Sections reveal progressively as they enter the viewport
- Interaction-driven storytelling: hovering, scrolling, clicking, and typing all alter the state of the experience

---

## Engineering Notes

**Lenis + GSAP coordination.** Lenis runs its RAF inside `gsap.ticker` with `lagSmoothing(0)`. This is the only reliable way to synchronize Lenis position with GSAP ScrollTrigger — running them on separate RAF loops causes one-frame drift that produces scroll jitter. Lenis also calls `lenis.resize()` whenever ScrollTrigger fires a `refresh` event, keeping pinned spacer heights accurate.

**React architecture.** The app is a flat component tree with no global state management library. The only cross-component coordination is `scrollStateRef` (a ref passed from App to Hero and Intro, then into AetherCore) and the Lenis context (a ref provided by `SmoothScroll` and consumed via `useLenisContext`). GSAP contexts are scoped per component via the `useGSAP` hook, which cleans up on unmount.

**WebGL performance.** The single-canvas approach avoids browser WebGL context limits. Canvas visibility is tracked with an `IntersectionObserver` so the render loop pauses when the 3D section is far off-screen. DPR is capped, and geometry subdivision is halved on mobile.

**Accessibility.** Reduced-motion support is not a single global flag — it is checked independently in each GSAP callback and in the R3F `useFrame` lerp factor. This means the site degrades gracefully at the granularity of individual animated elements.

**Responsive behavior.** Breakpoints are defined once in `src/utils/constants.js` and used consistently in JavaScript logic. CSS media queries handle layout; JavaScript handles scene scale and scroll target values.

---

## Project Status

AETHER is a completed portfolio project. Phases 1 through 10 are implemented, committed, and deployed. It is not a production SaaS product.

---

## Repository

**GitHub:** https://github.com/ubaidullahzafar789-cyber/aether-interactive

---

## Links

| | |
|---|---|
| Live Demo | https://aether-interactive-9oyesd8gr-study-mate-ai-team.vercel.app |
| GitHub | https://github.com/ubaidullahzafar789-cyber/aether-interactive |
