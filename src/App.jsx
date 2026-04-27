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
          bottom: 'clamp(15px, 4vw, 30px)',
          right: 'clamp(15px, 4vw, 30px)',
          zIndex: 1000,
          padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 20px)',
          borderRadius: '8px',
          border: '1px solid rgba(150,150,150,0.2)',
          backgroundColor: isDarkMode ? 'rgba(30,41,59,0.8)' : 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          color: isDarkMode ? '#f8fafc' : '#0f172a',
          fontWeight: 'bold',
          fontSize: 'clamp(14px, 3vw, 16px)',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        {isDarkMode ? '☼ Light Mode' : '☾ Dark Mode'}
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
