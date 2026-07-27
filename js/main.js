/**
 * main.js
 * -----------------------------------------------------------------------
 * Lógica de interactividad del portafolio. Módulo dividido en pequeñas
 * funciones independientes, cada una inicializada al final del archivo.
 * No usa frameworks: solo JavaScript vanilla + los datos de js/data.js.
 * -----------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  initFooterYear();
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initHeroCarousel();
  initGallery();
  initProjects();
  initLightbox();
  initContactForm();
  initScrollReveal();
});

/* =========================================================================
 * Footer: año actual
 * ===================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* =========================================================================
 * Header: fondo/blur al hacer scroll + cierre de menú móvil al navegar
 * ===================================================================== */
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* =========================================================================
 * Menú móvil (hamburguesa)
 * ===================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("icon-open");
  const iconClose = document.getElementById("icon-close");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    iconOpen?.classList.toggle("hidden", open);
    iconClose?.classList.toggle("hidden", !open);
  };

  toggle.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    setOpen(!isOpen);
  });

  // Cierra el menú al hacer clic en cualquier enlace de navegación.
  menu.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

/* =========================================================================
 * Resalta el enlace de navegación activo según la sección visible
 * ===================================================================== */
function initScrollSpy() {
  const sections = ["inicio", "galeria", "proyectos", "sobre-mi", "contacto"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll('[data-nav][href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* =========================================================================
 * Carrusel del Hero: mejores trabajos (HERO_HIGHLIGHTS en data.js).
 * Autoplay + flechas + dots + clic para abrir el lightbox con el
 * proyecto completo.
 * ===================================================================== */
function initHeroCarousel() {
  const root = document.getElementById("hero-carousel");
  const track = document.getElementById("hero-carousel-track");
  const dotsEl = document.getElementById("hero-dots");
  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");
  if (!root || !track || typeof HERO_HIGHLIGHTS === "undefined" || !HERO_HIGHLIGHTS.length) return;

  track.innerHTML = HERO_HIGHLIGHTS.map(
    (slide, i) => `
      <div class="hero-slide" data-hero-slide="${i}" data-project-id="${slide.projectId}" role="button" tabindex="0" aria-label="Ver proyecto completo: ${escapeHtml(slide.title)}">
        <img src="${slide.image}" alt="${escapeHtml(slide.title)}" loading="${i === 0 ? "eager" : "lazy"}" />
        <div class="hero-slide__index">${i + 1} / ${HERO_HIGHLIGHTS.length}</div>
        <div class="hero-slide__caption">
          <p class="text-sm font-semibold text-white">${escapeHtml(slide.title)}</p>
          <p class="text-xs text-slate-400">${escapeHtml(slide.subtitle)}</p>
        </div>
      </div>
    `
  ).join("");

  const dotsNeeded = HERO_HIGHLIGHTS.length > 1;
  dotsEl.innerHTML = dotsNeeded
    ? HERO_HIGHLIGHTS.map((_, i) => `<span class="carousel-dot${i === 0 ? " is-active" : ""}" data-hero-dot="${i}"></span>`).join("")
    : "";
  prevBtn?.classList.toggle("hidden", !dotsNeeded);
  nextBtn?.classList.toggle("hidden", !dotsNeeded);

  const slideCount = HERO_HIGHLIGHTS.length;
  let currentIndex = 0;
  let autoplayTimer = null;

  const goTo = (index) => {
    currentIndex = (index + slideCount) % slideCount;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dotsEl.querySelectorAll("[data-hero-dot]").forEach((dot, i) => dot.classList.toggle("is-active", i === currentIndex));
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (slideCount <= 1) return;
    autoplayTimer = setInterval(() => goTo(currentIndex + 1), 5000);
  };
  const stopAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  };

  prevBtn?.addEventListener("click", () => {
    goTo(currentIndex - 1);
    startAutoplay();
  });
  nextBtn?.addEventListener("click", () => {
    goTo(currentIndex + 1);
    startAutoplay();
  });
  dotsEl.querySelectorAll("[data-hero-dot]").forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.heroDot));
      startAutoplay();
    });
  });

  track.querySelectorAll("[data-hero-slide]").forEach((slideEl) => {
    const openProject = () => openLightboxForProject(slideEl.dataset.projectId);
    slideEl.addEventListener("click", openProject);
    slideEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProject();
      }
    });
  });

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
  root.addEventListener("focusin", stopAutoplay);
  root.addEventListener("focusout", startAutoplay);

  startAutoplay();
}

