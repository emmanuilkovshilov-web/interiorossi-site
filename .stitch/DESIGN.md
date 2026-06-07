---
version: alpha
name: InterioRossi Cloud Dancer 2026
description: Premium custom furniture studio, Moscow. Quiet luxury — architectural calm, natural materials, generous whitespace.

colors:
  primary: "#4e614e"
  primary-hover: "#394b39"
  primary-container: "#667a66"
  secondary: "#434842"
  tertiary: "#747871"
  surface: "#fbf9f4"
  surface-low: "#f5f3ee"
  surface-container: "#f0eee9"
  surface-high: "#eae8e3"
  on-surface: "#1b1c19"
  on-surface-variant: "#434842"
  outline: "#c3c8c0"
  inverse-surface: "#30312e"
  inverse-on-surface: "#f2f1ec"
  badge-bg: "#e9e2d2"
  badge-text: "#696458"
  error: "#ba1a1a"
  white: "#ffffff"

typography:
  display-xl:
    fontFamily: EB Garamond
    fontSize: 64px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.2
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
  headline-md:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.3
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.03em

rounded:
  sm: 8px
  md: 20px
  lg: 32px
  xl: 40px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-desktop: 96px
  section-mobile: 64px
  container-max: 1440px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: 12px
    typography: "{typography.label-md}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.white}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px
    typography: "{typography.label-md}"
  button-inverse:
    backgroundColor: transparent
    textColor: "{colors.inverse-on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px
  card:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.md}"
    padding: 24px
  badge:
    backgroundColor: "{colors.badge-bg}"
    textColor: "{colors.badge-text}"
    rounded: "{rounded.full}"
    padding: 6px
    typography: "{typography.label-sm}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px
  footer:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    rounded: 32px
---

# InterioRossi — Design System

## Overview

Premium custom furniture studio. Moscow. Established 2012.

**Visual identity:** Quiet luxury. Every element earns its place. No decoration for decoration's sake — only what serves the architecture of the space and the composition of the screen.

**Mood:** Calm, considered, unhurried. The feeling of a well-proportioned room with natural light and honest materials. Not minimal in the sparse sense — generous in whitespace, rich in material references.

**Target user:** Affluent Moscow homeowner or interior designer making a significant purchasing decision. They expect a premium experience before they trust with a premium order.

**Emotional response the UI should evoke:** Trust, craft, permanence. This furniture lasts decades — the digital experience should feel equally considered.

## Colors

The palette is rooted in a muted sage-and-warm-white system derived from Material Design 3 Cloud Dancer 2026.

