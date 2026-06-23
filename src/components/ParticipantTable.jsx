export default function ParticipantTable({ participants, onToggle, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#27272A]">
            <th className="text-left py-3 px-4 font-medium text-[#71717A]">Nombre</th>
            <th className="text-left py-3 px-4 font-medium text-[#71717A]">Estado</th>
            <th className="text-right py-3 px-4 font-medium text-[#71717A]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {participants.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-12 text-[#52525B]">
                No hay participantes registrados
              </td>
            </tr>
          )}
          {participants.map((p) => (
            <tr key={p.id} className="border-b border-[#1A1A1E] hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-4 font-medium text-[#E4E4E7]">{p.name}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    p.paid
                      ? 'bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/20'
                      : 'bg-[#1A1A1E] text-[#71717A] border border-[#27272A]'
                  }`}
                >
                  {p.paid ? 'Pagado' : 'Pendiente'}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => onToggle(p.id, !p.paid)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                      p.paid
                        ? 'bg-[#1A1A1E] text-[#71717A] hover:bg-[#222226] border border-[#27272A]'
                        : 'bg-[#10B981]/10 text-[#34D399] hover:bg-[#10B981]/20 border border-[#10B981]/20'
                    }`}
                  >
                    {p.paid ? 'Marcar no pagado' : 'Marcar pagado'}
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all duration-200 cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
