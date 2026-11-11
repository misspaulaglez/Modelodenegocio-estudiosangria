import { PawPrint } from 'lucide-react'
import type { Linea } from '../types'
import { useProject } from '../store/useProject'
import EditableText from '../components/editable/EditableText'
import EditableList from '../components/editable/EditableList'
import { tonos } from '../components/canvas/CanvasBlock'

const ancho: Record<string, string> = { servicios: 'lg:col-span-7', productos: 'lg:col-span-5', impacto: 'lg:col-span-12' }

export default function Lineas() {
  const lineas = useProject((s) => s.proyecto.lineas)
  const editar = useProject((s) => s.editar)
  const set = (id: string, f: (l: Linea) => void) => editar((p) => { const l = p.lineas.find((x) => x.id === id); if (l) f(l) })
  return (
    <div className="px-6 pb-16 pt-12 md:px-12 md:pt-16">
      <p className="font-serif text-xl italic text-verde">03</p>
      <h1 className="font-serif text-5xl text-vino md:text-7xl">Líneas de negocio</h1>
      <p className="mt-4 max-w-prose font-serif text-lg">Tres formas de trabajar, desde el encargo a medida hasta los proyectos que ayudan al territorio.</p>

      <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-12">
        {lineas.map((l) => {
          const t = tonos[l.tono]
          const py = l.proyecto
          return (
            <article key={l.id} className={`${t.caja} ${ancho[l.id]} p-6 md:p-10`}>
              <div className={py ? 'grid gap-10 lg:grid-cols-2' : ''}>
                <div>
                  <p className={`font-serif text-lg italic ${t.num}`}>{l.letra}</p>
                  <h2 className="mt-1 font-serif text-3xl leading-tight md:text-4xl"><EditableText value={l.titulo} onChange={(v) => set(l.id, (x) => { x.titulo = v })} /></h2>
                  <p className={`mt-3 font-serif text-lg ${t.sub}`}><EditableText multiline value={l.resumen} onChange={(v) => set(l.id, (x) => { x.resumen = v })} /></p>
                  <EditableList className="mt-6 space-y-1 font-serif text-lg" items={l.items} onChange={(items) => set(l.id, (x) => { x.items = items })} />
                </div>
                {py && (
                  <div className="self-start border border-carbon/40 bg-papel/60 p-6">
                    <PawPrint className="text-vino" aria-hidden />
                    <p className="mt-3 font-sans text-sm font-bold">Proyecto demostrativo</p>
                    <h3 className="mt-1 font-serif text-2xl"><EditableText value={py.titulo} onChange={(v) => set(l.id, (x) => { x.proyecto!.titulo = v })} /></h3>
                    <p className="mt-2 font-serif text-carbon/80"><EditableText multiline value={py.descripcion} onChange={(v) => set(l.id, (x) => { x.proyecto!.descripcion = v })} /></p>
                    <p className="mt-4 font-sans text-sm font-bold">Potencial</p>
                    <EditableList className="mt-1 space-y-1 font-serif" items={py.potencial} onChange={(items) => set(l.id, (x) => { x.proyecto!.potencial = items })} />
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
