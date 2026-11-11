import { create } from 'zustand'
import type { Project } from '../types'
import { repositorio, modoNube } from '../data'
import { localRepository } from '../data/localRepository'
import { proyectoInicial } from '../content/defaultProject'
import { confirmar } from './confirm'

export type EstadoGuardado = 'cargando' | 'guardado' | 'pendiente' | 'guardando' | 'error' | 'errorCarga'

interface State {
  proyecto: Project
  estado: EstadoGuardado
  soloLectura: boolean // true en la vista compartida
  ocultarViabilidad: boolean
  cargar: () => Promise<void>
  cargarCompartido: (contenido: Project, ocultarViabilidad: boolean) => void
  reiniciar: () => void
  editar: (cambio: (p: Project) => void) => void
  reemplazar: (p: Project) => void
}

let temporizador: ReturnType<typeof setTimeout> | undefined

export const useProject = create<State>((set, get) => {
  // Autoguardado: espera 0,8 s sin cambios y guarda.
  const programarGuardado = () => {
    if (get().soloLectura) return
    set({ estado: 'pendiente' })
    clearTimeout(temporizador)
    temporizador = setTimeout(async () => {
      set({ estado: 'guardando' })
      try {
        await repositorio.guardar(get().proyecto)
        if (modoNube) localRepository.guardar(get().proyecto).catch(() => {}) // respaldo local silencioso
        set((s) => (s.estado === 'guardando' ? { estado: 'guardado' } : {}))
      } catch {
        set({ estado: 'error' })
      }
    }, 800)
  }
  return {
    proyecto: proyectoInicial(),
    estado: 'cargando',
    soloLectura: false,
    ocultarViabilidad: false,
    async cargar() {
      set({ estado: 'cargando' })
      try {
        const remoto = await repositorio.cargar()
        if (remoto || !modoNube) {
          set({ proyecto: remoto ? { ...proyectoInicial(), ...remoto } : proyectoInicial(), estado: 'guardado' })
          return
        }
        // Primera vez en la nube: ofrecer subir lo que haya en este navegador.
        const local = await localRepository.cargar()
        const subir = local && (await confirmar('Se ha encontrado contenido guardado en este navegador. ¿Quieres subirlo a la nube? Si cancelas, empezarás con el contenido original.'))
        set({ proyecto: subir && local ? { ...proyectoInicial(), ...local } : proyectoInicial() })
        programarGuardado()
      } catch {
        set({ estado: 'errorCarga' }) // no se guarda nada encima: así no se pisa lo que haya en la nube
      }
    },
    cargarCompartido(contenido, ocultarViabilidad) {
      set({ proyecto: { ...proyectoInicial(), ...contenido }, estado: 'guardado', soloLectura: true, ocultarViabilidad })
    },
    reiniciar() {
      clearTimeout(temporizador)
      set({ proyecto: proyectoInicial(), estado: 'cargando' })
    },
    editar(cambio) {
      if (get().soloLectura) return
      const copia = structuredClone(get().proyecto)
      cambio(copia)
      copia.meta.ultimaActualizacion = new Date().toISOString().slice(0, 10)
      set({ proyecto: copia })
      programarGuardado()
    },
    reemplazar(p) {
      if (get().soloLectura) return
      set({ proyecto: p })
      programarGuardado()
    },
  }
})
