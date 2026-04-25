import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page home-page">
      <div className="hero">
        <h1>Welcome to <span className="highlight">CampusEventUI</span></h1>
        <p className="hero-sub">
          Discover, manage, and stay updated on all campus events in one place.
        </p>
        <div className="hero-actions">
          <Link to="/events" className="btn btn-primary">Browse Events</Link>
          <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
        </div>
      </div>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">📅</span>
          <h3>Browse Events</h3>
          <p>Explore all upcoming campus activities and seminars.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔔</span>
          <h3>Real-Time Updates</h3>
          <p>Stay informed with live event data refreshed automatically.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔒</span>
          <h3>Secure Dashboard</h3>
          <p>Manage events with role-protected access.</p>
        </div>
      </section>
    </div>
  )
}