/* =========================================================================
 * Galería: render de filtros + cards a partir de GALLERY_ITEMS (data.js)
 * ===================================================================== */
let activeGalleryFilter = "todos";

function initGallery() {
  const filtersEl = document.getElementById("gallery-filters");
  const gridEl = document.getElementById("gallery-grid");
  if (!filtersEl || !gridEl || typeof GALLERY_ITEMS === "undefined") return;

  renderGalleryFilters(filtersEl);
  renderGalleryGrid(gridEl, activeGalleryFilter);
}

function renderGalleryFilters(container) {
  container.innerHTML = GALLERY_CATEGORIES.map(
    (cat) => `
      <button
        type="button"
        class="filter-btn${cat.id === activeGalleryFilter ? " is-active" : ""}"
        data-filter="${cat.id}"
      >
        ${cat.label}
      </button>
    `
  ).join("");

  container.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeGalleryFilter = btn.dataset.filter;
      container.querySelectorAll(".filter-btn").forEach((b) => b.classList.toggle("is-active", b === btn));
      renderGalleryGrid(document.getElementById("gallery-grid"), activeGalleryFilter);
    });
  });
}

function categoryLabel(categoryId) {
  const category = GALLERY_CATEGORIES.find((cat) => cat.id === categoryId);
  return category ? category.label : categoryId;
}

function renderGalleryGrid(container, filter) {
  const items =
    filter === "todos" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === filter);

  const emptyState = document.getElementById("gallery-empty");
  emptyState?.classList.toggle("hidden", items.length > 0);

  container.innerHTML = items
    .map(
      (item) => `
        <article class="gallery-card reveal is-visible" data-id="${item.id}" tabindex="0" role="button" aria-label="Ver detalle de ${escapeHtml(item.title)}">
          <div class="gallery-card__image-wrap">
            <img src="${item.images[0]}" alt="${escapeHtml(item.title)}" loading="lazy" />
            ${item.images.length > 1 ? `<span class="image-count-badge">${item.images.length} fotos</span>` : ""}
            <div class="gallery-card__expand" aria-hidden="true">
              <span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0-4h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                Ver completo
              </span>
            </div>
            <div class="gallery-card__overlay">
              <div class="flex flex-wrap gap-1.5">
                ${item.tags.map((tag) => `<span class="tag-chip">${escapeHtml(tag)}</span>`).join("")}
              </div>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-display text-base font-semibold text-white">${escapeHtml(item.title)}</h3>
            <p class="mt-1 text-xs text-slate-500">${escapeHtml(categoryLabel(item.category))}</p>
          </div>
        </article>
      `
    )
    .join("");

  // Abrir el lightbox al hacer clic o al presionar Enter/Espacio (accesibilidad con teclado).
  container.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => openLightboxById(card.dataset.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightboxById(card.dataset.id);
      }
    });
  });
}

/* =========================================================================
 * Lightbox / modal de detalle de la galería (con carrusel si hay
 * varias imágenes para la misma pieza).
 * ===================================================================== */
let lightboxImages = [];
let lightboxIndex = 0;

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightbox-close");
  const backdrop = document.getElementById("lightbox-backdrop");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  if (!lightbox) return;

  closeBtn?.addEventListener("click", closeLightbox);
  backdrop?.addEventListener("click", closeLightbox);
  prevBtn?.addEventListener("click", () => showLightboxImage(lightboxIndex - 1));
  nextBtn?.addEventListener("click", () => showLightboxImage(lightboxIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showLightboxImage(lightboxIndex - 1);
    if (e.key === "ArrowRight") showLightboxImage(lightboxIndex + 1);
  });
}

function openLightboxById(id) {
  const item = GALLERY_ITEMS.find((g) => g.id === id);
  if (!item) return;
  openLightboxContent({
    images: item.images,
    title: item.title,
    description: item.description,
    tags: item.tags,
  });
}

