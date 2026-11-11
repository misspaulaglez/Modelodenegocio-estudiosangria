import { useApp } from '../../store/useApp'
import { euros } from '../../lib/viabilidad'

interface Props { value: number | null; onChange: (v: number | null) => void; etiqueta: string; tipo?: 'euros' | 'numero' }

// Vacío = null = "pendiente de estimar". Nunca se rellena con un valor inventado.
export default function EditableNumber({ value, onChange, etiqueta, tipo = 'euros' }: Props) {
  const edicion = useApp((s) => s.modo === 'edicion')
  if (!edicion) {
    return value === null
      ? <span className="rounded-full bg-agua px-2 py-0.5 text-xs text-carbon">Pendiente de estimar</span>
      : <>{tipo === 'euros' ? euros(value) : value}</>
  }
  return (
    <span className="inline-flex items-center gap-1">
      <input type="number" min={0} step="any" inputMode="decimal" aria-label={etiqueta} value={value ?? ''} placeholder="Pendiente"
        onChange={(e) => onChange(e.target.value === '' ? null : Math.max(0, Number(e.target.value)))}
        className="w-28 border border-carbon/30 bg-papel/80 p-1 text-right text-carbon" />
      {tipo === 'euros' && <span aria-hidden>€</span>}
    </span>
  )
}
