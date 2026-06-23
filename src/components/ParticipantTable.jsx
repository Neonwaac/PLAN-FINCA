export default function ParticipantTable({ participants, onToggle, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-500">Nombre</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Estado</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {participants.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-8 text-gray-400">
                No hay participantes registrados
              </td>
            </tr>
          )}
          {participants.map((p) => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-800">{p.name}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    p.paid
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {p.paid ? 'Pagado' : 'Pendiente'}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => onToggle(p.id, !p.paid)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      p.paid
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    {p.paid ? 'Marcar no pagado' : 'Marcar pagado'}
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
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
