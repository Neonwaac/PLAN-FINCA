import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { login } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'

export default function LoginPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) return null
  if (user) return <Navigate to="/admin" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message === 'Firebase: Error (auth/invalid-credential).'
        ? 'Credenciales inválidas'
        : err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="text-xl font-bold text-[#10B981] tracking-tight">
            Plan Finca
          </Link>
          <p className="text-sm text-[#71717A] mt-2">Inicia sesión como administrador</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-4"
        >
          {error && (
            <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-xl border border-red-500/20">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[#1A1A1E] border border-[#27272A] rounded-xl text-sm text-white placeholder-[#52525B] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all duration-200"
              placeholder="admin@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[#1A1A1E] border border-[#27272A] rounded-xl text-sm text-white placeholder-[#52525B] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-[#10B981] text-white font-medium rounded-xl hover:bg-[#059669] disabled:opacity-50 transition-all duration-200 text-sm cursor-pointer"
          >
            {submitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

          <Link
            to="/"
            className="block text-center text-sm text-[#52525B] hover:text-[#A1A1AA] transition-colors"
          >
            Volver al inicio
          </Link>
        </form>
      </div>
    </div>
  )
}
