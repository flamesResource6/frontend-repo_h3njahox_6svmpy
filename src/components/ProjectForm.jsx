import { useState } from 'react'

export default function ProjectForm({ onCreate }) {
  const [form, setForm] = useState({
    name: '',
    project_type: 'Autre',
    location: '',
    contact_name: '',
    contact_phone: '',
    photo_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const base = import.meta.env.VITE_BACKEND_URL
      const res = await fetch(`${base}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Erreur de création')
      const data = await res.json()
      onCreate?.(data)
      setForm({ name: '', project_type: 'Autre', location: '', contact_name: '', contact_phone: '', photo_url: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white border rounded-lg p-4 shadow-sm space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-gray-600">Nom du projet</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring"
                 value={form.name}
                 onChange={e=>setForm({...form,name:e.target.value})}
                 required />
        </div>
        <div>
          <label className="text-sm text-gray-600">Type</label>
          <select className="w-full mt-1 px-3 py-2 border rounded-md" value={form.project_type}
                  onChange={e=>setForm({...form, project_type:e.target.value})}>
            {['Immeuble','Résidence','Villa','École','Hôtel','Autre'].map(t=> (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Localisation</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-md" value={form.location}
                 onChange={e=>setForm({...form,location:e.target.value})} />
        </div>
        <div>
          <label className="text-sm text-gray-600">Contact</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-md" value={form.contact_name}
                 onChange={e=>setForm({...form,contact_name:e.target.value})} />
        </div>
        <div>
          <label className="text-sm text-gray-600">Téléphone</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-md" value={form.contact_phone}
                 onChange={e=>setForm({...form,contact_phone:e.target.value})} />
        </div>
        <div>
          <label className="text-sm text-gray-600">Photo (URL)</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-md" value={form.photo_url}
                 onChange={e=>setForm({...form,photo_url:e.target.value})} />
        </div>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Création...' : 'Créer le projet'}
      </button>
    </form>
  )
}
