import { describe, it, expect } from 'vitest'
import { calcular } from './viabilidad'
import { proyectoInicial } from '../content/defaultProject'

describe('calculadora de viabilidad', () => {
  it('sin datos, todo queda pendiente de estimar', () => {
    const r = calcular(proyectoInicial().viabilidad)
    expect(r.gastosConDatos).toBe(false)
    expect(r.proyectos).toBeNull()
    expect(r.costesPendientes).toBe(11)
    expect(r.serviciosPendientes).toBe(10)
  })
  it('calcula gastos, ingresos, diferencia y proyectos necesarios', () => {
    const v = proyectoInicial().viabilidad
    v.costes[0].partidas[0].importe = 100
    v.costes[0].partidas[1].importe = 100
    v.servicios[0].precio = 500
    v.servicios[0].proyectosMes = 2
    const r = calcular(v)
    expect(r.gastos).toBe(200)
    expect(r.ingresos).toBe(1000)
    expect(r.diferencia).toBe(800)
    expect(r.proyectos).toBe(1)
  })
  it('el precio medio manual manda sobre la media de servicios', () => {
    const v = proyectoInicial().viabilidad
    v.costes[0].partidas[0].importe = 900
    v.servicios[0].precio = 500
    v.precioMedio = 300
    expect(calcular(v).proyectos).toBe(3)
  })
})
