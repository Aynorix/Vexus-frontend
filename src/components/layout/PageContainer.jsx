/** Shared page shell: the centered content column every route renders inside. */
export default function PageContainer({ children, className = '' }) {
  return <main className={`page${className ? ` ${className}` : ''}`}>{children}</main>
}
