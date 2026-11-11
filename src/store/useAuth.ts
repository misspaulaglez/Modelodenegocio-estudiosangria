import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../data/supabaseClient'
import { useProject } from './useProject'

interface Auth {
  sesion: Session | null
  iniciar: () => Promise<void>
  enviarEnlace: (email: string) => Promise<string | null> // devuelve un mensaje de error, o null si fue bien
  salir: () => Promise<void>
}

export const useAuth = create<Auth>((set) => ({
  sesion: null,
  async iniciar() {
    if (!supabase) return
    const { data } = await supabase.auth.getSession() // también procesa el enlace del correo
    set({ sesion: data.session })
    supabase.auth.onAuthStateChange((_evento, sesion) => set({ sesion }))
  },
  async enviarEnlace(email) {
    if (!supabase) return 'Supabase no está configurado'
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + window.location.pathname } })
    return error ? error.message : null
  },
  async salir() {
    await supabase?.auth.signOut()
    useProject.getState().reiniciar()
  },
}))
