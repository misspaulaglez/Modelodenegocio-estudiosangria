import { CircleHelp, Eye, Flag, Lightbulb, ListTodo } from 'lucide-react'
import type { Tono, TipoNota } from '../../types'

export const tipos: Record<TipoNota, { etiqueta: string; icono: typeof Eye; tono: Tono }> = {
  idea: { etiqueta: 'Idea', icono: Lightbulb, tono: 'rosa' },
  observacion: { etiqueta: 'Observación', icono: Eye, tono: 'marfil' },
  pregunta: { etiqueta: 'Pregunta', icono: CircleHelp, tono: 'agua' },
  decision: { etiqueta: 'Decisión', icono: Flag, tono: 'vino' },
  tarea: { etiqueta: 'Tarea', icono: ListTodo, tono: 'papel' },
}
export const ordenTipos = Object.keys(tipos) as TipoNota[]