- **Primary (#4e614e):** Sage green — the sole driver of interaction. CTA buttons, active states, links, icon accents. Used sparingly to preserve its weight.
- **Primary-hover (#394b39):** Darker sage for pressed and hover states.
- **Primary-container (#667a66):** Soft sage fill — subtle accent backgrounds, CTA section.
- **Secondary (#434842):** Near-neutral dark — secondary text, nav links, captions.
- **Tertiary (#747871):** Muted outline — placeholders, disabled, hints, borders.
- **Surface (#fbf9f4):** Warm white — page background. Never pure white.
- **Surface-low (#f5f3ee):** Elevated surface — stats strips, alternating sections.
- **Surface-container (#f0eee9):** Card backgrounds, panel fills.
- **On-surface (#1b1c19):** Primary text. Near-black, warm undertone.
- **Outline (#c3c8c0):** Borders, dividers, input borders.
- **Inverse-surface (#30312e):** Footer background — the only dark zone.
- **Badge-bg (#e9e2d2) / Badge-text (#696458):** Tags, chips, category labels.

**Never use:** Pure black (#000000), neon or saturated accent colors, gradients between unrelated hues, more than one accent color.

## Typography

Two families only. EB Garamond for presence, Manrope for clarity.

**EB Garamond** — display and headlines exclusively. h1–h3, large numbers, accent phrases. When used as an accent phrase within a heading, apply italic. Its warmth and optical weight create the premium feel at large sizes. Never use for body text or UI labels.

**Manrope** — everything else. Navigation, body text, buttons, captions, form labels. Its geometric clarity at small sizes and range of weights make it versatile across all UI contexts.

- **display-xl (64px):** Hero headlines. EB Garamond, weight 600, tight leading 1.1, -0.02em tracking.
- **headline-lg (40px / 32px mobile):** Section headings. EB Garamond, weight 600.
- **headline-md (28px):** Card titles, subsections. EB Garamond, weight 500.
- **body-lg (18px):** Lead paragraphs. Manrope, weight 400, 1.6 leading.
- **body-md (16px):** Body text. Manrope, weight 400, 1.6 leading.
- **label-md (14px):** Buttons, nav, uppercase tags. Manrope, weight 600, 0.05em tracking.
- **label-sm (12px):** Captions, meta, footnotes. Manrope, weight 500, 0.03em tracking.

Body text max-width: 65ch. All uppercase labels: Manrope 600, 11–14px, 0.05–0.12em tracking.

## Layout

Fluid grid, max-width 1440px, horizontal padding 64px desktop / 16px mobile.

Section vertical padding: 96px desktop, 64px mobile. Column gap: 24px.

**Grid patterns in use:**
- 12-column bento grid (category cards: 8+4 columns)
- 4-column stats strip
- 2-column split (text + visual, materials section)
- Single centered CTA block

Responsive breakpoints: 1440px (xl), 1024px (lg), 768px (md), 480px (sm), 375px (mobile base).

## Elevation & Depth

Flat and tonal — not shadow-based. Hierarchy through background tones, not drop shadows.

- **sm:** `0 1px 4px rgba(27,28,25,0.04)` — card hover only.
- **md:** `0 2px 12px rgba(27,28,25,0.06)` — floating elements.
- **lg:** `0 8px 40px rgba(27,28,25,0.09)` — modals, overlays.

Heavy shadows are prohibited. The material language is stone and wood — they sit, not float.

## Shapes

Rounded but architectural. Not bubbly — corners are softened, not eliminated.

- **8px (sm):** Buttons, inputs, small tags — the base interaction unit.
- **20px (md):** Cards, media blocks, list containers.
- **32px (lg):** Hero cards, large feature blocks, footer top corners.
- **40px (xl):** CTA / newsletter section container — the most prominent curve.
- **9999px (full):** Pills only — badges, chips, avatar circles.

Do not mix very rounded (>32px) and sharp corners in the same view. The footer uses a 32px top radius to lift from the page edge.

## Components

**Buttons:** Primary — sage fill (#4e614e), white text, 8px radius, Manrope 600 14px uppercase 0.05em. Hover darkens to #394b39. Outline — transparent with on-surface border. Inverse — for use on dark surfaces (footer, dark overlays).

**Cards:** 20px radius, surface-container (#f0eee9) background, 1px outline border. Image: object-fit cover, hover scale 1.04 at 500ms ease. Overlay on hover: gradient bottom-to-transparent, reveal category badge + title.

**Bento grid cards:** overflow-hidden, hover scale-105 on image at 700ms. Text overlay: white on gradient. Large cards 8/12 columns, small cards 4/12.

**Stats strip:** surface-low background, border top and bottom. Number: EB Garamond headline-lg, primary color (#4e614e). Label: Manrope label-sm uppercase.

**Header:** Sticky. Background rgba(251,249,244,0.94) + backdrop-blur(12px) on scroll. Bottom border 1px outline. Logo EB Garamond italic. Nav: Manrope label-md uppercase.

**Footer:** inverse-surface (#30312e) background, 32px top radius. Link color inverse-on-surface at 60% opacity.

**Badges / Tags:** badge-bg (#e9e2d2), badge-text (#696458), pill radius. Manrope 500 12px uppercase.

**Process steps:** 96×96px circles, white background, 1px outline border. Active step: primary fill, white icon. Connecting line: 1px outline-variant, horizontal.

**CTA section:** 40px radius container, primary-container (#667a66) fill. Input: white/10% bg, white/20% border. Submit button: white bg, primary text.

**Forms — inputs:** white bg, 1px outline border, 8px radius, 12px padding. Focus: primary border + 3px primary/15% ring.

## Do's and Don'ts

- Do use generous whitespace — 96px section padding is the baseline, not the maximum.
- Do use EB Garamond italic for accent phrases in headings — it carries the brand voice.
- Do keep sage green (#4e614e) as the only interactive accent — one color, one purpose.
- Do use natural material photography: wood grain, stone texture, honest light.
- Do round corners — never sharp. Minimum 8px on any interactive element.
- Don't add a second accent color — the system has one.
- Don't use pure black (#000) or pure white (#fff) — the palette is warm.
- Don't use heavy drop shadows — flat tonal hierarchy only.
- Don't use EB Garamond for body text or UI labels — Manrope only below h3.
- Don't use uppercase for body text — only for labels and navigation.
- Don't generate saturated, digitally-processed images — quiet, natural photography only.
