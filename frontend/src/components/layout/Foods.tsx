import { useAuth } from '../../context/AuthContext'

export default function Foods() {
  const { user } = useAuth()

  return (
    <div>
      <h3 className="text-lg mb-4">Comidas</h3>
      <div className="bg-card-bg p-4 rounded-xl min-h-80">
        {/* Contenido para Tus Objetivos */}
      </div>

    </div>
  )
}