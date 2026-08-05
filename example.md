---
theme: ./
title: CALMÉCAC - Slidev Theme Showcase
headerTitle: CALMÉCAC
tagline: SLIDEV THEME SHOWCASE
subtitle: THEME CAPABILITIES & COMPONENT SHOWCASE
author: CALMÉCAC DESIGN SYSTEM
date: 2026
badge: THEME SHOWCASE
transition: fade-out
layout: cover
colorSchema: all
---

# CALMÉCAC THEME

OFICIAL SLIDEV THEME SHOWCASE & GUIDELINES

---
layout: intro
title: SISTEMA CALMÉCAC
name: SISTEMA CALMÉCAC
role: SLIDEV THEME FOR DEVELOPERS & DESIGNERS
image: https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80
badge: INTRODUCCIÓN
---

**CALMÉCAC Theme** es un tema oficial para Slidev diseñado para crear presentaciones monumentales, estructuradas y de alto rendimiento.

- 🎨 **Paleta Oficial:** Monolithic Black (`#09090B`), Turquesa (`#00B09B`), Superficie (`#111216`) y Acentos Secundarios.
- 🌓 **Soporte Dual Light / Dark:** Alterna suavemente entre **Modo Oscuro** (Monolithic Black) y **Modo Claro** (Clean Light) manteniendo los acentos turquesa.
- 📐 **Tipografía Refinada:** Roboto Condensed para títulos imponentes y Roboto para cuerpo de texto.
- 🏛️ **Assets Mexicas Vectoriales:** Componente `<CalmecacGreca />` interactivo con variantes `01`, `02` y `03`.

<div class="mt-4 flex items-center gap-3">
  <CalmecacThemeToggle />
  <span class="text-xs text-calmecac-gray font-condensed uppercase tracking-wider">Prueba cambiar el tema de la presentación</span>
</div>

---
layout: default
title: SLIDE ESTÁNDAR Y TARJETAS CON GLOW
badge: COMPONENTES
---

## TARJETAS Y CONTENEDORES RESPLANDECIENTES

Utiliza `<CalmecacCard>` para presentar información en contenedores oscuros con bordes de neón y destellos superiores.

<div class="grid grid-cols-2 gap-4 mt-6">
  <CalmecacCard title="ESTRUCTURA DE NEÓN" glow accentTop icon="🏛️">
    Soporta Markdown, iconos y animaciones al pasar el cursor.
  </CalmecacCard>
  <CalmecacCard title="BADGES DE ACENTO" icon="🏷️">
    <div class="flex flex-wrap gap-2 mt-2">
      <CalmecacBadge variant="solid">Solid</CalmecacBadge>
      <CalmecacBadge variant="outline">Outline</CalmecacBadge>
      <CalmecacBadge variant="turquoise">Turquoise</CalmecacBadge>
      <CalmecacBadge variant="gold">Gold</CalmecacBadge>
    </div>
  </CalmecacCard>
</div>

---
layout: two-cols
title: DISTRIBUCIÓN EN DOS COLUMNAS
badge: LAYOUT TWO-COLS
---

# COLUMNA IZQUIERDA

- **Control de Header/Footer:** Oculta encabezados en diapositivas específicas usando `hideHeader: true` o `hideFooter: true`.
- **Badges Personalizables:** Cambia el badge del header con `badge: "MI SECCIÓN"`.
- **Tagline Dinámico:** Define el subtítulo del header con `tagline: "MI SUBTÍTULO"`.

::right::

# COLUMNA DERECHA

<CalmecacCard title="EFICIENCIA OPERATIVA" glow accentTop class="mt-2">
  Estructura visual optimizada para lecturas rápidas, conferencias y reportes ejecutivos.
</CalmecacCard>

---
layout: grid
title: ARQUITECTURA VISUAL EN CUADRÍCULA
badge: LAYOUT GRID
---

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <CalmecacCard title="01. ARQUITECTURA" icon="📐" accentTop glow>
    Procesos estructurados y cimientos digitales indestructibles.
  </CalmecacCard>

  <CalmecacCard title="02. PRECISIÓN" icon="⚙️" accentTop>
    Control de datos exactos, métricas y automatización avanzada.
  </CalmecacCard>

  <CalmecacCard title="03. ELEGANCIA" icon="💎" accentTop>
    Diseño visual sofisticado en modo oscuro con acentos turquesa.
  </CalmecacCard>

  <CalmecacCard title="04. ESCALABILIDAD" icon="🚀" accentTop glow>
    Sistemas preparados para empresas de alto rendimiento en LATAM.
  </CalmecacCard>
</div>

---
layout: section
title: MÓDULO II: ELEMENTOS VECTORIALES E IDENTIDAD
badge: SECCIÓN
tagline: RECURSOS INTERACTIVOS DE MARCA
---

# 02. RECURSOS Y GRECAS

---
layout: statement
title: MANIFIESTO DE MARCA
label: MANIFIESTO DE MARCA
author: CALMÉCAC BRAND MANUAL
badge: MANIFIESTO
---

“Construimos estructuras operativas monumentales, sólidas e indestructibles para los negocios de alto rendimiento.”

---
layout: quote
title: CITA DE IMPACTO
author: STEVIE JOBS
role: CEO & FUNDADOR
label: LIDERAZGO
badge: CITA
avatar: https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80
---

“La innovación es lo que distingue a un líder de un seguidor. El único modo de hacer un gran trabajo es amar lo que haces.”

---
layout: fact
title: DATOS Y MÉTRICAS CLAVE
number: "10"
unit: LAYOUTS
label: LAYOUTS PERSONALIZADOS LISTOS PARA USAR EN SLIDEV (COVER, INTRO, TWO-COLS, GRID, SECTION, STATEMENT, QUOTE, FACT, TIMELINE, END)
badge: DATOS CLAVE
---

---
layout: timeline
title: HOJA DE RUTA Y HITOS DE PROYECTO
badge: ROADMAP DE EJECUCIÓN
direction: horizontal
items:
  - date: "Q1 2026"
    title: "FASE 01: INVESTIGACIÓN"
    description: "Análisis del mercado, arquitectura visual e identidad monumentales."
    status: "completed"
    icon: "🔍"
  - date: "Q2 2026"
    title: "FASE 02: DESARROLLO"
    description: "Creación del tema Slidev, componentes vectoriales y layout de timeline."
    status: "active"
    icon: "⚡"
  - date: "Q3 2026"
    title: "FASE 03: INTEGRACIÓN"
    description: "Implementación en presentaciones corporativas y pruebas de rendimiento."
    status: "pending"
    icon: "🚀"
  - date: "Q4 2026"
    title: "FASE 04: ESCALAMIENTO"
    description: "Distribución de plantillas y ecosistema oficial Calmécac."
    status: "pending"
    icon: "🌐"
---

# CRONOGRAMA DE HITOS ESTRATÉGICOS
Visualización clara de fases, estados de avance y entregables clave.


---
layout: default
title: MUESTRARIO DE GRECAS MEXICAS
badge: BRAND PATTERNS
---

<CalmecacGrecasShowcase />

---
layout: default
title: GUÍA DE TAMAÑO MÍNIMO Y RETÍCULA DEL LOGOTIPO
badge: LOGO SYSTEM
---

<CalmecacLogoGrid />

---
layout: end
title: ¡GRACIAS!
headerTitle: CALMÉCAC
tagline: SLIDEV THEME
---

# CALMÉCAC THEME

**Slidev Theme para Presentaciones Monumentales**

[www.calmecac.lat](https://calmecac.lat) · info@calmecac.lat
