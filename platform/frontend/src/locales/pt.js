/**
 * src/locales/pt.js
 * Conteúdo em Português (idioma principal).
 */
import ptServices from './ptServices.js';

export default {
  translation: {
    skipLink: 'Saltar para o conteúdo principal',
    backToTop: 'Voltar ao topo',

    topbar: {
      phone: '+244 923 677 253',
      email: 'prestuslda1@gmail.com',
      location: 'Lubango, Huíla — Angola',
      badge: 'Fornecedor do Estado — SNCP nº 671/2025',
      nif: 'NIF: 5001180177',
    },

    nav: {
      home: 'Início',
      about: 'Sobre Nós',
      services: 'O que Fazemos',
      credentials: 'Credenciais',
      news: 'Notícias & Obras',
      faq: 'FAQ',
      contact: 'Contactos',
    },

    header: {
      cta: 'Solicitar Proposta',
      openMenu: 'Abrir menu de navegação',
      logoAlt: 'Voltar ao início',
      navDesktop: 'Navegação principal',
      navMobile: 'Navegação móvel',
      switchToPt: 'Mudar para Português',
      switchToEn: 'Mudar para Inglês',
      langPt: 'Português',
      langEn: 'Inglês',
    },

    hero: {
      kicker: 'PRESTUS — Comércio & Prestação de Serviços (SU), LDA',
      titleLine1: 'Compromisso e',
      titleLine2a: 'Realização',
      titleLine2b: ' em Cada Projeto',
      subtitle:
        'Soluções corporativas integradas de construção, saúde, logística e tecnologia, executadas com rigor técnico e total conformidade legal em Angola.',
      ctaPrimary: 'Falar com Especialista',
      ctaSecondary: 'Conhecer Serviços',
      imgAlt: 'PRESTUS Empreendimento e Infraestrutura em Angola',
      scrollDown: 'Rolar para baixo',
      explore: 'Explorar',
    },

    trust: [
      { number: '6ª Classe', label: 'Alvarás de Construção e Fiscalização' },
      { number: 'SNCP', label: 'Fornecedor Oficial do Estado' },
      { number: 'MPME', label: 'Certificado de Pequena Dimensão' },
      { number: 'Presença', label: 'Sede na Huíla e Sucursal em Luanda' },
    ],

    marquee: [
      'ALVARÁ IRCOP 6ª CLASSE (ATÉ 750M AKZ)',
      'FORNECEDOR CERTIFICADO DO ESTADO (SNCP Nº 671)',
      'CONSTRUTORA & OBRAS PÚBLICAS',
      'SUPERVISÃO & FISCALIZAÇÃO TÉCNICA DE ENGENHARIA',
      'SAÚDE & MATERIAL HOSPITALAR ESPECIALIZADO',
      'MERENDA & ALIMENTAÇÃO ESCOLAR',
      'SISTEMAS & REDES INFORMÁTICAS',
      'CONFORMIDADE FISCAL AGT & INSS',
    ],

    about: {
      label: 'Quem Somos',
      titleA: 'Uma empresa angolana',
      titleB: 'de confiança',
      titleC: ' e rigor',
      company: 'PRESTUS — Comércio e Prestação de Serviços (SU) LDA',
      text: 'Fundada em 30 de Setembro de 2022, a PRESTUS é uma empresa angolana com atuação diversificada e regulamentada. Focamo-nos em responder com precisão às necessidades dos nossos clientes privados e do setor público, assegurando qualidade operacional e estrita conformidade legal sob a gerência de Manuel Lutamba Tchiveio Tchimbanda.',
      features: [
        'Alvará de Construção de 6ª Classe do IRCOP',
        'Fornecedor Certificado do Estado pelo SNCP',
        'Presença operacional e sede própria em Angola',
      ],
      imgAlt: 'Equipa e Planeamento PRESTUS',
      badgeTitle: 'Estrutura & Rigor Operacional',
      badgeSubtitle: 'Sede própria e presença ativa em Angola',
      values: [
        {
          number: '01',
          title: 'Missão',
          text: 'Prestar serviços e fornecer soluções de excelência ao setor público e privado, com rigor técnico, transparência e total conformidade com a legislação angolana.',
        },
        {
          number: '02',
          title: 'Visão',
          text: 'Ser reconhecida como parceira estratégica de referência em Angola, liderando pela qualidade operacional, credibilidade institucional e impacto no desenvolvimento nacional.',
        },
        {
          number: '03',
          title: 'Valores',
          text: 'Integridade, compromisso com prazos, responsabilidade social, melhoria contínua e respeito pelas normas técnicas e regulatórias em cada projeto executado.',
        },
      ],
    },

    services: {
      label: 'O Que Fazemos',
      titleA: 'Nossas Áreas de ',
      titleEm: 'Atuação',
      subtitle:
        'Oferecemos um portfólio robusto de serviços e fornecimentos licenciados pelos órgãos reguladores angolanos.',
      regionLabel: 'Carrossel de áreas de atuação',
      dotsLabel: 'Indicadores do carrossel',
      prev: 'Slide anterior',
      next: 'Slide seguinte',
      goTo: 'Ir para slide',
      modalCta: 'Solicitar Proposta para este Serviço',
      closeModal: 'Fechar janela de detalhes',
      items: ptServices,
    },

    credentials: {
      label: 'Credenciais',
      titleA: 'Certificados e ',
      titleEm: 'Habilitados',
      subtitle:
        'Nossa regularidade tributária, fiscal e jurídica assegura total idoneidade para atuar no mercado angolano.',
      items: [
        {
          title: 'Alvará de Construção Civil',
          meta: 'Nº 1637/CCOP/IRCOP/SC/2026',
          text: 'Habilitação de 6ª Classe emitida pelo IRCOP para a execução de edifícios, pontes e instalações elétricas/hidráulicas. Válido até Jan/2029.',
        },
        {
          title: 'Alvará de Fiscalização de Obras',
          meta: 'Nº 99/FO/IRCOP/SC/2024',
          text: 'Classificação de 6ª Classe do IRCOP, autorizando a supervisão de monumentos, edifícios e vias públicas. Válido até Fev/2027.',
        },
        {
          title: 'Certificado de Fornecedor do Estado',
          meta: 'Nº 671/SNCP/2025',
          text: 'Certificação oficial do Ministério das Finanças (Serviço Nacional da Contratação Pública) habilitando a empresa para concursos do Estado.',
        },
        {
          title: 'Alvarás Comerciais',
          meta: 'CAE 82900 & 46493',
          text: 'Licenciamento mercantil para prestação de serviços de apoio e comércio por grosso de produtos farmacêuticos.',
        },
        {
          title: 'Conformidade e Segurança Social',
          meta: 'NISS: 005721693 | NIF: 5001180177',
          text: 'Situação contributiva perante o INSS regularizada e Certidão de Conformidade Tributária ativa emitida pela AGT.',
        },
      ],
      download: {
        title: 'Portfólio Corporativo Completo',
        text: 'Descarregue o documento de apresentação com o portfólio oficial de serviços, licenças e registo comercial da PRESTUS.',
        button: 'Descarregar Portfólio PDF',
      },
    },

    news: {
      label: 'Atualidade e Projetos',
      titleA: 'Obras em Curso & ',
      titleEm: 'Notícias',
      subtitle:
        'Acompanhe as nossas intervenções no terreno, adjudicações recentes e atualizações institucionais.',
      allCategories: 'Todos',
      readMore: 'Ler Artigo',
      readTimePrefix: 'Leitura:',
      modalCta: 'Solicitar Proposta para Projeto Semelhante',
      closeModal: 'Fechar artigo',
      authorPrefix: 'Publicado por:',
      datePrefix: 'Data:',
      empty: 'Nenhuma notícia encontrada para esta categoria.',
      featured: 'Destaque',
      error: 'Não foi possível carregar as notícias. Tente novamente mais tarde.',
    },

    faq: {
      label: 'Esclarecimentos Institucionais',
      titleA: 'Perguntas ',
      titleEm: 'Frequentes',
      subtitle:
        'Respostas diretas sobre idoneidade, alvarás, conformidade jurídica e processos de adjudicação com a PRESTUS.',
      items: [
        {
          q: 'Qual é o limite de valor e capacidade dos Alvarás de Construção da PRESTUS?',
          a: 'A PRESTUS possui o Alvará de Construção Civil e Obras Públicas de <strong>6ª Classe</strong> (Nº 1637/CCOP/IRCOP/SC/2026), emitido pelo IRCOP, que nos habilita legalmente a executar empreitadas com valor até <strong>750.000.000,00 AKZ</strong> (Setecentos e Cinquenta Milhões de Kwanzas).',
        },
        {
          q: 'A PRESTUS está habilitada a concorrer a Concursos Públicos do Estado Angolano?',
          a: 'Sim. Somos fornecedor certificado oficial do Estado com registo no <strong>SNCP (Serviço Nacional da Contratação Pública) sob o Nº 671/SNCP/2025</strong>, habilitados a participar em concursos públicos para empreitadas, fiscalização e fornecimento de bens e serviços a órgãos da Administração Direta e Indireta do Estado.',
        },
        {
          q: 'Como funciona a Fiscalização Técnica de Obras Públicas?',
          a: 'Detemos o Alvará de Fiscalização de <strong>6ª Classe</strong> (Nº 99/FO/IRCOP/SC/2024), autorizando auditoria e controlo de qualidade técnico em edifícios, pontes e vias até <strong>250.000.000,00 AKZ</strong>. Nossa equipa emite relatórios periciais e garante o cumprimento escrupuloso do caderno de encargos.',
        },
        {
          q: 'Qual é o prazo médio de resposta para Propostas Técnicas e Cotações Corporativas?',
          a: 'Nossa equipa comercial e técnica responde a solicitações de propostas corporativas no prazo de <strong>24 a 48 horas úteis</strong> após a receção dos requisitos detalhados ou do caderno de encargos.',
        },
        {
          q: 'Como está estruturada a presença geográfica da PRESTUS em Angola?',
          a: 'Possuímos a nossa <strong>Sede na Província da Huíla</strong> (Lubango) e uma <strong>Sucursal Operacional na Província de Luanda</strong> (Belas/Kifica), permitindo cobertura logística e operacional eficiente no Sul e no Centro-Norte do país.',
        },
      ],
    },

    cta: {
      label: 'Parceria Institucional',
      titleA: 'Pronto para iniciar o seu ',
      titleEm: 'próximo projeto',
      titleB: '?',
      text: 'Fale com a nossa equipa comercial e receba uma proposta técnica detalhada, alinhada com os requisitos do seu concurso ou projeto.',
      primary: 'Solicitar Proposta',
      secondary: 'Descarregar Portfólio',
    },

    contact: {
      label: 'Contacto',
      titleA: 'Fale ',
      titleEm: 'Connosco',
      subtitle: 'Entre em contacto para parcerias ou orçamentos.',
      info: {
        hqTitle: 'Sede (Lubango, Huíla):',
        hqLine1:
          'Bairro Dr. António Agostinho Neto (próximo ao Tribunal Militar e Ponte da Swapo), Lubango, Huíla',
        hqLine2:
          'Endereço Comercial: Rua Deolinda Rodrigues, prédio do Napoleão, 3.º andar, Apt. 8 – Lubango',
        officeTitle: 'Escritório (Luanda):',
        officeLine: 'Rua V, Edifício Gabela, Kifica - Belas, Luanda',
        phonesTitle: 'Contactos Telefónicos & WhatsApp:',
        phone1: '+244 923 677 253',
        phone1Label: 'Escritório / WhatsApp',
        phone2: '+244 926 903 666',
        phone2Label: 'Geral',
        phone3: '+244 923 007 543',
        phone3Label: 'Suporte',
        emailTitle: 'E-mail Corporativo:',
        email: 'prestuslda1@gmail.com',
        nifTitle: 'NIF da Empresa:',
        nif: '5001180177',
        mapTitle:
          'Localização da sede da PRESTUS — Prédio do Banco BIC, Rua Hoji Ya Henda, Lubango, Huíla',
        mapCaption:
          'Prédio Banco BIC, Rua Hoji Ya Henda • Próximo da Maternidade Irene Neto, Lubango',
        mapOpen: 'Abrir no Google Maps',
        mapOpenAria: 'Abrir a localização da PRESTUS no Google Maps',
      },
      form: {
        name: 'Nome Completo',
        namePlaceholder: 'Ex: Manuel Silva',
        company: 'Empresa / Instituição',
        companyPlaceholder: 'Ex: Ministério das Finanças',
        email: 'E-mail de Contacto',
        emailPlaceholder: 'Ex: contacto@empresa.ao',
        phone: 'Telemóvel (com indicativo)',
        phonePlaceholder: 'Ex: +244 923 677 253',
        service: 'Área de Interesse',
        servicePlaceholder: 'Selecione uma área...',
        message: 'Mensagem / Requisitos',
        messagePlaceholder: 'Descreva os requisitos gerais do seu projeto...',
        budget: 'Orçamento Estimado',
        budgetPlaceholder: 'Ex: 50.000.000 AKZ',
        deadline: 'Prazo Pretendido',
        deadlinePlaceholder: 'Ex: 3 meses',
        submit: 'Enviar Mensagem',
        honeypotLabel: 'Website URL',
        errors: {
          name: 'Por favor, insira o seu nome completo.',
          email: 'Por favor, insira um e-mail válido.',
          phone: 'Por favor, insira um número de telefone válido.',
          service: 'Por favor, selecione uma área de interesse.',
          submission: 'Verifique os campos do formulário e tente novamente.',
          rateLimited: 'Demasiadas tentativas. Aguarde alguns minutos antes de tentar novamente.',
          server:
            'Erro no servidor. Tente novamente dentro de momentos ou contacte-nos por WhatsApp.',
        },
        successTitle: 'Mensagem Enviada!',
        successText: 'Recebemos o seu pedido. A nossa equipa comercial responde em 24–48h úteis.',
        errorTitle: 'Erro ao Enviar',
        errorText:
          'Verifique o formulário e tente novamente. Se persistir, contacte-nos por WhatsApp.',
      },
    },

    footer: {
      description:
        'Construindo parcerias duradouras e executando obras e serviços com excelência técnica e integridade legal em Angola.',
      servicesTitle: 'Áreas de Atuação',
      services: [
        'Construção Civil',
        'Fiscalização de Obras',
        'Saúde e Farmacêuticos',
        'TI e Redes',
        'Logística e Fornecimentos',
      ],
      linksTitle: 'Links Rápidos',
      downloadPortfolio: 'Descarregar Portfólio (PDF)',
      officesTitle: 'Escritórios',
      officeHuila: 'Huíla: Bairro Dr. António Agostinho Neto, Lubango (Sede)',
      officeLuanda: 'Luanda: Edifício Gabela, Kifica - Belas',
      emailLabel: 'Email:',
      copyright: ' PRESTUS, (SU) LDA. Todos os direitos reservados.',
      tagline: 'Compromisso • Rigor • Conformidade Legal',
    },

    whatsapp: {
      ariaLabel: 'Falar connosco no WhatsApp',
      message: 'Olá PRESTUS! Gostaria de solicitar uma proposta.',
    },
  },
};
