import { useApp } from '../store/useApp'
import { useProject } from '../store/useProject'
import EditableText from '../components/editable/EditableText'
import { tonos } from '../components/canvas/CanvasBlock'
import TareaItem, { AnadirTarea } from '../components/roadmap/TareaItem'

// Escalera: cada fase empieza algo más abajo que la anterior (solo en pantallas grandes).
const escalon = ['', 'lg:mt-8', 'lg:mt-16', 'lg:mt-24']

export default function HojaDeRuta() {
  const edicion = useApp((s) => s.modo === 'edicion')
  const hojaRuta = useProject((s) => s.proyecto.hojaRuta)
  const editar = useProject((s) => s.editar)
  const todas = hojaRuta.flatMap((f) => f.tareas)
  const cuenta = (e: string) => todas.filter((t) => t.estado === e).length
  const completadas = cuenta('completada'), enCurso = cuenta('en-curso'), pendientes = cuenta('pendiente')
  const pct = (n: number) => (todas.length ? `${(n / todas.length) * 100}%` : '0%')

  return (
    <div className="px-6 pb-16 pt-12 md:px-12 md:pt-16">
      <p className="font-serif text-xl italic text-verde">06</p>
      <h1 className="font-serif text-5xl text-vino md:text-7xl">Hoja de ruta</h1>
      <p className="mt-4 max-w-prose font-serif text-lg">Cuatro fases para llevar el estudio de la preparación al crecimiento.</p>

      <div className="mt-10 max-w-3xl">
        <div className="flex h-3 overflow-hidden rounded-full bg-marfil" role="img" aria-label={`${completadas} completadas, ${enCurso} en curso, ${pendientes} pendientes`}>
          <div className="bg-vino" style={{ width: pct(completadas) }} />
          <div className="bg-verde" style={{ width: pct(enCurso) }} />
        </div>
        <p className="mt-2 text-sm">{completadas} de {todas.length} tareas completadas, {enCurso} en curso y {pendientes} pendientes.</p>
      </div>

      <div className="mt-12 grid items-start gap-4 lg:grid-cols-4">
        {hojaRuta.map((f, i) => {
          const t = tonos[f.tono]
          return (
            <section key={f.id} className={`${t.caja} ${escalon[i] ?? ''} p-6`}>
              <p className={`font-serif text-lg italic ${t.num}`}>Fase {i + 1}</p>
              <h2 className="font-serif text-3xl leading-tight">
                <EditableText value={f.titulo} onChange={(v) => editar((p) => { p.hojaRuta[i].titulo = v })} />
              </h2>
              <p className={`mt-1 text-sm ${t.sub}`}>{f.tareas.filter((x) => x.estado === 'completada').length} de {f.tareas.length} completadas</p>
              <ul className="mt-4">
                {f.tareas.map((tarea, k) => <TareaItem key={tarea.id} faseId={f.id} tarea={tarea} indice={k} total={f.tareas.length} />)}
              </ul>
              {f.tareas.length === 0 && !edicion && <p className="font-serif">Sin tareas todavía.</p>}
              {edicion && <AnadirTarea faseId={f.id} />}
            </section>
          )
        })}
      </div>
    </div>
  )
}
