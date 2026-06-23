import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#participantes', label: 'Participantes' },
  { href: '#productos', label: 'Productos' },
  { href: '#progreso', label: 'Progreso' },
]

export default function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#09090B]/80 backdrop-blur-xl border-b border-[#27272A] shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-white hover:text-[#34D399] transition-colors"
        >
          Plan Finca
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 text-sm text-[#A1A1AA] hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/admin/login"
            className="ml-3 px-4 py-2 text-sm font-medium text-white bg-[#10B981] hover:bg-[#059669] rounded-xl transition-all duration-200"
          >
            Admin
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#27272A] bg-[#09090B]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-[#A1A1AA] hover:text-white rounded-lg hover:bg-white/[0.06] transition-all"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-2.5 text-sm font-medium text-center text-white bg-[#10B981] hover:bg-[#059669] rounded-xl transition-all"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
