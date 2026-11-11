import { useEffect, useState } from 'react'
import { Copy, Share2, X } from 'lucide-react'
import { useProject } from '../../store/useProject'
import { proyectoInicial } from '../../content/defaultProject'
import { desactivarVista, estadoVista, publicarVista } from '../../data/supabaseRepository'

export default function PanelCompartir({ clase }: { clase: string }) {
  const proyecto = useProject((s) => s.proyecto)
  const [abierto, setAbierto] = useState(false)
  const [vista, setVista] = useState<{ id: string; activa: boolean } | null>(null)
  const [conViabilidad, setConViabilidad] = useState(true)
  const [msg, setMsg] = useState('')
  const [ocupado, setOcupado] = useState(false)

  useEffect(() => {
    if (abierto) estadoVista().then(setVista).catch(() => setMsg('No se pudo consultar la vista compartida.'))
  }, [abierto])

  const enlace = vista?.activa ? `${window.location.origin}${window.location.pathname}#/compartido/${vista.id}` : ''
  const hacer = async (accion: () => Promise<void>, ok: string) => {
    setOcupado(true); setMsg('')
    try { await accion(); setMsg(ok) } catch { setMsg('No se pudo completar la acción. Inténtalo de nuevo.') }
    setOcupado(false)
  }
  const publicar = () => hacer(async () => {
    // Copia publicable: sin el cuaderno de ideas y, si se prefiere, sin la viabilidad.
    const copia = { ...proyecto, notas: [], viabilidad: conViabilidad ? proyecto.viabilidad : proyectoInicial().viabilidad, _compartido: { viabilidad: conViabilidad } }
    setVista({ id: await publicarVista(copia), activa: true })
  }, 'Versión publicada.')
  const desactivar = () => hacer(async () => { await desactivarVista(); setVista((v) => (v ? { ...v, activa: false } : v)) }, 'Vista desactivada: el enlace ya no funciona.')
  const copiar = () => hacer(async () => { await navigator.clipboard.writeText(enlace) }, 'Enlace copiado.')

  return (
    <>
      <button className={clase} onClick={() => setAbierto(true)}><Share2 size={14} /> Compartir</button>
      {abierto && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/50 p-6">
          <div className="w-full max-w-lg bg-papel p-8 text-carbon">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-3xl text-vino">Vista compartida</h2>
              <button onClick={() => setAbierto(false)} aria-label="Cerrar"><X size={20} /></button>
            </div>
            <p className="mt-3 font-serif text-lg">Es una copia de solo lectura, sin el cuaderno de ideas. Cualquiera con el enlace puede verla. No se actualiza sola: pulsa «Publicar» cuando quieras mostrar tus últimos cambios.</p>
            <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={conViabilidad} onChange={(e) => setConViabilidad(e.target.checked)} /> Incluir la viabilidad económica</label>
            {enlace && (
              <div className="mt-4 flex items-center gap-2 border border-carbon/30 bg-marfil/40 p-2 text-sm">
                <span className="min-w-0 flex-1 break-all">{enlace}</span>
                <button onClick={copiar} aria-label="Copiar enlace" className="p-1"><Copy size={16} /></button>
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <button onClick={publicar} disabled={ocupado} className="rounded-full bg-vino px-5 py-2 text-marfil hover:bg-carbon disabled:opacity-40">{vista?.activa ? 'Publicar cambios' : 'Publicar y obtener enlace'}</button>
              {vista?.activa && <button onClick={desactivar} disabled={ocupado} className="rounded-full border border-carbon/40 px-5 py-2 hover:bg-rosa/50 disabled:opacity-40">Desactivar</button>}
            </div>
            <p role="status" className="mt-3 min-h-5 text-sm">{msg}</p>
          </div>
        </div>
      )}
    </>
  )
}
