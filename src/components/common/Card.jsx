/** Rounded surface used by every dashboard block and page section. */
export default function Card({ children, className = '' }) {
  return <section className={`card${className ? ` ${className}` : ''}`}>{children}</section>
}
