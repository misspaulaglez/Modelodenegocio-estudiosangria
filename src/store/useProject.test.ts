import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProject } from './useProject'
import { proyectoInicial } from '../content/defaultProject'

beforeEach(() => {
  localStorage.clear()
  vi.useFakeTimers()
  useProject.setState({ proyecto: proyectoInicial(), estado: 'cargando', soloLectura: false, ocultarViabilidad: false })
})

describe('persistencia', () => {
  it('autoguarda a los 0,8 s y recupera los cambios al volver a cargar', async () => {
    await useProject.getState().cargar()
    useProject.getState().editar((p) => { p.meta.lema = 'Lema de prueba' })
    expect(useProject.getState().estado).toBe('pendiente')
    await vi.advanceTimersByTimeAsync(900)
    expect(useProject.getState().estado).toBe('guardado')
    expect(JSON.parse(localStorage.getItem('sangria-proyecto')!).meta.lema).toBe('Lema de prueba')
    useProject.setState({ proyecto: proyectoInicial() })
    await useProject.getState().cargar()
    expect(useProject.getState().proyecto.meta.lema).toBe('Lema de prueba')
  })
  it('completa los datos que faltan en una copia antigua', async () => {
    const viejo = proyectoInicial() as unknown as Record<string, unknown>
    delete viejo.socios
    delete viejo.viabilidad
    localStorage.setItem('sangria-proyecto', JSON.stringify(viejo))
    await useProject.getState().cargar()
    expect(useProject.getState().proyecto.socios.length).toBe(7)
    expect(useProject.getState().proyecto.viabilidad.costes.length).toBe(3)
  })
})

describe('vista compartida', () => {
  it('es de solo lectura: editar no cambia nada ni guarda', async () => {
    useProject.getState().cargarCompartido(proyectoInicial(), true)
    const antes = useProject.getState().proyecto.meta.lema
    useProject.getState().editar((p) => { p.meta.lema = 'Intento de cambio' })
    await vi.advanceTimersByTimeAsync(900)
    expect(useProject.getState().proyecto.meta.lema).toBe(antes)
    expect(localStorage.getItem('sangria-proyecto')).toBeNull()
    expect(useProject.getState().ocultarViabilidad).toBe(true)
  })
})
