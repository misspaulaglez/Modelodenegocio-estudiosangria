import { useMemo } from 'react'
import { useProject } from '../../store/useProject'
import { calcular, euros } from '../../lib/viabilidad'
import EditableNumber from '../editable/EditableNumber'

const PENDIENTE = 'Pendiente de estimar'

function Fila({ etiqueta, valor, nota }: { etiqueta: string; valor: string; nota?: string }) {
  return (
    <div className="border-t border-marfil/25 py-3 first:border-t-0">
      <dt className="text-sm text-marfil/85">{etiqueta}</dt>
      <dd className="font-serif text-3xl">{valor}</dd>
      {nota && <p className="text-xs text-marfil/80">{nota}</p>}
    </div>
  )
}

export default function Calculadora() {
  const v = useProject((s) => s.proyecto.viabilidad)
  const editar = useProject((s) => s.editar)
  const r = useMemo(() => calcular(v), [v])
  const pendientes = r.costesPendientes + r.serviciosPendientes
  return (
    <div className="bg-vino p-6 text-marfil">
      <h2 className="font-serif text-3xl">Calculadora</h2>
      <p className="mt-1 text-sm text-marfil/85">Estimación mensual a partir de los datos que has introducido.</p>
      <dl className="mt-4">
        <Fila etiqueta="Gastos mensuales" valor={r.gastosConDatos ? euros(r.gastos) : PENDIENTE} nota="Costes fijos y variables" />
        <Fila etiqueta="Ingresos previstos al mes" valor={r.ingresosConDatos ? euros(r.ingresos) : PENDIENTE} nota="Precio medio por proyectos al mes, de cada servicio" />
        <Fila etiqueta="Diferencia entre ingresos y gastos" valor={r.diferenciaConDatos ? `${r.diferencia >= 0 ? '+' : '−'}${euros(Math.abs(r.diferencia))}` : PENDIENTE} />
        <Fila etiqueta="Proyectos al mes para cubrir los gastos" valor={r.proyectos !== null ? `${r.proyectos}` : PENDIENTE}
          nota={r.precioUsado ? `Con un precio medio de ${euros(r.precioUsado)} por proyecto${r.precioDeServicios ? ' (media de tus servicios)' : ''}` : undefined} />
        <Fila etiqueta="Inversión inicial total" valor={r.inversionConDatos ? euros(r.inversion) : PENDIENTE} nota="Pago único, no entra en los gastos mensuales" />
      </dl>
      <div className="mt-4 text-sm text-carbon">
        <label className="block rounded bg-papel p-3">
          Precio medio por proyecto, para el cálculo
          <div className="mt-1 font-serif text-xl"><EditableNumber etiqueta="Precio medio por proyecto" value={v.precioMedio} onChange={(n) => editar((p) => { p.viabilidad.precioMedio = n })} /></div>
          <span className="text-xs opacity-80">Si lo dejas vacío, se usa la media de los precios de tus servicios.</span>
        </label>
      </div>
      <p className="mt-4 text-xs text-marfil/85">
        Los totales solo suman lo que has escrito.{pendientes > 0 ? ` Quedan ${r.costesPendientes} partidas de coste y ${r.serviciosPendientes} servicios sin estimar, así que las cifras son parciales.` : ''}
      </p>
    </div>
  )
}
