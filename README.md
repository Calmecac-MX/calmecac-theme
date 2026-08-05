# slidev-theme-calmecac

[![NPM Version](https://img.shields.io/npm/v/slidev-theme-calmecac?color=00B09B&label=npm)](https://www.npmjs.com/package/slidev-theme-calmecac)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-00B09B.svg)](https://opensource.org/licenses/Apache-2.0)

Tema oficial de **CALMÉCAC** para [Slidev](https://github.com/slidevjs/slidev), diseñado para crear presentaciones monumentales, estructuradas y de alta calidad visual.

---

## 🎨 Características

- **Paleta Oficial de Marca:** Monolithic Black (`#09090B`), Turquesa (`#00B09B`), Superficie (`#111216`), Card (`#14161D`), Borde (`#232733`) y Paleta Secundaria de acentos (Gold, Coral, Magenta, Mint, Violet).
- **Tipografía Institucional:** Integración nativa de Google Fonts (Roboto & Roboto Condensed).
- **10 Layouts Personalizados:** `cover`, `intro`, `default`, `two-cols`, `grid`, `section`, `statement`, `quote`, `fact`, `timeline`, `end`.
- **Carpeta de Assets Integrada (`assets/`):** Recursero de marca listo para producción con `backgrounds/`, `grecas/` y `logo/`.
- **Componentes Exclusivos:**
  - `<CalmecacCard>` (Tarjetas resplandecientes con acentos visuales)
  - `<CalmecacBadge>` (Badges estilizados en múltiples variantes)
  - `<CalmecacTimeline>` & `layout: timeline` (Cronograma e hitos en vista horizontal o vertical)
  - `<CalmecacGreca>` (Grecas mexicas vectoriales `01`, `02`, `03`)
  - `<CalmecacGrecasShowcase>` (Inspector de patrones vectoriales)
  - `<CalmecacLogo>` & `<CalmecacSymbol>` (Isotipo y logotipo SVG)
  - `<CalmecacLogoGrid>` & `<CalmecacLogoVariations>` (Guía del logotipo)
  - `<CalmecacFontViewer>` (Visor interactivo de tipografías)
- **Header & Footer Dinámicos:** Sensibles al frontmatter por diapositiva (visibilidad, títulos, taglines y badges).

---

## 📁 Estructura de Assets (`assets/`)

```text
calmecac-theme/assets/
├── backgrounds/     # Fondos vectoriales (Fondo-Rojo.svg)
├── grecas/          # Grecas Mexicas SVG (GRECA_01.svg, GRECA_02.svg, GRECA_03.svg)
└── logo/            # Isotipos, vectores y logotipos oficial (ISOTIPO, NOMBRE, Vector)
```

---

## 📦 Instalación y Uso

### 1. En un proyecto de Slidev existente
Agrega la siguiente propiedad al frontmatter inicial de tu archivo `slides.md`:

```yaml
---
theme: calmecac
headerTitle: MI PROYECTO
tagline: PRESENTACIÓN MONUMENTAL
badge: SECCIÓN 01
---
```

Si usas el paquete en modo local o de desarrollo en tu repositorio:

```yaml
---
theme: ./calmecac-theme
---
```

---

## 📐 Layouts Disponibles

| Layout | Descripción | Frontmatter Soportado |
| :--- | :--- | :--- |
| `cover` | Portada principal monumental | `subtitle`, `badge`, `author`, `date`, `description` |
| `intro` | Presentación personal / perfil / visión | `name`, `role`, `image`, `badge`, `headerTitle` |
| `default` | Layout estándar de contenido | `title`, `badge`, `headerTitle`, `tagline`, `hideHeader`, `hideFooter` |
| `two-cols` | Dos columnas distribuidas con `::right::` | `title`, `badge`, `headerTitle`, `tagline` |
| `grid` | Matriz de tarjetas o cuadrícula | `title`, `badge`, `headerTitle`, `tagline` |
| `section` | Divisor de módulo o capítulo | `title`, `tagline`, `badge` |
| `statement` | Manifiesto, cita o frase de alto impacto | `label`, `author`, `badge` |
| `quote` | Cita destacada con tarjeta de neón, avatar, autor y cargo | `quote`, `author`/`by`, `role`/`title`, `avatar`/`image`, `label`, `badge` |
| `fact` | Destacar una métrica o dato numérico | `number`, `unit`, `label`, `badge` |
| `timeline` | Cronograma e hitos interactivos (horizontal o vertical) | `items`/`steps`/`hitos`, `direction` ('horizontal'/'vertical'), `badge` |
| `end` | Diapositiva de cierre y contacto | `title`, `headerTitle`, `tagline` |

---

## 🧩 Componentes Destacados

### `<CalmecacCard>`
```html
<CalmecacCard title="EFICIENCIA OPERATIVA" glow accentTop icon="🏛️">
  Construimos cimientos sólidos para empresas de alto rendimiento.
</CalmecacCard>
```

### `<CalmecacGreca>`
```html
<!-- Renderiza patrones vectorialesmexicas: 01 (Escalonada), 02 (Meandro), 03 (Piramidal) -->
<CalmecacGreca pattern="01" height="40" color="#00B09B" />
```

### `<CalmecacBadge>`
```html
<CalmecacBadge variant="solid">DESTACADO</CalmecacBadge>
<CalmecacBadge variant="outline">SECUNDARIO</CalmecacBadge>
```

---

## 💻 Desarrollo Local del Tema

```bash
# 1. Clonar o acceder al tema
cd calmecac-theme

# 2. Iniciar vista previa interactiva (example.md)
pnpm dev

# 3. Exportar a PDF
pnpm export
```

---

## 📄 Licencia

Apache-2.0 © 2026 Rífatela / CALMÉCAC
