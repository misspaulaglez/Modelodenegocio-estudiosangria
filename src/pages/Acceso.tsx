import { useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import { useAuth } from '../store/useAuth'

export default function Acceso() {
  const enviarEnlace = useAuth((s) => s.enviarEnlace)
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState<'libre' | 'enviando' | 'enviado'>('libre')
  const [error, setError] = useState('')

  const enviar = async (e: FormEvent) => {
    e.preventDefault()
    setEstado('enviando'); setError('')
    const fallo = await enviarEnlace(email.trim())
    if (fallo) { setError(`No se pudo enviar el enlace. ${fallo}`); setEstado('libre') } else setEstado('enviado')
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-rosa px-6 py-12">
      <div className="w-full max-w-md bg-papel p-8">
        <p className="font-sans text-sm font-bold tracking-[0.3em] text-vino">ESTUDIO SANGRÍA</p>
        <h1 className="mt-4 font-serif text-4xl text-vino">Acceso</h1>
        {estado === 'enviado' ? (
          <p className="mt-4 font-serif text-lg">Te hemos enviado un enlace a <strong>{email}</strong>. Ábrelo en este mismo dispositivo para entrar.</p>
        ) : (
          <form onSubmit={enviar} className="mt-4">
            <p className="font-serif text-lg">Escribe tu correo y te enviaremos un enlace para entrar. No hace falta contraseña.</p>
            <label className="mt-5 block text-sm">
              Correo electrónico
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
                className="mt-1 w-full border border-carbon/30 bg-marfil/40 p-3" />
            </label>
            {error && <p role="alert" className="mt-3 text-sm text-vino">{error}</p>}
            <button type="submit" disabled={estado === 'enviando' || !email}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-vino px-5 py-3 text-sm text-marfil hover:bg-carbon disabled:opacity-40">
              <Mail size={16} /> {estado === 'enviando' ? 'Enviando…' : 'Enviarme el enlace'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
