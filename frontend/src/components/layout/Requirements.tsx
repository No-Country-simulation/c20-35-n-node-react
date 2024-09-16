import { useAuth } from '../../context/AuthContext'

export default function Requirements() {
  const { user } = useAuth()

  return (
    <div className="grid grid-cols-4 gap-8 mb-6 h-max">
      <div>
        <h3 className="text-lg mb-4">Calorias</h3>
        <div className="bg-card-bg/80 backdrop-blur-sm p-4 rounded-xl min-h-40">

        </div>
      </div>

      <div>
        <h3 className="text-lg mb-4">Carbohidratos</h3>
        <div className="bg-card-bg p-4 rounded-xl min-h-40">

        </div>
      </div>

      <div>
        <h3 className="text-lg mb-4">Proteinas</h3>
        <div className="bg-card-bg p-4 rounded-xl min-h-40">

        </div>
      </div>

      <div>
        <h3 className="text-lg mb-4">Grasas</h3>
        <div className="bg-card-bg p-4 rounded-xl min-h-40">

        </div>
      </div>
    </div>
  )
}