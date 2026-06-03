# Proyecto Microservices

Este repositorio contiene un sitio web estático con una experiencia visual y una página administrati­va protegida.

## Qué incluye

- `index.html` — página principal con la historia y animaciones
- `styles.css` — estilos del sitio
- `script.js` — lógica del front-end y contador de visitas (requiere servidor)
- `admin.html` — página de administración con contraseña
- `server.js` — servidor Node.js que registra visitas y protege la página administrativa
- `data/` — carpeta donde se guardan:
  - `count.txt` — total de visitas
  - `visitors.txt` — registros de accesos

## Importante: GitHub Pages vs servidor Node

GitHub Pages sólo puede servir archivos estáticos (`.html`, `.css`, `.js`, imágenes). No ejecuta código de servidor como `server.js`.

Por eso:

- Si despliegas en GitHub Pages, `index.html`, `styles.css`, `script.js` y `admin.html` se servirán bien.
- Pero `server.js`, la ruta `/visit` y la protección del admin no funcionarán en GitHub Pages.

### Qué funciona en GitHub Pages

- El contenido estático del sitio
- Los estilos y animaciones
- La página `admin.html` se mostrará, pero la funcionalidad de login no funcionará porque depende del backend

### Qué no funciona en GitHub Pages

- El contador de visitas real (`/visit`)
- El registro de visitas en `data/`
- La autenticación y los datos protegidos en `/admin/data`

## Recomendación de despliegue

Para que el contador y la administración funcionen correctamente, usa un servicio que soporte Node.js, por ejemplo:

- Vercel
- Railway
- Render
- Heroku
- un servidor propio con Node

## Cómo ejecutar localmente

1. Instala Node.js si no lo tienes.
2. Abre una terminal en este proyecto.
3. Ejecuta:

```bash
node server.js
```

4. Abre en el navegador:

```
http://localhost:3000
```

5. Para acceder al panel administrativo:

```
http://localhost:3000/admin
```

## Contraseña administrativa

- `corina123`

## Si quieres desplegar estático en GitHub Pages

1. Sube el contenido del repositorio a GitHub.
2. Activa GitHub Pages desde la configuración del repositorio.
3. Selecciona la rama y la carpeta raíz como carpeta de publicación.

> Recuerda: en GitHub Pages el contador y el registro de visitas estarán deshabilitados.

## Si quieres un despliegue completo con backend

Si deseas, también puedo preparar un `package.json` y un `Procfile` o instrucciones específicas para Vercel/Railway. ¡Solo dime a cuál servicio quieres desplegarlo!
