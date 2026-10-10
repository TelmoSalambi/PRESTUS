# PRESTUS: relatório de revisão completa do site institucional

**Data:** 10/10/2026 · **Commit revisto:** `2ffbbf6` (branch `main`) · **Ambiente:** build de produção (`vite build` + `vite preview`), Chromium headless

> **Sem alterações no código.** Esta revisão só regista os problemas encontrados. Nenhum ficheiro do site foi modificado; as correções estão na secção 12 e podem ser feitas a seguir.

---

## 1. Resumo executivo

### O design é moderno?

**Em parte.** O site está limpo, organizado e com ar profissional. A paleta azul-marinho e dourado é sóbria, a tipografia (Poppins + Inter) é boa, os espaçamentos são consistentes e o conteúdo é forte, com alvarás e certificações reais.

Só que, visto em 2026, ele passa a impressão de **um bom template corporativo de 2019–2022**, e não de um site *premium* contemporâneo. Estes elementos pesam contra:

- Faixa de contactos no topo (*topbar*), *marquee* com texto rolando, ícone de "rato" para indicar scroll e carrossel que avança sozinho. São padrões em desuso.
- Excesso de efeitos simultâneos: texto dourado com brilho infinito, zoom lento contínuo no banner (Ken Burns), botão do WhatsApp que pula, treme e emite ondas ao mesmo tempo, reflexo nos botões e grelha "blueprint" decorativa. Tudo isto contraria o próprio PROMPT MESTRE: *"Do not overuse… excessive animations"* e *"expensive because of composition, not effects"*.
- Logótipo muito pequeno no cabeçalho, com cerca de 30 px de altura útil.
- Problemas de acabamento visíveis: botões PT/EN e botão "×" do modal com o estilo cinzento padrão do navegador, e texto do banner desalinhado com o resto da página.
- A secção de contacto no desktop é uma coluna única de 1216 px de largura, com um botão verde gigante. É a parte mais fraca do layout.

### Nota geral: **6,5 / 10**

| Área | Nota | Comentário curto |
|---|:-:|---|
| Imagens | **3/10** | ⚠️ O banner tem o **logótipo e o site de outra empresa** embutidos. As restantes imagens são IA (Gemini) com marca d'água. |
| Design visual / modernidade | 6/10 | Base sólida, mas com animações em excesso e padrões datados. |
| Responsividade | 8/10 | Sem overflow horizontal em 390, 820 e 1440 px. Menu mobile funciona bem. |
| Acessibilidade | 6/10 | Boa base (skip-link, focus trap, ESC), mas 4 falhas de contraste e carrossel automático sem pausa. |
| Performance | 6/10 | CLS = 0, mas **1,86 MB** no carregamento inicial em mobile. As 10 imagens de serviços carregam todas logo de início. |
| SEO / GEO | 5/10 | Meta tags e JSON-LD bons, mas o conteúdo só existe via JavaScript, invisível para crawlers de IA. |
| Conteúdo / veracidade | 7/10 | A maioria está confirmada pelo PDF oficial. 5 pontos precisam de confirmação (secção 9). |
| Código | 8/10 | Lint e Prettier limpos, build OK, sem erros na consola, i18n PT/EN 100 % completo. |
| Segurança / deploy | 7/10 | Headers básicos OK. Falta CSP. 1 vulnerabilidade *high* (só em build). |

### Os 5 problemas mais urgentes

1. 🔴 **O banner principal (`Banner 01.webp`) mostra o logótipo e o endereço `www.solucoeshightech.com`, de outra empresa.** É um risco legal e de reputação, visível no canto inferior direito em ecrãs desktop.
2. 🔴 **8 das 11 imagens restantes têm a marca d'água ✦ do Gemini** e foram geradas por IA. Apresentam como se fossem da PRESTUS instalações, camiões ("ANGOLA CARGO") e equipas que não são reais. Isto é delicado para uma empresa que concorre a concursos públicos.
3. 🔴 **Três moradas diferentes para a sede na mesma página.** O mapa diz "Prédio Banco BIC, Rua Hoji Ya Henda", morada que não aparece em nenhum documento oficial.
4. 🟠 **Contraste insuficiente** nos números dos alvarás (dourado sobre branco, 2,42:1) e no botão "Falar no WhatsApp" (branco sobre verde, 1,98:1).
5. 🟠 **Animações em excesso e carrossel automático sem botão de pausa.** Falha o critério WCAG 2.2.2 e deixa o site com cara de "template".

