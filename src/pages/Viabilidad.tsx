import { useProject } from '../store/useProject'
import GrupoCostes from '../components/finance/GrupoCostes'
import ServiciosIngresos from '../components/finance/ServiciosIngresos'
import Calculadora from '../components/finance/Calculadora'

export default function Viabilidad() {
  const costes = useProject((s) => s.proyecto.viabilidad.costes)
  return (
    <div className="px-6 pb-16 pt-12 md:px-12 md:pt-16">
      <p className="font-serif text-xl italic text-verde">05</p>
      <h1 className="font-serif text-5xl text-vino md:text-7xl">Viabilidad</h1>
      <p className="mt-4 max-w-prose font-serif text-lg">¿Puede sostenerse el estudio? Aquí se estudian los costes, los ingresos y cuántos proyectos hacen falta.</p>
      <p className="mt-2 max-w-prose text-sm text-carbon/70">Ninguna cifra viene rellenada: cada importe marcado como pendiente espera tu estimación.</p>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-12">
        <div className="space-y-14 lg:col-span-7">
          <div>
            <h2 className="font-serif text-4xl text-vino">Costes</h2>
            <div className="mt-6 space-y-10">{costes.map((g) => <GrupoCostes key={g.id} grupo={g} />)}</div>
          </div>
          <div>
            <h2 className="font-serif text-4xl text-vino">Fuentes de ingresos</h2>
            <div className="mt-6"><ServiciosIngresos /></div>
          </div>
        </div>
        <aside className="lg:sticky lg:top-6 lg:col-span-5"><Calculadora /></aside>
      </div>
    </div>
  )
}
