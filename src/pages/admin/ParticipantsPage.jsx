import { useState } from 'react'
import { useParticipants } from '../../hooks/useParticipants'
import { updateParticipant, deleteParticipant } from '../../services/participantService'
import ParticipantTable from '../../components/ParticipantTable'
import ConfirmDialog from '../../components/ConfirmDialog'
import Loader from '../../components/Loader'

export default function ParticipantsPage() {
  const { participants, loading } = useParticipants()
  const [deleteId, setDeleteId] = useState(null)

  const handleToggle = async (id, status) => {
    try {
      await updateParticipant(id, { status })
    } catch {
      alert('Error al actualizar')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteParticipant(deleteId)
    } catch {
      alert('Error al eliminar')
    }
    setDeleteId(null)
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">
          Participantes ({participants.length})
        </h1>
      </div>

      <div className="bg-[#121214] border border-[#27272A] rounded-2xl overflow-hidden">
        <ParticipantTable
          participants={participants}
          onToggle={handleToggle}
          onDelete={(id) => setDeleteId(id)}
        />
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        message="¿Estás seguro de eliminar este participante?"
      />
    </div>
  )
}
