import { useEffect, useState } from 'react'

export default function ProjectList({ onSelect }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const base = import.meta.env.VITE_BACKEND_URL
      const res = await fetch(`${base}/projects`)
      if (!res.ok) throw new Error('Erreur de chargement')
      setItems(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Projets</h3>
        <button onClick={load} className="text-sm text-blue-600 hover:underline">Rafraîchir</button>
      </div>
      {loading && <div className="text-sm text-gray-500">Chargement...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      <ul className="divide-y">
        {items.map(p => (
          <li key={p._id} className="py-2 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-gray-500">{p.project_type} • {p.location || '—'}</div>
            </div>
            <button onClick={() => onSelect?.(p)} className="text-sm px-2 py-1 border rounded-md hover:bg-gray-50">Ouvrir</button>
          </li>
        ))}
        {(!loading && items.length === 0) && <li className="py-2 text-sm text-gray-500">Aucun projet pour l'instant</li>}
      </ul>
    </div>
  )
}
