import { useState } from 'react'
import Icon from '../Icon'
import Card from '../common/Card'
import Button from '../common/Button'
import { recommendations } from '../../data/mockData'

/* Mock personal guidance — reads a plain array, so a real recommender
   can swap the data source later without touching this component. */
export default function RecommendationCard() {
  const [index, setIndex] = useState(0)
  const rec = recommendations[index]
  const next = () => setIndex((i) => (i + 1) % recommendations.length)

  return (
    <section className="dsec">
      <header className="dsec__head">
        <div>
          <span className="tag tag--violet">
            <Icon name="spark" size={13} /> Personal guidance
          </span>
        </div>
      </header>

      <Card className="rec" key={rec.id}>
        <span className="rec__icon">
          <Icon name={rec.icon} size={22} strokeWidth={2} />
        </span>
        <div className="rec__body">
          <strong>{rec.title}</strong>
          <p>{rec.text}</p>
        </div>
        <div className="rec__actions">
          <Button size="sm" variant="primary" to={rec.to}>
            {rec.action}
          </Button>
          <button className="rec__next" onClick={next} aria-label="Show another insight">
            <Icon name="arrow" size={16} />
          </button>
        </div>
      </Card>

      <div className="rec__dots" aria-hidden="true">
        {recommendations.map((item, i) => (
          <span key={item.id} className={i === index ? 'is-on' : ''} />
        ))}
      </div>
    </section>
  )
}
