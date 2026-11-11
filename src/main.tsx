import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource-variable/dm-sans'
import './index.css'
import App from './App'
import Compartido from './pages/Compartido'
import { useAuth } from './store/useAuth'

async function arrancar() {
  const compartido = window.location.hash.match(/^#\/compartido\/([0-9a-f-]{36})/i)
  // La vista compartida no necesita sesión. En el resto, hay que leer la sesión (y el enlace del correo) antes de pintar.
  if (!compartido) await useAuth.getState().iniciar()
  if (window.location.hash.startsWith('#error')) window.history.replaceState(null, '', window.location.pathname) // enlace caducado
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      {compartido ? <Compartido id={compartido[1]} /> : <HashRouter><App /></HashRouter>}
    </React.StrictMode>,
  )
}
arrancar()
