# Organización San Francisco — Landing + Panel de administración

Landing page (React + Vite + Tailwind) con un backend propio (Node + Express) que permite,
desde un panel privado en `/admin`, cargar eventos (imagen, título, descripción y ubicación)
y editar los textos, títulos e imágenes de la página sin tocar código.

## Estructura

- `src/` — Landing page y panel de administración (React, Tailwind).
- `server/` — API (Express). Guarda los datos en `server/data/db.json` y las imágenes
  subidas en `server/data/uploads/` (esta carpeta se genera sola, no se versiona en git).
- `public/` — Imágenes estáticas de referencia (logo, fotos por defecto).

## Requisitos

- Node.js 20 o superior.

## Desarrollo local

Instalar dependencias una sola vez:

```bash
npm install
```

Levantar frontend (Vite) y backend (Express) juntos:

```bash
npm run dev:all
```

Esto abre el sitio en `http://localhost:5173` (o el puerto que Vite indique en consola) y la
API en `http://localhost:4001`. El panel de administración está en `/admin`.

La primera vez que se levanta el backend, si no configuraste `ADMIN_USER`/`ADMIN_PASSWORD`
(ver abajo), se crea automáticamente un usuario `admin` con una contraseña temporal —
la consola del backend la muestra en ese momento. Entrá a `/admin`, iniciá sesión y
cambiá la contraseña desde "Mi cuenta" antes de publicar el sitio.

## Variables de entorno

Se pueden definir en un archivo `.env` en la raíz del proyecto (no se versiona) o como
variables de entorno del servidor:

| Variable         | Para qué sirve                                              | Si no se define                  |
|------------------|--------------------------------------------------------------|-----------------------------------|
| `ADMIN_USER`     | Usuario del panel de administración                          | `admin`                           |
| `ADMIN_PASSWORD` | Contraseña inicial del panel (solo se usa la primera vez)     | se genera una temporal y se muestra por consola |
| `JWT_SECRET`     | Clave secreta para firmar la sesión. **Obligatorio definirla en producción** | valor de desarrollo, inseguro |
| `PORT`           | Puerto donde escucha el backend                               | `4001`                            |

En producción, definí siempre `ADMIN_PASSWORD` y `JWT_SECRET` con valores propios — no dependas
de los generados automáticamente.

> Estas variables solo se usan la primera vez que se crea la base de datos
> (`server/data/db.json`). Si ya la cambiaste desde el panel ("Mi cuenta"), la contraseña
> queda guardada ahí independientemente de `ADMIN_PASSWORD`.

## Publicar en un servidor (VPS / Node.js)

1. Copiar el proyecto al servidor (o clonar el repositorio) y correr `npm install`.
2. Definir `JWT_SECRET` (una cadena larga y aleatoria) y opcionalmente `ADMIN_USER` /
   `ADMIN_PASSWORD` como variables de entorno del servidor.
3. Generar el build de producción del sitio:

   ```bash
   npm run build
   ```

4. Levantar el servidor (sirve la API **y** el sitio ya compilado desde un solo proceso):

   ```bash
   npm start
   ```

5. Dejarlo corriendo con un gestor de procesos como PM2 (`pm2 start server/index.js --name osf`)
   y, si corresponde, poner Nginx/Apache delante como proxy reverso hacia el puerto configurado
   (`PORT`, por defecto `4001`).

Los datos cargados desde el panel (eventos, textos, imágenes subidas) quedan en
`server/data/`. Conviene incluir esa carpeta en el backup del servidor.

## Panel de administración

Desde `/admin` se puede:

- **Eventos**: crear, editar y borrar posteos de eventos con imagen, título, subtítulo,
  descripción, ubicación y fecha.
- **Contenido del sitio**: editar todos los textos, títulos e imágenes de cada sección de la
  landing (portada, estadísticas, coberturas, aseguradoras aliadas, sucursales, preguntas
  frecuentes, pie de página, etc.).
- **Mi cuenta**: cambiar la contraseña de acceso al panel.
