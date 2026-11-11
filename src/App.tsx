import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Shell from './components/layout/Shell'
import ConfirmHost from './components/editable/ConfirmHost'
import Inicio from './pages/Inicio'
import Modelo from './pages/Modelo'
import Trabajamos from './pages/Trabajamos'
import Lineas from './pages/Lineas'
import Ecosistema from './pages/Ecosistema'
import Viabilidad from './pages/Viabilidad'
import HojaDeRuta from './pages/HojaDeRuta'
import Cuaderno from './pages/Cuaderno'
import Presentacion from './pages/Presentacion'
import Exportar from './pages/Exportar'
import Acceso from './pages/Acceso'
import { modoNube } from './data'
import { useProject } from './store/useProject'
import { useAuth } from './store/useAuth'

// Las rutas de la app. En la vista compartida faltan las privadas (cuaderno, exportar, y viabilidad si no se incluye).
export function Rutas({ compartido = false }: { compartido?: boolean }) {
  const ocultarViabilidad = useProject((s) => s.ocultarViabilidad)
  return (
    <Routes>
      <Route path="/presentar" element={<Presentacion />} />
      {!compartido && <Route path="/exportar" element={<Exportar />} />}
      <Route element={<Shell />}>
        <Route index element={<Inicio />} />
        <Route path="/modelo" element={<Modelo />} />
        <Route path="/trabajamos" element={<Trabajamos />} />
        <Route path="/lineas" element={<Lineas />} />
        <Route path="/ecosistema" element={<Ecosistema />} />
        {!(compartido && ocultarViabilidad) && <Route path="/viabilidad" element={<Viabilidad />} />}
        <Route path="/hoja-de-ruta" element={<HojaDeRuta />} />
        {!compartido && <Route path="/cuaderno" element={<Cuaderno />} />}
      </Route>
    </Routes>
  )
}

export default function App() {
  const cargar = useProject((s) => s.cargar)
  const estado = useProject((s) => s.estado)
  const usuario = useAuth((s) => s.sesion?.user.id)
  const necesitaAcceso = modoNube && !usuario

  useEffect(() => { if (!necesitaAcceso) cargar() }, [necesitaAcceso, usuario, cargar])

  let contenido
  if (necesitaAcceso) contenido = <Acceso />
  else if (estado === 'errorCarga') {
    contenido = (
      <main className="flex min-h-screen items-center justify-center bg-rosa px-6">
        <div className="max-w-md bg-papel p-8">
          <h1 className="font-serif text-3xl text-vino">No se pudo cargar tu contenido</h1>
          <p className="mt-3 font-serif text-lg">No se ha modificado nada. Comprueba la conexión e inténtalo de nuevo.</p>
          <button onClick={() => cargar()} className="mt-5 rounded-full bg-vino px-5 py-3 text-sm text-marfil hover:bg-carbon">Reintentar</button>
        </div>
      </main>
    )
  } else if (estado !== 'cargando') contenido = <Rutas />
  return <>{contenido}<ConfirmHost /></>
}
