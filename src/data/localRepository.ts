import type { Project } from '../types'
import type { Repository } from './repository'

const CLAVE = 'sangria-proyecto'

export const localRepository: Repository = {
  async cargar() {
    try {
      const texto = localStorage.getItem(CLAVE)
      return texto ? (JSON.parse(texto) as Project) : null
    } catch {
      return null
    }
  },
  async guardar(p) {
    localStorage.setItem(CLAVE, JSON.stringify(p)) // si falla, el error sube y la app lo avisa
  },
}
