import { Trash2 } from 'lucide-react'
import type { Nota, TipoNota } from '../../types'
import { useApp } from '../../store/useApp'
import { useProject } from '../../store/useProject'
import { confirmar } from '../../store/confirm'
import EditableText from '../editable/EditableText'
import { tonos } from '../canvas/CanvasBlock'
import { tipos, ordenTipos } from './tipos'
import type { Apartado } from './apartados'

const fmt = new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' })

export default function NoteCard({ nota, apartados }: { nota: Nota; apartados: Apartado[] }) {
  const edicion = useApp((s) => s.modo === 'edicion')
  const editar = useProject((s) => s.editar)
  const tipo = tipos[nota.tipo]
  const t = tonos[tipo.tono]
  const Icono = tipo.icono
  const set = (f: (n: Nota) => void) => editar((p) => { const n = p.notas.find((x) => x.id === nota.id); if (n) f(n) })
  const borrar = async () => {
    if (await confirmar('¿Eliminar esta nota?')) editar((p) => { p.notas = p.notas.filter((x) => x.id !== nota.id) })
  }
  const etiqueta = apartados.find((a) => a.id === nota.apartado)?.etiqueta ?? 'General'
  return (
    <article className={`${t.caja} mb-4 break-inside-avoid p-5`}>
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="flex items-center gap-2 font-sans font-bold">
          <Icono size={16} aria-hidden />
          {edicion ? (
            <select value={nota.tipo} aria-label="Tipo de nota" onChange={(e) => set((n) => { n.tipo = e.target.value as TipoNota })}
              className="border border-current bg-transparent p-1 font-bold">
              {ordenTipos.map((k) => <option key={k} value={k} className="text-carbon">{tipos[k].etiqueta}</option>)}
            </select>
          ) : tipo.etiqueta}
        </span>
        {edicion && <button onClick={borrar} aria-label="Eliminar nota" className="p-1 opacity-70 hover:opacity-100"><Trash2 size={16} /></button>}
      </div>
      <div className="mt-3 flex items-start gap-3">
        {nota.tipo === 'tarea' && (
          <input type="checkbox" checked={!!nota.hecha} disabled={!edicion} aria-label="Tarea hecha"
            onChange={(e) => set((n) => { n.hecha = e.target.checked })} className="mt-2 h-4 w-4" />
        )}
        <p className={`min-w-0 flex-1 font-serif text-lg leading-snug ${nota.tipo === 'tarea' && nota.hecha ? 'line-through opacity-60' : ''}`}>
          <EditableText multiline value={nota.texto} onChange={(v) => set((n) => { n.texto = v })} />
        </p>
      </div>
      <div className={`mt-4 flex flex-wrap items-center justify-between gap-2 text-xs ${t.sub}`}>
        {edicion ? (
          <select value={nota.apartado} onChange={(e) => set((n) => { n.apartado = e.target.value })} aria-label="Apartado" className="max-w-full border border-current bg-transparent p-1">
            {apartados.map((a) => <option key={a.id} value={a.id} className="text-carbon">{a.etiqueta}</option>)}
          </select>
        ) : <span>{etiqueta}</span>}
        <time dateTime={nota.creada}>{fmt.format(new Date(nota.creada))}</time>
      </div>
    </article>
  )
}
