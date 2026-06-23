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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuración del evento</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título del evento
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            placeholder="Ej: Paseo a la finca"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none"
            placeholder="Describe el evento..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha del evento
          </label>
          <input
            type="datetime-local"
            value={form.eventDate}
            onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2.5 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors text-sm cursor-pointer"
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>

        {saved && (
          <p className="text-sm text-emerald-600 text-center font-medium">
            Evento actualizado correctamente
          </p>
        )}
      </form>
    </div>
  )
}
