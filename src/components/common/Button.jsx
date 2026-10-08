import { Link } from 'react-router-dom'

/**
 * The one button used across the new UI.
 * `to` renders a router link with identical styling; everything else is a
 * real <button>. Variants map onto the existing .btn--* styles.
 */
export default function Button({
  children,
  variant = 'ghost',
  size,
  to,
  type = 'button',
  className = '',
  disabled = false,
  onClick,
  ...rest
}) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ''}${className ? ` ${className}` : ''}`

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
