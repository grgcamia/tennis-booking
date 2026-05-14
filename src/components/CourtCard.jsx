import { Link } from 'react-router-dom'
import { startOfDay } from 'date-fns'
import { generateSlots } from '../utils/slots'
import { SURFACE_COLORS } from '../data/courts'

export default function CourtCard({ court, bookings }) {
  const today = startOfDay(new Date())
  const todaySlots = generateSlots(court.id, today, bookings)
  const availableCount = todaySlots.filter((s) => !s.isBooked).length

  return (
    <div className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h2 className="text-lg font-semibold text-stone-900">{court.name}</h2>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${SURFACE_COLORS[court.surface]}`}
          >
            {court.surface}
          </span>
        </div>
        <p className="text-sm text-stone-500 mb-1 flex items-center gap-1">
          <span>📍</span> {court.location}
        </p>
        <p className="text-sm text-stone-600 mt-3 leading-relaxed">{court.description}</p>
      </div>

      <div className="px-5 pb-5 flex items-center justify-between">
        <span
          className={`text-sm font-medium ${
            availableCount > 0 ? 'text-orange-600' : 'text-red-500'
          }`}
        >
          {availableCount > 0
            ? `${availableCount} slots available today`
            : 'Fully booked today'}
        </span>
        <Link
          to={`/courts/${court.id}`}
          className="text-sm font-medium bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          View Schedule
        </Link>
      </div>
    </div>
  )
}
