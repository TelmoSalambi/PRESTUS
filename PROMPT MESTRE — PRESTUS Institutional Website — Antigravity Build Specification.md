# PROMPT MESTRE — PRESTUS
## Institutional Website — Professional Web Experience

### ROLE

You are the lead development team responsible for designing and implementing the official institutional website of **PRESTUS**.

Before writing code, inspect the project and identify the available specialists, agents, skills and workflows inside `.agents/`.

Use the most relevant specialists available for:

- UI/UX Design
- Frontend Architecture
- HTML/CSS
- JavaScript
- Responsive Design
- Accessibility
- Performance Optimization
- SEO
- Visual Design
- Code Review
- Quality Assurance
- Security

Do not blindly use every available agent. Select only the specialists that materially contribute to this project.

When useful, have one specialist analyze the problem and another review the resulting implementation.

---

# 1. OBJECTIVE

Build a **modern, premium, trustworthy and highly professional institutional website for PRESTUS**, an Angolan company with diversified activity in construction, healthcare, technology, logistics, agriculture, fishing, consulting and other services.

The website must communicate:

> **Competência. Confiança. Capacidade de execução. Conformidade. Presença empresarial.**

The design should feel:

- Modern
- Corporate
- Premium
- Clean
- Human
- Technological without looking like a technology startup
- Trustworthy
- Strong
- Professional
- Visually memorable

Avoid generic corporate-template aesthetics.

The final result should look like a website developed by a serious professional digital agency.

---

# 2. DEVELOPMENT PHASE

## CURRENT PHASE — FRONTEND ONLY

Build the first version using strictly:

- HTML5
- CSS3
- Vanilla JavaScript

Do NOT introduce:

- React
- Next.js
- Vue
- Angular
- Tailwind
- Bootstrap
- jQuery
- React libraries
- Heavy animation libraries
- Backend frameworks

The objective of this phase is to establish the complete visual and structural foundation.

After implementation, perform:

1. Structural analysis
2. Responsive analysis
3. Accessibility analysis
4. Performance analysis
5. Animation analysis
6. UX analysis
7. Code quality review
8. Visual consistency review

Only after these are validated should the project move to backend, CMS, forms, authentication, integrations or deployment.

---

# 3. FIRST ACTION — PROJECT AUDIT

Before modifying anything:

1. Inspect the entire project structure.
2. Identify existing HTML, CSS, JS and assets.
3. Identify existing images and logos.
4. Identify existing documentation.
5. Inspect `.agents/`.
6. Identify relevant skills and specialists.
7. Determine whether existing files should be preserved, refactored or replaced.
8. Do not delete existing assets without justification.
9. Do not invent company information that does not exist in the project or source material.

If important information is missing, use clearly marked placeholders rather than fabricating data.

---

# 4. DESIGN DIRECTION

The website should follow a **modern corporate editorial design**.

Use:

- Large visual hierarchy
- Generous whitespace
- Strong typography
- Clean grids
- Subtle shadows
- Smooth micro-interactions
- High-quality imagery
- Clear CTAs
- Strong section transitions
- Consistent spacing
- Professional cards
- Refined hover states

Do not overuse:

- Gradients
- Glassmorphism
- Excessive rounded corners
- Excessive animations
- Neon effects
- Giant decorative elements
- Random blobs
- Excessive shadows
- Artificial startup aesthetics

The website should feel expensive because of its **composition**, not because of visual effects.

---

# 5. VISUAL IDENTITY

## COLORS

Primary:

```text
White              #FFFFFF
PRESTUS Blue       #0B5FA5
Dark Blue          #063D6E
Light Blue         #EAF3FB
Neutral Gray       #F5F7FA
Primary Text       #1A1A1A
Secondary Text     #5C6670
```

Secondary accent:

```text
Cyan               #00A8CC
```

Alternative warm accent:

```text
Gold/Orange        #F5A623
```

Do not use both cyan and gold excessively.

Choose one as the principal secondary accent based on visual analysis.

---

# 6. TYPOGRAPHY

Prefer:

### Headings

- Inter
- Poppins
- Montserrat

### Body

- Inter
- Open Sans

Use responsive typography with:

```css
clamp()
```

Create a consistent typographic scale.

Headings must have strong hierarchy without becoming oversized or visually aggressive.

---

# 7. GLOBAL LAYOUT

Use a responsive container system.

Recommended conceptual structure:

