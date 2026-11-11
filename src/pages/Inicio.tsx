import { Link } from 'react-router-dom'
import { BookOpen, Presentation, Pencil } from 'lucide-react'
import { useApp } from '../store/useApp'
import { useProject } from '../store/useProject'
import EditableText from '../components/editable/EditableText'
import Rodaja from '../components/ui/Rodaja'

type Campo = 'lema' | 'fraseCentral' | 'presentacion' | 'ubicacion'

export default function Inicio() {
  const setModo = useApp((s) => s.setModo)
  const soloLectura = useProject((s) => s.soloLectura)
  const meta = useProject((s) => s.proyecto.meta)
  const editar = useProject((s) => s.editar)
  const set = (k: Campo) => (v: string) => editar((p) => { p.meta[k] = v })
  const fecha = new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(meta.ultimaActualizacion))
  const boton = 'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors'
  return (
    <div>
      <section className="grid items-center gap-12 px-6 pb-16 pt-12 md:px-12 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="font-sans text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-[0.12em] text-vino">
            ESTUDIO<br />SANGRÍA
          </h1>
          <p className="mt-6 font-serif text-2xl italic text-verde md:text-3xl">«<EditableText value={meta.lema} onChange={set('lema')} />»</p>
        </div>
        <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <Rodaja className="w-full" />
        </div>
      </section>

      <p className="bg-verde px-6 py-5 font-serif text-xl italic text-papel md:px-12 md:text-2xl"><EditableText value={meta.ubicacion} onChange={set('ubicacion')} /></p>

      <section className="grid gap-10 bg-rosa px-6 py-16 md:px-12 lg:grid-cols-12">
        <blockquote className="font-serif text-4xl leading-tight text-carbon md:text-5xl lg:col-span-7">
          <EditableText multiline value={meta.fraseCentral} onChange={set('fraseCentral')} />
        </blockquote>
        <div className="lg:col-span-5 lg:pt-3">
          <p className="max-w-prose font-serif text-lg leading-relaxed"><EditableText multiline value={meta.presentacion} onChange={set('presentacion')} /></p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/modelo" onClick={() => setModo('presentacion')} className={`${boton} bg-vino text-marfil hover:bg-carbon`}>
              <BookOpen size={16} /> Ver el modelo de negocio
            </Link>
            <Link to="/presentar" className={`${boton} border border-vino text-vino hover:bg-papel/50`}>
              <Presentation size={16} /> Presentar
            </Link>
            {!soloLectura && (
            <Link to="/modelo" onClick={() => setModo('edicion')} className={`${boton} border border-carbon/50 hover:bg-papel/50`}>
              <Pencil size={16} /> Editar
            </Link>
            )}
          </div>
          <p className="mt-8 inline-block rounded-full bg-agua px-4 py-1.5 text-sm text-carbon">Última actualización: {fecha}</p>
        </div>
      </section>
    </div>
  )
}
