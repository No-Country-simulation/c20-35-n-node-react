import { Bell, Settings } from 'lucide-react'
import Requirements from '../components/layout/Requirements'
import Activities from '../components/layout/Activities'
import Foods from '../components/layout/Foods'

function Home() {

  return (
    <main className="flex-grow h-screen p-8 overflow-auto bg-gradient-to-br from-secondary/10 to-primary">
      <header className="flex justify-end items-center mb-4">
        <div className="flex items-center space-x-4">
          <Bell size={25} />

          <Settings size={25} />
        </div>
      </header>

      <Requirements />

      <div className="grid grid-cols-2 gap-8 mb-6">
        <Foods />

        <Activities />
      </div>
    </main>
  )
}

export default Home
