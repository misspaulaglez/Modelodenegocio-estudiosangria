import type { Socio } from '../types'

// Todos empiezan como "por explorar": no se da por hecho ningún acuerdo.
const s = (id: string, nombre: string, categoria: Socio['categoria']): Socio => ({ id, nombre, categoria, estado: 'por-explorar', notas: '' })

export const socios: Socio[] = [
  s('polo', 'Polo de Emprendimiento de Carballiño', 'emprendimiento'),
  s('comercios', 'Comercios locales', 'comercio'),
  s('asociaciones', 'Asociaciones empresariales', 'asociacion'),
  s('ayuntamientos', 'Ayuntamientos del Ribeiro', 'administracion'),
  s('asesorias', 'Asesorías y gestorías', 'asesoria'),
  s('tecnologicos', 'Profesionales tecnológicos', 'tecnologia'),
  s('ong', 'ONG y protectoras', 'social'),
]