function openLightboxForProject(projectId, startIndex = 0) {
  const project = typeof PROJECTS !== "undefined" && PROJECTS.find((p) => p.id === projectId);
  if (!project) return;
  openLightboxContent({
    images: project.images,
    title: project.title,
    description: project.summary,
    tags: project.engines,
    startIndex,
  });
}

function openLightboxContent({ images, title, description, tags, startIndex = 0 }) {
  if (!images || !images.length) return;

  lightboxImages = images;
  lightboxIndex = 0;

  document.getElementById("lightbox-title").textContent = title;
  document.getElementById("lightbox-description").textContent = description || "";
  document.getElementById("lightbox-tags").innerHTML = (tags || [])
    .map((tag) => `<span class="tag-chip">${escapeHtml(tag)}</span>`)
    .join("");

  const thumbsEl = document.getElementById("lightbox-thumbs");
  const hasMultiple = lightboxImages.length > 1;
  thumbsEl.classList.toggle("hidden", !hasMultiple);
  thumbsEl.classList.toggle("flex", hasMultiple);
  if (hasMultiple) {
    thumbsEl.innerHTML = lightboxImages
      .map(
        (src, i) => `
          <button type="button" class="lightbox-thumb" data-thumb-index="${i}">
            <img src="${src}" alt="Vista ${i + 1} de ${escapeHtml(title)}" />
          </button>
        `
      )
      .join("");
    thumbsEl.querySelectorAll("[data-thumb-index]").forEach((thumb) => {
      thumb.addEventListener("click", () => showLightboxImage(Number(thumb.dataset.thumbIndex)));
    });
  } else {
    thumbsEl.innerHTML = "";
  }

  document.getElementById("lightbox-prev").classList.toggle("hidden", !hasMultiple);
  document.getElementById("lightbox-next").classList.toggle("hidden", !hasMultiple);
  document.getElementById("lightbox-counter").classList.toggle("hidden", !hasMultiple);

  showLightboxImage(startIndex);

  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("hidden");
  lightbox.classList.add("is-open");
  document.body.classList.add("overflow-hidden");
}

function showLightboxImage(index) {
  if (!lightboxImages.length) return;
  lightboxIndex = (index + lightboxImages.length) % lightboxImages.length;

  const imageEl = document.getElementById("lightbox-image");
  imageEl.src = lightboxImages[lightboxIndex];

  document.getElementById("lightbox-counter").textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;

  document.querySelectorAll("#lightbox-thumbs .lightbox-thumb").forEach((thumb, i) => {
    thumb.classList.toggle("is-active", i === lightboxIndex);
  });
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("hidden");
  lightbox.classList.remove("is-open");
  document.body.classList.remove("overflow-hidden");
}

/* =========================================================================
 * Proyectos / casos de estudio (con carrusel propio por proyecto)
 * ===================================================================== */
function initProjects() {
  const listEl = document.getElementById("projects-list");
  if (!listEl || typeof PROJECTS === "undefined") return;

  listEl.innerHTML = PROJECTS.map((project, index) => `
    <article class="project-card reveal grid md:grid-cols-[1.3fr_1fr]" data-project-index="${index}" data-project-id="${project.id}">
      <!-- Carrusel -->
      <div class="relative aspect-[16/10] md:aspect-auto md:min-h-[460px] bg-base-800 overflow-hidden cursor-pointer" data-carousel-open-hint>
        <div class="carousel-track" data-carousel-track>
          ${project.images
            .map(
              (src, i) => `
                <div class="carousel-slide" data-slide-index="${i}" role="button" tabindex="0" aria-label="Ver imagen completa de ${escapeHtml(project.title)}">
                  <img src="${src}" alt="Captura del proyecto ${escapeHtml(project.title)}" class="w-full h-full object-cover" loading="lazy" />
                </div>
              `
            )
            .join("")}
        </div>
        <div class="gallery-card__expand" aria-hidden="true">
          <span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0-4h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            Ver completo
          </span>
        </div>

        ${
          project.images.length > 1
            ? `
              <button type="button" class="carousel-arrow absolute left-3 top-1/2 -translate-y-1/2" data-carousel-prev aria-label="Imagen anterior">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button type="button" class="carousel-arrow absolute right-3 top-1/2 -translate-y-1/2" data-carousel-next aria-label="Siguiente imagen">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              <div class="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5" data-carousel-dots>
                ${project.images.map((_, i) => `<span class="carousel-dot${i === 0 ? " is-active" : ""}" data-dot-index="${i}"></span>`).join("")}
              </div>
            `
            : ""
        }
      </div>

      <!-- Contenido -->
      <div class="p-6 sm:p-8 flex flex-col">
        <p class="text-xs uppercase tracking-wider text-accent-400 font-semibold">${escapeHtml(project.timeframe)}</p>
        <h3 class="mt-2 font-display text-2xl font-semibold text-white">${escapeHtml(project.title)}</h3>
        <p class="mt-1 text-sm font-medium text-slate-400">${escapeHtml(project.role)}</p>

        <p class="mt-4 text-slate-400 leading-relaxed text-sm">${escapeHtml(project.summary)}</p>
        <p class="mt-3 text-slate-500 leading-relaxed text-sm">${escapeHtml(project.description)}</p>

        <div class="mt-5 flex flex-wrap gap-2">
          ${project.engines.map((engine) => `<span class="tag-chip">${escapeHtml(engine)}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");

  listEl.querySelectorAll("[data-project-index]").forEach((card) => {
    initCarousel(card);

    const projectId = card.dataset.projectId;
    card.querySelectorAll("[data-slide-index]").forEach((slideEl) => {
      const openSlide = () => openLightboxForProject(projectId, Number(slideEl.dataset.slideIndex));
      slideEl.addEventListener("click", openSlide);
      slideEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openSlide();
        }
      });
    });
  });
}

