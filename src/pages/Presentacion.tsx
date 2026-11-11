import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useProject } from '../store/useProject'
import { useApp } from '../store/useApp'
import { Grupos, tonos } from '../components/canvas/CanvasBlock'

// Pantalla completa, sin menú ni herramientas de edición. Flechas del teclado o botones.
export default function Presentacion() {
  const canvas = useProject((s) => s.proyecto.canvas)
  const [i, setI] = useState(0)
  const salir = useNavigate()
  const ir = (d: number) => setI((n) => Math.min(canvas.length - 1, Math.max(0, n + d)))
  useEffect(() => { useApp.getState().setModo('presentacion') }, []) // sin herramientas de edición
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') ir(1)
      if (e.key === 'ArrowLeft') ir(-1)
      if (e.key === 'Escape') salir('/modelo')
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [salir])

  const b = canvas[i]
  const t = tonos[b.tono]
  const boton = 'rounded-full border border-current p-3 transition-opacity disabled:opacity-30'
  return (
    <div className={`flex min-h-screen flex-col px-6 py-8 md:px-16 ${t.caja}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-sans font-bold tracking-[0.3em]">SANGRÍA</span>
        <button onClick={() => salir('/modelo')} className="inline-flex items-center gap-2 hover:underline"><X size={16} /> Salir</button>
      </div>
      <div key={b.id} className="mx-auto my-10 w-full max-w-5xl flex-1">
        <p className={`font-serif text-2xl italic ${t.num}`}>{b.numero}</p>
        <h1 className="font-serif text-5xl leading-tight md:text-7xl">{b.titulo}</h1>
        <p className={`mt-4 max-w-prose font-serif text-xl md:text-2xl ${t.sub}`}>{b.resumen}</p>
        <div className="mt-10"><Grupos grupos={b.grupos} columnas /></div>
        {b.frase && <p className="mt-10 font-serif text-3xl italic md:text-4xl">«{b.frase}»</p>}
        {b.nota && <p className={`mt-8 max-w-prose font-serif text-lg ${t.sub}`}>{b.nota}</p>}
      </div>
      <div className="flex items-center justify-between">
        <button className={boton} onClick={() => ir(-1)} disabled={i === 0} aria-label="Anterior"><ChevronLeft /></button>
        <span className="text-sm">{i + 1} de {canvas.length}</span>
        <button className={boton} onClick={() => ir(1)} disabled={i === canvas.length - 1} aria-label="Siguiente"><ChevronRight /></button>
      </div>
    </div>
  )
}
