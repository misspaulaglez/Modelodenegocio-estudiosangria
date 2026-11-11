import { useEffect, useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { Project } from '../types'
import { modoNube } from '../data'
import { cargarVistaPublica } from '../data/supabaseRepository'
import { useApp } from '../store/useApp'
import { useProject } from '../store/useProject'
import { Rutas } from '../App'

type Publicado = Project & { _compartido?: { viabilidad: boolean } }

// Vista de solo lectura. Se navega con un router "en memoria" para no mezclarse con las rutas privadas.
export default function Compartido({ id }: { id: string }) {
  const [estado, setEstado] = useState<'cargando' | 'ok' | 'no'>('cargando')
  useEffect(() => {
    (async () => {
      try {
        const c = modoNube ? ((await cargarVistaPublica(id)) as Publicado | null) : null
        if (!c) return setEstado('no')
        const { _compartido, ...resto } = c
        useApp.getState().setModo('presentacion')
        useProject.getState().cargarCompartido(resto as Project, _compartido?.viabilidad === false)
        setEstado('ok')
      } catch { setEstado('no') }
    })()
  }, [id])
  if (estado === 'cargando') return null
  if (estado === 'no') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-rosa px-6">
        <div className="max-w-md bg-papel p-8">
          <h1 className="font-serif text-3xl text-vino">Esta vista no está disponible</h1>
          <p className="mt-3 font-serif text-lg">El enlace no es correcto o su propietaria ha desactivado la vista compartida.</p>
        </div>
      </main>
    )
  }
  return <MemoryRouter><Rutas compartido /></MemoryRouter>
}
