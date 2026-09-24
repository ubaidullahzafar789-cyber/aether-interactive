# AETHER — Intelligence Beyond the Visible

> **AETHER** is a futuristic, cinematic web experience showcasing a next-generation machine intelligence platform. Built with cutting-edge frontend engineering, interactive 3D WebGL scenes, procedural audio synthesis, and fluid kinetic motion, AETHER represents intelligence not just as an interface, but as a living, breathing continuum.

---

## Concept

In an era of ubiquitous AI, AETHER explores the frontier beyond conventional conversational interfaces: **ambient, autonomous, and omnipresent machine intelligence**. 

Conceived with a dark celestial aesthetic, glassmorphic HUDs, and quantum instrumentation, AETHER embodies the philosophy: *"Not seen. Felt."* The interface translates complex multidimensional neural processes into tactile visual landscapes and real-time auditory telemetry.

---

## Key Features

- **Cinematic 3D Neural Core (`AetherCore`)**:
  - Persistent, unified Three.js WebGL canvas running in the background across all sections.
  - Procedural orbital rings, floating crystalline fragments, deep stellar dust fields, and reactive lighting.
  - Smooth mouse parallax and scroll-linked camera/geometry transformations.
- **Narrative Scroll Experience**:
  - Silky momentum scrolling powered by Lenis, tightly coupled to GSAP ScrollTrigger timelines.
  - Dynamic navbar with active section detection and precise scroll offsets.
- **Interactive Capabilities Matrix**:
  - Full WAI-ARIA compliant tabbed interface featuring 4 core paradigms: *Perception*, *Synthesis*, *Autonomy*, and *Alignment*.
  - Keyboard navigation (Arrow keys, Home, End) with automated panel switching.
  - Deep telemetry readouts, architecture maps, and real-time throughput metrics.
- **Quantum Telemetry Dashboard**:
  - Live animated telemetry metrics: Quantum Coherence (99.984%), Entanglement Density, Flux Resonance, and Neural Drift.
  - Responsive visual pulse monitors and diagnostic sub-gauges.
- **Mission-Critical Sectors**:
  - Deployment profiles across Aerospace & Orbital Systems, Deep Biosystems & Genomic Folding, Global Energy Grids, and Synthetic Quantum Physics.
  - Interactive sector inspection cards with dynamic stat displays.
- **Neural Diagnostic Terminal**:
  - Functional in-browser CLI emulator with command execution (`help`, `status`, `telemetry`, `matrix`, `ping`, `clear`, `diagnose`).
  - Terminal history, command autocomplete hints, and authentic CRT styling.
- **Procedural Audio Synthesizer**:
  - Native Web Audio API sound generator (`sound.js`) producing custom harmonic hums, radar blips, keypress chirps, and modal resonance.
  - Zero external MP3/WAV assets required — 100% lightweight procedural code.
- **Access Clearance Protocol**:
  - Accessible modal dialog for requesting enterprise clearance keys, complete with focus trapping and ESC dismissal.

---

## Interactive Experience

AETHER is designed as an interactive art piece and technical showcase:
- **Audio Feedback**: Hovering interactive elements, switching tabs, typing in the terminal, or triggering modals yields subtle, non-intrusive futuristic sound effects.
- **Fluid Camera Choreography**: As you scroll through the page, the 3D AetherCore smoothly transitions its focal point, ring inclination, and particle dispersion speed to match each section's thematic tone.
- **Terminal Playground**: Visitors can interact directly with the embedded terminal to inspect system parameters or trigger diagnostic sweeps.

---

## Technology Stack

