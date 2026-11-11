import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Modo } from '../types'

interface AppState {
  modo: Modo
  setModo: (m: Modo) => void
}

// "persist" guarda el modo en el navegador (localStorage) para recordarlo al volver.
export const useApp = create<AppState>()(
  persist(
    (set) => ({ modo: 'presentacion', setModo: (modo) => set({ modo }) }),
    { name: 'sangria-app' },
  ),
)
