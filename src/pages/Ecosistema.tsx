import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useApp } from '../store/useApp'
import { useProject } from '../store/useProject'
import MapaRelaciones from '../components/ecosystem/MapaRelaciones'
import DetalleSocio from '../components/ecosystem/DetalleSocio'
import { categorias, ordenCategorias } from '../components/ecosystem/categorias'

export default function Ecosistema() {
  const edicion = useApp((s) => s.modo === 'edicion')
  const socios = useProject((s) => s.proyecto.socios)
  const editar = useProject((s) => s.editar)
  const [sel, setSel] = useState<string | null>(null)
  const actual = socios.find((s) => s.id === sel)

  const anadir = () => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    editar((p) => { p.socios.push({ id, nombre: 'Nuevo socio', categoria: 'comercio', estado: 'por-explorar', notas: '' }) })
    setSel(id)
  }

  return (
    <div className="px-6 pb-16 pt-12 md:px-12 md:pt-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-serif text-xl italic text-verde">04</p>
          <h1 className="font-serif text-5xl text-vino md:text-7xl">Ecosistema rural</h1>
          <p className="mt-4 max-w-prose font-serif text-lg">Las relaciones del estudio con el territorio. Selecciona un socio para ver sus notas.</p>
          <p className="mt-2 max-w-prose text-sm text-carbon/70">Todos empiezan como «Por explorar»: ningún acuerdo se da por hecho.</p>
        </div>
        {edicion && (
          <button onClick={anadir} className="inline-flex items-center gap-2 rounded-full bg-vino px-5 py-3 text-sm text-marfil hover:bg-carbon"><Plus size={16} /> Añadir socio</button>
        )}
      </div>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {socios.length === 0 ? (
            <div className="border border-dashed border-carbon/40 p-10 text-center">
              <p className="font-serif text-2xl text-vino">Todavía no hay socios</p>
              <p className="mx-auto mt-2 max-w-sm font-serif text-lg">{edicion ? 'Añade el primero con el botón «Añadir socio».' : 'Activa el modo edición para añadir el primero.'}</p>
            </div>
          ) : (
            <>
              <div className="hidden md:block"><MapaRelaciones socios={socios} seleccionado={sel} onSeleccionar={setSel} /></div>
              <ul className="space-y-2 md:hidden">
                {socios.map((s) => (
                  <li key={s.id}>
                    <button onClick={() => setSel(s.id)} aria-pressed={sel === s.id}
                      className={`w-full rounded-2xl border-2 px-4 py-3 text-left font-serif ${categorias[s.categoria].nodo} ${sel === s.id ? 'ring-2 ring-carbon ring-offset-2' : ''}`}>{s.nombre}</button>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {ordenCategorias.map((c) => (
                  <li key={c} className="flex items-center gap-2"><span className={`h-4 w-4 rounded border-2 ${categorias[c].nodo}`} aria-hidden /> {categorias[c].etiqueta}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <aside className="lg:col-span-4" aria-live="polite">
          {actual ? <DetalleSocio key={actual.id} socio={actual} onBorrado={() => setSel(null)} /> : (
            socios.length > 0 && <p className="border border-dashed border-carbon/40 p-6 font-serif text-lg">Selecciona un socio para ver su categoría, el estado de la relación y tus notas.</p>
          )}
        </aside>
      </div>
    </div>
  )
}
