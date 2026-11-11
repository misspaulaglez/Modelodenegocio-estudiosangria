import { useMemo } from 'react'
import { useProject } from '../../store/useProject'

export interface Apartado { id: string; etiqueta: string }

const base: Apartado[] = [
  { id: 'general', etiqueta: 'General' },
  { id: 'trabajamos', etiqueta: 'Cómo trabajamos' },
  { id: 'lineas', etiqueta: 'Líneas de negocio' },
  { id: 'ecosistema', etiqueta: 'Ecosistema rural' },
  { id: 'viabilidad', etiqueta: 'Viabilidad' },
  { id: 'ruta', etiqueta: 'Hoja de ruta' },
]

// Los apartados del Canvas salen del contenido, así que si renombras un bloque, se actualiza solo.
export function useApartados(): Apartado[] {
  const canvas = useProject((s) => s.proyecto.canvas)
  return useMemo(() => [base[0], ...canvas.map((b) => ({ id: `canvas-${b.id}`, etiqueta: `Canvas: ${b.titulo}` })), ...base.slice(1)], [canvas])
}
