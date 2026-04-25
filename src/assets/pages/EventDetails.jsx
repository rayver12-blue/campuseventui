import { useParams, Link } from 'react-router-dom'
import { useEvents } from '../../context/EventContext'

export default function EventDetails() {
  const { id } = useParams()
  const { events } = useEvents()

  const event = events.find((e) => e.id === Number(id))

  if (!event) {
    return (
      <div className="page">
        <div className="not-found">
          <h2>Event Not Found</h2>
          <p>The event with ID <strong>#{id}</strong> could not be found.</p>
          <Link to="/events" className="btn btn-primary">← Back to Events</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page event-detail-page">
      <Link to="/events" className="back-link">← Back to Events</Link>

      <div className="event-detail-card">
        <div className="detail-header">
          <span className={`badge badge-${event.category.toLowerCase()}`}>
            {event.category}
          </span>
          <span className="event-id">Event #{event.id}</span>
        </div>

        <h1 className="event-detail-title">{event.title}</h1>

        <div className="event-meta">
          <span className={`status-pill ${event.active ? 'active' : 'inactive'}`}>
            {event.active ? '✅ Active' : '❌ Cancelled'}
          </span>
        </div>

        <div className="event-description">
          <h3>Description</h3>
          <p>{event.body}</p>
        </div>

        <div className="event-detail-actions">
          <Link to="/events" className="btn btn-outline">← Back</Link>
          <Link to="/dashboard" className="btn btn-primary">Manage in Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
