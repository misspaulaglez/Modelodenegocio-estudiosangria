import { Plus } from 'lucide-react'
import { useApp } from '../store/useApp'
import { useProject } from '../store/useProject'
import { confirmar } from '../store/confirm'
import EditableText from '../components/editable/EditableText'
import { Controles } from '../components/editable/EditableList'

export default function Trabajamos() {
  const edicion = useApp((s) => s.modo === 'edicion')
  const { proceso, frases } = useProject((s) => s.proyecto)
  const editar = useProject((s) => s.editar)
  const mover = (i: number, d: number) => editar((p) => {
    const a = p.proceso, j = i + d
    if (j >= 0 && j < a.length) [a[i], a[j]] = [a[j], a[i]]
  })
  const borrar = async (i: number) => {
    if (await confirmar(`¿Eliminar el paso «${proceso[i].titulo}»?`)) editar((p) => { p.proceso.splice(i, 1) })
  }
  return (
    <div className="pb-16 pt-12 md:pt-16">
      <header className="px-6 md:px-12">
        <p className="font-serif text-xl italic text-verde">02</p>
        <h1 className="font-serif text-5xl text-vino md:text-7xl">Cómo trabajamos</h1>
        <p className="mt-4 max-w-prose font-serif text-lg">Ocho pasos, sin prisa y de la mano del cliente.</p>
      </header>

      <ol className="mx-6 mt-14 border-l-2 border-vino/40 md:mx-12 md:ml-16">
        {proceso.map((p, i) => (
          <li key={i} className="relative pb-12 pl-8 last:pb-0 md:pl-12">
            <span className="absolute -left-[1.4rem] top-0 flex h-11 w-11 items-center justify-center rounded-full bg-vino font-serif text-lg italic text-marfil">{i + 1}</span>
            <div className={`max-w-xl ${i % 2 ? 'md:ml-40' : ''}`}>
              <div className="flex items-start gap-2">
                <h2 className="flex-1 font-serif text-3xl text-carbon md:text-4xl"><EditableText value={p.titulo} onChange={(v) => editar((d) => { d.proceso[i].titulo = v })} /></h2>
                {edicion && <Controles onUp={() => mover(i, -1)} onDown={() => mover(i, 1)} onDelete={() => borrar(i)} />}
              </div>
              <p className="mt-2 font-serif text-lg leading-relaxed text-carbon/80"><EditableText multiline value={p.texto} onChange={(v) => editar((d) => { d.proceso[i].texto = v })} /></p>
            </div>
          </li>
        ))}
        {edicion && (
          <li className="pl-8 pt-6 md:pl-12">
            <button onClick={() => editar((p) => { p.proceso.push({ titulo: 'Nuevo paso', texto: '' }) })} className="inline-flex items-center gap-1 text-sm underline"><Plus size={14} /> Añadir paso</button>
          </li>
        )}
      </ol>

      <section className="mt-16 bg-vino px-6 py-16 text-marfil md:px-12">
        <p className="max-w-3xl font-serif text-4xl italic leading-tight md:text-6xl">«<EditableText multiline value={frases.proceso} onChange={(v) => editar((p) => { p.frases.proceso = v })} />»</p>
      </section>
    </div>
  )
}
