/* =============================================================
   AETHER — Intro Section
   First content section below Hero. Cinematic large-type
   statement: "IT DOESN'T JUST PROCESS. IT UNDERSTANDS."
   ============================================================= */

import './Intro.css'

export default function Intro() {
  return (
    <section
      id="intro"
      className="intro"
      aria-labelledby="intro-heading"
    >
      <div className="intro__inner">

        {/* Section identifier */}
        <div className="intro__index" aria-hidden="true">
          <span className="intro__index-num">01</span>
          <span className="intro__index-rule" />
          <span className="intro__index-label">FOUNDATION</span>
        </div>

        {/* Primary cinematic statement */}
        <h2 id="intro-heading" className="intro__statement">
          <span className="intro__line intro__line--dim">
            IT DOESN&apos;T JUST PROCESS.
          </span>
          <span className="intro__line intro__line--bright">
            IT UNDERSTANDS.
          </span>
        </h2>

        {/* Supporting body copy */}
        <div className="intro__body">
          <p className="intro__copy">
            AETHER operates beyond conventional intelligence frameworks.
            Where systems compute, AETHER perceives.
            Where algorithms execute, AETHER interprets.
          </p>
          <p className="intro__copy intro__copy--accent">
            This is the threshold between machine and mind.
          </p>
        </div>

      </div>

      {/* Decorative vertical rule — right edge */}
      <div className="intro__vline" aria-hidden="true" />
    </section>
  )
}
