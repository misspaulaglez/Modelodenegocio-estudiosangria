import type { CategoriaSocio, EstadoSocio } from '../../types'

export const categorias: Record<CategoriaSocio, { etiqueta: string; nodo: string }> = {
  emprendimiento: { etiqueta: 'Apoyo al emprendimiento', nodo: 'bg-vino text-marfil border-vino' },
  comercio: { etiqueta: 'Comercio local', nodo: 'bg-rosa text-carbon border-carbon' },
  asociacion: { etiqueta: 'Asociación empresarial', nodo: 'bg-marfil text-carbon border-carbon' },
  administracion: { etiqueta: 'Administración local', nodo: 'bg-agua text-carbon border-carbon' },
  asesoria: { etiqueta: 'Asesoría y gestoría', nodo: 'bg-papel text-carbon border-vino' },
  tecnologia: { etiqueta: 'Profesionales tecnológicos', nodo: 'bg-papel text-carbon border-verde' },
  social: { etiqueta: 'Entidad social', nodo: 'bg-rosa text-vino border-vino' },
}
export const ordenCategorias = Object.keys(categorias) as CategoriaSocio[]

export const estadosSocio: Record<EstadoSocio, string> = {
  'por-explorar': 'Por explorar',
  'en-contacto': 'En contacto',
  colaborando: 'Colaborando',
}
export const ordenEstados = Object.keys(estadosSocio) as EstadoSocio[]
