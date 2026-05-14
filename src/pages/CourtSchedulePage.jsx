import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format, isSameDay } from 'date-fns'
import { courts, SURFACE_COLORS } from '../data/courts'
import { getDateTabs, generateSlots } from '../utils/slots'
import SlotGrid from '../components/SlotGrid'
import BookingModal from '../components/BookingModal'

export default function CourtSchedulePage({ bookings, addBooking, user }) {
  const { id } = useParams()
  const court = courts.find((c) => c.id === id)

  const dateTabs = getDateTabs(7)
  const [selectedDate, setSelectedDate] = useState(dateTabs[0])
  const [pendingSlot, setPendingSlot] = useState(null)

  if (!court) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-500">Court not found.</p>
        <Link to="/" className="text-orange-500 text-sm mt-4 inline-block">
          Back to courts
        </Link>
      </main>
    )
  }

  const slots = generateSlots(court.id, selectedDate, bookings)

  function handleConfirm(bookingData) {
    addBooking(bookingData)
    setPendingSlot(null)
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-stone-500 hover:text-stone-700 flex items-center gap-1 mb-6">
        ← All Courts
      </Link>

      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">{court.name}</h1>
          <p className="text-stone-500 mt-1 flex items-center gap-2">
            <span>📍 {court.location}</span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${SURFACE_COLORS[court.surface]}`}
            >
              {court.surface}
            </span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {dateTabs.map((date) => {
          const isToday = isSameDay(date, new Date())
          const isSelected = isSameDay(date, selectedDate)
          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`
                shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  isSelected
                    ? 'bg-orange-500 text-white'
                    : 'bg-orange-100 text-stone-600 hover:bg-orange-200'
                }
              `}
            >
              <div>{isToday ? 'Today' : format(date, 'EEE')}</div>
              <div className="text-xs opacity-80">{format(date, 'MMM d')}</div>
            </button>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl border border-orange-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-stone-900">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h2>
          <span className="text-sm text-stone-500">
            {slots.filter((s) => !s.isBooked).length} of {slots.length} slots free
          </span>
        </div>
        <SlotGrid slots={slots} onSlotClick={setPendingSlot} />
      </div>

      {pendingSlot && (
        <BookingModal
          slot={pendingSlot}
          court={court}
          user={user}
          onConfirm={handleConfirm}
          onClose={() => setPendingSlot(null)}
        />
      )}
    </main>
  )
}
