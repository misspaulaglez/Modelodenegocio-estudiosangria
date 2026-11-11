import { create } from 'zustand'

interface C { mensaje: string | null; resolver: ((v: boolean) => void) | null }
export const useConfirm = create<C>(() => ({ mensaje: null, resolver: null }))

// Uso: if (await confirmar('¿Eliminar…?')) { … }
export const confirmar = (mensaje: string) =>
  new Promise<boolean>((resolver) => useConfirm.setState({ mensaje, resolver }))
