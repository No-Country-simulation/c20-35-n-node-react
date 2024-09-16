import { useAuth } from '../../context/AuthContext'

export default function Activities() {
  const { user } = useAuth()

  return (
    <div>
      <h3 className="text-lg mb-4">Actividad física</h3>
      <div className="bg-card-bg p-4 rounded-xl min-h-80">
        <div className="flex justify-between items-center mb-4">
          <select className="bg-card-muted text-text rounded-md px-2 py-1">
            <option>Semanal</option>
            <option>Mensual</option>
            <option>Anual</option>
          </select>
        </div>
        <div className="h-48 bg-card-muted rounded-xl"></div>
      </div>
    </div>
  )
}