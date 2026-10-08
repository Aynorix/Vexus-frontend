import Navbar from '../components/layout/Navbar'
import PageContainer from '../components/layout/PageContainer'
import AnalyticsOverview from '../components/dashboard/AnalyticsOverview'
import Card from '../components/common/Card'
import ProgressBar from '../components/common/ProgressBar'
import ToastStack from '../components/ToastStack'
import Icon from '../components/Icon'
import { useGame } from '../state/GameContext'
import { levelProgress } from '../data/mockData'

const fmtFocus = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/* Analytics — the overview up top, plus XP and focus read-outs.
   Deeper analysis grows into this page in a later milestone. */
export default function Analytics() {
  const { player, focusMinutes } = useGame()
  const prog = levelProgress(player.xp)

  return (
    <>
      <Navbar />
      <PageContainer>
        <header className="phead">
          <span className="tag tag--cyan">
            <Icon name="chart" size={13} /> Analytics
          </span>
          <h1>Analytics</h1>
          <p>Your trends, XP progression and focus time — the full picture.</p>
        </header>

        <AnalyticsOverview />

        <div className="dgrid">
          <Card className="chartcard">
            <div className="chartcard__head">
              <strong>XP progression</strong>
              <span className="chartcard__meta">{player.xp.toLocaleString()} XP total</span>
            </div>
            <div className="xprow">
              <span className="lvl-badge">
                LVL {prog.level} <em>{prog.pct}%</em>
              </span>
              <div className="xprow__bar">
                <ProgressBar pct={prog.pct} tint="gold" label="Level progress" />
                <span>
                  {prog.into}/{prog.needed} XP to level {prog.level + 1}
                </span>
              </div>
            </div>
          </Card>

          <Card className="chartcard">
            <div className="chartcard__head">
              <strong>Focus time</strong>
              <span className="chartcard__meta">This week</span>
            </div>
            <div className="focusrow">
              <Icon name="clock" size={26} strokeWidth={2} />
              <strong>{fmtFocus(focusMinutes)}</strong>
              <span>deep-work hours logged — sessions from the dashboard timer add up here.</span>
            </div>
          </Card>
        </div>

        <Card className="emptycard">
          <Icon name="lock" size={18} />
          <p>
            Deeper analysis — streak history, trend comparisons and category insights — grows into
            this page in the next milestone.
          </p>
        </Card>
      </PageContainer>
      <ToastStack />
    </>
  )
}
