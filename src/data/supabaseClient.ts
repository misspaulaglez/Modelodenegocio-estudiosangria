import { createClient } from '@supabase/supabase-js'

// Las dos variables salen del archivo .env.local (o del panel de Vercel). Si faltan,
// la app funciona en modo local, como hasta ahora.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const clave = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabaseConfigurado = Boolean(url && clave)
export const supabase = supabaseConfigurado ? createClient(url as string, clave as string) : null
