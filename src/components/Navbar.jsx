import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar({ user, signOut }) {
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-orange-400' : 'text-stone-300 hover:text-white'
    }`

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <header className="bg-stone-900 border-b border-stone-800 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-white">
          <img src="/shiba.jpg" alt="" className="w-7 h-7 rounded-full object-cover border border-orange-400" />
          <span>TennisCourts</span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>Courts</NavLink>
          <NavLink to="/bookings" className={linkClass}>My Bookings</NavLink>
          <div className="flex items-center gap-3 border-l border-stone-700 pl-6">
            <span className="text-xs text-stone-400 hidden sm:block">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="text-sm font-medium text-stone-300 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
