import { Trash2 } from 'lucide-react'
import type { CategoriaSocio, EstadoSocio, Socio } from '../../types'
import { useApp } from '../../store/useApp'
import { useProject } from '../../store/useProject'
import { confirmar } from '../../store/confirm'
import EditableText from '../editable/EditableText'
import { categorias, ordenCategorias, estadosSocio, ordenEstados } from './categorias'

const campo = 'mt-1 w-full border border-carbon/30 bg-marfil/40 p-2'

export default function DetalleSocio({ socio, onBorrado }: { socio: Socio; onBorrado: () => void }) {
  const edicion = useApp((s) => s.modo === 'edicion')
  const editar = useProject((s) => s.editar)
  const set = (f: (x: Socio) => void) => editar((p) => { const x = p.socios.find((y) => y.id === socio.id); if (x) f(x) })
  const borrar = async () => {
    if (await confirmar(`¿Eliminar a «${socio.nombre}» del ecosistema?`)) {
      editar((p) => { p.socios = p.socios.filter((y) => y.id !== socio.id) })
      onBorrado()
    }
  }
  return (
    <div className="border border-carbon/25 bg-papel p-6">
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 flex-1 font-serif text-3xl leading-tight text-vino"><EditableText value={socio.nombre} onChange={(v) => set((x) => { x.nombre = v })} /></h2>
        {edicion && <button onClick={borrar} aria-label="Eliminar socio" className="p-1 opacity-70 hover:opacity-100"><Trash2 size={18} /></button>}
      </div>

      <div className="mt-5 space-y-4 text-sm">
        <div>
          <span className="font-bold">Categoría</span>
          {edicion ? (
            <select value={socio.categoria} onChange={(e) => set((x) => { x.categoria = e.target.value as CategoriaSocio })} className={campo}>
              {ordenCategorias.map((c) => <option key={c} value={c}>{categorias[c].etiqueta}</option>)}
            </select>
          ) : <p className="font-serif text-lg">{categorias[socio.categoria].etiqueta}</p>}
        </div>
        <div>
          <span className="font-bold">Estado de la relación</span>
          {edicion ? (
            <select value={socio.estado} onChange={(e) => set((x) => { x.estado = e.target.value as EstadoSocio })} className={campo}>
              {ordenEstados.map((c) => <option key={c} value={c}>{estadosSocio[c]}</option>)}
            </select>
          ) : <p className="font-serif text-lg">{estadosSocio[socio.estado]}</p>}
        </div>
        <div>
          <span className="font-bold">Notas sobre posibles colaboraciones</span>
          <p className="mt-1 font-serif text-lg leading-snug">
            {edicion || socio.notas ? (
              <EditableText multiline value={socio.notas} placeholder="Ideas, contactos, próximos pasos…" onChange={(v) => set((x) => { x.notas = v })} />
            ) : <span className="opacity-60">Sin notas todavía.</span>}
          </p>
        </div>
      </div>
    </div>
  )
}
