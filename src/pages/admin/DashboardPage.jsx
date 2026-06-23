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
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total participantes" value={total} color="blue" />
        <StatsCard
          title="Recaudado"
          value={`$${totalCollected.toLocaleString('es-CO')}`}
          color="emerald"
        />
        <StatsCard title="Total productos" value={products.length} color="purple" />
        <StatsCard
          title="Costo total"
          value={`$${totalCost.toLocaleString('es-CO')}`}
          color="amber"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Recaudado vs Costo total</span>
          <span className="font-semibold">{collectedPercentage}%</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${collectedPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          ${totalCollected.toLocaleString('es-CO')} recaudado de ${totalCost.toLocaleString('es-CO')} necesarios ({paid} de {total} pagaron)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-3">Últimos participantes</h2>
          {participants.length === 0 ? (
            <p className="text-sm text-gray-400">Sin participantes</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {participants.slice(-5).reverse().map((p) => (
                <li key={p.id} className="flex justify-between py-2">
                  <span className="text-sm text-gray-700">{p.name}</span>
                  <span className={`text-xs font-medium ${p.paid ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {p.paid ? 'Pagado' : 'Pendiente'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-3">Últimos productos</h2>
          {products.length === 0 ? (
            <p className="text-sm text-gray-400">Sin productos</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {products.slice(-5).reverse().map((p) => (
                <li key={p.id} className="flex justify-between py-2">
                  <span className="text-sm text-gray-700">{p.title}</span>
                  <span className="text-sm font-medium text-amber-600">
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
