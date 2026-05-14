import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useBookings } from './hooks/useBookings'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import CourtsPage from './pages/CourtsPage'
import CourtSchedulePage from './pages/CourtSchedulePage'
import MyBookingsPage from './pages/MyBookingsPage'

function Spinner() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <img src="/shiba.jpg" alt="" className="w-16 h-16 rounded-full object-cover border-4 border-orange-300 animate-pulse" />
        <p className="text-stone-500 text-sm">Loading…</p>
      </div>
    </div>
  )
}

export default function App() {
  const { user, authLoading, signUp, signIn, signOut } = useAuth()
  const { bookings, addBooking, cancelBooking, loading } = useBookings(user)

  if (authLoading || (user && loading)) return <Spinner />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage signUp={signUp} signIn={signIn} />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute user={user}>
              <div className="min-h-screen bg-orange-50">
                <Navbar user={user} signOut={signOut} />
                <Routes>
                  <Route path="/" element={<CourtsPage bookings={bookings} />} />
                  <Route
                    path="/courts/:id"
                    element={<CourtSchedulePage bookings={bookings} addBooking={addBooking} user={user} />}
                  />
                  <Route
                    path="/bookings"
                    element={<MyBookingsPage bookings={bookings} cancelBooking={cancelBooking} user={user} />}
                  />
                </Routes>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
