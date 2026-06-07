# AGENTS.md — InterioRossi

> This file is read by coding agents (Claude Code, Cursor, Gemini CLI).
> It defines how to build, modify, and extend this project.
> Read this before writing any code.

---

## What this project is

InterioRossi — static corporate website for a premium custom furniture studio in Moscow.
Pure HTML/CSS/JS. No framework, no build tool, no package manager in production.
Deployed via git push to GitHub Pages.

---

## Tech Stack

- **HTML:** Semantic, accessible, no templating engine. Each page is a standalone `.html` file.
- **CSS:** Vanilla, organized in layers (see below). No Tailwind, no SCSS, no PostCSS.
- **JS:** Vanilla ES6+, no bundler. Two main files: `main.js` and `quiz.js`.
- **Fonts:** Google Fonts CDN (EB Garamond + Manrope).
- **Data:** JSON files in `/data/` for products and materials (read by JS, no backend).
- **Build:** None. Edit files, open in Live Server, deploy.

---

## File Structure

```
site/
├── Index.html              ← Homepage (1354 lines, all sections inline)
├── about.html
├── catalog.html
├── contacts.html
├── materials.html
├── partners.html
├── projects.html
├── css/
│   ├── style.css           ← Global: reset, layout, all components (2497 lines)
│   ├── pages.css           ← Inner page styles only (785 lines)
│   ├── quiz.css            ← Quiz modal styles (839 lines)
│   ├── theme-cloud-dancer.css  ← ACTIVE THEME — edit this for visual changes
│   ├── theme-premium.css   ← Archived light theme
│   └── theme-teal.css      ← Archived dark teal theme
├── js/
│   ├── main.js             ← Theme init, header, carousels, forms, modal (634 lines)
│   └── quiz.js             ← Multi-step quiz, Telegram submission (1149 lines)
├── data/
│   ├── products.json
│   └── materials.json
├── img/
│   └── brands/             ← SVG brand logos
├── assets/
│   └── images/             ← Project photography
├── _docs/                  ← Internal documentation (not served as pages)
│   ├── STRATEGY.md
│   └── DESIGN_TOKENS_MAP.md
├── DESIGN.md               ← Visual spec (read by design agents)
├── AGENTS.md               ← This file
├── README.md               ← Human-readable project overview
├── robots.txt
├── sitemap.xml
└── feed.xml
```

---

## CSS Architecture

CSS is layered. Load order in `<head>` matters:

```html
<link rel="stylesheet" href="css/style.css">        <!-- 1. Global base -->
<link rel="stylesheet" href="css/pages.css">         <!-- 2. Page-specific (inner pages only) -->
<link rel="stylesheet" href="css/quiz.css">          <!-- 3. Quiz modal -->
<link rel="stylesheet" href="css/theme-cloud-dancer.css"> <!-- 4. ACTIVE THEME — last -->
```

**The theme file always loads last** and overrides via `[data-theme="cloud-dancer"]` selector.

### CSS Variable System

All colors and most design tokens use CSS custom properties defined in `:root` in `style.css`, overridden by the active theme:

```css
/* Core variables in style.css :root */
--bg, --bg-cream, --bg-dark, --bg-dark2
--text, --text-2, --text-3
--accent, --accent-h, --gold, --gold-light
--border, --border-d
--shadow-sm, --shadow, --shadow-lg
--r, --r-lg
--cta, --cta-h
--font-h, --font-b
--transition
```

**Rule: never add hardcoded hex colors to style.css.** Use variables. All theme-specific values belong in `theme-cloud-dancer.css`.

---

## Theme Activation

Active theme: `cloud-dancer`. Activated by:

1. `<html lang="ru" data-theme="cloud-dancer">` on the html tag
2. `theme-cloud-dancer.css` loaded last in `<head>`
3. `initTheme()` in `main.js` defaults to `"cloud-dancer"` when localStorage is empty

To change theme: update `data-theme` attribute and swap the theme CSS file reference.

---

## How Pages Are Built

All pages follow this structure:
```html
<!DOCTYPE html>
<html lang="ru" data-theme="cloud-dancer">
<head>
  <!-- meta, OG, Schema.org, fonts, CSS links -->
</head>
<body>
  <header class="site-header" id="header">...</header>
  <main>
    <!-- page sections -->
  </main>
  <footer class="footer">...</footer>
  <!-- modals, FAB -->
  <script src="js/main.js"></script>
  <!-- page-specific inline scripts if needed -->
</body>
```

**Header and footer are duplicated across all pages** (no server-side includes). When modifying header/footer, update all 7 pages.

