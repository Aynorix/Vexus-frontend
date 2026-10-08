import { Link } from 'react-router-dom'
import Icon from '../Icon'

/* Small but noticeable — the future emergency mode, parked beside the
   To-Do board and routed to its own placeholder page. */
export default function CodeRedButton() {
  return (
    <Link to="/code-red" className="codered" aria-label="Activate Code Red mode">
      <span className="codered__dot" aria-hidden="true" />
      <Icon name="shield" size={14} strokeWidth={2.2} />
      CODE RED
    </Link>
  )
}
