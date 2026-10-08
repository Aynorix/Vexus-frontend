import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import PageContainer from '../components/layout/PageContainer'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'
import ToastStack from '../components/ToastStack'
import Icon from '../components/Icon'
import { challengePreview } from '../data/mockData'

const LOCKED = [
  { id: 'weekly', label: 'Weekly Quest', icon: 'quest', note: 'Unlocks after your first full week' },
  { id: 'boss', label: 'Boss Challenge', icon: 'trophy', note: 'Adaptive · arrives at Level 15' },
]

/* Challenges — polished frontend preview of the adaptive quest system. */
export default function Challenges() {
  const [joined, setJoined] = useState(false)
  const pct = Math.round((challengePreview.progress / challengePreview.total) * 100)

  return (
    <>
      <Navbar />
      <PageContainer>
        <header className="phead">
          <span className="tag tag--mint">
            <Icon name="quest" size={13} /> Challenges
          </span>
          <h1>Personalized Challenges</h1>
          <p>Adaptive quests that scale with how you actually spend your week.</p>
        </header>

        <Card className="challenge">
          <div className="challenge__top">
            <span className="tag tag--gold">
              <Icon name="bolt" size={13} /> {challengePreview.difficulty}
            </span>
            <span className="challenge__progress">
              {challengePreview.progress}/{challengePreview.total} days
            </span>
          </div>
          <h2 className="challenge__title">{challengePreview.title}</h2>
          <p className="challenge__desc">{challengePreview.desc}</p>

          <ProgressBar pct={pct} tint="mint" label={challengePreview.title} />

          <div className="challenge__foot">
            <span className="mini-badge mini-badge--gold">
              <Icon name="trophy" size={14} /> {challengePreview.reward}
            </span>
            <Button
              variant={joined ? 'ghost' : 'primary'}
              size="sm"
              onClick={() => setJoined((v) => !v)}
            >
              {joined ? (
                <>
                  <Icon name="check" size={14} strokeWidth={2.8} /> Joined
                </>
              ) : (
                'Join challenge'
              )}
            </Button>
          </div>
        </Card>

        <ul className="challengegrid">
          {LOCKED.map((item) => (
            <li key={item.id}>
              <Card className="challenge challenge--locked">
                <span className="challenge__lock">
                  <Icon name="lock" size={18} />
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.note}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </PageContainer>
      <ToastStack />
    </>
  )
}
