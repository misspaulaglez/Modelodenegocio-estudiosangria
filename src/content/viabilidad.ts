import type { Viabilidad, Partida, Servicio, Prioridad } from '../types'

// Ninguna cifra está inventada: todos los importes parten vacíos (pendientes de estimar).
const p = (id: string, concepto: string): Partida => ({ id, concepto, importe: null })
const s = (id: string, nombre: string, prioridad: Prioridad): Servicio => ({ id, nombre, precio: null, proyectosMes: null, prioridad })

export const viabilidad: Viabilidad = {
  precioMedio: null,
  costes: [
    { id: 'fijos', titulo: 'Costes fijos', tono: 'imprescindible', unidad: 'mes', partidas: [
      p('c1', 'Cuota de autónomos'), p('c2', 'Gestoría'), p('c3', 'Internet y telefonía'),
      p('c4', 'Suscripciones y licencias'), p('c5', 'Dominios y hosting'), p('c6', 'Seguros y servicios profesionales') ] },
    { id: 'variables', titulo: 'Costes variables', tono: 'variable', unidad: 'mes', partidas: [
      p('v1', 'Desplazamientos'), p('v2', 'Publicidad'), p('v3', 'Formación'),
      p('v4', 'Desarrollo y mantenimiento'), p('v5', 'Subcontrataciones') ] },
    { id: 'inversiones', titulo: 'Inversiones iniciales', tono: 'aplazable', unidad: 'unica', partidas: [
      p('i1', 'Equipo informático más potente'), p('i2', 'Identidad y web'), p('i3', 'Productos de demostración'),
      p('i4', 'Material comercial'), p('i5', 'Pruebas piloto y promoción') ] },
  ],
  // Los servicios propios no tienen prioridad decidida; los de largo plazo sí vienen como "futuro" en tu documento.
  servicios: [
    s('s1', 'Aplicaciones a medida', 'por-decidir'), s('s2', 'Landing pages', 'por-decidir'),
    s('s3', 'Automatizaciones', 'por-decidir'), s('s4', 'Integración de sistemas', 'por-decidir'),
    s('s5', 'Asesoramiento y formación', 'por-decidir'), s('s6', 'Mantenimiento y soporte', 'por-decidir'),
    s('s7', 'Productos digitales propios', 'futuro'), s('s8', 'Suscripciones', 'futuro'),
    s('s9', 'Licencias', 'futuro'), s('s10', 'Módulos adicionales', 'futuro'),
  ],
}
