# PRESTUS — Website Institucional

> **Website Institucional da PRESTUS — Comércio & Prestação de Serviços (SU), LDA**  
> Construção Civil, Fiscalização de Obras, Saúde, Tecnologias, Logística, Merenda Escolar, Pescas e Fornecimentos.  
> Comunicação exclusiva via **WhatsApp** — sem formulários, sem servidor.

---

## 🏛️ Arquitetura

Site **100% estático** (SPA) — não requer backend, base de dados nem hospedagem de servidor:

- **React 18 + Vite** (SPA de alta performance)
- Internacionalização nativa (Português & Inglês via `i18next`; suporta `?lang=en` na URL)
- Design Tokens Institucionais (Navy & Gold, sem frameworks pesados de CSS)
- Sanitização de conteúdo HTML contra XSS (`DOMPurify`)
- Modais de serviços com CTA direto para WhatsApp (área pré-preenchida na mensagem)
- Acordeão de FAQs, botão flutuante de WhatsApp, mapa Google embutido
- SEO: JSON-LD (Corporation/WebSite/FAQ), Open Graph, sitemap.xml, robots.txt

> ℹ️ O backend Node.js/Express + Firebase foi removido em setembro de 2026 — o contacto passou a ser feito exclusivamente via WhatsApp. O código histórico permanece disponível no histórico do git (commit anterior a `feat`: *remove News, Legal e formulário; contacto via WhatsApp*).

---

## 🚀 Como Executar

### 1. Pré-requisitos
- Node.js >= 20.x
- npm >= 10.x

### 2. Instalação de Dependências
Na raiz do projeto:
```bash
npm install
npm --prefix platform/frontend install
```

### 3. Ambiente de Desenvolvimento
```bash
npm run dev
```
- **Frontend**: `http://localhost:5173`

---

## 📦 Build de Produção

```bash
npm run build:frontend
```
Os ficheiros otimizados são gerados em `platform/frontend/dist` — basta alojar essa pasta em qualquer hospedagem estática (Netlify, Vercel, Cloudflare Pages, GitHub Pages, Nginx, etc.).

### Pré-visualizar o build localmente:
```bash
npm run preview
```

---

## 🧪 Qualidade

```bash
npm --prefix platform/frontend run lint
```

---

## 📞 Contacto no Site

Todo o fluxo de conversão aponta para o WhatsApp (`+244 923 677 253`), configurado em `platform/frontend/src/config.js`:
- Botão flutuante em todas as secções
- CTA no bloco de contacto
- CTA "Solicitar Proposta" em cada modal de serviço (com o serviço pré-preenchido na mensagem)
