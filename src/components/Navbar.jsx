import { Link, NavLink } from 'react-router-dom'
import { useEvents } from '../context/EventContext'

export default function Navbar() {
  const { isLoggedIn, logout } = useEvents()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🎓 CampusEventUI
      </Link>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''}>
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
        </li>
        <li>
          {isLoggedIn ? (
            <button className="btn-logout" onClick={logout}>Logout</button>
          ) : (
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  )
}
