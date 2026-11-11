import type { Linea } from '../types'

export const lineas: Linea[] = [
  {
    id: 'servicios', letra: 'A', titulo: 'Servicios para negocios', tono: 'vino',
    resumen: 'Herramientas digitales que resuelven necesidades concretas de cada negocio.',
    items: ['Aplicaciones a medida', 'Landing pages', 'Digitalización de procesos', 'Automatizaciones', 'Integración de herramientas'],
  },
  {
    id: 'productos', letra: 'B', titulo: 'Productos digitales propios', tono: 'agua',
    resumen: 'Aplicaciones que pueden evolucionar hacia productos independientes.',
    items: ['Licencias', 'Suscripciones', 'Módulos adicionales'],
  },
  {
    id: 'impacto', letra: 'C', titulo: 'Proyectos de impacto social', tono: 'rosa',
    resumen: 'Proyectos propios o colaborativos con asociaciones, ONG y protectoras.',
    items: ['Asociaciones', 'ONG', 'Protectoras de animales'],
    proyecto: {
      titulo: 'Gestión de gatos sin hogar de Beade',
      descripcion: 'Proyecto demostrativo de cómo la tecnología puede ayudar a una causa local.',
      potencial: ['Organizar información', 'Gestionar colonias', 'Coordinar tareas'],
    },
  },
]
