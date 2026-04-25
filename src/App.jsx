import { Suspense, lazy, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EventProvider } from './context/EventContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy-loaded pages (Step 11)
const Home = lazy(() => import('./assets/pages/Home'))
const Events = lazy(() => import('./assets/pages/Events'))
const EventDetails = lazy(() => import('./assets/pages/EventDetails'))
const Dashboard = lazy(() => import('./assets/pages/Dashboard'))
const Login = lazy(() => import('./assets/pages/Login'))

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  return (
    <EventProvider>
      {/* Floating Theme Toggle */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px 15px',
          borderRadius: '30px',
          border: 'none',
          backgroundColor: isDarkMode ? '#f1f1f1' : '#222',
          color: isDarkMode ? '#222' : '#fff',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <BrowserRouter>
        <Suspense fallback={<div className="loading-screen">Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </EventProvider>
  )
}

export default App
