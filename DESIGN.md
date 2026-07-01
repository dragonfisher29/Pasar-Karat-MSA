---
name: Vibrant Pulse
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#494454'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#7b7486'
  outline-variant: '#cbc3d7'
  surface-tint: '#6d3bd7'
  primary: '#6b38d4'
  on-primary: '#ffffff'
  primary-container: '#8455ef'
  on-primary-container: '#fffbff'
  inverse-primary: '#d0bcff'
  secondary: '#b4136d'
  on-secondary: '#ffffff'
  secondary-container: '#fd56a7'
  on-secondary-container: '#600037'
  tertiary: '#006577'
  on-tertiary: '#ffffff'
  tertiary-container: '#008096'
  on-tertiary-container: '#f9fdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cd'
  on-secondary-fixed: '#3e0022'
  on-secondary-fixed-variant: '#8c0053'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-xs:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1440px
---

## Brand & Style
This design system evolves the "Nocturnal Market" aesthetic into a high-energy, daylight-ready environment. The brand personality is electric, efficient, and unapologetically bold. It targets power users who require the clarity of a dashboard with the expressive soul of a creative platform. 

The style is a fusion of **Modern Minimalism** and **Vibrant High-Contrast**. It utilizes expansive white space to let the "electric" accents breathe, ensuring that every interactive element feels like a primary destination. The emotional response is one of high-functioning optimism—moving from the mysterious shadows of the night into a bright, neon-infused morning.

## Colors
The palette shifts from deep teals and mauves to a triad of high-saturation pigments set against a pristine, "Paper White" background.

- **Primary (Electric Violet):** Used for core actions and primary navigation states.
- **Secondary (Vibrant Pink):** Reserved for high-priority alerts, notifications, and "hot" data points.
- **Tertiary (Bright Cyan):** Utilized for success states, active progress bars, and informative accents.
- **Neutral:** A deep navy-black used exclusively for typography and structural borders to ensure maximum legibility against the light surface.
- **Surface:** A crisp `#FFFFFF` background with a subtle `#F8FAFC` tint for secondary containers.

## Typography
This design system utilizes **Be Vietnam Pro** across all levels to maintain a friendly yet contemporary character. 

- **Headlines:** Use heavy weights (700-800) and tight letter spacing to create a "blocky," high-impact look suitable for a dashboard header.
- **Body Text:** Standardized at 16px for readability, using the 400 weight to contrast against the bold headlines.
- **Labels:** Small labels utilize 600+ weights and uppercase styling to provide a technical, "data-rich" feel without sacrificing clarity.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a strict 8px rhythmic increment. 

- **Desktop:** A 12-column grid with 24px gutters. Dashboard widgets should span columns in increments of 3 (3, 6, 9, or 12).
- **Tablet:** An 8-column grid with 16px gutters.
- **Mobile:** A single-column flow with 16px side margins. 
- **Rhythm:** Internal padding within cards and containers should default to 24px (3 units) to maintain a spacious, premium feel despite the high-intensity colors.

## Elevation & Depth
To keep the UI "popping," this design system avoids heavy, muddy shadows in favor of **Tonal Layers** and **Hyper-Crisp Outlines**.

- **Level 0 (Background):** Pure White (#FFFFFF).
- **Level 1 (Cards/Widgets):** Off-white (#F8FAFC) with a 1px solid border (#E2E8F0).
- **Interactive Depth:** When an element is hovered, apply a "Vibrant Glow"—a soft, high-diffusion shadow tinted with the primary Electric Violet at 15% opacity.
- **Active State:** Elements should "lift" slightly (2px translation) rather than sinking, emphasizing the energetic nature of the brand.

## Shapes
The shape language is defined by a consistent **8px (0.5rem) radius**, creating a balance between approachable softness and professional structure.

- **Standard Elements:** 8px radius for buttons, input fields, and small cards.
- **Large Containers:** 16px (1rem) radius for main dashboard panels to create clear visual containment.
- **Icons:** Use a 2px stroke weight with slightly rounded caps to match the Be Vietnam Pro typeface terminals.

## Components
- **Buttons:** Primary buttons use a solid Electric Violet fill with White text. Secondary buttons use a 2px Electric Violet border with a transparent background.
- **Chips/Tags:** Use high-saturation fills (Cyan or Pink) at 10% opacity with 100% opacity text for a "glassy" but readable appearance.
- **Input Fields:** 1px Neutral border that transitions to a 2px Electric Violet border on focus. Include a "ghost" label that sits on the border.
- **Cards:** White background, 1px light grey border, 8px corner radius. Header sections of cards can use a 4px left-side accent bar in one of the primary/secondary/tertiary colors to categorize data.
- **Dashboards:** Use "Value Tiles" with massive Display-LG typography for key metrics, colored in Electric Violet or Vibrant Pink to draw immediate attention.