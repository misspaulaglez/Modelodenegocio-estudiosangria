import type { Project } from '../types'
import { meta, frases } from './initialContent'
import { canvas } from './canvas'
import { proceso } from './proceso'
import { lineas } from './lineas'
import { hojaRuta } from './hojaRuta'
import { socios } from './ecosistema'
import { viabilidad } from './viabilidad'

// Contenido de partida. "Restaurar original" vuelve a esto.
export const proyectoInicial = (): Project =>
  structuredClone({ version: 1 as const, meta, frases: { proceso: frases.proceso }, canvas, proceso, lineas, notas: [], hojaRuta, socios, viabilidad })