function initCarousel(cardEl) {
  const track = cardEl.querySelector("[data-carousel-track]");
  const prevBtn = cardEl.querySelector("[data-carousel-prev]");
  const nextBtn = cardEl.querySelector("[data-carousel-next]");
  const dots = cardEl.querySelectorAll("[data-dot-index]");
  if (!track) return;

  const slideCount = track.children.length;
  let currentIndex = 0;

  const goTo = (index) => {
    currentIndex = (index + slideCount) % slideCount;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === currentIndex));
  };

  prevBtn?.addEventListener("click", () => goTo(currentIndex - 1));
  nextBtn?.addEventListener("click", () => goTo(currentIndex + 1));
  dots.forEach((dot) => {
    dot.addEventListener("click", () => goTo(Number(dot.dataset.dotIndex)));
  });
}

/* =========================================================================
 * Formulario de contacto (validación + feedback simulado en front-end)
 * ===================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearFormErrors(form);

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    let hasError = false;

    if (!name) {
      setFieldError(form, "name", "Ingresa tu nombre.");
      hasError = true;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError(form, "email", "Ingresa un email válido.");
      hasError = true;
    }
    if (!message) {
      setFieldError(form, "message", "Escribe un mensaje.");
      hasError = true;
    }

    if (hasError) {
      showFormFeedback(feedback, "Revisa los campos marcados en rojo.", "error");
      return;
    }

    // Conectar a un servicio como Formspree/Getform o a un backend propio
    // reemplazando este bloque por la llamada fetch() correspondiente.
    showFormFeedback(feedback, `¡Gracias, ${name}! Tu mensaje fue recibido.`, "success");
    form.reset();
  });
}

function setFieldError(form, fieldName, message) {
  const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
  const input = form.querySelector(`[name="${fieldName}"]`);
  if (errorEl) errorEl.textContent = message;
  input?.classList.add("!border-red-500/60");
}

function clearFormErrors(form) {
  form.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
  form.querySelectorAll("input, textarea").forEach((el) => el.classList.remove("!border-red-500/60"));
}

function showFormFeedback(feedback, message, type) {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.remove("hidden", "border-red-500/30", "bg-red-500/10", "text-red-300", "border-emerald-500/30", "bg-emerald-500/10", "text-emerald-300");
  if (type === "error") {
    feedback.classList.add("border-red-500/30", "bg-red-500/10", "text-red-300");
  } else {
    feedback.classList.add("border-emerald-500/30", "bg-emerald-500/10", "text-emerald-300");
  }
}

/* =========================================================================
 * Animación de aparición al hacer scroll (Intersection Observer)
 * ===================================================================== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* =========================================================================
 * Utilidad: escapar HTML al insertar texto dinámico (previene inyección
 * accidental de markup si algún día el contenido viene de un formulario).
 * ===================================================================== */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}
