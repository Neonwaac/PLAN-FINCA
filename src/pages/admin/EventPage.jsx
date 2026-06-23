import { useState, useEffect } from 'react'
import { useEvent } from '../../hooks/useEvent'
import { updateEvent } from '../../services/eventService'
import Loader from '../../components/Loader'

export default function EventPage() {
  const { event, loading } = useEvent()
  const [form, setForm] = useState({ title: '', description: '', eventDate: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || '',
        description: event.description || '',
        eventDate: event.eventDate
          ? new Date(event.eventDate).toISOString().slice(0, 16)
          : '',
      })
    }
  }, [event])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateEvent({
        title: form.title.trim(),
        description: form.description.trim(),
        eventDate: form.eventDate
          ? new Date(form.eventDate).toISOString()
          : '',
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      alert('Error al guardar evento')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight mb-6">
        Configuración del evento
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">
            Título del evento
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-2.5 bg-[#1A1A1E] border border-[#27272A] rounded-xl text-sm text-white placeholder-[#52525B] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all duration-200"
            placeholder="Ej: Paseo a la finca"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">
            Descripción
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 bg-[#1A1A1E] border border-[#27272A] rounded-xl text-sm text-white placeholder-[#52525B] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all duration-200 resize-none"
            placeholder="Describe el evento..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">
            Fecha del evento
          </label>
          <input
            type="datetime-local"
            value={form.eventDate}
            onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            required
            className="w-full px-4 py-2.5 bg-[#1A1A1E] border border-[#27272A] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2.5 bg-[#10B981] text-white font-medium rounded-xl hover:bg-[#059669] disabled:opacity-50 transition-all duration-200 text-sm cursor-pointer"
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>

        {saved && (
          <p className="text-sm text-[#34D399] text-center font-medium">
            Evento actualizado correctamente
          </p>
        )}
      </form>
    </div>
  )
}
