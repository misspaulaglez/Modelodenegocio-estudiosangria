import type { Project } from '../types'
import type { Repository } from './repository'
import { supabase } from './supabaseClient'

const db = () => {
  if (!supabase) throw new Error('Supabase no está configurado')
  return supabase
}
async function usuarioId() {
  const { data } = await db().auth.getSession()
  const id = data.session?.user.id
  if (!id) throw new Error('No hay sesión iniciada')
  return id
}

// Tu documento privado. Los permisos (RLS) de la base de datos impiden que lo lea nadie más.
export const supabaseRepository: Repository = {
  async cargar() {
    const { data, error } = await db().from('proyectos').select('contenido').maybeSingle()
    if (error) throw error
    return data ? (data.contenido as Project) : null
  },
  async guardar(p) {
    const { error } = await db().from('proyectos').upsert({ user_id: await usuarioId(), contenido: p, updated_at: new Date().toISOString() })
    if (error) throw error
  },
}

// Vista compartida: una copia publicada aparte, con su propio enlace estable.
export async function estadoVista() {
  const { data, error } = await db().from('vistas_publicas').select('id, activa').eq('user_id', await usuarioId()).maybeSingle()
  if (error) throw error
  return data as { id: string; activa: boolean } | null
}
export async function publicarVista(contenido: unknown) {
  const { data, error } = await db().from('vistas_publicas')
    .upsert({ user_id: await usuarioId(), contenido, activa: true, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
    .select('id').single()
  if (error) throw error
  return data.id as string
}
export async function desactivarVista() {
  const { error } = await db().from('vistas_publicas').update({ activa: false }).eq('user_id', await usuarioId())
  if (error) throw error
}
export async function cargarVistaPublica(id: string) {
  const { data, error } = await db().from('vistas_publicas').select('contenido').eq('id', id).eq('activa', true).maybeSingle()
  if (error) throw error
  return data ? data.contenido : null
}
