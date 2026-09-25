# PRESTUS — Plataforma Web Integrada

> **Website Institucional e Plataforma Digital Corporativa da PRESTUS**  
> Engenharia, Construção, Saúde, Tecnologias, Logística, Agronegócio, Pescas e Consultoria.

---

## 🏛️ Arquitetura do Projeto

A plataforma é composta por uma arquitetura moderna e desacoplada:

- **Frontend (`platform/frontend`)**:
  - React 18 + Vite (SPA de alta performance)
  - Internacionalização nativa (Português & Inglês via `i18next`)
  - Design Tokens Institucionais (Navy & Gold, sem dependências de frameworks pesados de CSS)
  - Sanitização de formulários contra XSS (`DOMPurify`)
  - Modais interativos, acordeão de FAQs e botão de WhatsApp dinâmico
- **Backend (`platform/backend`)**:
  - API REST em Node.js / Express
  - Base de dados Firebase Firestore (com fallback in-memory mock para desenvolvimento)
  - Notificações por e-mail via Nodemailer / SMTP
  - Proteção e segurança com Helmet, Rate Limiting e honeypots anti-spam

---

## 🚀 Como Executar

### 1. Pré-requisitos
- Node.js >= 18.x
- npm >= 9.x

### 2. Instalação de Dependências
Na raiz do projeto:
```bash
npm install
cd platform/frontend && npm install
cd ../backend && npm install
```

### 3. Iniciar Toda a Plataforma (Frontend + Backend)
Na pasta raiz do projeto:
```bash
npm run dev
```
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🧪 Testes e Build

### Testes da API (Backend):
```bash
cd platform/backend
npm test
```

### Build de Produção (Frontend):
```bash
cd platform/frontend
npm run build
```
Os ficheiros otimizados serão gerados na pasta `platform/frontend/dist`.
