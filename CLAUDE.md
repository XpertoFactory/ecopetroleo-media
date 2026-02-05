# Ecopetróleo "Impulso Dominicano" Campaign Website

## Project Overview

**Project**: Ecopetróleo "Impulso Dominicano" Campaign Presentation Website
**Client**: Ecopetróleo Dominicana
**Agency**: Xperto MediaMax
**Purpose**: Interactive campaign presentation website for client pitch/approval
**Build Method**: Claude Code + Xperto SiteCraft Methodology

## Documentation References

- **Methodology**: `/instructions/xperto-sitecraft.md` — Follow Xperto SiteCraft architecture, CSS modules, and implementation patterns
- **Full Specification**: `/instructions/ecopetroleo-website-specification.md` — Complete site structure, content, and component specifications

## Build Standards

### Directory Structure (SiteCraft)

```
/
├── index.html
├── /big-idea/index.html
├── /campaign/index.html
├── /mlb-campaign/index.html
├── /cary/index.html
├── /valentina/index.html
├── /production/index.html
├── /investment/index.html
├── /resources/index.html
├── /css/
│   ├── fonts.css
│   ├── variables.css
│   ├── layout.css
│   ├── typography.css
│   ├── components.css
│   └── animations.css
├── /js/
│   ├── main.js
│   ├── nav.js
│   └── animations.js
└── /assets/
    ├── /images/
    ├── /videos/
    └── /logos/
```

### Code Standards

- **HTML**: Semantic HTML5, 4-space indentation, `data-i18n` for Spanish content
- **CSS**: Mobile-first, CSS custom properties, BEM naming
- **JS**: ES6+, modular structure, SiteCraft namespace

---

## Style Guide

### Color Palette

#### Primary Colors (Ecopetróleo Brand)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-eco-red` | `#E31837` | "Petróleo" text, primary CTAs, accents |
| `--color-eco-blue` | `#1E4D8C` | "Eco" text, turtle icon, tagline |
| `--color-eco-green-light` | `#5BBF4A` | Logo stripes (top) |
| `--color-eco-green-medium` | `#00A651` | Logo stripes (middle) |
| `--color-eco-green-dark` | `#006838` | Logo stripes (bottom) |

#### Campaign Colors (Impulso Dominicano)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-gold` | `#F4A460` | Warmth, hope, dawn/dusk |
| `--color-campo-green` | `#228B22` | Nature, environment |
| `--color-caribbean-sky` | `#87CEEB` | Aspiration, possibility |
| `--color-earth-brown` | `#8B4513` | Baseball fields, authenticity |
| `--color-sunset-orange` | `#FF7F50` | Energy, passion, triumph |

#### UI Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-bg-dark` | `#0D1B2A` | Primary dark background (Deep Navy) |
| `--color-text-primary` | `#FFFFFF` | Main text on dark backgrounds |
| `--color-text-secondary` | `#B0B0B0` | Secondary text, captions |
| `--color-text-dark` | `#1A1A2E` | Text on light backgrounds |
| `--color-accent-hover` | `#E63950` | Hover states for red elements |
| `--color-success` | `#4CAF50` | Completed items, checkmarks |
| `--color-border-subtle` | `rgba(255,255,255,0.1)` | Dividers on dark backgrounds |

### Typography

#### Font Stack

```css
--font-display: 'Bebas Neue', 'Impact', sans-serif;      /* Headlines */
--font-body: 'Montserrat', 'Helvetica Neue', sans-serif; /* Body text */
--font-accent: 'Playfair Display', 'Georgia', serif;     /* Quotes */
--font-mono: 'JetBrains Mono', 'Consolas', monospace;    /* Data */
```

#### Type Scale

| Element | Font | Size | Weight | Letter Spacing |
|---------|------|------|--------|----------------|
| Hero Title | Bebas Neue | 80-120px | 400 | 0.05em |
| Section Title | Bebas Neue | 48-64px | 400 | 0.03em |
| Subsection | Montserrat | 28-36px | 600 | 0 |
| Body Large | Montserrat | 18-20px | 400 | 0.01em |
| Body | Montserrat | 16px | 400 | 0.01em |
| Caption | Montserrat | 14px | 400 | 0.02em |
| Quote | Playfair Display | 24-32px | 400 Italic | 0 |
| Data | JetBrains Mono | 14-16px | 400 | 0 |

#### Typography Rules

- Headlines: Always uppercase for Bebas Neue
- Body: Sentence case, line-height 1.6-1.8
- Spanish: Always use proper accents (á, é, í, ó, ú, ñ)

### Animation

#### Timing Functions

```css
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);       /* Most animations */
--ease-dramatic: cubic-bezier(0.0, 0.0, 0.2, 1);       /* Dramatic entrance */
--ease-exit: cubic-bezier(0.4, 0.0, 1, 1);             /* Quick exit */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Playful (Cary) */
```

#### Durations

| Type | Duration | Usage |
|------|----------|-------|
| Micro | 150ms | Hovers, button states |
| Short | 300ms | Reveals, fades |
| Medium | 500ms | Section transitions |
| Long | 800-1200ms | Hero animations |

#### Scroll Behaviors

- **Parallax**: Subtle (0.1-0.3 factor) on background images
- **Fade-in**: Elements fade up as they enter viewport
- **Stagger**: Sequential elements animate with 100ms delays
- **Counter**: Numbers count up when section enters view

### Imagery

#### Photography Direction

- **Color**: Warm, golden tones. Kodak Vision3 film emulation
- **Lighting**: Emmanuel Lubezki style—natural, golden hour, backlit
- **Composition**: Cinematic 2.39:1 or 16:9 framing
- **Mood**: Hopeful, warm, aspirational but grounded

#### Image Treatment

```css
.campaign-image {
  filter: saturate(1.1) contrast(1.05) sepia(0.05);
}
.campaign-image:hover {
  filter: saturate(1.2) contrast(1.1) sepia(0);
}
```

### Icons

| Attribute | Specification |
|-----------|---------------|
| Style | Line icons, 2px stroke weight |
| Corners | Rounded (4px radius) |
| Size | 24px default, 32px for features |
| Color | Inherit (usually white or gold) |

---

## Website Tone

| Attribute | Expression |
|-----------|------------|
| **Cinematic** | Smooth, immersive, emotional—like watching a film |
| **Professional** | High-end agency presentation quality |
| **Warm** | Dominican warmth, not corporate coldness |
| **Confident** | Bold assertions backed by strategic thinking |
| **Aspirational** | Award-worthy, perception-changing |

## Language

- **Primary**: Spanish
- **English acceptable**: For technical/production terms
- **Always use proper Spanish accents**: á, é, í, ó, ú, ñ

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3s |
| Cumulative Layout Shift | < 0.1 |

## Accessibility

- WCAG 2.1 AA compliance
- Minimum 4.5:1 color contrast
- Semantic HTML structure
- Keyboard navigation support
- Alt text for all meaningful images

## Responsive Breakpoints

| Name | Width | Target |
|------|-------|--------|
| Mobile | < 768px | Hamburger nav, single column |
| Tablet | 768-1023px | 2 columns |
| Desktop | 1024-1279px | Full horizontal nav |
| Wide | 1280px+ | Cinematic layouts |
