/** Thin tinted progress bar — goals, levels, unlocks. */
export default function ProgressBar({ pct, tint = 'violet', label = 'Progress' }) {
  const value = Math.max(0, Math.min(100, Math.round(pct)))
  return (
    <div
      className={`progress progress--${tint}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <span className="progress__fill" style={{ width: `${value}%` }} />
    </div>
  )
}
