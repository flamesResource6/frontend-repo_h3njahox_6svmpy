import { Menu } from 'lucide-react'

export default function Header({ onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 active:scale-95 transition"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <span className="text-lg font-semibold text-gray-800">MeasurePro</span>
        </div>
        <div className="text-sm text-gray-500">Gestion des projets & mesures</div>
      </div>
    </header>
  )
}
