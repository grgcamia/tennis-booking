import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

function toRow(booking) {
  return {
    id: booking.id,
    court_id: booking.courtId,
    court_name: booking.courtName,
    date: booking.date,
    start_time: booking.startTime,
    end_time: booking.endTime,
    player_name: booking.playerName,
    booked_at: booking.bookedAt,
    user_id: booking.userId,
  }
}

function fromRow(row) {
  return {
    id: row.id,
    courtId: row.court_id,
    courtName: row.court_name,
    date: row.date,
    startTime: row.start_time,
    endTime: row.end_time,
    playerName: row.player_name,
    bookedAt: row.booked_at,
    userId: row.user_id,
  }
}

export function useBookings(user) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setBookings([])
      setLoading(false)
      return
    }

    supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (error) console.error('Failed to load bookings:', error)
        else setBookings((data ?? []).map(fromRow))
        setLoading(false)
      })
  }, [user])

  const addBooking = useCallback((booking) => {
    if (!user) return
    const newBooking = {
      ...booking,
      id: crypto.randomUUID(),
      bookedAt: new Date().toISOString(),
      userId: user.id,
    }
    setBookings((prev) => [...prev, newBooking])
    supabase
      .from('bookings')
      .insert(toRow(newBooking))
      .then(({ error }) => {
        if (error) console.error('Failed to save booking:', error)
      })
    return newBooking
  }, [user])

  const cancelBooking = useCallback((bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId))
    supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId)
      .then(({ error }) => {
        if (error) console.error('Failed to cancel booking:', error)
      })
  }, [])

  return { bookings, addBooking, cancelBooking, loading }
}
