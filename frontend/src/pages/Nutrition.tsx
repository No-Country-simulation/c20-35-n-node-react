import { Bell, Settings } from 'lucide-react'
import React from 'react'

function Nutrition() {
  return (
    <main className="flex-grow p-8 overflow-auto bg-gradient-to-br from-secondary/10 to-primary">
      <header className="flex justify-end items-center mb-4">
        <div className="flex items-center space-x-4">
          <Bell size={25} />

          <Settings size={25} />
        </div>
      </header>

      <h1>Nutricion</h1>
    </main>
  )
}

export default Nutrition