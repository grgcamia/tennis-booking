export default function ShibaMascot() {
  return (
    <div className="flex items-center gap-5 bg-gradient-to-r from-orange-100 to-amber-50 border border-orange-200 rounded-2xl px-6 py-5 mb-8">
      <img
        src="/shiba.jpg"
        alt="Shiba Inu mascot"
        className="w-20 h-20 rounded-full object-cover border-4 border-orange-300 shadow-sm shrink-0"
      />
      <div>
        <p className="font-bold text-stone-900 text-lg">Welcome to TennisCourts!</p>
        <p className="text-sm text-stone-600 mt-0.5">
          Your favourite shiba is ready to rally. Pick a court and book your session below.
        </p>
      </div>
    </div>
  )
}
