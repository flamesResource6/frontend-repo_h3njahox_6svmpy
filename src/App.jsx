import { useState } from 'react'
import Header from './components/Header'
import ProjectForm from './components/ProjectForm'
import ProjectList from './components/ProjectList'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onToggleSidebar={() => setSidebarOpen(s => !s)} />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">Créer un nouveau projet</h2>
            <ProjectForm onCreate={(p) => setSelected(p)} />
          </div>
          <div className="lg:col-span-1">
            <ProjectList onSelect={(p) => setSelected(p)} />
          </div>
        </div>

        {selected && (
          <section className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-2">Projet sélectionné</h3>
            <div className="text-sm text-gray-700">{selected.name}</div>
            <div className="text-xs text-gray-500">{selected.project_type} • {selected.location || '—'}</div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