```text
Header
Hero
Trust / Statistics
About
Areas of Activity
Area Details
Credentials
CTA
Contact
Footer
```

Use semantic HTML:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Maintain a logical heading hierarchy.

---

# 8. HEADER

Create a sticky navigation.

Desktop:

```text
[PRESTUS LOGO]                         Início
                                      Sobre
                                      Serviços
                                      Certificações
                                      Contactos
                                      [PT / EN Toggle]
                                      [Peça o seu Orçamento]
```

Important:

**Do NOT write "PRESTUS" as text beside the logo.**

The logo already contains the company name.

Desktop navigation should remain clean and balanced. Include a subtle, elegant language selector (PT/EN toggle) to transition seamlessly between Portuguese and English.

On scroll:

- subtle shadow
- slight background refinement
- no aggressive resizing

---

# 9. MOBILE NAVIGATION

Breakpoint:

```text
< 768px
```

Use hamburger navigation.

The hamburger must animate into an X.

When opened:

- right-side slide-in panel or elegant overlay
- smooth transition
- accessible focus management
- keyboard support
- ESC closes menu
- clicking outside closes menu
- links animate sequentially

Do not allow the menu to create horizontal overflow.

---

# 10. HERO

## Main headline

> Compromisso e Realização

## Supporting text

> Soluções integradas em construção, saúde, tecnologia e serviços diversos para Angola.

## CTA

Primary:

> Nossos Serviços

Secondary:

> Fale Connosco

Hero statistics:

```text
10+ áreas de actuação
Fornecedor certificado do Estado
Presença em Huíla e Luanda
```

Use a high-quality 1920×1080 image:

> Professional African business/industrial professional using a tablet in a modern industrial environment.

Apply a subtle blue overlay.

The text must remain highly readable.

---

# 11. HERO ANIMATION

On page load:

Headline:

```text
fade + translateY
delay: 200ms
```

Description:

```text
fade + translateY
delay: 300ms
```

Buttons:

```text
fade + translateY
delay: 400ms
```

Statistics:

```text
fade
delay: 500ms
```

Add subtle scroll indicator.

Do not create excessive animation.

Maximum normal animation duration:

```text
400–500ms
```

Respect:

```css
prefers-reduced-motion
```

---

# 12. TRUST / CREDIBILITY SECTION

Immediately after the Hero, create a visual credibility area.

Purpose:

Reinforce that PRESTUS is a legitimate and capable company.

Possible content:

```text
10+ Áreas de Actuação
Fornecedor do Estado
MPME
Presença em Angola
```

This section should visually transition from the Hero into the main content.

---

# 13. ABOUT

Title:

> Quem Somos

Content should communicate:

- Angolan company
- diversified activity
- professionalism
- quality
- compliance
- reliability
- long-term partnerships

Do not fabricate facts.

Use the company's actual documentation whenever available.

Layout:

```text
IMAGE                TEXT
                     description
                     pillars
```

Pillars:

### Qualidade

Compromisso com padrões elevados de execução e fornecimento.

### Conformidade Legal

Atuação orientada por requisitos legais, regulamentares e profissionais.

### Parcerias Duradouras

Construção de relações baseadas em confiança, transparência e resultados.

Use three refined cards.

---

# 14. AREAS OF ACTIVITY

Title:

> O Que Fazemos

Subtitle should clearly communicate the breadth of PRESTUS without making the company look unfocused.

Create 10 service cards.

### 01 — Saúde e Material Hospitalar

### 02 — Construção Civil e Obras Públicas

### 03 — Informática e Redes

### 04 — Material e Mobiliário de Escritório

### 05 — Limpeza e Higienização

### 06 — Alimentação e Merenda Escolar

### 07 — Logística e Planificação

### 08 — Agricultura e Pecuária

### 09 — Pesca

### 10 — Consultoria e Gestão/RH

---

# 15. SERVICE CARD DESIGN

Each card should contain:

- image
- number
- icon
- title
- short description
- visual CTA

Desktop:

```text
4 columns
```

Tablet:

```text
2 columns
```

Mobile:

```text
1 column
```

Hover:

```text
translateY(-8px)
image scale(1.05)
subtle shadow
```

Avoid excessive card decoration.

Cards should feel interactive.

---

# 16. SERVICE DETAILS

Each area must have a dedicated detail section or expandable navigation experience.

Each detail should contain:

```text
Large image
Title
Introduction
Sub-services
Supporting images
CTA
```

Example:

### Saúde e Material Hospitalar

Potential categories:

