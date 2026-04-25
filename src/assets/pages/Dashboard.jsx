import { useState } from 'react'
import { useEvents } from '../../context/EventContext'

const CATEGORIES = ['Academic', 'Sports', 'Cultural', 'Technology']

export default function Dashboard() {
  const { events, addEvent, deleteEvent, toggleStatus } = useEvents()
  const [form, setForm] = useState({ title: '', body: '', category: 'Academic' })
  const [message, setMessage] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    const newEvent = {
      id: Date.now(),
      title: form.title,
      body: form.body || 'No description provided.',
      category: form.category,
      active: true,
    }
    addEvent(newEvent)
    setForm({ title: '', body: '', category: 'Academic' })
    setMessage('✅ Event added successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="page dashboard-page">
      <h1>📋 Dashboard</h1>
      <p className="dashboard-sub">Manage campus events from this protected panel.</p>

      {/* Add Event Form */}
      <div className="dashboard-card">
        <h2>Add New Event</h2>
        <div className="add-event-form">
          <input
            type="text"
            placeholder="Event title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="form-input"
          />
          <textarea
            placeholder="Event description"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="form-input form-textarea"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="form-input"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button className="btn btn-primary" onClick={handleAdd}>
            + Add Event
          </button>
        </div>
        {message && <p className="success-msg">{message}</p>}
      </div>

      {/* Event List */}
      <div className="dashboard-card">
        <h2>All Events <span className="count-badge">{events.length}</span></h2>
        {events.length === 0 && (
          <p className="no-results">No events yet. Add one above!</p>
        )}
        <div className="dashboard-event-list">
          {events.map((event) => (
            <div key={event.id} className={`dashboard-event-item ${!event.active ? 'inactive' : ''}`}>
              <div className="dashboard-event-info">
                <span className={`badge badge-${event.category.toLowerCase()}`}>
                  {event.category}
                </span>
                <span className="dashboard-event-title">{event.title}</span>
                <span className={`status-dot ${event.active ? 'dot-active' : 'dot-inactive'}`} />
              </div>
              <div className="dashboard-event-actions">
                <button
                  className={`btn btn-small ${event.active ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => toggleStatus(event.id)}
                >
                  {event.active ? 'Cancel' : 'Restore'}
                </button>
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
