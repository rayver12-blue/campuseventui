import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useEvents } from '../../context/EventContext'

const CATEGORIES = ['All', 'Academic', 'Sports', 'Cultural', 'Technology']

export default function Events() {
  const { events, setEvents } = useEvents()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchEvents = useCallback(async (isBackground = false) => {
    // Ensure event objects from button clicks are not treated as true
    const isBg = isBackground === true; 
    if (!isBg) setLoading(true)
    setError(null)
    try {
      // Simulating an API call with English campus event data instead of Latin placeholder text
      await new Promise((resolve) => setTimeout(resolve, 800))

      const englishEvents = [
        { id: 1, title: 'Annual Science Fair', body: 'Join us for the annual science fair featuring projects from students across all departments.', category: 'Academic', active: true },
        { id: 2, title: 'Basketball Championship', body: 'Cheer for our college team as they compete in the inter-college basketball championship.', category: 'Sports', active: true },
        { id: 3, title: 'Spring Cultural Fest', body: 'Celebrate diversity with music, dance, and food from around the world at our spring fest.', category: 'Cultural', active: true },
        { id: 4, title: 'Tech Innovation Hackathon', body: 'A 48-hour hackathon for developers, designers, and tech enthusiasts to build innovative solutions.', category: 'Technology', active: true },
        { id: 5, title: 'Guest Lecture: Future of AI', body: 'Learn about the future of artificial intelligence in the modern world from industry experts.', category: 'Academic', active: true },
        { id: 6, title: 'Campus Soccer Tryouts', body: 'Open tryouts for the campus soccer teams. All skill levels are welcome to participate.', category: 'Sports', active: true },
        { id: 7, title: 'Art Exhibition: Student Works', body: 'Explore the creative talents of our fine arts students in this week-long exhibition.', category: 'Cultural', active: true },
        { id: 8, title: 'Cybersecurity Workshop', body: 'Hands-on workshop covering the basics of network security and ethical hacking practices.', category: 'Technology', active: true },
      ]

      // Preserve any custom events added via Dashboard (they use Date.now() for IDs)
      const customEvents = events.filter((e) => e.id > 1000)
      // Merge API events, keeping any local status changes if they exist
      const mergedEvents = englishEvents.map((apiEvent) => {
        const existing = events.find((e) => e.id === apiEvent.id)
        return existing ? existing : apiEvent
      })
      setEvents([...mergedEvents, ...customEvents])
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (err) {
      if (!isBg) setError('Failed to fetch events.')
    } finally {
      if (!isBg) setLoading(false)
    }
  }, [events, setEvents])

  // Initial fetch
  useEffect(() => {
    // Only fetch if the events array is empty to preserve Dashboard additions
    if (events.length === 0) {
      fetchEvents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-refresh every 30 seconds in the background
  useEffect(() => {
    const interval = setInterval(() => {
      fetchEvents(true)
    }, 30000)
    return () => clearInterval(interval)
  }, [fetchEvents])

  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || e.category === category
    return matchSearch && matchCat
  })

  return (
    <div className="page events-page">
      <div className="page-header">
        <h1>Campus Events</h1>
        {lastUpdated && (
          <p className="last-updated">🔄 Last updated: {lastUpdated}</p>
        )}
      </div>

      {/* Search & Filter (Student Touch) */}
      <div className="events-controls">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          ⚠️ {error}
          <button onClick={() => fetchEvents(false)} className="btn btn-small">Retry</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="no-results">No events found.</p>
      )}

      <div className="event-grid">
        {filtered.map((event) => (
          <div key={event.id} className={`event-card ${!event.active ? 'inactive' : ''}`}>
            <span className={`badge badge-${event.category.toLowerCase()}`}>
              {event.category}
            </span>
            <h3>{event.title}</h3>
            <p className="event-body">{event.body.slice(0, 80)}...</p>
            <div className="card-footer">
              <Link to={`/events/${event.id}`} className="btn btn-small btn-primary">
                View Details
              </Link>
              {!event.active && <span className="status-badge">Cancelled</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
