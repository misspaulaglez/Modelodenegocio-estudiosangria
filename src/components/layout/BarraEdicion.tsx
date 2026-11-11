import { useRef, type ChangeEvent } from 'react'
import { AlertTriangle, Check, Download, Loader2, RotateCcw, Upload } from 'lucide-react'
import { useProject } from '../../store/useProject'
import { confirmar } from '../../store/confirm'
import { proyectoInicial } from '../../content/defaultProject'
import { modoNube } from '../../data'
import PanelCompartir from './PanelCompartir'

export default function BarraEdicion() {
  const { estado, proyecto, reemplazar } = useProject()
  const fichero = useRef<HTMLInputElement>(null)
  const boton = 'inline-flex items-center gap-1.5 rounded-full border border-marfil/50 px-3 py-1 hover:bg-marfil/15'

  const exportar = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(proyecto, null, 2)], { type: 'application/json' }))
    a.download = `estudio-sangria-${proyecto.meta.ultimaActualizacion}.json`
    a.click()
  }
  const importar = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    try {
      const d = JSON.parse(await f.text())
      if (!Array.isArray(d.canvas) || !d.meta) throw new Error('formato')
      if (await confirmar('Importar reemplazará todo el contenido actual. ¿Continuar?')) reemplazar({ ...proyectoInicial(), ...d })
    } catch {
      await confirmar('El archivo no es una copia válida de Estudio Sangría.')
    }
  }
  const restaurar = async () => {
    if (await confirmar('Se restaurará el contenido original y se perderán tus cambios. ¿Continuar?')) reemplazar(proyectoInicial())
  }

  const msg = {
    guardado: <><Check size={14} /> {modoNube ? 'Guardado en la nube' : 'Guardado en este navegador'}</>,
    pendiente: <><Loader2 size={14} className="animate-spin" /> Guardando…</>,
    guardando: <><Loader2 size={14} className="animate-spin" /> Guardando…</>,
    error: <><AlertTriangle size={14} /> No se pudo guardar. Exporta una copia.</>,
    cargando: null,
    errorCarga: null,
  }[estado]

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-vino px-6 py-2 text-sm text-marfil md:px-12">
      <span className="flex items-center gap-4">
        <strong className="font-semibold">Modo edición</strong>
        <span role="status" className="flex items-center gap-1.5 opacity-90">{msg}</span>
      </span>
      <span className="flex flex-wrap gap-2">
        {modoNube && <PanelCompartir clase={boton} />}
        <button className={boton} onClick={exportar}><Download size={14} /> Exportar copia</button>
        <button className={boton} onClick={() => fichero.current?.click()}><Upload size={14} /> Importar</button>
        <button className={boton} onClick={restaurar}><RotateCcw size={14} /> Restaurar original</button>
        <input ref={fichero} type="file" accept="application/json" onChange={importar} className="hidden" />
      </span>
    </div>
  )
}
