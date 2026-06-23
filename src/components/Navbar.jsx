import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { logout } from '../services/authService'

const links = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/participants', label: 'Participantes' },
  { to: '/admin/products', label: 'Productos' },
  { to: '/admin/event', label: 'Evento' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <nav className="bg-[#121214]/80 backdrop-blur-xl border-b border-[#27272A] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-1">
            <Link to="/" className="text-[#10B981] font-bold text-lg mr-6 tracking-tight">
              Plan Finca
            </Link>
            <div className="hidden md:flex gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === l.to
                      ? 'bg-[#10B981]/10 text-[#34D399]'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#71717A] hidden sm:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="flex md:hidden gap-1 pb-3 overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                pathname === l.to
                  ? 'bg-[#10B981]/10 text-[#34D399]'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
