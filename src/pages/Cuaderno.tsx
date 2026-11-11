import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import type { TipoNota } from '../types'
import { useApp } from '../store/useApp'
import { useProject } from '../store/useProject'
import NoteForm from '../components/notebook/NoteForm'
import NoteCard from '../components/notebook/NoteCard'
import { useApartados } from '../components/notebook/apartados'
import { tipos, ordenTipos } from '../components/notebook/tipos'

// Busca sin distinguir mayúsculas ni tildes.
const limpiar = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function Cuaderno() {
  const edicion = useApp((s) => s.modo === 'edicion')
  const notas = useProject((s) => s.proyecto.notas)
  const apartados = useApartados()
  const [busqueda, setBusqueda] = useState('')
  const [tipo, setTipo] = useState<TipoNota | 'todas'>('todas')
  const [apartado, setApartado] = useState('todos')

  const visibles = useMemo(() => {
    const q = limpiar(busqueda.trim())
    return notas.filter((n) => {
      if (tipo !== 'todas' && n.tipo !== tipo) return false
      if (apartado !== 'todos' && n.apartado !== apartado) return false
      if (!q) return true
      const etiqueta = apartados.find((a) => a.id === n.apartado)?.etiqueta ?? ''
      return limpiar(`${n.texto} ${etiqueta} ${tipos[n.tipo].etiqueta}`).includes(q)
    })
  }, [notas, busqueda, tipo, apartado, apartados])

  const hayFiltros = busqueda !== '' || tipo !== 'todas' || apartado !== 'todos'
  const limpiarFiltros = () => { setBusqueda(''); setTipo('todas'); setApartado('todos') }
  const chip = (activo: boolean) => `rounded-full border px-3 py-1 text-sm ${activo ? 'border-vino bg-vino text-marfil' : 'border-carbon/40 hover:bg-rosa/50'}`

  return (
    <div className="px-6 pb-16 pt-12 md:px-12 md:pt-16">
      <p className="font-serif text-xl italic text-verde">07</p>
      <h1 className="font-serif text-5xl text-vino md:text-7xl">Cuaderno de ideas</h1>
      <p className="mt-4 max-w-prose font-serif text-lg">Un espacio libre para las tutorías con Ana: ideas, observaciones, preguntas, decisiones y tareas.</p>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <aside className="space-y-6 lg:col-span-4">
          {edicion && <NoteForm apartados={apartados} />}
          <div className="space-y-4">
            <label className="relative block">
              <span className="sr-only">Buscar en las notas</span>
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" aria-hidden />
              <input type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar en las notas"
                className="w-full border border-carbon/30 bg-papel py-3 pl-9 pr-3" />
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
              <button className={chip(tipo === 'todas')} aria-pressed={tipo === 'todas'} onClick={() => setTipo('todas')}>Todas</button>
              {ordenTipos.map((k) => <button key={k} className={chip(tipo === k)} aria-pressed={tipo === k} onClick={() => setTipo(k)}>{tipos[k].etiqueta}</button>)}
            </div>
            <select value={apartado} onChange={(e) => setApartado(e.target.value)} aria-label="Filtrar por apartado" className="w-full border border-carbon/30 bg-papel p-3">
              <option value="todos">Todos los apartados</option>
              {apartados.map((a) => <option key={a.id} value={a.id}>{a.etiqueta}</option>)}
            </select>
            {hayFiltros && <button onClick={limpiarFiltros} className="inline-flex items-center gap-1 text-sm underline"><X size={14} /> Quitar filtros</button>}
          </div>
        </aside>

        <section className="lg:col-span-8" aria-live="polite">
          {notas.length === 0 ? (
            <div className="border border-dashed border-carbon/40 p-10 text-center">
              <p className="font-serif text-2xl text-vino">El cuaderno está en blanco</p>
              <p className="mx-auto mt-2 max-w-sm font-serif text-lg">
                {edicion ? 'Empieza por la primera idea de la próxima tutoría.' : 'Activa el modo edición para añadir la primera nota.'}
              </p>
            </div>
          ) : visibles.length === 0 ? (
            <div className="border border-dashed border-carbon/40 p-10 text-center">
              <p className="font-serif text-2xl text-vino">Ninguna nota coincide</p>
              <button onClick={limpiarFiltros} className="mt-3 text-sm underline">Quitar filtros</button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-carbon/70">{visibles.length} {visibles.length === 1 ? 'nota' : 'notas'}</p>
              <div className="columns-1 gap-4 md:columns-2">
                {visibles.map((n) => <NoteCard key={n.id} nota={n} apartados={apartados} />)}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
