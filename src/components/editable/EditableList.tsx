import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import { useApp } from '../../store/useApp'
import { confirmar } from '../../store/confirm'
import EditableText from './EditableText'

export function Controles({ onUp, onDown, onDelete }: { onUp?: () => void; onDown?: () => void; onDelete: () => void }) {
  const b = 'rounded p-1 opacity-70 hover:opacity-100'
  return (
    <span className="flex shrink-0 items-center">
      {onUp && <button className={b} onClick={onUp} aria-label="Subir"><ArrowUp size={14} /></button>}
      {onDown && <button className={b} onClick={onDown} aria-label="Bajar"><ArrowDown size={14} /></button>}
      <button className={b} onClick={onDelete} aria-label="Eliminar"><Trash2 size={14} /></button>
    </span>
  )
}

interface Props { items: string[]; onChange: (items: string[]) => void; className?: string; nuevo?: string }

export default function EditableList({ items, onChange, className = '', nuevo = 'elemento' }: Props) {
  const edicion = useApp((s) => s.modo === 'edicion')
  const mover = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= items.length) return
    const n = [...items]; [n[i], n[j]] = [n[j], n[i]]; onChange(n)
  }
  const borrar = async (i: number) => {
    if (!items[i] || (await confirmar(`¿Eliminar «${items[i]}»?`))) onChange(items.filter((_, k) => k !== i))
  }
  return (
    <ul className={className}>
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-1">
          <span className="flex-1"><EditableText value={it} onChange={(v) => onChange(items.map((x, k) => (k === i ? v : x)))} /></span>
          {edicion && <Controles onUp={() => mover(i, -1)} onDown={() => mover(i, 1)} onDelete={() => borrar(i)} />}
        </li>
      ))}
      {edicion && (
        <li>
          <button onClick={() => onChange([...items, ''])} className="mt-1 inline-flex items-center gap-1 text-sm underline">
            <Plus size={14} /> Añadir {nuevo}
          </button>
        </li>
      )}
    </ul>
  )
}
