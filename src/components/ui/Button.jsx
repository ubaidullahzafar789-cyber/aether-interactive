/* =============================================================
   AETHER — Button
   Universal button/link primitive. Renders as <a> when href
   is provided, <button> otherwise. Never mix semantics.
   ============================================================= */

import './Button.css'

/**
 * @param {'primary'|'outline'|'ghost'} [variant='primary']
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {string} [href] — renders as anchor when set
 * @param {string} [className]
 */
export default function Button({
  children,
  variant   = 'primary',
  size      = 'md',
  href,
  className = '',
  onClick,
  type      = 'button',
  tabIndex,
  ...props
}) {
  const classes = [
    'aether-btn',
    `aether-btn--${variant}`,
    `aether-btn--${size}`,
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        tabIndex={tabIndex}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </button>
  )
}
