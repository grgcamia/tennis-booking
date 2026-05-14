import { format, addDays, startOfDay } from 'date-fns'

const FIRST_SLOT_HOUR = 6   // 06:00
const LAST_SLOT_HOUR  = 21  // last slot starts at 21:00

export function getDateTabs(count = 7) {
  const today = startOfDay(new Date())
  return Array.from({ length: count }, (_, i) => addDays(today, i))
}

export function generateSlots(courtId, date, bookings) {
  const dateStr = format(date, 'yyyy-MM-dd')
  const slots = []

  for (let hour = FIRST_SLOT_HOUR; hour <= LAST_SLOT_HOUR; hour++) {
    const startTime = `${String(hour).padStart(2, '0')}:00`
    const endTime   = `${String(hour + 1).padStart(2, '0')}:00`
    const id        = `${courtId}-${dateStr}-${startTime}`

    const booking = bookings.find(
      (b) => b.courtId === courtId && b.date === dateStr && b.startTime === startTime
    )

    slots.push({
      id,
      courtId,
      date: dateStr,
      startTime,
      endTime,
      isBooked: !!booking,
      bookingId: booking?.id ?? null,
    })
  }

  return slots
}
