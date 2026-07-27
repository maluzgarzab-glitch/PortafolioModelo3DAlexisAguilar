/**
 * data.js
 * -----------------------------------------------------------------------
 * Contenido dinámico del portafolio: galería de trabajos 3D y proyectos /
 * casos de estudio. Para actualizar el contenido no hace falta tocar el
 * HTML ni la lógica: solo editar los arreglos de abajo.
 *
 * Para agregar imágenes nuevas:
 *   assets/gallery/props/          -> props sueltos
 *   assets/gallery/hard-surface/   -> mecanismos / vehículos / hard-surface
 *   assets/projects/<slug>/        -> imágenes de un caso de estudio
 *
 * Cada item de GALLERY_ITEMS y PROJECTS usa "images": [...] (arreglo), así
 * que una pieza puede tener una o varias fotos; el carrusel/lightbox se
 * genera automáticamente según cuántas tenga.
 * -----------------------------------------------------------------------
 */

// Mejores trabajos destacados en el carrusel del Hero. "projectId" debe
// coincidir con un id de PROJECTS: al hacer clic se abre el lightbox con
// todas las imágenes de ese proyecto.
const HERO_HIGHLIGHTS = [
  {
    image: "assets/projects/comedor-medieval/render-2.png",
    title: "Comedor Medieval Estilizado",
    subtitle: "Maya · Modelado & Iluminación",
    projectId: "comedor-medieval",
  },
  {
    image: "assets/projects/feria/render-1.png",
    title: "Ambientación de Feria",
    subtitle: "Unreal Engine 5 · Set Dressing",
    projectId: "feria",
  },
  {
    image: "assets/projects/comedor-medieval/render-1.png",
    title: "Comedor Medieval Estilizado",
    subtitle: "Vista general del salón",
    projectId: "comedor-medieval",
  },
  {
    image: "assets/projects/feria/render-2.png",
    title: "Carreta & Carpa de Circo",
    subtitle: "Unreal Engine 5 · Props integrados",
    projectId: "feria",
  },
];

// Categorías usadas por los botones de filtro de la galería.
const GALLERY_CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "props", label: "Props" },
  { id: "hard-surface", label: "Hard-Surface / Mecanismos" },
];

// Galería de piezas sueltas. Cada item puede tener varias imágenes.
const GALLERY_ITEMS = [
  {
    id: "cofre-del-tesoro",
    title: "Cofre del Tesoro",
    category: "props",
    tags: ["Maya", "Hard-Surface", "Prop de juego"],
    images: ["assets/gallery/props/cofre-del-tesoro.png"],
    description:
      "Prop de fantasía modelado en Maya. Buen manejo de biselados y refuerzos metálicos para que la silueta se lea bien incluso sin textura. Pendiente: pase de texturizado PBR para llevarlo a un render final.",
  },
  {
    id: "baston-lunar",
    title: "Bastón Lunar",
    category: "props",
    tags: ["Maya", "Prop de fantasía"],
    images: ["assets/gallery/props/baston-lunar.png"],
    description:
      "Arma/objeto ceremonial con motivo de luna creciente. La curva de la luna está bien resuelta con topología limpia; es una pieza pequeña pero con buena lectura de forma, ideal para un inventario de RPG.",
  },
  {
    id: "martillo-estilizado",
    title: "Martillo Estilizado",
    category: "props",
    tags: ["Maya", "Prop de fantasía", "Stylized"],
    images: ["assets/gallery/props/martillo-estilizado.png"],
    description:
      "Arma cuerpo a cuerpo con proporciones exageradas típicas de juego estilizado, con detalle ornamental (rostro tallado) en la cabeza del martillo. Buena pieza para mostrar diseño de armas, aunque se beneficiaría de un render final con materiales.",
  },
  {
    id: "candelabro-ornamental",
    title: "Candelabro Ornamental",
    category: "props",
    tags: ["Maya", "Hard-Surface", "Prop histórico"],
    images: ["assets/gallery/props/candelabro-ornamental.png"],
    description:
      "Candelabro de techo de 12 brazos con curvas orgánicas hechas a mano sobre geometría hard-surface. Es la pieza con más complejidad de topología de todo el set: buena para demostrar paciencia y control de la malla en formas curvas.",
  },
  {
    id: "piano-de-cola",
    title: "Piano de Cola",
    category: "props",
    tags: ["Maya", "Prop de interior"],
    images: ["assets/gallery/props/piano-de-cola.png"],
    description:
      "Modelo de piano de cola con tapa abierta y pedalera detallada. Silueta elegante y proporciones creíbles; un buen candidato para un render final con materiales de madera lacada y metal.",
  },
  {
    id: "silla-clasica",
    title: "Silla Clásica",
    category: "props",
    tags: ["Maya", "Mobiliario"],
    images: ["assets/gallery/props/silla-clasica.png"],
    description:
      "Silla de madera con detalle tallado en el respaldo y refuerzos torneados en las patas. Modelado de mobiliario sólido y con buen uso de referencias de carpintería real.",
  },
  {
    id: "criatura-mecanica",
    title: "Criatura Mecánica",
    category: "hard-surface",
    tags: ["Maya", "Hard-Surface", "Diseño mecánico"],
    images: ["assets/gallery/hard-surface/criatura-mecanica.png"],
    description:
      "Estudio de diseño mecánico tipo criatura/vehículo con articulaciones, pistones y remaches. Es la pieza más ambiciosa técnicamente del portafolio: buena oportunidad para un render final que muestre el diseño con luz y material metálico.",
  },
  {
    id: "tren-de-juguete",
    title: "Tren de Juguete",
    category: "hard-surface",
    tags: ["Maya", "Low-Poly", "Prop estilizado"],
    images: ["assets/gallery/hard-surface/tren-de-juguete.jpg"],
    description:
      "Prop low-poly de estilo juguete de madera, con paleta de colores plana y formas primitivas. Es una pieza sencilla comparada con el resto del set, pero útil para mostrar que también manejas un lenguaje visual más simple/casual.",
  },
];

