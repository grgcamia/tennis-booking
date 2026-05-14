import { courts } from '../data/courts'
import CourtCard from '../components/CourtCard'
import ShibaMascot from '../components/ShibaMascot'

export default function CourtsPage({ bookings }) {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <ShibaMascot />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Courts</h1>
        <p className="text-gray-500 mt-1">Select a court to view its schedule and book a slot.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {courts.map((court) => (
          <CourtCard key={court.id} court={court} bookings={bookings} />
        ))}
      </div>
    </main>
  )
}
