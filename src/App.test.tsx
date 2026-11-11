import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, waitFor, cleanup, fireEvent, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { useApp } from './store/useApp'
import { useProject } from './store/useProject'
import { proyectoInicial } from './content/defaultProject'

beforeEach(() => {
  localStorage.clear()
  useApp.setState({ modo: 'presentacion' })
  useProject.setState({ proyecto: proyectoInicial(), estado: 'cargando', soloLectura: false, ocultarViabilidad: false })
})
afterEach(cleanup)

const rutas: [string, string][] = [
  ['/', 'ESTUDIO'], ['/modelo', 'Modelo de negocio'], ['/trabajamos', 'Cómo trabajamos'], ['/lineas', 'Líneas de negocio'],
  ['/ecosistema', 'Ecosistema rural'], ['/viabilidad', 'Viabilidad'], ['/hoja-de-ruta', 'Hoja de ruta'],
  ['/cuaderno', 'Cuaderno de ideas'], ['/presentar', 'Segmentos de clientes'], ['/exportar', 'ESTUDIO'],
]

describe('navegación', () => {
  it.each(rutas)('la ruta %s se muestra sin errores', async (ruta, texto) => {
    const { container } = render(<MemoryRouter initialEntries={[ruta]}><App /></MemoryRouter>)
    await waitFor(() => expect(container.querySelector('h1')?.textContent).toContain(texto))
  })
})

describe('edición', () => {
  it('un cambio hecho en pantalla se guarda en el navegador', async () => {
    useApp.setState({ modo: 'edicion' })
    render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>)
    const campo = await screen.findByDisplayValue('Ética y estética')
    fireEvent.change(campo, { target: { value: 'Nuevo lema' } })
    await waitFor(() => expect(localStorage.getItem('sangria-proyecto')).toContain('Nuevo lema'), { timeout: 3000 })
  })
  it('en modo presentación no aparecen campos de edición', async () => {
    const { container } = render(<MemoryRouter initialEntries={['/modelo']}><App /></MemoryRouter>)
    await waitFor(() => expect(container.querySelector('h1')).not.toBeNull())
    expect(container.querySelector('textarea')).toBeNull()
  })
})
