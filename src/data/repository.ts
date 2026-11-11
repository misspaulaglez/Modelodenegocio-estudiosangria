import type { Project } from '../types'

// La app solo conoce este "contrato". Hoy lo cumple el almacenamiento local;
// más adelante lo cumplirá Supabase sin tocar la interfaz.
export interface Repository {
  cargar(): Promise<Project | null>
  guardar(p: Project): Promise<void>
}
