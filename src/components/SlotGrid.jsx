export default function SlotGrid({ slots, onSlotClick }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {slots.map((slot) => (
        <button
          key={slot.id}
          disabled={slot.isBooked}
          onClick={() => !slot.isBooked && onSlotClick(slot)}
          className={`
            rounded-xl border px-4 py-3 text-sm font-medium text-center transition-all
            ${
              slot.isBooked
                ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-400 cursor-pointer'
            }
          `}
        >
          <div className="font-semibold">{slot.startTime}</div>
          <div className="text-xs mt-0.5 opacity-75">
            {slot.isBooked ? 'Booked' : 'Available'}
          </div>
        </button>
      ))}
    </div>
  )
}
