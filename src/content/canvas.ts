import type { Bloque } from '../types'
import { frases, meta } from './initialContent'

export const canvas: Bloque[] = [
  {
    id: 'segmentos', numero: '1', titulo: 'Segmentos de clientes', tono: 'rosa',
    resumen: 'Pequeños comercios, profesionales y negocios locales.',
    grupos: [
      { titulo: 'A quién ayudamos', items: ['Pequeños comercios', 'Profesionales', 'Negocios locales'] },
      { titulo: 'Atención especial', items: ['Tejido empresarial rural', 'Personas que necesitan soluciones digitales sencillas para gestionar mejor su actividad'] },
    ],
    nota: 'Objetivo: contribuir a que vivir, trabajar y emprender en el rural siga siendo posible.',
  },
  {
    id: 'propuesta', numero: '2', titulo: 'Propuesta de valor', tono: 'vino',
    resumen: meta.fraseCentral,
    grupos: [
      { titulo: 'Qué ofrece', items: ['Digitalización de procesos repetitivos', 'Reducción de la carga mental', 'Inteligencia artificial aplicada a problemas reales'] },
      { titulo: 'Cómo lo ofrece', items: ['Tecnología cercana y asequible', 'Adaptada al entorno rural', 'Con atención personalizada'] },
    ],
    frase: frases.canvas,
  },
  {
    id: 'relaciones', numero: '3', titulo: 'Relaciones con clientes', tono: 'marfil',
    resumen: 'Acompañar de principio a fin, hasta que el cliente es autónomo.',
    grupos: [
      { titulo: 'Cómo acompañamos', items: ['Diagnóstico inicial', 'Escucha y análisis de necesidades', 'Desarrollo colaborativo', 'Pruebas piloto', 'Formación y acompañamiento', 'Autonomía del cliente', 'Soporte y mantenimiento', 'Actualizaciones y seguimiento'] },
      { titulo: 'Experiencias diferenciales', items: ['Postales personalizadas cada mes y medio o dos meses', 'Tarjetas de visita con formato de bolsita de té, como invitación a hacer una pausa', 'Kits de bienvenida con productos de comercios locales', 'Galletas personalizadas y pequeños detalles de fidelización'] },
    ],
  },
  {
    id: 'canales', numero: '4', titulo: 'Canales', tono: 'agua',
    resumen: 'De la presencia digital al contacto directo con los negocios.',
    grupos: [
      { titulo: 'Corto plazo', items: ['Web del estudio', 'Redes sociales', 'Networking', 'Polo de Emprendimiento de Carballiño'] },
      { titulo: 'Medio plazo', items: ['Contacto directo con negocios', 'Asociaciones de comerciantes', 'Ferias y jornadas', 'Talleres y encuentros profesionales'] },
    ],
  },
  {
    id: 'ingresos', numero: '5', titulo: 'Fuentes de ingresos', tono: 'rosa',
    resumen: 'Servicios propios y colaboraciones mediante subcontratación.',
    grupos: [
      { titulo: 'Servicios', items: ['Aplicaciones a medida', 'Landing pages', 'Automatizaciones', 'Integración de sistemas', 'Asesoramiento y formación', 'Mantenimiento y soporte'] },
      { titulo: 'A largo plazo', items: ['Productos digitales propios', 'Suscripciones', 'Licencias', 'Módulos adicionales'] },
    ],
    nota: 'No es una empresa de páginas web tradicionales: crea herramientas digitales que resuelven necesidades concretas.',
  },
  {
    id: 'actividades', numero: '6', titulo: 'Actividades clave', tono: 'papel',
    resumen: 'Del estudio de necesidades al soporte posterior.',
    grupos: [{ titulo: 'Lo que hacemos', items: ['Investigación de necesidades del comercio rural', 'Diseño UX/UI', 'Desarrollo de aplicaciones', 'Creación de proyectos propios', 'Investigación y aplicación de IA', 'Automatización de procesos', 'Implantación de soluciones', 'Formación y asesoramiento', 'Soporte y mantenimiento', 'Comercialización y fidelización'] }],
  },
  {
    id: 'recursos', numero: '7', titulo: 'Recursos clave', tono: 'marfil',
    resumen: 'Pocos medios materiales y mucho conocimiento del territorio.',
    grupos: [
      { titulo: 'Materiales', items: ['Equipo informático', 'Herramientas de desarrollo y diseño', 'Dominios y hosting', 'Conexión a internet'] },
      { titulo: 'Intelectuales y humanos', items: ['Experiencia en diseño gráfico y maquetación web', 'Conocimientos de UX/UI', 'Formación en desarrollo de aplicaciones web', 'Conocimiento del territorio', 'Contactos empresariales', 'Apoyo del ecosistema emprendedor'] },
    ],
    nota: 'Un equipo informático más potente no es imprescindible en la primera fase.',
  },
  {
    id: 'socios', numero: '8', titulo: 'Socios clave', tono: 'agua',
    resumen: 'Una red local que da acceso, experiencia y visibilidad.',
    grupos: [{ titulo: 'Con quién contamos', items: ['Polo de Emprendimiento de Carballiño', 'Comercios locales para proyectos piloto', 'Asociaciones empresariales', 'Ayuntamientos del Ribeiro', 'Asesorías y gestorías', 'Profesionales tecnológicos, como SondOu', 'ONG y protectoras de animales'] }],
    nota: 'La colaboración con entidades sociales permite desarrollar proyectos propios, adquirir experiencia y dar visibilidad al estudio.',
  },
  {
    id: 'costes', numero: '9', titulo: 'Estructura de costes', tono: 'papel',
    resumen: 'Qué es imprescindible, qué varía y qué puede esperar.',
    grupos: [
      { titulo: 'Costes fijos', tono: 'imprescindible', items: ['Cuota de autónomos', 'Gestoría', 'Internet y telefonía', 'Suscripciones y licencias', 'Dominios y hosting', 'Seguros y servicios profesionales'] },
      { titulo: 'Costes variables', tono: 'variable', items: ['Desplazamientos', 'Publicidad', 'Formación', 'Desarrollo y mantenimiento', 'Subcontrataciones'] },
      { titulo: 'Inversiones', tono: 'aplazable', items: ['Equipo informático más potente', 'Identidad y web', 'Productos de demostración', 'Material comercial', 'Pruebas piloto y promoción'] },
    ],
  },
]
