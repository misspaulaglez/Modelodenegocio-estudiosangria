import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronsUpDown, FileDown, Presentation } from 'lucide-react'
import { useProject } from '../store/useProject'
import CanvasBlock from '../components/canvas/CanvasBlock'

// Cuántas columnas ocupa cada bloque (de 12) en pantallas grandes: composición asimétrica.
const ancho: Record<string, string> = {
  segmentos: 'lg:col-span-5', propuesta: 'lg:col-span-7',
  relaciones: 'lg:col-span-7', canales: 'lg:col-span-5',
  ingresos: 'lg:col-span-4', actividades: 'lg:col-span-4', recursos: 'lg:col-span-4',
  socios: 'lg:col-span-5', costes: 'lg:col-span-7',
}

export default function Modelo() {
  const canvas = useProject((s) => s.proyecto.canvas)
  const soloLectura = useProject((s) => s.soloLectura)
  const [abiertos, setAbiertos] = useState<string[]>([])
  const todos = abiertos.length === canvas.length
  const alternar = (id: string) => setAbiertos((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))
  return (
    <div className="px-6 pb-16 pt-12 md:px-12 md:pt-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-serif text-xl italic text-verde">01</p>
          <h1 className="font-serif text-5xl text-vino md:text-7xl">Modelo de negocio</h1>
          <p className="mt-4 max-w-prose font-serif text-lg">Los nueve bloques del modelo Canvas. Toca un bloque para desplegarlo.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <button onClick={() => setAbiertos(todos ? [] : canvas.map((b) => b.id))}
            className="inline-flex items-center gap-2 rounded-full border border-carbon/40 px-5 py-3 hover:bg-rosa/50">
            <ChevronsUpDown size={16} /> {todos ? 'Plegar todos' : 'Desplegar todos'}
          </button>
          {!soloLectura && (
          <Link to="/exportar" className="inline-flex items-center gap-2 rounded-full border border-carbon/40 px-5 py-3 hover:bg-rosa/50">
            <FileDown size={16} /> Exportar a PDF
          </Link>
          )}
          <Link to="/presentar" className="inline-flex items-center gap-2 rounded-full bg-vino px-5 py-3 text-marfil hover:bg-carbon">
            <Presentation size={16} /> Presentar
          </Link>
        </div>
      </div>
      <div className="mt-12 grid items-start gap-4 lg:grid-cols-12">
        {canvas.map((b) => (
          <CanvasBlock key={b.id} bloque={b} className={ancho[b.id]} abierto={abiertos.includes(b.id)} onToggle={() => alternar(b.id)} />
        ))}
      </div>
    </div>
  )
}