- Medicamentos
- Equipamentos médicos
- Mobiliário hospitalar
- Consumíveis
- Outros materiais

Only use information confirmed by the company's portfolio.

At the end:

> Solicitar este serviço

This CTA should navigate to the contact form and automatically identify the selected service.

Example:

```text
Área de Interesse:
[ Saúde e Material Hospitalar ]
```

---

# 17. IMAGES

Use the existing generated assets whenever available.

Required image mapping:

| Area | Image |
|---|---|
| Hero | Professional with tablet / industrial environment |
| About | Team / handshake |
| Health | Medical materials |
| Construction | Construction worker |
| IT | Server / networking |
| Office | Office furniture |
| Cleaning | Cleaning professional |
| School Meals | Child eating |
| Logistics | Warehouse |
| Agriculture | Cultivated field |
| Fishing | Fisherman |
| Consulting | Business meeting |

Target formats:

```text
WebP
JPEG fallback
```

Target:

```text
< 500KB per image
```

Use:

```html
srcset
sizes
loading="lazy"
decoding="async"
```

except critical above-the-fold imagery.

Hero imagery should be optimized carefully because it affects LCP.

---

# 18. CERTIFICATIONS / CREDENTIALS

Title:

> Credenciais e Certificações

Highlight:

- Fornecedor do Estado
- Alvará de Construção Civil — 6ª Classe
- Alvará de Fiscalização de Obras
- Certificado MPME

Do not visually exaggerate certifications.

Use elegant badges.

CTA:

> Baixar Portfólio Completo

The PDF should be referenced as an asset if it exists.

If the PDF does not exist, create a clear placeholder rather than inventing a download.

---

# 19. CONTACT

Title:

> Fale Connosco

Form fields:

```text
Nome
Empresa
Email
Telefone
Área de Interesse
Mensagem
```

Dropdown:

```text
Saúde e Material Hospitalar
Construção Civil e Obras Públicas
Informática e Redes
Material e Mobiliário de Escritório
Limpeza e Higienização
Alimentação e Merenda Escolar
Logística e Planificação
Agricultura e Pecuária
Pesca
Consultoria e Gestão/RH
```

At this phase, the form is frontend-only.

Do NOT pretend that messages are actually being sent.

Implement:

- validation
- loading state
- success UI simulation
- error state
- accessible labels

Backend integration comes later.

---

# 20. CONTACT INFORMATION

Display:

- Telephone
- Email
- Huíla address
- Luanda address
- Google Maps

Do not invent telephone numbers, email addresses or physical addresses.

Use the real information supplied in the project/source documentation.

If unavailable:

```text
[CONTACTO A CONFIRMAR]
```

rather than fake data.

---

# 21. WHATSAPP

Add a fixed WhatsApp CTA.

Position:

```text
bottom: 24px
right: 24px
```

Requirements:

- accessible label
- subtle pulse
- hover effect
- mobile adaptation

Do not invent the WhatsApp number.

Use the real number if available.

---

# 22. FOOTER

Dark blue:

```text
#063D6E
```

Four-column desktop structure:

### Company

Logo + short description.

### Links

- Início
- Sobre
- Serviços
- Certificações
- Contactos

### Áreas de Actuação

Relevant service links.

### Contactos

Telephone
Email
Locations
Social media

Bottom:

```text
NIF
© PRESTUS — [YEAR]
```

Use the actual NIF if available.

---

# 23. RESPONSIVENESS

Mobile-first.

Breakpoints:

```text
480px
768px
1024px
1440px
```

Test at minimum:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

No:

- horizontal scrolling
- overlapping elements
- broken images
- inaccessible navigation
- unreadable text
- clipped buttons

---

# 24. ANIMATION SYSTEM

Use CSS wherever possible.

Use JavaScript only when necessary.

Use:

```javascript
IntersectionObserver
```

for reveal animations.

Animation types:

```text
fade-in
slide-up
slide-left
slide-right
scale-in
stagger
```

Do not animate everything.

Animation should establish hierarchy, not distract the user.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 25. ACCESSIBILITY

Implement:

- semantic HTML
- correct heading hierarchy
- alt text
- keyboard navigation
- visible focus states
- accessible form labels
- ARIA only when necessary
- sufficient contrast
- accessible hamburger
- ESC menu close
- focus management

The site must remain usable without a mouse.

---

# 26. PERFORMANCE

Target:

```text
Fast initial load
Low JavaScript overhead
Optimized images
Minimal dependencies
Efficient CSS
```