- **Core Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Graphics & WebGL**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/)
- **Animation & Motion**: [GSAP 3](https://gsap.com/) (ScrollTrigger, Timeline)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Audio Engine**: Native Browser [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- **Styling**: Vanilla CSS (Modular CSS Architecture with CSS Custom Properties / Tokens)
- **Type Checking & Linting**: ESLint 9 + React Hooks Plugin

---

## Architecture Overview

1. **Single Canvas WebGL Engine**: Rather than spawning multiple 3D canvases across sections (which degrades GPU performance and can exhaust WebGL contexts), AETHER mounts a single persistent `<Canvas>` in `AetherCore.jsx`.
2. **Decoupled Scroll Controller**: A mutable `scrollStateRef` bridge tracks scroll progress and camera targets without causing unnecessary React re-renders.
3. **Procedural Zero-Asset Design**: All visual icons, backgrounds, fonts, and audio effects are rendered procedurally or via lightweight vector SVGs and Google Fonts, eliminating heavy image or media downloads.
4. **Token-Driven CSS System**: Clean design system in `src/index.css` defining semantic color scales (`--color-bg`, `--color-accent-primary`, `--color-void`), typography scales (`Syne`, `Inter`, monospace), spacing, and glassmorphic elevations.

---

## Installation

Ensure you have [Node.js](https://nodejs.org/) (version 18.0 or higher recommended) installed.

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd AETHER
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Development

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to the local address displayed in your terminal (typically `http://localhost:5173/`).

---

## Production Build

To build the project for production:

```bash
npm run build
```

This compiles optimized, minified bundles into the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

To run lint checks:

```bash
npm run lint
```

---

## Deployment

AETHER produces a static single-page application (SPA) output in `dist/`. It can be deployed instantly to any modern hosting platform:

- **Vercel**: Import the repository with Vite preset; build command `npm run build`, output directory `dist`.
- **Netlify**: Set build command to `npm run build` and publish directory to `dist`.
- **Cloudflare Pages / GitHub Pages**: Deploy the static `dist/` folder directly.

---

## Accessibility

AETHER treats accessibility as a first-class requirement:
- **Keyboard Navigation**: Full tab ordering, visible focus rings, and dedicated ARIA attributes across all interactive components.
- **ARIA Tabs**: The Capabilities matrix implements standard WAI-ARIA tab semantics (`tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`) with full arrow key navigation support.
- **Skip Navigation**: High-contrast "Skip to main content" link accessible immediately upon initial tab keypress.
- **Modal Dialog**: Screen-reader accessible modal with `role="dialog"`, `aria-modal="true"`, focus trap, and Escape key dismissal.
- **Semantic HTML**: Proper sectioning elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`) throughout.
- **Reduced Motion**: Respects `prefers-reduced-motion` settings to tone down high-intensity kinetic animations.

---

## Performance

- **Unified WebGL Rendering**: Maintains a steady 60 FPS by rendering all 3D geometries in a single scene graph.
- **Zero Asset Bloat**: Completely free of large raster files or audio assets; all assets are vector SVGs (`favicon.svg`, `og-preview.svg`) or procedurally synthesized.
- **Resource Hints**: Preconnect headers for Google Fonts (`fonts.googleapis.com` & `fonts.gstatic.com`) for minimal DNS/TCP latency.
- **Efficient Memory Management**: Event listeners and WebGL geometry/material buffers are systematically cleaned up on unmount.

---

## Project Structure

```
AETHER/
├── public/
│   ├── favicon.svg          # Vector icon for browser tabs
│   └── og-preview.svg       # 1200×630 Open Graph social preview card
├── src/
│   ├── 3d/                  # Three.js / React Three Fiber components
│   │   ├── AetherCore.jsx           # Main persistent 3D canvas
│   │   ├── AetherCoreController.js  # Mutable scroll state & camera logic
│   │   ├── CoreGeometry.jsx         # Central neural core sphere
│   │   ├── DustField.jsx            # Deep stellar dust particles
│   │   ├── FragmentField.jsx        # Floating quantum fragments
│   │   ├── OrbitalRings.jsx         # Kinetic gyroscopic rings
│   │   └── SceneLighting.jsx        # Dynamic 3-point scene illumination
│   ├── animations/          # GSAP timeline helpers & plugins
│   ├── components/
│   │   ├── layout/          # Layout wrappers (PageContainer, SmoothScroll)
│   │   └── ui/              # Reusable UI (Navbar, Button, Loader, Modal, Footer)
│   ├── hooks/               # Custom hooks (useGSAP, useLenis)
│   ├── sections/            # Feature sections
│   │   ├── Hero.jsx                 # Opening statement & 3D focal
│   │   ├── Intro.jsx                # Narrative philosophy & kinetic typography
│   │   ├── Capabilities.jsx         # Accessible ARIA tabbed intelligence matrix
│   │   ├── Telemetry.jsx            # Quantum telemetry live telemetry gauges
│   │   ├── Sectors.jsx              # Mission-critical deployment matrix
│   │   ├── Terminal.jsx             # Interactive neural CLI diagnostic console
│   │   └── CallToAction.jsx         # Access clearance request section
│   ├── utils/               # Procedural audio generator & global constants
│   ├── App.jsx              # Application root orchestrator
│   ├── index.css            # Design token system, typography, & global reset
│   └── main.jsx             # React DOM entry point
├── index.html               # Semantic HTML shell, SEO & Open Graph meta
├── package.json             # Scripts & dependencies
├── vite.config.js           # Vite build configuration
└── README.md                # Project documentation
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).