---

## Key JS Behaviors

`main.js` runs these on DOMContentLoaded:
- `initTheme()` — reads `localStorage.ir_theme`, sets `data-theme` on `<html>`
- Header scroll shadow on `.scrolled`
- Catalog mega-menu open/close
- Mobile burger menu
- Hero carousel (autoplay, dots, arrows)
- Cases carousel
- Reveal animations (IntersectionObserver)
- Form validation + phone mask + fetch POST to `/api`
- Success modal open/close

`quiz.js` runs independently:
- Multi-step quiz wizard
- UTM capture
- sessionStorage persistence
- Submission → Telegram Bot API (token in `QUIZ_TG_TOKEN`)

---

## Adding a New Section to a Page

1. Write semantic HTML in the page file at the right location.
2. Add styles to `style.css` under a clearly commented section.
3. If the section has theme-specific colors, add overrides to `theme-cloud-dancer.css` using `[data-theme="cloud-dancer"] .your-class`.
4. Never use hardcoded hex — use CSS variables.
5. Test at 1440px, 1024px, 768px, 375px.

---

## Adding a New Page

1. Copy the closest existing page as a starting point.
2. Update `<title>`, `<meta description>`, OG tags, Schema.org JSON-LD.
3. Set `aria-current="page"` on the correct nav link.
4. Add to `sitemap.xml` and `robots.txt` if public.
5. Ensure `pages.css` is linked (inner pages need it; Index.html does not).

---

## Rules — Read Before Every Task

- **Do NOT edit `style.css` for theme changes.** Theme overrides go in `theme-cloud-dancer.css` only.
- **Do NOT add Tailwind or any CSS framework.** Pure vanilla only.
- **Do NOT restructure `main.js` logic** without understanding all its modules — they share state.
- **Do NOT change HTML structure of header/footer** without updating all 7 pages.
- **Do NOT use `!important`** except inside the theme file for specificity overrides.
- **Always test mobile** — the site is Mobile First.
- **Always use semantic HTML** — `<header>`, `<main>`, `<section>`, `<nav>`, `<article>`, `<footer>`, `aria-*` attributes.

---

## Design Reference

See `DESIGN.md` for the full visual spec: color tokens, typography scale, component patterns, do/don't rules. The `_docs/DESIGN_TOKENS_MAP.md` maps Stitch M3 tokens to site CSS variables.

---

## Deployment

```
git add .
git commit -m "describe change"
git push origin main
```

GitHub Pages serves the `main` branch root. No build step required.

---

## Extracting / Updating DESIGN.md

When the visual design changes and DESIGN.md needs to be updated,
paste this prompt into any coding agent (Claude Code, Cursor, Gemini CLI):

---

**DESIGN.md Extraction Prompt:**

```
Context: This is the InterioRossi project — a premium custom furniture
studio website. Static HTML/CSS/JS, no framework.

Key files for visual identity:
- css/style.css (global base, CSS custom properties in :root)
- css/theme-cloud-dancer.css (active theme — source of truth for all tokens)
- css/pages.css (inner page styles)
- _docs/DESIGN_TOKENS_MAP.md (M3 token → CSS variable mapping)
- .stitch/DESIGN.md or DESIGN.md (existing design system, update if present)

Instructions: Read the codebase before writing anything.
The repo is the source of truth — nothing invented, nothing placeholder.

1. Read css/theme-cloud-dancer.css completely. Extract every CSS variable value.
2. Read css/style.css :root block. Note any variables not overridden by theme.
3. Read _docs/DESIGN_TOKENS_MAP.md for the M3 token names.
4. Read Index.html to understand component structure and content.

From what you find, write a DESIGN.md with:
- YAML front matter containing all design tokens (colors, typography,
  rounded, spacing, components) using the official DESIGN.md spec format
  (version: alpha, token references via {path.to.token})
- Markdown body with sections in this order:
  Overview, Colors, Typography, Layout, Elevation & Depth,
  Shapes, Components, Do's and Don'ts

Pull product names, taglines, and stats from the actual HTML content.
Pull all color values, font stacks, and spacing from the CSS files.
Nothing invented — if it's not in the repo, it's not in the DESIGN.md.

Save the output to .stitch/DESIGN.md and also to DESIGN.md at project root.
```

---

## Uploading DESIGN.md to Stitch

After updating DESIGN.md locally, push it to the Stitch project
so all future generated screens inherit the design system:

```
Upload .stitch/DESIGN.md to Stitch project ID 213671701511891156
and register it as the project design system.
```

Uses the `manage-design-system` skill (requires Stitch MCP connected).
