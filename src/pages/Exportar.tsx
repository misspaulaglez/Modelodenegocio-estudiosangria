import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Printer } from 'lucide-react'
import { useProject } from '../store/useProject'
import { useApp } from '../store/useApp'
import { calcular, euros } from '../lib/viabilidad'
import { estados } from '../components/roadmap/TareaItem'
import { categorias, estadosSocio } from '../components/ecosystem/categorias'
import { tipos } from '../components/notebook/tipos'
import { useApartados } from '../components/notebook/apartados'
import { etiquetas } from '../components/canvas/CanvasBlock'

const dia = (iso: string) => new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(iso))
const imp = (n: number | null) => (n === null ? 'pendiente de estimar' : euros(n))

function Seccion({ numero, titulo, children }: { numero: string; titulo: string; children: ReactNode }) {
  return (
    <section className="mb-10 break-before-page">
      <p className="font-serif italic text-verde">{numero}</p>
      <h2 className="font-serif text-4xl text-vino">{titulo}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}
const Lista = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-0.5 pl-5 font-serif">{items.map((i, k) => <li key={k}>{i}</li>)}</ul>
)

// Documento para imprimir o guardar como PDF (Compartir > Imprimir en iPad).
export default function Exportar() {
  const p = useProject((s) => s.proyecto)
  const apartados = useApartados()
  const [cuaderno, setCuaderno] = useState(false)
  useEffect(() => { useApp.getState().setModo('presentacion') }, [])
  const r = calcular(p.viabilidad)
  const imprimir = () => { try { window.print() } catch { /* el navegador puede bloquear la impresión */ } }

  return (
    <div className="bg-papel print:bg-white">
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 bg-vino px-6 py-3 text-sm text-marfil print:hidden">
        <Link to="/modelo" className="inline-flex items-center gap-2 hover:underline"><ArrowLeft size={16} /> Volver</Link>
        <label className="flex items-center gap-2"><input type="checkbox" checked={cuaderno} onChange={(e) => setCuaderno(e.target.checked)} /> Incluir el cuaderno de ideas</label>
        <button onClick={imprimir} className="inline-flex items-center gap-2 rounded-full bg-marfil px-5 py-2 text-vino hover:bg-rosa"><Printer size={16} /> Imprimir o guardar como PDF</button>
      </div>

      <div className="mx-auto max-w-[820px] px-8 py-10 print:max-w-none print:p-0">
        <header className="mb-10 flex min-h-[80vh] flex-col justify-between print:min-h-[240mm]">
          <div>
            <h1 className="font-sans text-6xl font-bold leading-none tracking-[0.12em] text-vino">ESTUDIO<br />SANGRÍA</h1>
            <p className="mt-6 font-serif text-2xl italic text-verde">«{p.meta.lema}»</p>
          </div>
          <div>
            <p className="font-serif text-4xl leading-tight">{p.meta.fraseCentral}</p>
            <p className="mt-6 max-w-prose font-serif text-lg">{p.meta.presentacion}</p>
            <p className="mt-6 text-sm">{p.meta.ubicacion}. Actualizado el {dia(p.meta.ultimaActualizacion)}.</p>
          </div>
        </header>

        <Seccion numero="01" titulo="Modelo de negocio">
          {p.canvas.map((b) => (
            <article key={b.id} className="mb-6 break-inside-avoid border-l-4 border-vino pl-4">
              <h3 className="font-serif text-2xl">{b.numero}. {b.titulo}</h3>
              <p className="font-serif italic">{b.resumen}</p>
              <div className="mt-3 grid grid-cols-2 gap-6">
                {b.grupos.map((g, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-bold">{g.titulo}{g.tono ? ` (${etiquetas[g.tono]})` : ''}</h4>
                    <Lista items={g.items} />
                  </div>
                ))}
              </div>
              {b.frase && <p className="mt-3 font-serif text-xl italic">«{b.frase}»</p>}
              {b.nota && <p className="mt-2 text-sm">{b.nota}</p>}
            </article>
          ))}
        </Seccion>

        <Seccion numero="02" titulo="Cómo trabajamos">
          <ol className="space-y-3 font-serif">
            {p.proceso.map((s, i) => <li key={i} className="break-inside-avoid"><strong>{i + 1}. {s.titulo}.</strong> {s.texto}</li>)}
          </ol>
          <p className="mt-6 font-serif text-2xl italic text-vino">«{p.frases.proceso}»</p>
        </Seccion>

        <Seccion numero="03" titulo="Líneas de negocio">
          {p.lineas.map((l) => (
            <article key={l.id} className="mb-6 break-inside-avoid">
              <h3 className="font-serif text-2xl">{l.letra}. {l.titulo}</h3>
              <p className="font-serif italic">{l.resumen}</p>
              <div className="mt-2"><Lista items={l.items} /></div>
              {l.proyecto && (
                <p className="mt-2 font-serif"><strong>Proyecto demostrativo: {l.proyecto.titulo}.</strong> {l.proyecto.descripcion} Potencial: {l.proyecto.potencial.join(', ').toLowerCase()}.</p>
              )}
            </article>
          ))}
        </Seccion>

        <Seccion numero="04" titulo="Ecosistema rural">
          <ul className="space-y-3 font-serif">
            {p.socios.map((s) => (
              <li key={s.id} className="break-inside-avoid">
                <strong>{s.nombre}</strong> ({categorias[s.categoria].etiqueta}, {estadosSocio[s.estado].toLowerCase()}){s.notas && <>. {s.notas}</>}
              </li>
            ))}
          </ul>
        </Seccion>

        <Seccion numero="05" titulo="Viabilidad">
          {p.viabilidad.costes.map((g) => (
            <div key={g.id} className="mb-5 break-inside-avoid">
              <h3 className="font-serif text-2xl">{g.titulo} <span className="font-sans text-sm italic">({etiquetas[g.tono]}, {g.unidad === 'mes' ? 'al mes' : 'pago único'})</span></h3>
              <ul className="mt-1 font-serif">{g.partidas.map((x) => <li key={x.id} className="flex justify-between gap-4 border-b border-carbon/15 py-1"><span>{x.concepto}</span><span>{imp(x.importe)}</span></li>)}</ul>
            </div>
          ))}
          <h3 className="mt-6 font-serif text-2xl">Servicios</h3>
          <ul className="mt-1 font-serif">
            {p.viabilidad.servicios.map((s) => (
              <li key={s.id} className="break-inside-avoid border-b border-carbon/15 py-1">
                {s.nombre} ({s.prioridad === 'prioritario' ? 'prioritario' : s.prioridad === 'futuro' ? 'a desarrollar en el futuro' : 'prioridad por decidir'}): precio medio {imp(s.precio)}, proyectos al mes {s.proyectosMes ?? 'pendiente de estimar'}
              </li>
            ))}
          </ul>
          <div className="mt-6 break-inside-avoid border border-carbon/30 p-4 font-serif">
            <h3 className="text-2xl">Cálculo mensual</h3>
            <p>Gastos mensuales: {r.gastosConDatos ? euros(r.gastos) : 'pendiente de estimar'}</p>
            <p>Ingresos previstos: {r.ingresosConDatos ? euros(r.ingresos) : 'pendiente de estimar'}</p>
            <p>Diferencia: {r.diferenciaConDatos ? euros(r.diferencia) : 'pendiente de estimar'}</p>
            <p>Proyectos al mes para cubrir los gastos: {r.proyectos ?? 'pendiente de estimar'}</p>
            <p>Inversión inicial total: {r.inversionConDatos ? euros(r.inversion) : 'pendiente de estimar'}</p>
            <p className="mt-2 text-sm italic">Los totales solo suman los datos introducidos; {r.costesPendientes} partidas de coste y {r.serviciosPendientes} servicios están sin estimar.</p>
          </div>
        </Seccion>

        <Seccion numero="06" titulo="Hoja de ruta">
          {p.hojaRuta.map((f, i) => (
            <div key={f.id} className="mb-5 break-inside-avoid">
              <h3 className="font-serif text-2xl">Fase {i + 1}. {f.titulo}</h3>
              <ul className="mt-1 font-serif">
                {f.tareas.map((t) => <li key={t.id} className="border-b border-carbon/15 py-1">{t.texto} ({estados[t.estado].etiqueta.toLowerCase()}, {t.fecha ? dia(t.fecha) : 'sin fecha'})</li>)}
              </ul>
            </div>
          ))}
        </Seccion>

        {cuaderno && (
          <Seccion numero="07" titulo="Cuaderno de ideas">
            {p.notas.length === 0 ? <p className="font-serif">Todavía no hay notas.</p> : (
              <ul className="space-y-3 font-serif">
                {p.notas.map((n) => (
                  <li key={n.id} className="break-inside-avoid">
                    <strong>{tipos[n.tipo].etiqueta}</strong> ({apartados.find((a) => a.id === n.apartado)?.etiqueta ?? 'General'}, {dia(n.creada)}): {n.texto}
                  </li>
                ))}
              </ul>
            )}
          </Seccion>
        )}
      </div>
    </div>
  )
}
