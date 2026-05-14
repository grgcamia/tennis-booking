import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format, parseISO, isPast, startOfDay } from 'date-fns'

export default function MyBookingsPage({ bookings, cancelBooking, user }) {
  const [confirmId, setConfirmId] = useState(null)

  const sorted = [...bookings]
    .filter((b) => b.userId === user.id)
    .sort((a, b) => {
      const aKey = `${a.date}T${a.startTime}`
      const bKey = `${b.date}T${b.startTime}`
      return aKey.localeCompare(bKey)
    })

  const upcoming = sorted.filter((b) => !isPast(parseISO(`${b.date}T${b.endTime}`)))
  const past = sorted.filter((b) => isPast(parseISO(`${b.date}T${b.endTime}`)))

  function handleCancel(id) {
    cancelBooking(id)
    setConfirmId(null)
  }

  if (bookings.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-16 text-center">
        <img src="/shiba.jpg" alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-orange-200" />
        <h1 className="text-2xl font-semibold text-stone-900 mb-2">No bookings yet</h1>
        <p className="text-stone-500 mb-6">The shiba is waiting. Book your first court slot!</p>
        <Link
          to="/"
          className="inline-block bg-orange-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Browse Courts
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">My Bookings</h1>
        <p className="text-stone-500 mt-1">
          {upcoming.length} upcoming · {past.length} past
        </p>
      </div>

      {upcoming.length > 0 && (
        <Section title="Upcoming">
          {upcoming.map((b) => (
            <BookingRow
              key={b.id}
              booking={b}
              isPast={false}
              isConfirming={confirmId === b.id}
              onCancelRequest={() => setConfirmId(b.id)}
              onCancelConfirm={() => handleCancel(b.id)}
              onCancelAbort={() => setConfirmId(null)}
            />
          ))}
        </Section>
      )}

      {past.length > 0 && (
        <Section title="Past">
          {past.map((b) => (
            <BookingRow key={b.id} booking={b} isPast={true} />
          ))}
        </Section>
      )}
    </main>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function BookingRow({ booking, isPast, isConfirming, onCancelRequest, onCancelConfirm, onCancelAbort }) {
  const dateLabel = format(parseISO(booking.date), 'EEE, MMM d')
  const timeLabel = `${booking.startTime} – ${booking.endTime}`

  return (
    <div
      className={`bg-white rounded-xl border px-5 py-4 flex items-center justify-between gap-4 flex-wrap ${
        isPast ? 'border-stone-100 opacity-60' : 'border-orange-100'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg shrink-0">
          🎾
        </div>
        <div>
          <div className="font-semibold text-stone-900">{booking.courtName}</div>
          <div className="text-sm text-stone-500">
            {dateLabel} · {timeLabel}
          </div>
          {booking.playerName && (
            <div className="text-xs text-stone-400 mt-0.5">{booking.playerName}</div>
          )}
        </div>
      </div>

      {!isPast && (
        <div className="flex items-center gap-2">
          {isConfirming ? (
            <>
              <span className="text-sm text-stone-600">Cancel this booking?</span>
              <button
                onClick={onCancelAbort}
                className="text-sm px-3 py-1.5 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Keep
              </button>
              <button
                onClick={onCancelConfirm}
                className="text-sm px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel Booking
              </button>
            </>
          ) : (
            <button
              onClick={onCancelRequest}
              className="text-sm text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  )
}
