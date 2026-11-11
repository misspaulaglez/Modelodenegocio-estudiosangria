import type { Fase } from '../types'

const t = (id: string, texto: string) => ({ id, texto, estado: 'pendiente' as const, fecha: '' })

// Todas las tareas empiezan pendientes y sin fecha: las fechas las decides tú.
export const hojaRuta: Fase[] = [
  { id: 'f1', titulo: 'Preparación', tono: 'rosa', tareas: [
    t('f1a', 'Definir identidad'), t('f1b', 'Desarrollar portfolio'),
    t('f1c', 'Construir aplicaciones demostrativas'), t('f1d', 'Completar formación técnica') ] },
  { id: 'f2', titulo: 'Validación', tono: 'marfil', tareas: [
    t('f2a', 'Contactar con negocios'), t('f2b', 'Detectar necesidades'),
    t('f2c', 'Conseguir primeros proyectos piloto'), t('f2d', 'Validar precios y servicios') ] },
  { id: 'f3', titulo: 'Consolidación', tono: 'agua', tareas: [
    t('f3a', 'Conseguir clientes recurrentes'), t('f3b', 'Desarrollar colaboraciones'),
    t('f3c', 'Mejorar procesos internos'), t('f3d', 'Crear una cartera de proyectos') ] },
  { id: 'f4', titulo: 'Crecimiento', tono: 'vino', tareas: [
    t('f4a', 'Desarrollar productos propios'), t('f4b', 'Ofrecer formación'),
    t('f4c', 'Incorporar automatizaciones e IA'), t('f4d', 'Ampliar la red de colaboradores') ] },
]
