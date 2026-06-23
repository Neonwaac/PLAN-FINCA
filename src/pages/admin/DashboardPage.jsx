import { useParticipants } from '../../hooks/useParticipants'
import { useProducts } from '../../hooks/useProducts'
import StatsCard from '../../components/StatsCard'
import Loader from '../../components/Loader'

export default function DashboardPage() {
  const { participants, loading: pl, total, paid, totalCollected } = useParticipants()
  const { products, loading: prl, totalCost } = useProducts()

  const collectedPercentage = totalCost > 0
    ? Math.round((totalCollected / totalCost) * 100)
    : 0

  if (pl || prl) return <Loader />

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total participantes" value={total} />
        <StatsCard
          title="Recaudado"
          value={`$${totalCollected.toLocaleString('es-CO')}`}
        />
        <StatsCard title="Total productos" value={products.length} />
        <StatsCard
          title="Costo total"
          value={`$${totalCost.toLocaleString('es-CO')}`}
        />
      </div>

      <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-5">
        <div className="flex justify-between text-sm text-[#A1A1AA] mb-3">
          <span>Recaudado vs Costo total</span>
          <span className="font-semibold text-[#34D399]">{collectedPercentage}%</span>
        </div>
        <div className="w-full h-3 bg-[#1A1A1E] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] rounded-full transition-all duration-700"
            style={{ width: `${collectedPercentage}%` }}
          />
        </div>
        <p className="text-xs text-[#52525B] mt-2">
          ${totalCollected.toLocaleString('es-CO')} recaudado de ${totalCost.toLocaleString('es-CO')} necesarios ({paid} de {total} pagaron)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-5">
          <h2 className="font-semibold text-[#FAFAFA] mb-3 text-sm">Últimos participantes</h2>
          {participants.length === 0 ? (
            <p className="text-sm text-[#52525B]">Sin participantes</p>
          ) : (
            <ul className="divide-y divide-[#27272A]">
              {participants.slice(-5).reverse().map((p) => (
                <li key={p.id} className="flex justify-between py-2.5">
                  <span className="text-sm text-[#E4E4E7]">{p.name}</span>
                  <span className={`text-xs font-medium ${p.paid ? 'text-[#34D399]' : 'text-[#52525B]'}`}>
                    {p.paid ? 'Pagado' : 'Pendiente'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-5">
          <h2 className="font-semibold text-[#FAFAFA] mb-3 text-sm">Últimos productos</h2>
          {products.length === 0 ? (
            <p className="text-sm text-[#52525B]">Sin productos</p>
          ) : (
            <ul className="divide-y divide-[#27272A]">
              {products.slice(-5).reverse().map((p) => (
                <li key={p.id} className="flex justify-between py-2.5">
                  <span className="text-sm text-[#E4E4E7]">{p.title}</span>
                  <span className="text-sm font-medium text-[#10B981]">
                    ${Number(p.price).toLocaleString('es-CO')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
