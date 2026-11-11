import { Plus } from 'lucide-react'
import type { Prioridad } from '../../types'
import { useApp } from '../../store/useApp'
import { useProject } from '../../store/useProject'
import { confirmar } from '../../store/confirm'
import EditableText from '../editable/EditableText'
import EditableNumber from '../editable/EditableNumber'
import { Controles } from '../editable/EditableList'

const grupos: { id: Prioridad; titulo: string; vacio: string }[] = [
  { id: 'prioritario', titulo: 'Servicios prioritarios', vacio: 'Ninguno marcado todavía. Decide cuáles abordar primero.' },
  { id: 'futuro', titulo: 'Servicios a desarrollar en el futuro', vacio: 'Ninguno marcado todavía.' },
  { id: 'por-decidir', titulo: 'Por decidir', vacio: 'Todos los servicios tienen ya su prioridad.' },
]

export default function ServiciosIngresos() {
  const edicion = useApp((s) => s.modo === 'edicion')
  const servicios = useProject((s) => s.proyecto.viabilidad.servicios)
  const editar = useProject((s) => s.editar)
  const set = (id: string, f: (x: (typeof servicios)[number]) => void) => editar((p) => { const x = p.viabilidad.servicios.find((y) => y.id === id); if (x) f(x) })
  const borrar = async (id: string, nombre: string) => {
    if (await confirmar(`¿Eliminar el servicio «${nombre || 'sin título'}»?`)) editar((p) => { p.viabilidad.servicios = p.viabilidad.servicios.filter((y) => y.id !== id) })
  }
  const anadir = () => editar((p) => { p.viabilidad.servicios.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), nombre: 'Nuevo servicio', precio: null, proyectosMes: null, prioridad: 'por-decidir' }) })
  return (
    <div className="space-y-8">
      {grupos.map((g) => {
        const lista = servicios.filter((s) => s.prioridad === g.id)
        return (
          <section key={g.id}>
            <h3 className="font-serif text-2xl">{g.titulo}</h3>
            {lista.length === 0 ? <p className="mt-2 text-sm italic opacity-70">{g.vacio}</p> : (
              <ul className="mt-2">
                {lista.map((s) => (
                  <li key={s.id} className="border-t border-carbon/15 py-3 first:border-t-0">
                    <div className="flex items-start gap-2">
                      <span className="flex-1 font-serif text-xl"><EditableText value={s.nombre} onChange={(v) => set(s.id, (x) => { x.nombre = v })} /></span>
                      {edicion && <Controles onDelete={() => borrar(s.id, s.nombre)} />}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                      <span>Precio medio por proyecto: <EditableNumber etiqueta={`Precio medio de ${s.nombre}`} value={s.precio} onChange={(v) => set(s.id, (x) => { x.precio = v })} /></span>
                      <span>Proyectos al mes: <EditableNumber tipo="numero" etiqueta={`Proyectos al mes de ${s.nombre}`} value={s.proyectosMes} onChange={(v) => set(s.id, (x) => { x.proyectosMes = v })} /></span>
                      {edicion && (
                        <select value={s.prioridad} aria-label="Prioridad" onChange={(e) => set(s.id, (x) => { x.prioridad = e.target.value as Prioridad })} className="border border-carbon/30 bg-marfil/40 p-1">
                          <option value="prioritario">Prioritario</option><option value="futuro">A desarrollar en el futuro</option><option value="por-decidir">Por decidir</option>
                        </select>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}
      {edicion && <button onClick={anadir} className="inline-flex items-center gap-1 text-sm underline"><Plus size={14} /> Añadir servicio</button>}
    </div>
  )
}
