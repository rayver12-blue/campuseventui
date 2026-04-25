import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useEvents } from '../../context/EventContext'

export default function Login() {
  const { login, isLoggedIn } = useEvents()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  if (isLoggedIn) {
    return (
      <div className="page login-page">
        <div className="login-card">
          <h2>✅ Already Logged In</h2>
          <p>You are currently signed in.</p>
          <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        </div>
      </div>
    )
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      login()
      navigate('/dashboard')
    } else {
      setError('❌ Invalid credentials. Try admin / admin123')
    }
  }

  return (
    <div className="page login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">🔐</span>
          <h2>Sign In</h2>
          <p>Access your CampusEventUI dashboard</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button className="btn btn-primary btn-full" onClick={handleLogin}>
            Login
          </button>
        </div>

        <p className="login-hint">
          Demo credentials: <strong>admin</strong> / <strong>admin123</strong>
        </p>
      </div>
    </div>
  )
}