// Proyectos / casos de estudio reales, ordenados del más completo al más en proceso.
const PROJECTS = [
  {
    id: "comedor-medieval",
    title: "Comedor Medieval Estilizado",
    role: "Modelado 3D & Iluminación",
    timeframe: "Proyecto individual · Render final + wireframe",
    engines: ["Maya", "Render final (Arnold/V-Ray)"],
    summary:
      "Escena de interior completa: mesa con banquillos, alacena, sofá, candelabro, chimenea y estantería, con un pase de iluminación cálida.",
    description:
      "Esta es la pieza más completa del portafolio: no solo modelado, sino también composición de escena e iluminación con resultado final. Se armó un comedor de estilo rústico/medieval con múltiples props (mesa, banquillos, alacena de madera, sofá, candelabro, chimenea de piedra y estantería de utensilios), cuidando que los materiales de madera, metal y tela leyeran bien bajo una iluminación cálida. Los wireframes muestran una topología limpia y en su mayoría cuádriculos, lo cual facilita animación o LODs a futuro. Punto de mejora: valdría la pena un pase de texturizado PBR en lugar de shading base para acercarlo aún más a un estándar de producción.",
    images: [
      "assets/projects/comedor-medieval/render-1.png",
      "assets/projects/comedor-medieval/render-2.png",
      "assets/projects/comedor-medieval/render-3.png",
      "assets/projects/comedor-medieval/wireframe-1.jpg",
      "assets/projects/comedor-medieval/wireframe-2.jpg",
      "assets/projects/comedor-medieval/wireframe-3.jpg",
    ],
  },
  {
    id: "feria",
    title: "Ambientación de Feria",
    role: "Prop Art & Set Dressing",
    timeframe: "Proyecto individual · Integrado en Unreal Engine",
    engines: ["Maya", "Unreal Engine 5"],
    summary:
      "Rueda de la fortuna y carreta de circo modeladas y colocadas en un entorno de cañón con luz de atardecer en Unreal Engine.",
    description:
      "Dos props temáticos de feria/circo (una rueda de la fortuna y una carreta enjaulada con tienda) modelados en Maya y luego integrados en Unreal Engine 5 sobre un terreno rocoso con iluminación de atardecer. Lo más valioso aquí es la puesta en escena: la elección de luz y entorno hace que props relativamente simples se vean atmosféricos y con buena narrativa visual. Es un buen ejemplo de que sabes llevar un asset del modelado a un contexto de juego real, no solo a un render aislado.",
    images: [
      "assets/projects/feria/render-1.png",
      "assets/projects/feria/render-2.png",
      "assets/projects/feria/wireframe-1.png",
      "assets/projects/feria/wireframe-2.png",
    ],
  },
  {
    id: "cocina-industrial",
    title: "Cocina Industrial (Kit de Props)",
    role: "Hard-Surface Prop Modeling",
    timeframe: "Proyecto individual · Modelado, sin texturizar",
    engines: ["Maya"],
    summary:
      "Kit modular de mobiliario de cocina profesional: isla con parrillas, barra con fregadero doble, carro de bandejas y refrigerador.",
    description:
      "Set de props hard-surface pensado como kit modular de cocina de restaurante: isla de cocción con parrillas y horno, barra con fregadero industrial doble, carro de bandejas con ruedas y refrigerador de exhibición. La construcción por piezas modulares es una buena práctica para producción real (permite reutilizar y combinar módulos). Siendo crítico: todo el set está en etapa de modelado/bloqueo, sin texturizar ni con un render de iluminación final, así que hoy funciona más como evidencia de proceso que como pieza de portafolio \"terminada\". El siguiente paso natural sería un pase de materiales PBR y un render de presentación.",
    images: [
      "assets/projects/cocina-industrial/scene-1.jpg",
      "assets/projects/cocina-industrial/pieza-1.png",
      "assets/projects/cocina-industrial/pieza-2.png",
      "assets/projects/cocina-industrial/pieza-3.png",
    ],
  },
  {
    id: "habitacion-estilizada",
    title: "Set de Mobiliario — Habitación Estilizada",
    role: "Modelado de Props & Composición de Escena",
    timeframe: "Proyecto individual · Modelado, sin texturizar",
    engines: ["Maya"],
    summary:
      "Conjunto de mobiliario de recámara/estudio (librero, sillón, cómoda, cajas, tocador) compuesto en una sola escena.",
    description:
      "Serie de piezas de mobiliario individuales (librero, sillón de respaldo alto, cómoda con puertas, cajas de cartón, tocador con espejo) que se fueron modelando por separado y luego se compusieron en una sola escena de recámara/estudio para revisar escala y composición en conjunto. El manejo de proporciones entre piezas es consistente, lo que ayuda a que la escena se lea como un espacio habitado y no como objetos sueltos. Al igual que el set de cocina, esta escena está en etapa de bloqueo/modelado: el siguiente paso sería texturizar y renderizar una imagen final.",
    images: [
      "assets/projects/habitacion-estilizada/scene-1.png",
      "assets/projects/habitacion-estilizada/pieza-1.png",
      "assets/projects/habitacion-estilizada/pieza-2.png",
      "assets/projects/habitacion-estilizada/pieza-3.png",
    ],
  },
];
