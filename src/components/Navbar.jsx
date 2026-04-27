import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useEvents } from '../context/EventContext'

export default function Navbar() {
  const { isLoggedIn, logout } = useEvents()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMenu}>
        💠 CampusEventUI
      </Link>
      
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        {isOpen ? '✕' : '☱'}
      </button>

      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            Dashboard
          </NavLink>
        </li>
        <li>
          {isLoggedIn ? (
            <button className="btn-logout" onClick={() => { logout(); closeMenu(); }}>Logout</button>
          ) : (
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  )
}
