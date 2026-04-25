import { Navigate } from 'react-router-dom'
import { useEvents } from '../context/EventContext'

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useEvents()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}
