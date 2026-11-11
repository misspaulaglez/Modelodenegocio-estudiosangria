import { ChevronDown, Plus, Trash2 } from 'lucide-react'
import type { Bloque, Grupo, Tono, TonoCoste } from '../../types'
import { useApp } from '../../store/useApp'
import { useProject } from '../../store/useProject'
import { confirmar } from '../../store/confirm'
import EditableText from '../editable/EditableText'
import EditableList from '../editable/EditableList'

export const tonos: Record<Tono, { caja: string; num: string; sub: string }> = {
  vino: { caja: 'bg-vino text-marfil', num: 'text-rosa', sub: 'text-marfil/85' },
  rosa: { caja: 'bg-rosa text-carbon', num: 'text-vino', sub: 'text-carbon/80' },
  marfil: { caja: 'bg-marfil text-carbon', num: 'text-vino', sub: 'text-carbon/75' },
  agua: { caja: 'bg-agua text-carbon', num: 'text-vino', sub: 'text-carbon/80' },
  papel: { caja: 'border border-carbon/25 bg-papel text-carbon', num: 'text-verde', sub: 'text-carbon/75' },
}

export const etiquetas: Record<TonoCoste, string> = { imprescindible: 'imprescindible', variable: 'variable', aplazable: 'aplazable' }
export const bordes: Record<TonoCoste, string> = { imprescindible: 'border-vino', variable: 'border-verde', aplazable: 'border-agua' }
const noop = () => {}

interface GruposProps { grupos: Grupo[]; onChange?: (g: Grupo[]) => void; columnas?: boolean }

export function Grupos({ grupos, onChange, columnas = false }: GruposProps) {
  const edicion = useApp((s) => s.modo === 'edicion') && !!onChange
  const cambio = onChange ?? noop
  const cambiar = (i: number, parcial: Partial<Grupo>) => cambio(grupos.map((g, k) => (k === i ? { ...g, ...parcial } : g)))
  const borrar = async (i: number) => {
    if (await confirmar(`¿Eliminar el grupo «${grupos[i].titulo}» y todo su contenido?`)) cambio(grupos.filter((_, k) => k !== i))
  }
  return (
    <div className={columnas ? 'grid gap-8 md:grid-cols-2' : 'space-y-6'}>
      {grupos.map((g, i) => (
        <div key={i} className={g.tono ? `border-l-4 pl-4 ${bordes[g.tono]}` : ''}>
          <div className="flex items-baseline gap-2">
            <h4 className="font-sans text-sm font-bold"><EditableText value={g.titulo} onChange={(v) => cambiar(i, { titulo: v })} /></h4>
            {g.tono && <span className="text-sm italic">({etiquetas[g.tono]})</span>}
            {edicion && (
              <button onClick={() => borrar(i)} aria-label="Eliminar grupo" className="ml-auto p-1 opacity-70 hover:opacity-100"><Trash2 size={16} /></button>
            )}
          </div>
          <EditableList className="mt-2 space-y-1 font-serif leading-snug" items={g.items} onChange={(items) => cambiar(i, { items })} />
        </div>
      ))}
      {edicion && (
        <button onClick={() => cambio([...grupos, { titulo: 'Nuevo grupo', items: [''] }])} className="inline-flex items-center gap-1 text-sm underline">
          <Plus size={14} /> Añadir grupo
        </button>
      )}
    </div>
  )
}

interface Props { bloque: Bloque; abierto: boolean; onToggle: () => void; className?: string }

export default function CanvasBlock({ bloque: b, abierto, onToggle, className = '' }: Props) {
  const t = tonos[b.tono]
  const edicion = useApp((s) => s.modo === 'edicion')
  const editar = useProject((s) => s.editar)
  const set = (f: (x: Bloque) => void) => editar((p) => { const x = p.canvas.find((c) => c.id === b.id); if (x) f(x) })
  const visible = abierto || edicion // en edición todo está desplegado
  return (
    <article className={`${t.caja} ${className} p-6 md:p-8`}>
      <div className={`flex items-start justify-between gap-4 ${edicion ? '' : 'cursor-pointer'}`} onClick={() => { if (!edicion) onToggle() }}>
        <div className="min-w-0 flex-1">
          <span className={`font-serif text-lg italic ${t.num}`}>{b.numero}</span>
          <h2 className="mt-1 font-serif text-3xl leading-tight md:text-4xl"><EditableText value={b.titulo} onChange={(v) => set((x) => { x.titulo = v })} /></h2>
          <p className={`mt-3 font-serif text-lg ${t.sub}`}><EditableText multiline value={b.resumen} onChange={(v) => set((x) => { x.resumen = v })} /></p>
        </div>
        {!edicion && (
          <button onClick={(e) => { e.stopPropagation(); onToggle() }} aria-expanded={abierto} aria-label={abierto ? 'Plegar bloque' : 'Desplegar bloque'} className="mt-2 shrink-0">
            <ChevronDown className={`transition-transform duration-300 ${abierto ? 'rotate-180' : ''}`} aria-hidden />
          </button>
        )}
      </div>
      <div className={`grid transition-[grid-template-rows] duration-300 ${visible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`} aria-hidden={!visible}>
        <div className="overflow-hidden">
          <div className="space-y-6 pt-6">
            <Grupos grupos={b.grupos} onChange={(g) => set((x) => { x.grupos = g })} />
            {b.frase !== undefined && <p className="font-serif text-2xl italic">«<EditableText multiline value={b.frase} onChange={(v) => set((x) => { x.frase = v })} />»</p>}
            {b.nota !== undefined && <p className={`text-sm ${t.sub}`}><EditableText multiline value={b.nota} onChange={(v) => set((x) => { x.nota = v })} /></p>}
          </div>
        </div>
      </div>
    </article>
  )
}
