import type { Partida, Servicio, Viabilidad } from '../types'

export const euros = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(n)

// Suma solo los importes introducidos; cuenta cuántos faltan.
export function sumar(ps: Partida[]) {
  const con = ps.filter((p) => p.importe !== null)
  return { total: con.reduce((a, p) => a + (p.importe as number), 0), pendientes: ps.length - con.length, conDatos: con.length > 0 }
}

export const ingresoServicio = (s: Servicio) => (s.precio !== null && s.proyectosMes !== null ? s.precio * s.proyectosMes : null)

export function calcular(v: Viabilidad) {
  const partidas = (id: string) => v.costes.find((c) => c.id === id)?.partidas ?? []
  const fijos = sumar(partidas('fijos'))
  const variables = sumar(partidas('variables'))
  const inversion = sumar(partidas('inversiones'))
  const gastos = fijos.total + variables.total
  const gastosConDatos = fijos.conDatos || variables.conDatos

  const ingresosServ = v.servicios.map(ingresoServicio)
  const ingresos = ingresosServ.reduce<number>((a, x) => a + (x ?? 0), 0)
  const ingresosConDatos = ingresosServ.some((x) => x !== null)

  const precios = v.servicios.map((s) => s.precio).filter((x): x is number => x !== null && x > 0)
  const media = precios.length ? precios.reduce((a, b) => a + b, 0) / precios.length : null
  const manual = v.precioMedio !== null && v.precioMedio > 0
  const precioUsado = manual ? v.precioMedio : media
  const proyectos = gastosConDatos && precioUsado ? Math.ceil(gastos / precioUsado) : null

  return {
    gastos, gastosConDatos, ingresos, ingresosConDatos,
    diferencia: ingresos - gastos,
    diferenciaConDatos: gastosConDatos && ingresosConDatos,
    inversion: inversion.total, inversionConDatos: inversion.conDatos,
    proyectos, precioUsado, precioDeServicios: !manual && media !== null,
    costesPendientes: fijos.pendientes + variables.pendientes,
    serviciosPendientes: ingresosServ.filter((x) => x === null).length,
  }
}