Avoid unnecessary libraries.

Prioritize:

```text
LCP
CLS
INP
```

Optimize:

- images
- fonts
- CSS
- JavaScript
- DOM complexity

Do not sacrifice visual quality unnecessarily.

---

# 27. SEO FOUNDATION & AI DISCOVERY (GEO)

Implement state-of-the-art SEO and GEO (Generative Engine Optimization) to maximize visibility on Google and AI search engines (like ChatGPT, Claude, and Perplexity).

### 1. Multilingual SEO (Bilingual Setup)
- **Lang Attributes:** Use `lang="pt-AO"` (or `lang="pt"`) on the default homepage, and `lang="en"` on the English page.
- **Hreflang Tags:** Include self-referential and cross-language alternate links on both pages to signal translations:
  ```html
  <link rel="alternate" hreflang="pt" href="https://prestus.co.ao/" />
  <link rel="alternate" hreflang="en" href="https://prestus.co.ao/en/" />
  <link rel="alternate" hreflang="x-default" href="https://prestus.co.ao/" />
  ```
- **Language-specific Metas:** Ensure titles and meta descriptions are fully translated, keeping keywords natural to each target audience.

### 2. Traditional SEO Meta Tags
- **Title Tag:** Keep under 60 characters, with clear category/location keywords (e.g., `PRESTUS | Construção, Saúde e Logística em Angola`).
- **Meta Description:** Write compelling, click-worthy copy under 160 characters describing the diversified company.
- **Open Graph (OG) & Twitter Cards:** Implement rich social sharing tags (og:title, og:description, og:image, og:url, og:type) for premium previews on platforms like LinkedIn and WhatsApp. Use absolute paths for the fallback social image.

