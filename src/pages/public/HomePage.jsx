import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useEvent } from '../../hooks/useEvent'
import { useParticipants } from '../../hooks/useParticipants'
import { useProducts } from '../../hooks/useProducts'
import { useCountdown } from '../../hooks/useCountdown'
import { createParticipant } from '../../services/participantService'
import ProductCard from '../../components/ProductCard'
import ProgressBar from '../../components/ProgressBar'
import Loader from '../../components/Loader'
import PublicNavbar from '../../components/PublicNavbar'
import heroBg from '../../assets/finca/hero.jpg'

function HeroCountdown({ countdown }) {
  const blocks = [
    { label: 'Días', value: countdown.days },
    { label: 'Horas', value: countdown.hours },
    { label: 'Minutos', value: countdown.minutes },
    { label: 'Segundos', value: countdown.seconds },
  ]

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {blocks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
          className="relative flex flex-col items-center bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 min-w-[64px] sm:min-w-[88px]"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tabular-nums tracking-tight">
            {String(b.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-medium text-[#71717A] uppercase tracking-widest mt-1">
            {b.label}
          </span>
          {i < blocks.length - 1 && (
            <span className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-[#3F3F46] text-lg font-light">
              :
            </span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const { event, loading: eventLoading } = useEvent()
  const { participants, loading: partsLoading, total, pagado, confirmado, totalCollected } = useParticipants()
  const { products, loading: prodsLoading, totalCost } = useProducts()
  const countdown = useCountdown(event?.eventDate)
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef(null)

  const collectedPercentage = totalCost > 0
    ? Math.round((totalCollected / totalCost) * 100)
    : 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitting(true)
    try {
      await createParticipant({ name: name.trim() })
      setName('')
    } catch {
      alert('Error al inscribirse')
    } finally {
      setSubmitting(false)
    }
  }

  if (eventLoading || partsLoading || prodsLoading) return <Loader />

  return (
    <div className="relative min-h-screen bg-[#09090B] overflow-hidden">
      <div className="noise-overlay" />
      <div className="glow-1" />
      <div className="glow-2" />

      <PublicNavbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[length:cover] bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage: `url(${heroBg})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/70 via-[#09090B]/50 to-[#09090B]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090B]/40 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center flex flex-col items-center gap-6 sm:gap-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              {event?.title || 'Plan Finca'}
            </h1>
            {event?.description && (
              <p className="text-base sm:text-lg text-[#A1A1AA] max-w-lg mx-auto leading-relaxed">
                {event.description}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            {countdown ? (
              <HeroCountdown countdown={countdown} />
            ) : (
              <p className="text-sm text-[#71717A]">La fecha del evento no está disponible</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          >
            <a
              href="#inscribirse"
              onClick={(e) => {
                e.preventDefault()
                formRef.current?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-medium text-sm rounded-xl transition-all duration-200"
            >
              Inscribirme ahora
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent" />
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative z-10 -mt-16 px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto bg-[#121214]/90 backdrop-blur-xl border border-[#27272A] rounded-2xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: 'Inscritos', value: total, color: 'text-white' },
              { label: 'Pagados', value: pagado, color: 'text-[#34D399]' },
              {
                label: 'Costo total',
                value: `$${totalCost.toLocaleString('es-CO')}`,
                color: 'text-[#FAFAFA]',
              },
              {
                label: 'Recaudado',
                value: `$${totalCollected.toLocaleString('es-CO')}`,
                color: 'text-[#34D399]',
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="text-center"
              >
                <p className={`text-xl sm:text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
                <p className="text-xs text-[#71717A] mt-1 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== PROGRESS ===== */}
      {totalCost > 0 && (
        <section id="progreso" className="relative z-10 max-w-4xl mx-auto px-5 pt-24 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <h2 className="text-sm font-semibold text-[#A1A1AA] uppercase tracking-widest">
                Meta comunitaria
              </h2>
            </div>

            <ProgressBar
              percentage={collectedPercentage}
              label={`$${totalCollected.toLocaleString('es-CO')} recaudado de $${totalCost.toLocaleString('es-CO')}`}
              sublabel={`${pagado} de ${total} participantes han pagado su cuota`}
            />
          </motion.div>
        </section>
      )}

      {/* ===== PRODUCTS ===== */}
      {products.length > 0 && (
        <section id="productos" className="relative z-10 max-w-7xl mx-auto px-5 pt-24 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ¿Qué estás pagando con tu aporte?
            </h2>
            <p className="text-[#71717A] mt-2 text-sm">
              {products.length} {products.length === 1 ? 'producto' : 'productos'} productos contando a la finca :D
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ===== PARTICIPANTS ===== */}
      <section id="participantes" className="relative z-10 max-w-4xl mx-auto px-5 pt-24 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Inscritos
          </h2>
          <p className="text-[#71717A] mt-2 text-sm">
            {total} {total === 1 ? 'persona pensada' : 'personas pensadas'} para el evento
            <span className="mx-2 text-[#3F3F46]">|</span>
            <span className="text-amber-400">{confirmado} confirmadas</span>
            <span className="mx-2 text-[#3F3F46]">|</span>
            <span className="text-[#34D399]">{pagado} ya pagaron</span>
          </p>
        </motion.div>

        <div className="bg-[#121214] border border-[#27272A] rounded-2xl overflow-hidden divide-y divide-[#27272A]">
          {participants.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-[#52525B]">Aún no hay inscritos. ¡Sé el primero!</p>
            </div>
          )}
          {participants.map((p, i) => {
            const st = p.status || 'pendiente'
            const badge = {
              pendiente: 'bg-[#27272A] text-[#71717A] border border-[#3F3F46]',
              confirmado: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
              pagado: 'bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/20',
            }
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                layout
                className="flex items-center justify-between px-5 sm:px-6 py-3.5 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#1A1A1E] border border-[#27272A] flex items-center justify-center">
                    <span className="text-xs font-medium text-[#71717A]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <span className="text-sm font-medium text-[#E4E4E7]">{p.name}</span>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge[st] || badge.pendiente}`}>
                  {st === 'pagado' ? 'Pagado' : st === 'confirmado' ? 'Confirmado' : 'Pendiente'}
                </span>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ===== REGISTRATION ===== */}
      <section id="inscribirse" ref={formRef} className="relative z-10 max-w-4xl mx-auto px-5 pt-24 sm:pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 sm:p-8"
        >
          <div className="max-w-lg mx-auto text-center space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Únete al plan
              </h2>
              <p className="text-sm text-[#71717A] mt-2">
                Ingresa tu nombre para confirmar tu asistencia
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-[#1A1A1E] border border-[#27272A] rounded-xl text-sm text-white placeholder-[#52525B] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all duration-200"
              />
              <button
                type="submit"
                disabled={submitting || !name.trim()}
                className="px-6 py-3 bg-[#10B981] hover:bg-[#059669] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {submitting ? 'Inscribiendo...' : 'Inscribirme'}
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-[#27272A]">
        <div className="max-w-7xl mx-auto px-5 py-8 flex items-center justify-between">
          <p className="text-xs text-[#52525B]">© 2026 Neonwaac Inc. All rights reserved.</p>
          <a
            href="/admin/login"
            className="text-xs text-[#52525B] hover:text-[#A1A1AA] transition-colors"
          >
            Administrar
          </a>
        </div>
      </footer>
    </div>
  )
}
