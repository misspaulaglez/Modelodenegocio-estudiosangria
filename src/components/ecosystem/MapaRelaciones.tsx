import type { Socio } from '../../types'
import { categorias } from './categorias'

interface Props { socios: Socio[]; seleccionado: string | null; onSeleccionar: (id: string) => void }

// Los socios se reparten en círculo alrededor del estudio. Las líneas están en un SVG
// de fondo y los nodos son botones HTML colocados por porcentajes.
export default function MapaRelaciones({ socios, seleccionado, onSeleccionar }: Props) {
  const pos = socios.map((_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / socios.length
    return { x: 50 + 36 * Math.cos(a), y: 50 + 34 * Math.sin(a) }
  })
  return (
    <div className="relative aspect-[5/4] w-full border border-carbon/20 bg-marfil/40">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {pos.map((p, i) => (
          <line key={socios[i].id} x1="50" y1="50" x2={p.x} y2={p.y} stroke="#49433F" strokeWidth="1.5" strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke" opacity={seleccionado === socios[i].id ? 1 : 0.4} />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-vino p-2 text-center font-sans text-xs font-bold tracking-widest text-marfil">
        ESTUDIO SANGRÍA
      </div>
      {socios.map((s, i) => (
        <button key={s.id} onClick={() => onSeleccionar(s.id)} aria-pressed={seleccionado === s.id}
          style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
          className={`absolute max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 px-3 py-2 text-center font-serif text-sm leading-tight transition-shadow ${categorias[s.categoria].nodo} ${seleccionado === s.id ? 'ring-2 ring-carbon ring-offset-2' : 'hover:shadow-md'}`}>
          {s.nombre}
        </button>
      ))}
    </div>
  )
}
