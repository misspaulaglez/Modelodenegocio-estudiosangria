import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { TipoNota } from '../../types'
import { useProject } from '../../store/useProject'
import { tipos, ordenTipos } from './tipos'
import type { Apartado } from './apartados'

const nuevoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7)

export default function NoteForm({ apartados }: { apartados: Apartado[] }) {
  const editar = useProject((s) => s.editar)
  const [tipo, setTipo] = useState<TipoNota>('idea')
  const [texto, setTexto] = useState('')
  const [apartado, setApartado] = useState('general')
  const guardar = () => {
    const t = texto.trim()
    if (!t) return
    editar((p) => { p.notas.unshift({ id: nuevoId(), tipo, texto: t, apartado, creada: new Date().toISOString(), hecha: false }) })
    setTexto('')
  }
  return (
    <div className="border border-carbon/25 bg-papel p-5">
      <h2 className="font-serif text-2xl text-vino">Nueva nota</h2>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Tipo de nota">
        {ordenTipos.map((k) => (
          <button key={k} onClick={() => setTipo(k)} aria-pressed={tipo === k}
            className={`rounded-full border px-3 py-1 text-sm ${tipo === k ? 'border-vino bg-vino text-marfil' : 'border-carbon/40 hover:bg-rosa/50'}`}>
            {tipos[k].etiqueta}
          </button>
        ))}
      </div>
      <textarea value={texto} onChange={(e) => setTexto(e.target.value)} rows={4} placeholder="Escribe lo que ha salido en la tutoría…"
        className="mt-4 w-full resize-y border border-carbon/30 bg-marfil/40 p-3 font-serif text-lg" aria-label="Texto de la nota" />
      <label className="mt-3 block text-sm">
        Apartado
        <select value={apartado} onChange={(e) => setApartado(e.target.value)} className="mt-1 w-full border border-carbon/30 bg-marfil/40 p-2">
          {apartados.map((a) => <option key={a.id} value={a.id}>{a.etiqueta}</option>)}
        </select>
      </label>
      <button onClick={guardar} disabled={!texto.trim()}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-vino px-5 py-3 text-sm text-marfil hover:bg-carbon disabled:opacity-40">
        <Plus size={16} /> Guardar nota
      </button>
    </div>
  )
}
