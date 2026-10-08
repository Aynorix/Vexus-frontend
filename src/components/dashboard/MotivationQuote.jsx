import { quotes } from '../../data/mockData'

/* One quiet line of motivation — elegant, never a poster.
   The quote of the day is picked deterministically from mock data. */
export default function MotivationQuote() {
  const quote = quotes[new Date().getDate() % quotes.length]

  return (
    <figure className="dquote">
      <span className="dquote__mark" aria-hidden="true">
        “
      </span>
      <blockquote>{quote}</blockquote>
      <figcaption>— VexusIQ</figcaption>
    </figure>
  )
}
