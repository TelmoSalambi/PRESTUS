/**
 * js/main.js
 * Application entry point. Initializes utilities and global behaviors.
 */

(function () {
  'use strict';

  /* --------------------------------------------------------
     Smooth scroll for anchor links (fallback for older browsers)
  -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10
      ) || 72;

      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });

  /* --------------------------------------------------------
     Current year in footer copyright
  -------------------------------------------------------- */
  const copyrightEl = document.querySelector('.copyright');
  if (copyrightEl) {
    const year = new Date().getFullYear();
    copyrightEl.innerHTML = copyrightEl.innerHTML.replace('2026', year);
  }

  /* --------------------------------------------------------
     Focus-visible polyfill: add keyboard focus class
  -------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // Inject keyboard focus styles
  const focusStyle = document.createElement('style');
  focusStyle.textContent = `
    body:not(.keyboard-nav) *:focus {
      outline: none;
    }
    body.keyboard-nav *:focus {
      outline: 2px solid var(--color-brand-primary);
      outline-offset: 3px;
    }
  `;
  document.head.appendChild(focusStyle);

  /* --------------------------------------------------------
     FAQ Accordion Interatividade
  -------------------------------------------------------- */
  document.querySelectorAll('.faq-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('active');
      
      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('active');
        const trig = i.querySelector('.faq-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });
      
      if (!isOpen) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --------------------------------------------------------
     Modal de Detalhes Técnicos de Serviços
  -------------------------------------------------------- */
  const isEn = window.location.pathname.includes('/en/');
  const serviceDetails = {
    construcao: {
      category: isEn ? 'Civil Construction & Public Works' : 'Construção Civil e Obras Públicas',
      title: isEn ? 'Contracts for Buildings, Infrastructure & Roads' : 'Empreitadas de Edifícios, Infraestruturas e Vias',
      content: isEn ? `
        <p><strong>IRCOP License:</strong> Class 6 License (Nº 1637/CCOP/IRCOP/SC/2026), with execution capacity up to 750,000,000.00 AKZ.</p>
        <p><strong>Technical Capacity:</strong> Complete execution of residential, commercial, and administrative buildings, roads, containment works, and metallic structures.</p>
        <ul>
          <li>Construction and rehabilitation of public and private infrastructure;</li>
          <li>Electrical, hydraulic, and industrial HVAC installations;</li>
          <li>Engineering control and quality testing of construction materials;</li>
          <li>Full compliance with urban planning and safety regulations in Angola.</li>
        </ul>
      ` : `
        <p><strong>Licenciamento IRCOP:</strong> Alvará de 6ª Classe (Nº 1637/CCOP/IRCOP/SC/2026), com capacidade de execução até 750.000.000,00 AKZ.</p>
        <p><strong>Capacidade Técnica:</strong> Execução completa de projetos de edifícios residenciais, comerciais e administrativos, estradas, obras de contenção e estruturas metálicas.</p>
        <ul>
          <li>Construção e reabilitação de infraestruturas públicas e privadas;</li>
          <li>Instalações elétricas, hidráulicas e de climatização industrial;</li>
          <li>Controlo rigoroso de engenharia e ensaios de materiais de construção;</li>
          <li>Conformidade integral com os regulamentos urbanísticos e de segurança em Angola.</li>
        </ul>
      `
    },
    fiscalizacao: {
      category: isEn ? 'Project Supervision & Engineering' : 'Fiscalização e Engenharia',
      title: isEn ? 'Technical Supervision & Quality Control' : 'Supervisão Técnica e Controlo de Qualidade de Obras',
      content: isEn ? `
        <p><strong>IRCOP License:</strong> Class 6 License (Nº 99/FO/IRCOP/SC/2024), with supervision capacity up to 250,000,000.00 AKZ.</p>
        <p><strong>Auditing Services:</strong> Technical supervision of engineering works, material quality assurance, and measurement validations.</p>
        <ul>
          <li>Technical auditing and specification compliance;</li>
          <li>Deadline, cost, and progress control;</li>
          <li>Issuance of expert opinions and periodic reports;</li>
          <li>Construction health and safety supervision.</li>
        </ul>
      ` : `
        <p><strong>Licenciamento IRCOP:</strong> Alvará de 6ª Classe (Nº 99/FO/IRCOP/SC/2024), com capacidade de fiscalização até 250.000.000,00 AKZ.</p>
        <p><strong>Serviços Periciais:</strong> Acompanhamento pericial de obras de engenharia, garantia da qualidade dos materiais e validação de autos de medição.</p>
        <ul>
          <li>Auditoria técnica pericial e cumprimento do caderno de encargos;</li>
          <li>Controlo de prazos, custos e medição de obra;</li>
          <li>Emissão de pareceres técnicos e relatórios de progresso periódicos;</li>
          <li>Supervisão de segurança e saúde no trabalho de construção.</li>
        </ul>
      `
    },
    saude: {
      category: isEn ? 'Healthcare & Hospital Supplies' : 'Saúde e Material Hospitalar',
      title: isEn ? 'Medical Equipment, Furniture & Consumables' : 'Equipamentos Médicos, Mobiliário e Consumíveis',
      content: isEn ? `
        <p><strong>SNCP Certification:</strong> State Certified Supplier (Nº 671/SNCP/2025).</p>
        <p><strong>Product Range:</strong> Supply of high-tech diagnostic equipment and healthcare solutions.</p>
        <ul>
          <li>Diagnostic equipment (Ultrasound, X-Ray, Vital Sign Monitors);</li>
          <li>Specialized hospital furniture (Articulated beds, operating tables, emergency carts);</li>
          <li>Essential medications and laboratory reagents;</li>
          <li>Clinical consumables and personal protective equipment (PPE).</li>
        </ul>
      ` : `
        <p><strong>Certificação SNCP:</strong> Fornecedor habilitado do Estado para o setor da Saúde (Nº 671/SNCP/2025).</p>
        <p><strong>Gama de Produtos:</strong> Fornecimento de equipamentos de alta tecnologia para diagnóstico e cuidados hospitalares.</p>
        <ul>
          <li>Equipamentos de diagnóstico (Ecógrafos, Raios-X, Monitores de Sinais Vitais);</li>
          <li>Mobiliário hospitalar especializado (Camas articuladas, mesas de operações, carrinhos de emergência);</li>
          <li>Medicamentos essenciais e reagentes laboratoriais;</li>
          <li>Consumíveis clínicos e equipamentos de proteção individual (EPIs).</li>
        </ul>
      `
    },
    limpeza: {
      category: isEn ? 'Sanitation & Hygiene' : 'Saneamento e Higiene',
      title: isEn ? 'Industrial Cleaning, Disinfection & Gardening' : 'Limpeza Industrial, Desinfestação e Jardinagem',
      content: isEn ? `
        <p><strong>Scope:</strong> Maintenance and sanitation services for government facilities and commercial offices.</p>
        <ul>
          <li>Deep cleaning and disinfection of corporate buildings;</li>
          <li>Urban solid waste management;</li>
          <li>Green area maintenance and landscaping;</li>
          <li>Pest control and environmental sanitation.</li>
        </ul>
      ` : `
        <p><strong>Âmbito de Atuação:</strong> Serviços de manutenção e higienização para instalações governamentais, edifícios comerciais e áreas públicas.</p>
        <ul>
          <li>Limpeza e desinfestação profunda de edifícios e escritórios corporativos;</li>
          <li>Tratamento e gestão de resíduos sólidos urbanos;</li>
          <li>Manutenção de áreas verdes, jardinagem e paisagismo;</li>
          <li>Serviços de desratização, desinsetização e sanetização ambiental.</li>
        </ul>
      `
    },
    informatica: {
      category: isEn ? 'Information Technology' : 'Tecnologia da Informação',
      title: isEn ? 'Network Infrastructure, Hardware & IT Support' : 'Infraestrutura de Redes, Hardware e Suporte de TI',
      content: isEn ? `
        <p><strong>Tech Solutions:</strong> Implementation of data networks and supply of IT hardware.</p>
        <ul>
          <li>Structured network installation (Fiber & Copper);</li>
          <li>Servers, desktops, laptops, and printers;</li>
          <li>CCTV surveillance and access control systems;</li>
          <li>Ongoing maintenance contracts and hardware support.</li>
        </ul>
      ` : `
        <p><strong>Soluções Tecnológicas:</strong> Implementação de infraestruturas de dados e fornecimento de equipamento informático para empresas e instituições públicas.</p>
        <ul>
          <li>Montagem e certificação de redes estruturadas de voz e dados (Fibra e Cobre);</li>
          <li>Fornecimento de servidores, computadores de secretária, portáteis e impressoras;</li>
          <li>Sistemas de controlo de acessos e videovigilância CCTV;</li>
          <li>Contratos de suporte técnico continuado e manutenção de hardware.</li>
        </ul>
      `
    },
    escritorio: {
      category: isEn ? 'Office Furniture & Supplies' : 'Mobiliário e Material de Escritório',
      title: isEn ? 'Corporate Office Equipment & Consumables' : 'Equipamento de Escritórios e Consumíveis Corporativos',
      content: isEn ? `
        <p><strong>Corporate Supply:</strong> Complete solutions for modern and functional workspaces.</p>
        <ul>
          <li>Operational & executive desks, ergonomic chairs, and meeting tables;</li>
          <li>Metallic cabinets, drawer units, and office partitions;</li>
          <li>Stationery, printing supplies, and original toners;</li>
          <li>Delivery and assembly nationwide.</li>
        </ul>
      ` : `
        <p><strong>Fornecimento Corporativo:</strong> Soluções completas para ambientes de trabalho modernos e funcionais.</p>
        <ul>
          <li>Secretárias operacionais e de direção, cadeiras ergonómicas e mesas de reunião;</li>
          <li>Armários metálicos e de madeira, blocos de gavetas e divisórias de escritório;</li>
          <li>Material de papelaria, consumíveis de impressão e toners originais;</li>
          <li>Entrega e montagem especializada em todo o território nacional.</li>
        </ul>
      `
    },
    diversos: {
      category: isEn ? 'Diverse Goods & Services' : 'Bens e Serviços Diversos',
      title: isEn ? 'General Procurement, Foodstuffs & Training' : 'Aprovisionamento Geral, Víveres e Formação',
      content: isEn ? `
        <p><strong>Business Support:</strong> Integrated response for diverse operational needs.</p>
        <ul>
          <li>Wholesale supply of food items;</li>
          <li>Road transport of staff and cargo logistics;</li>
          <li>Corporate professional training programs;</li>
          <li>General procurement of industrial consumables.</li>
        </ul>
      ` : `
        <p><strong>Soluções de Apoio Empresarial:</strong> Resposta integrada para necessidades operacionais diversas das empresas e instituições.</p>
        <ul>
          <li>Fornecimento de víveres e bens alimentares por grosso;</li>
          <li>Serviços de transporte rodoviário de pessoal e logística de mercadorias;</li>
          <li>Programas de formação profissional e capacitação de equipas;</li>
          <li>Aprovisionamento geral de consumíveis industriais.</li>
        </ul>
      `
    },
    alimentacao: {
      category: isEn ? 'School Meals & Catering' : 'Alimentação Escolar e Catering',
      title: isEn ? 'School Meals & Collective Catering' : 'Merenda Escolar e Confeção de Refeições Coletivas',
      content: isEn ? `
        <p><strong>Nutritional Standards:</strong> Meal preparation under strict hygiene and health standards.</p>
        <ul>
          <li>Management and distribution of school meals;</li>
          <li>Daily meal preparation for corporate canteens;</li>
          <li>Nutritional guidance and balanced menus;</li>
          <li>Compliance with Ministry of Health food safety standards.</li>
        </ul>
      ` : `
        <p><strong>Garantia Nutricional:</strong> Planeamento e confeção de refeições com rigoroso controlo de higiene e qualidade alimentar.</p>
        <ul>
          <li>Gestão e distribuição de merenda escolar em estabelecimentos de ensino;</li>
          <li>Confeção de refeições diárias para refeitórios corporativos e cantinas;</li>
          <li>Acompanhamento nutricional e menus equilibrados;</li>
          <li>Conformidade com os padrões de segurança alimentar do Ministério da Saúde.</li>
        </ul>
      `
    },
    logistica: {
      category: isEn ? 'Logistics & Planning' : 'Logística e Planificação',
      title: isEn ? 'Supply Chain & Freight Management' : 'Gestão da Cadeia de Abastecimento e Transportes',
      content: isEn ? `
        <p><strong>Operational Efficiency:</strong> Logistics operations across Angola.</p>
        <ul>
          <li>Fleet management and cargo transportation;</li>
          <li>Warehousing, stock control, and distribution;</li>
          <li>Route planning and delivery optimization;</li>
          <li>Logistics support for large projects in Huíla and Luanda.</li>
        </ul>
      ` : `
        <p><strong>Eficiência Operacional:</strong> Planeamento e execução de operações logísticas complexas em todo o território angolano.</p>
        <ul>
          <li>Gestão de frotas e transporte rodoviário de carga;</li>
          <li>Armazenamento, gestão de stocks e distribuição capilar;</li>
          <li>Planificação de rotas e otimização de tempos de entrega;</li>
          <li>Apoio logístico para projetos de grande escala na Huíla e Luanda.</li>
        </ul>
      `
    },
    pesca: {
      category: isEn ? 'Fishery Resources' : 'Recursos Pesqueiros',
      title: isEn ? 'Catching, Freezing & Commercialization' : 'Captação, Congelação e Comercialização de Pescado',
      content: isEn ? `
        <p><strong>Fisheries Sector:</strong> Valorization of marine resources with cold chain infrastructure.</p>
        <ul>
          <li>Commercialization of fresh and frozen fish;</li>
          <li>Processing, packaging, and cold storage;</li>
          <li>Support for coastal fishing communities;</li>
          <li>Distribution to hotels and commercial networks.</li>
        </ul>
      ` : `
        <p><strong>Setor Pesqueiro:</strong> Valorização dos recursos marinhos angolanos com infraestrutura de frio e distribuição.</p>
        <ul>
          <li>Comercialização de pescado fresco e congelado de alta qualidade;</li>
          <li>Processamento, embalamento e conservação em câmaras frigoríficas;</li>
          <li>Apoio ao desenvolvimento sustentável das comunidades piscatórias costeiras;</li>
          <li>Distribuição de produtos do mar para redes hoteleiras e mercados.</li>
        </ul>
      `
    }
  };

  const modal = document.getElementById('service-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body-content');
  const modalCta = document.getElementById('modal-cta');

  let savedScrollY = 0;

  function openServiceModal(serviceKey) {
    const data = serviceDetails[serviceKey];
    if (!data || !modal) return;

    savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBody) modalBody.innerHTML = data.content;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeServiceModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });
  }

  if (modalClose) {
    modalClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeServiceModal();
    });
  }

  if (modalCta) {
    modalCta.addEventListener('click', (e) => {
      e.preventDefault();
      closeServiceModal();
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        e.preventDefault();
        closeServiceModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeServiceModal();
    }
  });

  document.querySelectorAll('.btn-service-select').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const slide = btn.closest('.portfolio-slide');
      if (slide) {
        const serviceKey = slide.getAttribute('data-service');
        if (serviceKey && serviceDetails[serviceKey]) {
          e.preventDefault();
          e.stopPropagation();
          openServiceModal(serviceKey);
        }
      }
    });
  });

  /* --------------------------------------------------------
     Log project info (dev only)
  -------------------------------------------------------- */
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    console.log('%cPRESTUS Website', 'color: #0B5FA5; font-size: 14px; font-weight: bold;');
    console.log('Frontend-only build. Enhanced corporate features active.');
  }
})();
