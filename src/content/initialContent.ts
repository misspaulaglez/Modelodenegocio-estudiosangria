import type { Meta, Seccion } from '../types'

export const meta: Meta = {
  nombre: 'Estudio Sangría',
  lema: 'Ética y estética',
  fraseCentral: 'No vendo aplicaciones, vendo tiempo.',
  presentacion:
    'Ayudo a pequeños comercios, profesionales y negocios locales a digitalizar tareas repetitivas, simplificar procesos y reducir su carga de trabajo, con aplicaciones a medida, automatizaciones e inteligencia artificial aplicada a problemas reales.',
  ubicacion: 'Estudio de diseño y tecnología en el Ribeiro, Galicia',
  ultimaActualizacion: '2026-11-07',
}

export const secciones: Seccion[] = [
  { numero: '00', ruta: '/', etiqueta: 'Inicio', entrega: 1 },
  { numero: '01', ruta: '/modelo', etiqueta: 'Modelo de negocio', entrega: 2 },
  { numero: '02', ruta: '/trabajamos', etiqueta: 'Cómo trabajamos', entrega: 3 },
  { numero: '03', ruta: '/lineas', etiqueta: 'Líneas de negocio', entrega: 3 },
  { numero: '04', ruta: '/ecosistema', etiqueta: 'Ecosistema rural', entrega: 7 },
  { numero: '05', ruta: '/viabilidad', etiqueta: 'Viabilidad', entrega: 8 },
  { numero: '06', ruta: '/hoja-de-ruta', etiqueta: 'Hoja de ruta', entrega: 6 },
  { numero: '07', ruta: '/cuaderno', etiqueta: 'Cuaderno de ideas', entrega: 5 },
]

// Las dos frases del proyecto se conservan: aún no está decidida cuál usar.
export const frases = {
  canvas: '¿Un rato de relax y me cuentas cómo te puedo ayudar?',
  proceso: '¿Un té y me cuentas cómo te puedo ayudar?',
}
