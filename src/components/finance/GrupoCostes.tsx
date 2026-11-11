import { Plus } from 'lucide-react'
import type { GrupoCoste, Project } from '../../types'
import { useApp } from '../../store/useApp'
import { useProject } from '../../store/useProject'
import { confirmar } from '../../store/confirm'
import { euros, sumar } from '../../lib/viabilidad'
import EditableText from '../editable/EditableText'
import EditableNumber from '../editable/EditableNumber'
import { Controles } from '../editable/EditableList'
import { bordes, etiquetas } from '../canvas/CanvasBlock'

export default function GrupoCostes({ grupo }: { grupo: GrupoCoste }) {
  const edicion = useApp((s) => s.modo === 'edicion')
  const editar = useProject((s) => s.editar)
  const lista = (p: Project) => p.viabilidad.costes.find((c) => c.id === grupo.id)!.partidas
  const mover = (i: number, d: number) => editar((p) => { const a = lista(p), j = i + d; if (j >= 0 && j < a.length) [a[i], a[j]] = [a[j], a[i]] })
  const borrar = async (i: number) => {
    if (await confirmar(`¿Eliminar la partida «${grupo.partidas[i].concepto || 'sin título'}»?`)) editar((p) => { lista(p).splice(i, 1) })
  }
  const anadir = () => editar((p) => { lista(p).push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), concepto: '', importe: null }) })
  const sub = sumar(grupo.partidas)
  return (
    <section className={`border-l-4 pl-5 ${bordes[grupo.tono]}`}>
      <h3 className="font-serif text-2xl">
        {grupo.titulo} <span className="font-sans text-sm italic">({etiquetas[grupo.tono]}, {grupo.unidad === 'mes' ? 'al mes' : 'pago único'})</span>
      </h3>
      <ul className="mt-3">
        {grupo.partidas.map((pt, i) => (
          <li key={pt.id} className="flex flex-wrap items-start gap-x-4 gap-y-1 border-t border-carbon/15 py-2 first:border-t-0">
            <span className="min-w-[10rem] flex-1 font-serif text-lg"><EditableText value={pt.concepto} onChange={(v) => editar((p) => { lista(p)[i].concepto = v })} /></span>
            <span className="font-serif text-lg"><EditableNumber etiqueta={`Importe de ${pt.concepto}`} value={pt.importe} onChange={(v) => editar((p) => { lista(p)[i].importe = v })} /></span>
            {edicion && <Controles onUp={i > 0 ? () => mover(i, -1) : undefined} onDown={i < grupo.partidas.length - 1 ? () => mover(i, 1) : undefined} onDelete={() => borrar(i)} />}
          </li>
        ))}
      </ul>
      {edicion && <button onClick={anadir} className="mt-1 inline-flex items-center gap-1 text-sm underline"><Plus size={14} /> Añadir partida</button>}
      <p className="mt-3 text-sm font-bold">
        Total: {sub.conDatos ? euros(sub.total) : 'pendiente de estimar'}
        {sub.conDatos && sub.pendientes > 0 && <span className="ml-2 font-normal italic">({sub.pendientes} partidas sin estimar)</span>}
      </p>
    </section>
  )
}
