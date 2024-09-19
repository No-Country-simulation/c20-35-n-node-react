import { useAuth } from '../../context/AuthContext'

export default function Activities() {
  const { user } = useAuth()

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6">
      <h3 className="text-xl font-bold text-white mb-6">Actividad física</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <select className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Semanal</option>
            <option>Mensual</option>
            <option>Anual</option>
          </select>
        </div>
        <div className="h-48 bg-gray-700 rounded-xl flex items-center justify-center text-gray-400">
          Gráfico de actividad (pendiente de implementar)
        </div>
      </div>
    </div>
  )
}