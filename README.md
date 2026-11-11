# Estudio Sangría: modelo de negocio interactivo

Aplicación web para presentar y mantener el modelo de negocio de ESTUDIO SANGRÍA.
Hecha con React, TypeScript, Vite y Tailwind CSS.

## 1. Cómo está organizada

```
src/
  content/       Textos de partida (el "documento" original, en forma de datos)
  types/         Definición de qué datos existen (Project, Bloque, Tarea…)
  data/          Dónde se guardan los datos (el navegador o Supabase, según la configuración)
  store/         Estado de la app: modo, proyecto, autoguardado, confirmaciones
  lib/           Cálculos (calculadora de viabilidad), sin nada de interfaz
  components/    Piezas reutilizables, por carpetas (canvas, editable, roadmap…)
  pages/         Una página por apartado
  styles/        (los estilos globales están en src/index.css)
tailwind.config.js   Colores y tipografías de la identidad
```

Idea clave: **todo el contenido es un único documento** (`Project`, en `src/types/index.ts`).
Las páginas solo lo pintan y los componentes `Editable…` lo modifican.

## 2. Cómo ejecutarlo

Necesitas [Node.js](https://nodejs.org) (versión 18 o superior).

```
npm install      # solo la primera vez
npm run dev      # abre http://localhost:5173
npm test         # ejecuta las pruebas automáticas
npm run build    # genera la carpeta dist/ para publicar
```

## 3. Cómo modificar los contenidos

**Lo habitual, sin tocar código:** pulsa "Edición" y escribe directamente sobre los textos.
Se guarda solo (verás "Guardado en este navegador").

**Contenido de partida:** está en `src/content/`. Es lo que se ve la primera vez y lo que
recupera "Restaurar original". Los textos del Canvas están en `canvas.ts`.

**Colores:** `tailwind.config.js`. El fondo es `papel` (marfil aclarado). La distribución
orientativa de color está en `src/content/identidad.ts`.

## 4. Supabase: nube, acceso y vista compartida

Sin configurar nada, la app funciona en modo local (datos solo en tu navegador).
Con Supabase, tus datos van a la nube, entras con tu correo y puedes compartir una vista.

**Cómo funciona**
- `proyectos`: tu documento de trabajo. Privado: solo tú puedes leerlo (permisos RLS).
- `vistas_publicas`: una copia publicada, sin el cuaderno de ideas. Se actualiza solo cuando
  pulsas "Publicar" en Edición > Compartir. El enlace es estable y se puede desactivar.
- Entras con un enlace enviado al correo (sin contraseña).

**Configuración (una sola vez)**
1. En supabase.com, crea un proyecto.
2. *SQL Editor* > pega el contenido de `supabase/schema.sql` > Run.
3. *Authentication* > *Sign In / Providers*: deja activado "Email".
4. Copia en *Project Settings > API*: la **URL** y la clave **anon public**.
   Nunca uses ni pegues la clave `service_role`.
5. En local, crea `.env.local` (no se sube a GitHub):
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-anon
   ```
6. Publica la app (sección 6). En Supabase > *Authentication > URL Configuration*:
   pon la dirección de tu web en **Site URL** y también en **Redirect URLs**.
7. Abre tu web, escribe tu correo y entra con el enlace. La primera vez, la app te pregunta
   si subes a la nube lo que ya tenías en el navegador.
8. **Cierra el registro:** en *Authentication > Sign In / Providers > User Signups*
   desactiva "Allow new users to sign up". Así nadie más puede crear cuenta.

La clave *anon* va dentro del código público de la web: es normal y está pensada así. Lo que
protege tus datos son los permisos (RLS) del archivo SQL. No los desactives.

Si algo falla, los avisos de la app salen en la barra de Edición.

## 5. Copias de seguridad

En modo edición: **Exportar copia** descarga un archivo JSON con todo. **Importar** lo recupera.
Haz una copia antes de borrar datos del navegador o cambiar de dispositivo.

## 6. Publicar (GitHub Pages)

La web se publica con GitHub Actions (archivo `.github/workflows/deploy.yml`). Cada vez que
subes cambios a la rama `main`, GitHub comprueba las pruebas, compila la app y la publica en
`https://USUARIO.github.io/NOMBRE-REPO/`.

**Configuración (una sola vez)**
1. El repositorio debe tener la rama `main` (si la tuya se llama `master`, cambia `branches` en el workflow).
2. *Settings > Pages > Build and deployment > Source*: elige **GitHub Actions**.
   Si está en "Deploy from a branch", la web mostrará los archivos fuente y no funcionará.
3. *Settings > Secrets and variables > Actions > New repository secret*: crea
   `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con los datos de Supabase.
   Nunca uses la clave `service_role`.
4. En Supabase (*Authentication > URL Configuration*), pon en **Site URL** y en **Redirect URLs**:
   `https://USUARIO.github.io/NOMBRE-REPO/` (con la barra final).
5. Haz un cambio cualquiera y súbelo, o lanza el workflow a mano en la pestaña *Actions*.

Las rutas usan `/#/…`, así que no hace falta más configuración. Sin las variables, la web
funciona en modo local y quien la abra verá el contenido de `src/content/`, no el tuyo.

## 7. Cómo añadir una funcionalidad nueva (ejemplo: un apartado "Clientes")

1. Define los datos en `src/types/index.ts` y añádelos a `Project`.
2. Pon el contenido inicial en `src/content/` y súmalo en `defaultProject.ts`.
3. Crea la página en `src/pages/` usando `useProject` y los componentes `Editable…`.
4. Añade la ruta en `src/App.tsx` y la entrada en `secciones` (`initialContent.ts`).
5. Añade una prueba en `src/App.test.tsx` y ejecuta `npm test`.

Las copias antiguas se completan solas con los datos nuevos al cargar.

## Pruebas

`npm test` comprueba: que cada apartado se muestra, que un cambio se guarda y se recupera,
que las copias antiguas se completan y que la calculadora suma bien. No sustituyen a probar
la app a mano en móvil y escritorio.
