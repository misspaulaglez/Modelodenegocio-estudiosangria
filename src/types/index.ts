export type Modo = 'presentacion' | 'edicion'

export interface Seccion {
  numero: string
  ruta: string
  etiqueta: string
  entrega: number // en qué entrega del plan se construye
}

export interface Meta {
  nombre: string
  lema: string
  fraseCentral: string
  presentacion: string
  ubicacion: string
  ultimaActualizacion: string // fecha ISO
}

export type TonoCoste = 'imprescindible' | 'variable' | 'aplazable'
export type Tono = 'vino' | 'rosa' | 'marfil' | 'agua' | 'papel'

export interface Grupo {
  titulo: string
  items: string[]
  tono?: TonoCoste // solo se usa en la estructura de costes
}

export interface Bloque {
  id: string
  numero: string
  titulo: string
  resumen: string
  tono: Tono // color de la tarjeta (ver distribución en identidad.ts)
  grupos: Grupo[]
  frase?: string
  nota?: string
}

export interface Paso { titulo: string; texto: string }

export interface Linea {
  id: string
  letra: string
  titulo: string
  resumen: string
  tono: Tono
  items: string[]
  proyecto?: { titulo: string; descripcion: string; potencial: string[] }
}

// Todo el contenido editable de la app vive en un único documento.
export interface Project {
  version: 1
  meta: Meta
  frases: { proceso: string }
  canvas: Bloque[]
  proceso: Paso[]
  lineas: Linea[]
  notas: Nota[]
  hojaRuta: Fase[]
  socios: Socio[]
  viabilidad: Viabilidad
}

export type TipoNota = 'idea' | 'observacion' | 'pregunta' | 'decision' | 'tarea'

export interface Nota {
  id: string
  tipo: TipoNota
  texto: string
  apartado: string // 'general', 'trabajamos', 'canvas-propuesta'…
  creada: string // fecha y hora ISO
  hecha?: boolean // solo para tareas
}

export type EstadoTarea = 'pendiente' | 'en-curso' | 'completada'

export interface Tarea {
  id: string
  texto: string
  estado: EstadoTarea
  fecha: string // fecha objetivo (AAAA-MM-DD); vacío = sin fecha
}

export interface Fase {
  id: string
  titulo: string
  tono: Tono
  tareas: Tarea[]
}

export type CategoriaSocio = 'emprendimiento' | 'comercio' | 'asociacion' | 'administracion' | 'asesoria' | 'tecnologia' | 'social'
export type EstadoSocio = 'por-explorar' | 'en-contacto' | 'colaborando'

export interface Socio {
  id: string
  nombre: string
  categoria: CategoriaSocio
  estado: EstadoSocio
  notas: string
}

export interface Partida { id: string; concepto: string; importe: number | null } // null = pendiente de estimar

export interface GrupoCoste {
  id: 'fijos' | 'variables' | 'inversiones'
  titulo: string
  tono: TonoCoste
  unidad: 'mes' | 'unica' // fijos y variables: al mes; inversiones: pago único
  partidas: Partida[]
}

export type Prioridad = 'por-decidir' | 'prioritario' | 'futuro'

export interface Servicio {
  id: string
  nombre: string
  precio: number | null // precio medio por proyecto
  proyectosMes: number | null // proyectos previstos al mes
  prioridad: Prioridad
}

export interface Viabilidad { costes: GrupoCoste[]; servicios: Servicio[]; precioMedio: number | null }
