# Portafolio 3D — Alexis Aguilar

Portafolio personal, oscuro y minimalista, para mostrar trabajos de modelado y arte 3D.
Pensado para aplicar a puestos de **practicante (internship)** en estudios de videojuegos.

Construido con **HTML5 + Tailwind CSS (CDN) + JavaScript vanilla**. Sin frameworks, sin build step:
puedes abrir `index.html` directamente en el navegador.

## Estructura de archivos

```
Portfolio3D/
├── index.html          # Estructura de toda la página (una sola página, con anclas por sección)
├── css/
│   └── styles.css       # Estilos complementarios a Tailwind (glows, cards, carrusel, modal, animaciones)
├── js/
│   ├── data.js           # Todo el contenido dinámico: galería y proyectos (editar aquí)
│   └── main.js           # Interactividad: filtros, modal, carrusel, menú, formulario, animaciones
└── assets/
    ├── gallery/          # Renders de la galería (props, hard-surface)
    └── projects/         # Capturas/renders de cada caso de estudio
```

## Cómo previsualizarlo

Sirve la carpeta con un servidor local (recomendado para que las rutas relativas de imágenes
funcionen igual que en producción):

```bash
# Con Python instalado
python -m http.server 8080
```

Luego visita `http://localhost:8080`.

## Cómo personalizar el contenido

Casi todo el contenido dinámico (galería y proyectos) vive en `js/data.js`.

### Agregar/quitar piezas de la galería

Duplica un objeto dentro del arreglo `GALLERY_ITEMS` en `js/data.js` y ajusta `id`, `title`,
`category` (`props` o `hard-surface`), `tags`, `images` y `description`.

### Agregar/quitar proyectos (casos de estudio)

Duplica un objeto dentro del arreglo `PROJECTS` en `js/data.js`. El campo `images` acepta varias
imágenes y se muestran automáticamente en un carrusel.

### Datos personales

En `index.html`, actualiza:

- El nombre en el header y el footer.
- El texto de la sección **Hero** (`#inicio`) y **Sobre mí** (`#sobre-mi`).
- El enlace de LinkedIn (actualmente `href="#"`).
- El correo de contacto (`mailto:`).

### Colores y tipografía

El tema de color se define en `index.html`, dentro de `tailwind.config` (colores `accent`,
`accent2` y `base`). La tipografía usa Google Fonts: **Space Grotesk** (títulos) e **Inter** (texto).

## Formulario de contacto

El formulario valida los campos en el navegador, pero no envía correos reales porque el sitio no
tiene backend. Opciones:

1. Usar el enlace `mailto:` que ya está en la sección de contacto (funciona sin configuración).
2. Conectar el `<form id="contact-form">` a un servicio como
   [Formspree](https://formspree.io/) o [Getform](https://getform.io/), o a un backend propio,
   reemplazando el bloque final de `initContactForm()` en `js/main.js` por la llamada `fetch()`
   correspondiente.

## Publicar el sitio (hosting)

Sitio 100% estático, se puede publicar gratis en:

- **GitHub Pages**: sube esta carpeta a un repositorio y activa Pages en la configuración del repo.
- **Netlify / Vercel**: arrastra la carpeta `Portfolio3D` a su panel (drag & drop) o conecta el repo.
- Cualquier hosting estático tradicional (sube los archivos por FTP).

No requiere paso de compilación ni dependencias de `npm`.
