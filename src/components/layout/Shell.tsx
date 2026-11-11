import { NavLink, Link, Outlet } from 'react-router-dom'
import { Eye, Pencil, HardDrive, FileDown, LogOut } from 'lucide-react'
import { secciones } from '../../content/initialContent'
import { useApp } from '../../store/useApp'
import { useProject } from '../../store/useProject'
import { useAuth } from '../../store/useAuth'
import { modoNube } from '../../data'
import BarraEdicion from './BarraEdicion'

function InterruptorModo() {
  const { modo, setModo } = useApp()
  const base = 'flex items-center gap-2 px-4 py-2 text-sm transition-colors'
  return (
    <div className="inline-flex overflow-hidden rounded-full border border-carbon/30" role="group" aria-label="Modo de la aplicación">
      <button onClick={() => setModo('presentacion')} aria-pressed={modo === 'presentacion'}
        className={`${base} ${modo === 'presentacion' ? 'bg-vino text-marfil' : 'hover:bg-rosa/40'}`}>
        <Eye size={16} /> Presentación
      </button>
      <button onClick={() => setModo('edicion')} aria-pressed={modo === 'edicion'}
        className={`${base} ${modo === 'edicion' ? 'bg-vino text-marfil' : 'hover:bg-rosa/40'}`}>
        <Pencil size={16} /> Edición
      </button>
    </div>
  )
}

export default function Shell() {
  const modo = useApp((s) => s.modo)
  const soloLectura = useProject((s) => s.soloLectura)
  const ocultarViabilidad = useProject((s) => s.ocultarViabilidad)
  const sesion = useAuth((s) => s.sesion)
  const salir = useAuth((s) => s.salir)
  // En la vista compartida no hay cuaderno (y la viabilidad solo si se ha incluido).
  const menu = secciones.filter((s) => !(soloLectura && (s.ruta === '/cuaderno' || (ocultarViabilidad && s.ruta === '/viabilidad'))))
  return (
    <div className="flex min-h-screen flex-col">
      {modo === 'edicion' && !soloLectura && <BarraEdicion />}

      <header className="px-6 pt-6 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="font-sans text-sm font-bold tracking-[0.3em] text-vino">SANGRÍA</Link>
          {!soloLectura && <InterruptorModo />}
        </div>
        <nav aria-label="Principal" className="-mx-6 mt-6 overflow-x-auto border-y border-carbon/20 px-6 md:mx-0 md:px-0">
          <ul className="flex min-w-max gap-8 py-4 md:justify-between">
            {menu.map((s) => (
              <li key={s.ruta}>
                <NavLink to={s.ruta} end={s.ruta === '/'}
                  className={({ isActive }) =>
                    `flex items-baseline gap-2 text-xs uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-vino underline decoration-vino underline-offset-8' : 'text-carbon/70 hover:text-vino'}`}>
                  <span className="font-serif text-[0.7rem] italic normal-case tracking-normal opacity-70">{s.numero}</span>
                  {s.etiqueta}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="bg-vino px-6 py-10 md:px-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <p className="font-serif text-lg italic text-marfil">Hecho con cariño por Estudio Sangría</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-marfil">
            {soloLectura ? <span>Vista compartida de solo lectura</span> : (
              <>
                <Link to="/exportar" className="inline-flex items-center gap-1.5 underline"><FileDown size={14} /> Exportar a PDF</Link>
                {sesion && <button onClick={salir} className="inline-flex items-center gap-1.5 underline"><LogOut size={14} /> Cerrar sesión</button>}
                {!modoNube && <span className="flex items-center gap-2 text-xs text-marfil/80"><HardDrive size={14} /> Los cambios se guardan solo en este navegador. La nube no está configurada.</span>}
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