### 3. Structured Data (Schema.org / JSON-LD)
- Add a valid JSON-LD schema block on both versions representing the organization or corporation (LocalBusiness/Corporation) to help search engines catalog company properties:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "PRESTUS",
    "url": "https://prestus.co.ao",
    "logo": "https://prestus.co.ao/Logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "[TELEFONE A CONFIRMAR]",
      "contactType": "sales",
      "email": "[EMAIL A CONFIRMAR]",
      "areaServed": "AO"
    },
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Luanda",
        "addressCountry": "AO"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "Lubango",
        "addressRegion": "Huíla",
        "addressCountry": "AO"
      }
    ],
    "description": "Empresa angolana diversificada atuando em construção, saúde, tecnologia, logistics, agricultura e consultoria."
  }
  ```

### 4. Technical & Content SEO
- **Heading Hierarchy:** Strictly one `<h1>` per page. Logical hierarchy for `<h2>` and `<h3>` tags without skipping levels.
- **Image Accessibility:** Every image must have a descriptive, language-appropriate `alt` attribute. Avoid using images of text.
- **Links:** Use descriptive anchor texts (avoid "clique aqui" or "click here"). Keep links search-engine crawlable (`<a href="...">`).

### 5. GEO (Generative Engine Optimization) & E-E-A-T
- **Entity Definition:** Ensure clear, direct sentences defining who PRESTUS is to help AI search engines parse and cite.
- **Credentials & Proof:** Clearly showcase licenses (e.g. `Alvará 6ª Classe`) and status (`Fornecedor do Estado`, `MPME`) in plain, extractable text to increase trustworthiness.
- **Structured Listings:** Use semantic lists (`<ul>`/`<ol>`) or tables for services and credentials, which are highly preferred by AI models for answering queries.

Do not invent SEO claims or fabricate metadata details.

---

# 28. CODE ARCHITECTURE

Keep the vanilla project organized to support a clean, performant, and search-optimized multilingual setup.

Suggested structure:

```text
PRESTUS/
│
├── index.html (Portuguese version - default)
│
├── en/
│   └── index.html (English version - references parent CSS/JS/assets)
│
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── global.css
│   ├── components.css
│   ├── sections.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── animations.js
│   └── form.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── logo/
│   └── documents/ (e.g., PRESTUS PORTFÓLIO PDF)
│
└── README.md
```

To maintain DRY principles:
- The English page (`en/index.html`) must use relative paths to reference the parent `css/`, `js/`, and `assets/` directories (e.g., `href="../css/global.css"`). Do not duplicate CSS or JS files.
- The UI language switcher (PT/EN toggle) should simply navigate from `/` to `/en/` and vice-versa, preserving smooth transition states.

Adapt this structure if the existing project has a better organization.

Do not create unnecessary files.

---

# 29. DESIGN TOKENS

Centralize the visual system using CSS variables.

Example:

```css
:root {
  --color-primary: #0B5FA5;
  --color-primary-dark: #063D6E;
  --color-primary-light: #EAF3FB;
  --color-background: #FFFFFF;
  --color-surface: #F5F7FA;
  --color-text: #1A1A1A;
  --color-text-muted: #5C6670;
  --color-accent: #00A8CC;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  --container: 1200px;

  --transition-fast: 200ms;
  --transition-normal: 350ms;
  --transition-slow: 500ms;
}
```

Do not blindly copy this structure if the specialist determines a better architecture.

---

# 30. UX PRINCIPLES

The user should always understand:

1. Who PRESTUS is.
2. What PRESTUS does.
3. Why PRESTUS is credible.
4. Which services are available.
5. How to contact PRESTUS.

Every major section should lead naturally toward one of these objectives.

Primary conversion:

> Peça o seu Orçamento

Secondary conversion:

> Fale Connosco

Service conversion:

> Solicitar este serviço

---

# 31. IMPORTANT CONTENT RULE

Never fabricate:

- NIF
- telephone
- email
- addresses
- certifications
- licenses
- statistics
- clients
- partnerships
- government contracts
- company history
- financial information

If the information is unavailable, use a clearly marked placeholder and report it during the review.

---

# 32. QUALITY STANDARD

The result must NOT look like:

- a beginner HTML project
- a generic Bootstrap template
- an AI-generated landing page
- a collection of disconnected cards
- an excessive animation demo

It must look like a **real corporate website ready for professional presentation**.

The visual hierarchy must be intentional.

Spacing must be consistent.

Typography must be disciplined.

Images must have consistent treatment.

Buttons must behave consistently.

Interactions must feel deliberate.

---

# 33. IMPLEMENTATION WORKFLOW

Follow this sequence:

## STEP 1 — DISCOVERY

Inspect:

```text
Project
Assets
Documentation
.agents
Existing code
```

## STEP 2 — SPECIALIST ANALYSIS

Select the most relevant available specialists.

Have them analyze:

```text
UX
Architecture
Visual design
Responsive strategy
Accessibility
Performance
```

## STEP 3 — ARCHITECTURE

Define:

```text
HTML structure
CSS architecture
JS modules
Asset structure
Responsive strategy
Animation system
```

Before implementing.

## STEP 4 — IMPLEMENTATION

Build:

```text
Header
Hero
Trust section
About
Services
Service details
Credentials
Contact
Footer
```

## STEP 5 — RESPONSIVE PASS

Test all defined breakpoints.

## STEP 6 — ACCESSIBILITY PASS

Keyboard navigation.

Focus.

ARIA where necessary.

Contrast.

Forms.

## STEP 7 — PERFORMANCE PASS

Optimize:

```text
Images
CSS
JS
Fonts
DOM
Loading
```

## STEP 8 — VISUAL QA

Inspect the complete website as a user.

Look for:

- inconsistent spacing
- poor alignment
- weak hierarchy
- awkward animations
- visual imbalance
- mobile issues
- broken links
- missing images
- poor contrast
- inconsistent buttons

## STEP 9 — CODE REVIEW

Use the appropriate code-review specialist/skill available in `.agents/`.

Fix legitimate issues.

Do not refactor working code unnecessarily.

---

# 34. FINAL REVIEW REPORT

After implementation, provide a concise report containing:

### Architecture

What was created and why.

### Design

What visual decisions were made.

### Responsiveness

Which breakpoints were tested.

### Accessibility

What was implemented.

### Performance

What was optimized.

### Animations

What animations were implemented.

### Missing Information

List all real information that still needs to be supplied.

### Known Issues

List any remaining problems.

### Next Phase

Recommend what should happen next.

Do NOT move to backend, CMS or deployment automatically.

---

# 35. FINAL PRINCIPLE

Do not optimize for "having many features".

Optimize for:

> **Clarity + Trust + Visual Excellence + Performance + Conversion.**

The PRESTUS website should communicate, within seconds:

> **"Esta é uma empresa séria, capaz e preparada para executar."**

Build with discipline.

Question weak design decisions.

Use the available specialists intelligently.

Do not over-engineer.

Do not invent information.

Do not introduce frameworks during this phase.

Do not finish merely because the page works.

Finish when the experience feels **professional**.