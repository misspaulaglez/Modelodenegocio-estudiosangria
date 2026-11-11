import { Circle, CircleCheck, CircleDot, Plus } from 'lucide-react'
import type { EstadoTarea, Tarea } from '../../types'
import { useApp } from '../../store/useApp'
import { useProject } from '../../store/useProject'
import { confirmar } from '../../store/confirm'
import EditableText from '../editable/EditableText'
import { Controles } from '../editable/EditableList'

export const estados: Record<EstadoTarea, { etiqueta: string; icono: typeof Circle; siguiente: EstadoTarea }> = {
  pendiente: { etiqueta: 'Pendiente', icono: Circle, siguiente: 'en-curso' },
  'en-curso': { etiqueta: 'En curso', icono: CircleDot, siguiente: 'completada' },
  completada: { etiqueta: 'Completada', icono: CircleCheck, siguiente: 'pendiente' },
}

const fmt = new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' })

interface Props { faseId: string; tarea: Tarea; indice: number; total: number }

export default function TareaItem({ faseId, tarea, indice, total }: Props) {
  const edicion = useApp((s) => s.modo === 'edicion')
  const editar = useProject((s) => s.editar)
  const e = estados[tarea.estado]
  const Icono = e.icono
  const tareas = (p: { hojaRuta: { id: string; tareas: Tarea[] }[] }) => p.hojaRuta.find((f) => f.id === faseId)!.tareas
  const set = (f: (t: Tarea) => void) => editar((p) => { const t = tareas(p).find((x) => x.id === tarea.id); if (t) f(t) })
  const mover = (d: number) => editar((p) => {
    const a = tareas(p), j = indice + d
    if (j >= 0 && j < a.length) [a[indice], a[j]] = [a[j], a[indice]]
  })
  const borrar = async () => {
    if (await confirmar(`¿Eliminar la tarea «${tarea.texto || 'sin título'}»?`)) editar((p) => { tareas(p).splice(indice, 1) })
  }
  const icono = <Icono size={20} aria-hidden className={tarea.estado === 'en-curso' ? 'text-verde' : ''} />
  return (
    <li className="border-t border-current/20 py-3 first:border-t-0">
      <div className="flex items-start gap-3">
        {edicion ? (
          <button onClick={() => set((t) => { t.estado = e.siguiente })} aria-label={`Estado: ${e.etiqueta}. Pulsa para cambiar`} title={e.etiqueta} className="mt-0.5 shrink-0">{icono}</button>
        ) : <span className="mt-0.5 shrink-0" title={e.etiqueta}>{icono}</span>}
        <p className={`min-w-0 flex-1 font-serif text-lg leading-snug ${tarea.estado === 'completada' ? 'line-through opacity-60' : ''}`}>
          <EditableText multiline value={tarea.texto} onChange={(v) => set((t) => { t.texto = v })} />
        </p>
        {edicion && <Controles onUp={indice > 0 ? () => mover(-1) : undefined} onDown={indice < total - 1 ? () => mover(1) : undefined} onDelete={borrar} />}
      </div>
      <div className="ml-8 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className="font-semibold">{e.etiqueta}</span>
        {edicion ? (
          <label className="flex items-center gap-2">
            <span>Fecha objetivo</span>
            <input type="date" value={tarea.fecha} onChange={(ev) => set((t) => { t.fecha = ev.target.value })} className="bg-papel/80 p-1 text-carbon" />
          </label>
        ) : <span className="opacity-80">{tarea.fecha ? fmt.format(new Date(`${tarea.fecha}T00:00`)) : 'Sin fecha'}</span>}
      </div>
    </li>
  )
}

export function AnadirTarea({ faseId }: { faseId: string }) {
  const editar = useProject((s) => s.editar)
  const nuevo = () => editar((p) => {
    p.hojaRuta.find((f) => f.id === faseId)!.tareas.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), texto: '', estado: 'pendiente', fecha: '' })
  })
  return <button onClick={nuevo} className="mt-2 inline-flex items-center gap-1 text-sm underline"><Plus size={14} /> Añadir tarea</button>
}
