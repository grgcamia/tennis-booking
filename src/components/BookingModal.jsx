import { useEffect } from 'react'
import { format, parseISO } from 'date-fns'

export default function BookingModal({ slot, court, user, onConfirm, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleConfirm(e) {
    e.preventDefault()
    onConfirm({
      courtId: court.id,
      courtName: court.name,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      playerName: user.email,
    })
  }

  const dateLabel = format(parseISO(slot.date), 'EEEE, MMMM d')

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <h2 className="text-xl font-semibold text-stone-900 mb-1">Confirm Booking</h2>
        <p className="text-sm text-stone-500 mb-5">Review the details below.</p>

        <div className="bg-orange-50 rounded-xl p-4 mb-6 space-y-2">
          <Row label="Court" value={court.name} />
          <Row label="Date" value={dateLabel} />
          <Row label="Time" value={`${slot.startTime} – ${slot.endTime}`} />
          <Row label="Booked by" value={user.email} />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-stone-300 text-stone-700 text-sm font-medium py-2 rounded-lg hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-orange-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-stone-500">{label}</span>
      <span className="font-medium text-stone-900">{value}</span>
    </div>
  )
}
