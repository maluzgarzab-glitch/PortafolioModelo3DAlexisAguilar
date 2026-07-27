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

El formulario ya está conectado a [Formspree](https://formspree.io/) (servicio gratuito que recibe
el envío y te lo manda por correo, sin necesidad de programar un backend ni una base de datos).
Para activarlo:

1. Crea una cuenta gratis en [formspree.io](https://formspree.io/) con tu correo.
2. Crea un nuevo formulario ("New Form") y copia el endpoint que te da, con forma
   `https://formspree.io/f/xxxxxxx`.
3. En `index.html`, busca el `<form id="contact-form" action="https://formspree.io/f/TU_FORM_ID" ...>`
   en la sección **Contacto** y reemplaza `TU_FORM_ID` por tu propio ID.
4. Formspree te enviará un correo de confirmación la primera vez que alguien use el formulario;
   confírmalo para empezar a recibir mensajes en tu bandeja de entrada.

El plan gratuito de Formspree permite hasta 50 envíos al mes, más que suficiente para un portafolio.

Como alternativa siempre queda el enlace `mailto:` de la sección de contacto, que funciona sin
ninguna configuración.

## Publicar el sitio (hosting)

Sitio 100% estático, se puede publicar gratis en:

- **GitHub Pages**: sube esta carpeta a un repositorio y activa Pages en la configuración del repo.
- **Netlify / Vercel**: arrastra la carpeta `Portfolio3D` a su panel (drag & drop) o conecta el repo.
- Cualquier hosting estático tradicional (sube los archivos por FTP).

No requiere paso de compilación ni dependencias de `npm`.
