import { Link } from 'react-router-dom'
import Icon from '../Icon'
import Card from '../common/Card'
import ProgressBar from '../common/ProgressBar'
import { useGame } from '../../state/GameContext'
import { categoryBalance, weeklyTrend } from '../../data/mockData'

/* ------------------------------------------------------------------ *
 * Detailed analytics overview — two charts and a goal read-out.
 * Deliberately not ten charts: the dashboard answers "how am I doing",
 * the Analytics page goes deeper later.
 * ------------------------------------------------------------------ */

const W = 560
const H = 190
const PAD = 16

function TrendChart({ points }) {
  const x = (i) => PAD + (i * (W - PAD * 2)) / (points.length - 1)
  const y = (v) => H - PAD - (v / 100) * (H - PAD * 2)
  const line = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`)
    .join(' ')
  const area = `${line} L${x(points.length - 1).toFixed(1)},${H - PAD} L${PAD},${H - PAD} Z`

  return (
    <svg className="trend" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Weekly activity trend">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(139, 92, 246, 0.45)" />
          <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
        </linearGradient>
      </defs>

      {[25, 50, 75].map((v) => (
        <line
          key={v}
          x1={PAD}
          x2={W - PAD}
          y1={y(v)}
          y2={y(v)}
          stroke="rgba(255, 255, 255, 0.07)"
          strokeDasharray="4 6"
        />
      ))}

      <path d={area} fill="url(#trendFill)" />
      <path
        d={line}
        fill="none"
        stroke="var(--violet)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {points.map((p, i) => (
        <circle
          key={p.day}
          cx={x(i)}
          cy={y(p.v)}
          r={i === points.length - 1 ? 5.5 : 3.6}
          fill="#0b0722"
          stroke={i === points.length - 1 ? 'var(--cyan)' : 'var(--violet)'}
          strokeWidth="2.4"
        >
          <title>{`${p.day}: ${p.v}`}</title>
        </circle>
      ))}
    </svg>
  )
}

function BalanceBars({ data }) {
  return (
    <div className="bars" role="img" aria-label="Category balance">
      {data.map((item) => (
        <div key={item.label} className="bars__col">
          <span className="bars__val">{item.v}</span>
          <div className="bars__track">
            <div
              className={`bars__fill bars__fill--${item.tint}`}
              style={{ height: `${item.v}%` }}
            />
          </div>
          <span className="bars__label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsOverview() {
  const { goals } = useGame()

  return (
    <section className="dsec">
      <header className="dsec__head">
        <div>
          <span className="tag tag--cyan">
            <Icon name="chart" size={13} /> Analytics
          </span>
          <h2 className="dsec__title">Your week at a glance</h2>
        </div>
        <Link to="/analytics" className="dsec__link">
          Open full analytics <Icon name="arrow" size={15} />
        </Link>
      </header>

      <div className="dgrid">
        <Card className="chartcard">
          <div className="chartcard__head">
            <strong>Weekly activity</strong>
            <span className="chartcard__meta">Last 7 days</span>
          </div>
          <TrendChart points={weeklyTrend} />
          <div className="trend__days" aria-hidden="true">
            {weeklyTrend.map((point) => (
              <span key={point.day}>{point.day}</span>
            ))}
          </div>
        </Card>

        <Card className="chartcard">
          <div className="chartcard__head">
            <strong>Category balance</strong>
            <span className="chartcard__meta">Time split</span>
          </div>
          <BalanceBars data={categoryBalance} />
        </Card>
      </div>

      <Card className="chartcard">
        <div className="chartcard__head">
          <strong>Goal progress</strong>
          <Link to="/goals" className="dsec__link">
            All goals <Icon name="arrow" size={14} />
          </Link>
        </div>
        <ul className="goalmini">
          {goals.slice(0, 4).map((goal) => (
            <li key={goal.id} className="goalmini__row">
              <span className="goalmini__name">{goal.title}</span>
              <ProgressBar pct={goal.progress} tint={goal.tint} label={goal.title} />
              <span className="goalmini__pct">{goal.progress}%</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}