---

## 2. Escopo e método

- **Código lido na íntegra:** 17 componentes React, 7 ficheiros CSS (2.811 linhas), i18n, configs Vite/Vercel/ESLint, `index.html`, sitemap, robots, scripts e o PROMPT MESTRE.
- **Ferramentas:** `npm ci`, `eslint`, `prettier --check`, `vite build`, `npm audit`, `npm outdated`.
- **Testes no navegador:** Chromium headless em 3 viewports (desktop 1440×900, tablet 820×1180, mobile 390×844). Verifiquei capturas de ecrã, overflow horizontal, erros na consola, pedidos de rede, LCP, CLS, hierarquia de títulos, áreas de toque, foco por teclado, modal, menu mobile e o carrossel ao longo do tempo.
- **Fontes:** o Google Fonts está bloqueado na sandbox. Para as capturas serem fiéis, injetei Inter, Poppins e JetBrains Mono a partir do npm (`@fontsource`). O mapa do Google foi substituído por um placeholder.
- **Imagens:** inspecionei as 12 imagens (dimensões, peso, conteúdo e cantos à procura de marcas d'água).
- **Conteúdo:** comparei os dados do site com o texto extraído do `PRESTUS_Portfolio_2026.pdf` (38 páginas, com alvarás, certidões e o certificado SNCP).
- **Contraste:** calculado com a fórmula WCAG 2.x.

Capturas de ecrã de evidência: [`docs/revisao/`](./revisao/).

---

## 3. Imagens

### 3.1 Inventário

| Ficheiro | Uso | Dimensões | Peso | Observações |
|---|---|---|---|---|
| `Banner 01.webp` | Hero | 1376×768 | 89 KB | 🔴 **Logótipo + "www.solucoeshightech.com"** embutidos. Faixas diagonais azuis e douradas fazem parte da própria imagem. Mostra uma fábrica de maquinaria CNC, que não é o negócio da PRESTUS. Resolução abaixo dos 1920 px pedidos, por isso fica esticada em ecrãs grandes. O HTML declara `width=1920 height=1080`, o que não bate com a imagem real. |
| `Quem somos.webp` | Sobre | 1024×767 | 79 KB | IA. Escritório genérico. Sem marca d'água visível. |
| `Construção Civil.webp` | Card 01 | 1200×805 | 145 KB | IA. Boa imagem (colete com "PRESTUS"). Tem ✦. |
| `Fiscalização.webp` | Card 02 | 1200×805 | 151 KB | IA. Boa imagem. Tem ✦. |
| `Saúde.webp` | Card 03 | 1200×805 | 95 KB | IA. Boa imagem. |
| `Limpeza.webp` | Card 04 | 1200×805 | 75 KB | IA. Tem ✦. |
| `Gemini_Generated_Image_8jf5…webp` | Card 05 (TI) | 1200×805 | 154 KB | IA. Tem ✦. O nome do ficheiro denuncia a origem. |
| `Escritório.webp` | Card 06 | 1200×805 | 90 KB | IA. Tem ✦ ténue. |
| `Gemini_Generated_Image_nubr…webp` | Card 07 ("Bens e Serviços Diversos") | 1200×805 | 140 KB | IA. Tem ✦. **Mostra um eletricista**, o que não corresponde a "víveres, transporte e formação". |
| `Merenda Escolar.webp` | Card 08 | 1200×805 | 96 KB | IA. Avental com o texto inventado "MERENDA ESCOLAR ANGOLA". |
| `Logística.webp` | Card 09 | 1200×805 | 175 KB | IA. Tem ✦. Camiões com marcas fictícias ("ANGOLA CARGO", "LOGÍSTICA TOTAL"). |
| `Pesca.webp` | Card 10 | 1200×746 | 107 KB | IA. Tem ✦. Pôr do sol em silhueta, num estilo diferente das outras imagens e com outra proporção. |
| `Logo.png` | Cabeçalho, rodapé, favicon, og:image | 612×408 | **129 KB** | PNG com **cerca de 30 % de margem transparente** à volta, por isso o logótipo fica minúsculo no cabeçalho. Não há versão SVG. O logótipo horizontal fica ilegível como favicon de 16 px. |

### 3.2 Avaliação

- **Qualidade estética:** boa. As imagens são coerentes entre si (luz clara, representação angolana, fardas azuis e laranja), exceto a da Pesca.
- **Marcas d'água:** nos cards o ✦ fica quase sempre cortado pelo recorte de 160 px de altura, mas está presente nos ficheiros e é fácil de encontrar.
- **Credibilidade:** o maior problema. Para um público institucional (Estado, concursos), mostrar instalações, frota e equipas geradas por IA como se fossem próprias pode ser lido como enganoso. O PROMPT MESTRE (§31) proíbe inventar informação, e as imagens inventam implicitamente.

### 3.3 Recomendação

1. **Imediato:** retirar ou substituir o `Banner 01.webp`.
2. Prioridade máxima: **fotografias reais** de obras, equipa e entregas (mesmo feitas com telemóvel, desde que bem tratadas).
3. Enquanto não houver fotos reais: usar imagens de banco com licença, ou regenerar as de IA sem marca d'água, sem texto e sem marcas inventadas. Também convém renomear os ficheiros (sem espaços, acentos nem `Gemini_…`) e gerar `srcset` em 480, 800 e 1200 px.
4. Logótipo: obter o **SVG** original (ou recortar o PNG), criar um favicon só com o símbolo e uma imagem `og:image` de 1200×630.

---

## 4. Design visual e modernidade

### 4.1 Pontos fortes
- Paleta sóbria e coerente com o setor: azul-marinho `#0c3b66` e `#07213c` com dourado `#c9a227`.
- Tipografia com boa hierarquia e escala fluida com `clamp()`.
- Barra de confiança (6ª Classe / SNCP / MPME / Presença) sobreposta ao hero: boa ideia e bem executada.
- Cartões de credenciais com números reais de alvarás, o que é ótimo para a credibilidade.
- Faixa de CTA escura bem resolvida. Rodapé organizado.
- Espaçamento consistente (escala de 8 pt).

### 4.2 Problemas de design (por gravidade)

| # | Problema | Onde |
|---|---|---|
| D1 | **Botões PT / EN e "×" do modal sem estilos.** Aparece a caixa cinzenta com borda do navegador. | `components.css` não reinicia `background`/`border` dos `<button>` |
| D2 | **Logótipo minúsculo** (54 px de altura, mas só ~30 px de conteúdo). | `Logo.png` com margem + `.header-logo` |
| D3 | **Texto do hero desalinhado:** começa a 32 px da margem, enquanto o resto do site começa a 112 px. | `.hero-section .container { max-width: 1440px }` |
| D4 | **Overlay do hero invertido.** `enhancements.css` sobrepõe-se a `sections.css` e deixa o gradiente *mais claro à esquerda* (onde está o texto, 0,55) e *mais escuro à direita* (onde não há texto, 0,92). | `enhancements.css` linha 83 (sobrepõe `sections.css` linha 141) |
| D5 | **Efeito dourado em "Realização"** com um ponto branco no meio: "Reali" fica desbotado. Mais um brilho infinito com sombra. | `.hero-title em` |
| D6 | **Animações em excesso:** Ken Burns contínuo, brilho dourado infinito, entrada com *blur*, linha dourada com glow, rato animado, *marquee*, WhatsApp com 3 animações em loop, reflexo nos botões, carrossel automático a cada 3,2 s. | `enhancements.css`, `components.css`, `sections.css` |
| D7 | **Contacto no desktop:** lista numa só coluna com 1216 px de largura, botão verde de largura total e mapa por baixo. Fica muito espaço vazio e a hierarquia é fraca. O ideal é 2 colunas (informação + mapa). | `.contact-grid-single` |
| D8 | **FAQ centrado em 1000 px** enquanto o título está alinhado à esquerda em 1280 px. O eixo visual fica partido. | `.faq-container` |
| D9 | **Modal de serviço sem imagem.** O prompt pedia "Large image + supporting images". A lista também perdeu os marcadores (o reset remove `list-style`). | `ServiceModal.jsx`, `reset.css` |
| D10 | **Padrões datados:** topbar de contactos, *marquee* em maiúsculas, indicador de scroll em forma de rato, carrossel com pontos. | — |
| D11 | Telefones, NIF e títulos de contacto em **fonte monoespaçada** (JetBrains Mono): passa um ar "técnico" e destoa do tom institucional. Também carrega uma 3.ª família de fontes. | `.mono`, `.contact-method h4` |
| D12 | Todos os botões em MAIÚSCULAS com espaçamento largo, incluindo os pequenos dos cards. Fica pesado quando há 10 cards seguidos. | `.btn` |

### 4.3 O que deixaria o site realmente moderno (2026)
- **Menos efeitos, mais composição:** hero estático com uma foto real forte, título grande e um único CTA dominante.
- Trocar o carrossel automático por uma **grelha de serviços** (4 → 2 → 1 colunas, como pedia o PROMPT MESTRE §15), com cards clicáveis que abrem um *drawer* ou página de detalhe com imagem.
- Remover topbar e *marquee*. A informação de credibilidade já está na barra de confiança.
- Botão do WhatsApp **estático**, com uma única animação discreta (ou nenhuma).
- Contacto em 2 colunas: cartões de contacto à esquerda, mapa à direita.
- Logótipo em SVG com 40 a 48 px de altura **útil**.
- Uma única família tipográfica (Inter, ou Inter Display para os títulos) e caixa normal nos botões.

---

## 5. Responsividade

| Viewport | Overflow horizontal | Resultado |
|---|---|---|
| Desktop 1440×900 | Não (1440 = 1440) | OK, com os problemas D1 a D8 |
| Tablet 820×1180 | Não | OK. A navegação passa a menu hambúrguer abaixo de 1024 px. |
| Mobile 390×844 | Não | OK. Hero legível, barra de confiança em 2×2, menu lateral com focus trap, ESC e clique fora a funcionar. |

Observações:
- O menu hambúrguer aparece a partir de **1024 px** (o prompt pedia 768 px). É aceitável, porque com 6 links o menu desktop não caberia.
- No mobile a topbar desaparece (boa decisão).
- Em mobile os botões PT/EN no menu lateral continuam com o estilo padrão do navegador (D1).
- O botão flutuante do WhatsApp sobrepõe-se ao conteúdo da barra de confiança no mobile.

---

## 6. Acessibilidade

### 6.1 O que está bem ✅
Há *skip-link*, `<main>`, `<section>`, `<nav>` com `aria-label`, um único `<h1>` e `alt` em todas as imagens. O modal e o menu têm *focus trap*, fecham com ESC e devolvem o foco ao fechar. O FAQ tem `aria-expanded`/`aria-controls`. O hambúrguer tem `aria-expanded`. Existe suporte a `prefers-reduced-motion`. Se o JavaScript falhar, o conteúdo não fica escondido (`@media (scripting: none)`). O `<html lang>` acompanha o idioma.

### 6.2 Problemas ❌

| # | Problema | Critério WCAG | Detalhe |
|---|---|---|---|
| A1 | Números dos alvarás em dourado sobre branco | 1.4.3 (AA) | **2,42:1** (mínimo 4,5:1) |
| A2 | Botão "Falar no WhatsApp": branco sobre `#25d366` | 1.4.3 | **1,98:1** |
| A3 | Botão "Descarregar Portfólio PDF": branco sobre `#a98820` | 1.4.3 | 3,37:1 |
| A4 | Numeração "01/02/03" dos valores (`#a98820`) | 1.4.3 | 3,37:1 |
| A5 | Texto `--color-text-muted` sobre o cinza das secções | 1.4.3 | 4,37:1 (no limite) |
| A6 | **Carrossel avança sozinho** a cada 3,2 s e só pausa com o rato. Não há botão de pausa nem pausa ao receber foco do teclado. O *marquee* também se move sem parar. | **2.2.2** | Falha |
| A7 | Pontos do carrossel com 8×8 px | 2.5.8 (AA, 24 px) | Falha |
| A8 | Sem estilo `:focus-visible` próprio. O anel de foco padrão fica pouco visível sobre azul-marinho (topbar, hero, rodapé). | 2.4.7 / 2.4.11 | Melhorar |
| A9 | Hierarquia de títulos salta de `h2` para `h4` (Contacto e Rodapé) | 1.3.1 | Corrigir |
| A10 | Cards do carrossel são `<div onClick>` (o botão interno é acessível, mas o card não). `<a type="button">` no modal é HTML inválido. | 4.1.2 | Menor |
| A11 | O `prefers-reduced-motion` encurta as transições, mas **não para o autoplay** do carrossel (que é JavaScript). | 2.3.3 | Corrigir |

---

## 7. Performance

| Métrica (mobile 390 px, sem limitação de rede) | Valor |
|---|---|
| CLS | **0,000** ✅ |
| LCP (local) | 360 ms (elemento: imagem do hero) |
| HTML | 8 KB |
| CSS | 40,9 KB (8,3 KB gzip) |
| JS | 290 KB (**93 KB gzip**: React + i18next + DOMPurify) |
| **Total no 1.º carregamento** | **≈ 1,86 MB**, sem contar Google Fonts e o mapa |

Problemas:
1. **As 10 imagens de serviços (~1,2 MB) carregam todas logo de início**, porque são `background-image` em CSS. Mesmo assim, só 1 a 3 aparecem no ecrã. O ideal é usar `<img loading="lazy">` com `srcset`.
2. **`Logo.png` com 129 KB** para um logótipo de 54 px. Em SVG ficaria com menos de 10 KB.
3. **14 ficheiros de fontes** (Inter 6 pesos + Poppins 5 + JetBrains Mono 3) vindos do Google. Seria melhor auto-hospedar 2 ou 3 pesos em `woff2`.
4. Animações infinitas (Ken Burns, brilho, WhatsApp ×3, *marquee*) gastam GPU e bateria no mobile. `will-change` está aplicado a todos os elementos `.reveal`.
5. Banner de 1376 px esticado em ecrãs maiores (perde nitidez) e sem versão mobile mais leve.
6. 93 KB gzip de JavaScript para uma página única estática é aceitável, mas daria para reduzir muito (ver secção 11).
7. Mapa do Google em `iframe` com `loading="lazy"`: bem feito ✅.

---

## 8. SEO e GEO (pesquisa por IA)

### ✅ Bem feito
`title` e `meta description` traduzidos de forma dinâmica, Open Graph e Twitter Cards, `canonical`, `hreflang` (pt / en / x-default), JSON-LD `Corporation` + `WebSite` + `FAQPage`, `sitemap.xml`, `robots.txt`, meta geo e um `<h1>` único.

### ❌ Problemas
1. **O conteúdo só existe depois do JavaScript correr.** O `index.html` entregue tem `<div id="root"></div>` vazio. O Google renderiza JS (com atraso), mas **GPTBot, ClaudeBot, PerplexityBot, o preview do WhatsApp e o do LinkedIn não executam JavaScript**: veem apenas o `<head>`. O PROMPT MESTRE (§27) dá prioridade explícita ao GEO. **Recomendação:** pré-renderizar o HTML no build (SSG, por exemplo com `vite-react-ssg` ou um script de prerender), ou migrar para Astro.
2. **`?lang=en` como versão inglesa:** funciona, mas a versão EN também não é pré-renderizada, e um parâmetro de URL é menos robusto do que uma rota `/en/`.
3. **`og:image` é o logótipo** (612×408, com margens). As partilhas no WhatsApp e LinkedIn ficam pobres. Recomenda-se uma imagem própria de 1200×630.
4. **Domínio por confirmar:** o código usa `www.prestus.ao`, o PROMPT MESTRE usa `prestus.co.ao` e o comentário no `sitemap.xml` diz *"quando o domínio definitivo estiver registado"*.
5. O JSON-LD diz *"empresa angolana **líder**"*, uma afirmação que nenhum documento sustenta. Convém retirar.
6. O JSON-LD não inclui `foundingDate` (2022-09-30), `founder` nem `hasCredential` (alvarás), que estão confirmados e reforçam o E-E-A-T.
7. O `robots.txt` bloqueia `/.agents/` e `/.previews/`, pastas que nem são publicadas. É inofensivo, mas revela a estrutura interna.

---

## 9. Conteúdo e veracidade (comparado com o PDF oficial)

### ✅ Confirmado pelo `PRESTUS_Portfolio_2026.pdf`
- Alvará de Construção **1637/CCOP/IRCOP/SC/2026**, 6ª Classe, até 750.000.000 AKZ, válido até **19/01/2029** ✅
- Alvará de Fiscalização **99/FO/IRCOP/SC/2024**, 6ª Classe, até 250.000.000 AKZ, válido até **08/02/2027** ✅
- Certificado SNCP **671/SNCP/2025**, emitido a 29/12/2025 ✅
- NIF 5001180177, NISS 005721693, CAE 82900 e 46493 ✅
- Constituição a 30/09/2022 e gerente Manuel Lutamba Tchiveio Tchimbanda ✅
- Morada de Luanda (Rua V, Edifício Gabela, Kifica – Belas) ✅
- Telefones 926 903 666 e 923 007 543, e-mail prestuslda1@gmail.com ✅
- Lista de equipamentos de saúde (ecógrafos, raios-X, monitores…) ✅

### ⚠️ A confirmar ou corrigir

| # | Ponto | Situação |
|---|---|---|
| C1 | **Mapa: "Prédio Banco BIC, Rua Hoji Ya Henda, próximo da Maternidade Irene Neto"** | **Não aparece em nenhum documento.** Os documentos indicam "Bairro Dr. António Agostinho Neto (próx. Tribunal Militar)" e "Rua Deolinda Rodrigues, prédio do Napoleão". O site mostra **3 moradas diferentes** para a sede. As coordenadas do mapa estão marcadas no código como "aproximadas". |
| C2 | **WhatsApp principal +244 923 677 253** | Não consta nos documentos oficiais, que listam 926 903 666 e 923 007 543. Confirmar se é o número certo para receber os contactos. |
| C3 | **"Situação contributiva perante o INSS regularizada"** | No PDF, a certidão do INSS é válida até **12/03/2026**, ou seja, **já expirou** à data de hoje. Confirmar se foi renovada. |
| C4 | **"MPME: Certificado de Pequena Dimensão"** | O PDF não traz nenhum certificado MPME. O certificado SNCP classifica a empresa como **"até 10 trabalhadores / faturação inferior a USD 250 mil"**, o que corresponde a *micro*empresa (Lei 30/11), e não "pequena". |
| C5 | **Agricultura e Consultoria** | Fazem parte do objeto social e do portfólio oficial (e da lista do PROMPT MESTRE), mas **não aparecem no site**. |
| C6 | "Respondemos em 24 a 48 horas úteis" | Compromisso sem fonte. Confirmar com a empresa. |
| C7 | E-mail institucional em **@gmail.com** | Funciona, mas tira credibilidade em concursos públicos. Recomenda-se `@prestus.ao` assim que o domínio estiver ativo. |
| C8 | Validade do certificado SNCP | O texto do PDF aparece cortado ("29/12/20…"). Verificar a data e, se for útil, mostrá-la no site. |

---

## 10. Conformidade com o PROMPT MESTRE

| Requisito | Estado |
|---|---|
| HTML / CSS / **Vanilla JS, sem React** (§2) | ❌ **Feito em React + Vite + i18next.** O README assume a escolha. Ou se aceita o desvio formalmente, ou se reverte. |
| Paleta `#0B5FA5` + ciano/dourado (§5) | ⚠️ Usa marinho `#0c3b66` + dourado. Escolha defensável, mas diferente da especificação. |
| Não escrever "PRESTUS" ao lado do logótipo (§8) | ✅ |
| Menu hambúrguer abaixo de 768 px com X animado, ESC, clique fora e foco (§9) | ✅ (o corte é em 1024 px) |
| Hero: "Compromisso e Realização" + CTAs (§10) | ✅ (o texto dos CTAs é diferente) |
| Animações de 400–500 ms no máximo, sem excesso (§11, §24) | ❌ Entradas de 750–1100 ms e várias animações infinitas |
| Barra de confiança logo após o hero (§12) | ✅ |
| Pilares Qualidade / Conformidade / Parcerias (§13) | ⚠️ Substituídos por Missão / Visão / Valores |
| **10 áreas, incluindo Agricultura e Consultoria (§14)** | ❌ Faltam Agricultura e Consultoria. Entraram Fiscalização e Diversos. |
| Grelha de cards 4/2/1 colunas (§15) | ❌ Foi feito um carrossel |
| Detalhe com imagem grande e imagens de apoio (§16) | ⚠️ Modal só com texto |
| CTA de serviço que identifica a área (§16) | ✅ Mensagem do WhatsApp já preenchida com o serviço |
| Imagens de alta qualidade, sem informação inventada (§17, §31) | ❌ Banner de terceiros e imagens de IA |
| Acessibilidade (§25) | ⚠️ Ver secção 6 |
| SEO / GEO com páginas `/` e `/en/` (§27, §28) | ⚠️ SPA com `?lang=en`, sem pré-renderização |
| "Não avançar para deploy automaticamente" (§34) | ⚠️ Deploy no Vercel já configurado (pode ter sido decisão posterior) |

---

## 11. Código, arquitetura e manutenção

### ✅ Pontos fortes
- Componentes bem separados (17), estado mínimo e textos centralizados no i18n.
- **Paridade PT/EN a 100 %** (nenhuma chave em falta em nenhum dos lados).
- `eslint` sem avisos, `prettier --check` limpo e `vite build` em 270 ms sem avisos.
- **Sem erros nem avisos na consola** nos 3 viewports.
- Bloqueio de scroll com contador partilhado entre menu e modal, focus trap reutilizável e `DOMPurify` no HTML vindo das traduções.
- README claro e atualizado.

### ❌ Problemas

| # | Problema |
|---|---|
| K1 | **CSS em camadas que se contradizem:** `enhancements.css` redefine o overlay, o `::after` e o tamanho do título do hero que já estavam em `sections.css`. A ordem de importação decide o resultado, e foi isso que causou o D4. |
| K2 | Nenhum reset de `button` (`background`, `border`, `padding`), o que dá origem ao D1. |
| K3 | `useScrollReveal` manipula classes do DOM fora do React, com seletores globais. Funciona, mas é frágil. |
| K4 | Dados duplicados: telefone e e-mail aparecem em `Topbar.jsx`, `index.html` (JSON-LD), `pt.js`/`en.js` e `config.js`. Devia haver uma única fonte (`config.js`). |
| K5 | Nomes de classes enganadores: `img-logistics` é usado no serviço "diversos" e `img-logistica-plan` no de logística. |
| K6 | Ficheiros com espaços e acentos (`/IMG/Construção Civil.webp`). Funciona, mas é frágil em URLs e CDNs. |
| K7 | Código morto: `concurrently` (não é usado), `free-ports.js` ainda liberta a porta 5000 do backend removido, `converter_webp.py` aponta para ficheiros que já não existem, `Logo.png` duplicado na raiz e `vercel.json` duplicado (raiz e `platform/frontend`). |
| K8 | `.agents/scripts/__pycache__/*.pyc` está no git (falta no `.gitignore`). |
| K9 | `vite` e `@vitejs/plugin-react` estão em `dependencies` em vez de `devDependencies`. |
| K10 | **Sem testes** automatizados e **sem CI** (não existe `.github/workflows`). |
| K11 | Desatualizados: React 18 (a versão atual é a 19), i18next 23 (atual: 26), react-i18next 15 (atual: 17), ESLint 9 (atual: 10). Nada urgente. |
| K12 | Para um site de uma só página, React + i18next + DOMPurify (93 KB gzip) é mais do que o necessário. Astro ou HTML pré-renderizado resolveria também o SEO/GEO. |

---

## 12. Segurança e deploy

- ✅ Headers: `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`. Cache imutável para `/assets/` e `rel="noopener noreferrer"` em todos os links externos.
- ❌ **Sem Content-Security-Policy.** Recomenda-se uma CSP que permita apenas `self`, `fonts.googleapis.com`, `fonts.gstatic.com`, o `maps.google.com` (frame) e `wa.me`.
- ⚠️ HSTS não está definido explicitamente (o Vercel aplica-o nos seus domínios; confirmar no domínio próprio).
- ⚠️ `npm audit`: **1 vulnerabilidade high** em `source-map-js`, que só afeta o build e não o site publicado. Resolve-se com `npm audit fix`.
- ⚠️ `vercel.json` duplicado: só o da raiz é usado. O de `platform/frontend/` pode confundir.
- ℹ️ Sem formulários nem backend, a superfície de ataque é mínima ✅.

---

## 13. Plano de ação por prioridade

### 🔴 P0: antes de publicar (≈ 1 dia)
1. Retirar ou substituir o `Banner 01.webp` (marca de terceiros).
2. Corrigir as moradas: escolher **uma** morada oficial da sede e acertar o mapa, a legenda, o rodapé e o JSON-LD (C1).
3. Confirmar o WhatsApp principal (C2), a certidão do INSS (C3) e a designação MPME (C4).
4. Retirar "líder" do JSON-LD.
5. Corrigir o contraste (A1 a A4): mudar o dourado do texto sobre branco para cerca de `#8a6d12` e escurecer o verde do botão do WhatsApp para cerca de `#128c4a` (ou usar texto escuro).
6. Dar estilo aos botões PT/EN e ao botão "×" do modal (D1).

### 🟠 P1: qualidade e modernização (≈ 3–5 dias)
7. Fotografias reais, ou imagens licenciadas ou regeneradas sem marca d'água nem texto inventado. Nomes de ficheiros limpos e `srcset`.
8. Logótipo em SVG com tamanho maior no cabeçalho, favicon próprio e `og:image` de 1200×630.
9. Cortar animações: retirar Ken Burns, brilho dourado, *blur*, as 3 animações do WhatsApp, o reflexo dos botões e o *marquee*. Reduzir as entradas para 400–500 ms.
10. Trocar o carrossel por uma **grelha de serviços** (4/2/1) e pôr imagem no modal (ou páginas de detalhe).
11. Contacto em 2 colunas (informação + mapa) e FAQ alinhado à grelha.
12. Alinhar o hero ao container de 1280 px e corrigir o overlay (D3, D4).
13. Juntar `enhancements.css` com `sections.css` e eliminar as regras duplicadas.
14. Acrescentar **Agricultura** e **Consultoria** (C5).
15. `:focus-visible` próprio, títulos `h3` no lugar dos `h4`, pontos do carrossel com 24 px (se o carrossel ficar).

### 🟡 P2: estrutural (≈ 1–2 semanas)
16. **Pré-renderização (SSG)** de `/` e `/en/` para SEO e GEO. Avaliar migrar para Astro, que fica mais leve e alinhado com o PROMPT MESTRE.
17. Auto-hospedar as fontes (2–3 pesos) e usar `<img loading="lazy">` nos serviços. A meta é ficar abaixo de 600 KB no carregamento inicial em mobile.
18. CSP, `npm audit fix`, limpeza de código morto (K7, K8, K9).
19. CI no GitHub Actions (lint + build) e testes básicos (Playwright: menu, modal, links do WhatsApp).
20. Domínio definitivo e e-mail `@prestus.ao`.

---

## 14. Informação a pedir à PRESTUS

- [ ] Morada oficial única da sede e coordenadas exatas para o mapa
- [ ] Número de WhatsApp que vai receber os contactos
- [ ] Certidão do INSS atualizada (a do PDF venceu a 12/03/2026)
- [ ] Classificação MPME oficial (micro ou pequena) e respetivo certificado
- [ ] Validade do certificado SNCP 671/SNCP/2025
- [ ] Domínio definitivo (`prestus.ao` ou `prestus.co.ao`) e e-mail institucional
- [ ] Fotografias reais de obras, equipa, escritório e entregas
- [ ] Logótipo em vetor (SVG, AI ou PDF)
- [ ] Textos para Agricultura e Consultoria
- [ ] Confirmação do prazo de resposta de "24–48 h"

---

### Anexo: evidências (`docs/revisao/`)
| Ficheiro | Mostra |
|---|---|
| `01-hero-desktop.jpg` | Hero desktop: botões PT/EN sem estilo, logótipo pequeno, desalinhamento, efeito dourado |
| `02-banner-marca-dagua.jpg` | Canto do banner com o logótipo e o site "solucoeshightech.com" |
| `03-gemini-watermark.jpg` | Cantos das 12 imagens com a marca ✦ do Gemini |
| `04-imagens-servicos.jpg` | Folha de contacto de todas as imagens |
| `05-contacto-desktop.jpg` | CTA + secção de contacto numa coluna única |
| `06-mobile-hero-menu.jpg` | Hero e menu lateral em mobile (390 px) |
| `07-modal-servico.jpg` | Modal de serviço (só texto, "×" sem estilo) |
| `08-sobre-servicos-desktop.jpg` | Secção "Quem Somos" e Missão / Visão / Valores |
