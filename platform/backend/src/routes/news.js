/**
 * src/routes/news.js
 * Corporate News & Ongoing Projects (Obras em Curso) API endpoints.
 */
import { Router } from 'express';
import { db } from '../config/firebase.js';

const router = Router();

// Professional initial articles reflecting PRESTUS capabilities and licenses in Angola
const INITIAL_ARTICLES = [
  {
    id: 'noticia-1',
    slug: 'avanco-obras-infraestrutura-rodoviaria-huila',
    category: 'Construção Civil',
    categoryEn: 'Civil Construction',
    titlePt: 'Avanço das Obras de Infraestrutura Rodoviária e Contenção na Província da Huíla',
    titleEn: 'Progress on Road Infrastructure and Retaining Works in Huíla Province',
    summaryPt: 'Equipas de engenharia da PRESTUS executam terraplenagem, pavimentação e obras de contenção sob rigorosos padrões técnicos e controlo laboratorial.',
    summaryEn: 'PRESTUS engineering teams execute earthworks, paving, and retaining structures under strict technical standards and laboratory controls.',
    image: '/IMG/Construção Civil.webp',
    date: '2026-02-15',
    author: 'Direção de Engenharia e Obras',
    readTime: '4 min',
    featured: true,
    tags: ['Construção', 'Huíla', 'Alvará 6ª Classe', 'Infraestruturas'],
    contentPt: `
      <p class="lead">A <strong>PRESTUS, (SU) LDA</strong> continua a consolidar a sua capacidade técnica na Província da Huíla com a execução acelerada de empreitadas de infraestruturas rodoviárias e obras de arte.</p>
      
      <h4>Capacidade Operacional de 6ª Classe</h4>
      <p>Com o <strong>Alvará de Construção Civil de 6ª Classe (Nº 1637/CCOP/IRCOP/SC/2026)</strong>, a empresa mobilizou maquinaria pesada própria, incluindo motoniveladoras, cilindros compactadores e centrais de betão, assegurando autonomia logística na execução dos trabalhos.</p>
      
      <blockquote>
        "O nosso compromisso com a Huíla é entregar obras com durabilidade excecional, respeitando escrupulosamente os cadernos de encargos e os prazos contratuais acordados com os clientes."
        <footer>— Engenharia e Fiscalização de Obras PRESTUS</footer>
      </blockquote>

      <h4>Controlo Rigoroso de Qualidade</h4>
      <p>Todas as fases da obra passam por ensaios laboratoriais de densidade in-situ, controlo de humidade ótima e resistência mecânica de provetes de betão, garantindo a conformidade com as normas angolanas e internacionais.</p>
    `,
    contentEn: `
      <p class="lead"><strong>PRESTUS, (SU) LDA</strong> continues to strengthen its technical delivery in Huíla Province with the ongoing execution of road infrastructure and structural engineering projects.</p>
      
      <h4>Class 6 Execution Capacity</h4>
      <p>Backed by our <strong>Class 6 Civil Construction License (No. 1637/CCOP/IRCOP/SC/2026)</strong>, PRESTUS mobilized its own fleet of heavy equipment, ensuring logistical autonomy across all project stages.</p>
      
      <blockquote>
        "Our commitment to Huíla is to deliver durable infrastructure that strictly complies with specifications and regulatory milestones."
        <footer>— PRESTUS Engineering Division</footer>
      </blockquote>

      <h4>Rigorous Quality Assurance</h4>
      <p>All phases undergo geotechnical laboratory tests, in-situ density verification, and concrete compression tests according to Angolan building standards.</p>
    `,
  },
  {
    id: 'noticia-2',
    slug: 'fornecimento-equipamentos-hospitalares-luanda-sul',
    category: 'Saúde & Hospitalar',
    categoryEn: 'Healthcare & Supplies',
    titlePt: 'PRESTUS Reforça Fornecimento de Equipamentos Médicos e Consumíveis Hospitalares',
    titleEn: 'PRESTUS Expands Supply of Medical Equipment and Specialized Hospital Consumables',
    summaryPt: 'Entrega de monitores de sinais vitais, ecógrafos de alta definição e mobiliário clínico a centros de saúde, garantindo cadeia de frio e certificação SNCP.',
    summaryEn: 'Delivery of vital sign monitors, high-definition ultrasound systems, and clinical furniture, ensuring temperature-controlled logistics and SNCP certification.',
    image: '/IMG/Saúde.webp',
    date: '2026-01-28',
    author: 'Divisão de Saúde e Farmacêutica',
    readTime: '3 min',
    featured: true,
    tags: ['Saúde', 'Material Hospitalar', 'SNCP Nº 671', 'Medicamentos'],
    contentPt: `
      <p class="lead">Como fornecedora habilitada do Estado Angolano com <strong>Certificado SNCP Nº 671/SNCP/2025</strong>, a PRESTUS concluiu com êxito mais uma etapa de fornecimento de equipamentos de diagnóstico e materiais cirúrgicos.</p>
      
      <h4>Tecnologia Médica Certificada</h4>
      <p>O lote fornecido inclui ecógrafos digitais portáteis de última geração, eletrocardiógrafos multiparamétricos, camas articuladas elétricas e reagentes laboratoriais essenciais para atendimento de urgência e maternidades.</p>
      
      <h4>Conformidade e Rastreabilidade</h4>
      <p>Todos os lotes possuem certificados de conformidade do fabricante, registo farmacêutico ativo e rastreabilidade integral desde a importação até à entrega final no destino.</p>
    `,
    contentEn: `
      <p class="lead">As an official State Certified Supplier with <strong>SNCP Certificate No. 671/SNCP/2025</strong>, PRESTUS completed another milestone in the delivery of diagnostic equipment and clinical supplies.</p>
      
      <h4>Certified Medical Technology</h4>
      <p>Supplies include portable ultrasound devices, multiparameter patient monitors, electric hospital beds, and emergency reagents.</p>
      
      <h4>Traceability and Compliance</h4>
      <p>All items carry active manufacturer quality certificates and complete traceability from importation to on-site assembly.</p>
    `,
  },
  {
    id: 'noticia-3',
    slug: 'auditoria-fiscalizacao-tecnica-edificios-publicos',
    category: 'Fiscalização de Obras',
    categoryEn: 'Public Works Supervision',
    titlePt: 'Auditoria e Fiscalização Técnica: Garantia de Rigor e Transparência nos Gastos Públicos',
    titleEn: 'Technical Audit & Project Supervision: Ensuring Rigor and Transparency in Public Works',
    summaryPt: 'Com Alvará de Fiscalização de 6ª Classe, a equipa pericial da PRESTUS atua na validação de medições e cumprimento estrito de cadernos de encargos.',
    summaryEn: 'Holding a Class 6 Public Works Supervision License, the PRESTUS expert team validates contractor measurements and strict specification compliance.',
    image: '/IMG/Fiscalização.webp',
    date: '2026-01-10',
    author: 'Gabinete Pericial de Engenharia',
    readTime: '5 min',
    featured: false,
    tags: ['Fiscalização', 'Engenharia', 'Auditoria', 'IRCOP'],
    contentPt: `
      <p class="lead">A fiscalização independente é a maior garantia do dono de obra para assegurar que cada Kwanza investido se traduz em solidez e qualidade construtiva.</p>
      
      <h4>Alvará de 6ª Classe do IRCOP</h4>
      <p>Autorizada pelo <strong>Alvará de Fiscalização Nº 99/FO/IRCOP/SC/2024</strong> (capacidade até 250M AKZ), a PRESTUS presta serviços periciais de auditoria estrutural, medição física de avanço de obra e emissão de pareceres técnicos vinculativos.</p>
      
      <h4>Prevenção de Desvios de Prazos e Custos</h4>
      <p>A presença diária dos nossos engenheiros fiscais no estaleiro previne anomalias construtivas, desperdício de materiais e incumprimento de normas de higiene e segurança no trabalho.</p>
    `,
    contentEn: `
      <p class="lead">Independent technical supervision is the primary guarantee that construction investments match exact contract requirements.</p>
      
      <h4>IRCOP Class 6 License</h4>
      <p>Authorized by <strong>Supervision License No. 99/FO/IRCOP/SC/2024</strong>, PRESTUS delivers technical auditing, milestone validation, and binding engineering opinions.</p>
    `,
  },
  {
    id: 'noticia-4',
    slug: 'renovacao-credenciais-sncp-conformidade-tributaria-agt',
    category: 'Institucional',
    categoryEn: 'Corporate',
    titlePt: 'PRESTUS Reafirma Conformidade Integral perante o SNCP, AGT e INSS para 2026',
    titleEn: 'PRESTUS Reaffirms Full Compliance with SNCP, Tax Authority (AGT), and Social Security (INSS)',
    summaryPt: 'Empresa mantém todas as certidões de regularidade fiscal e contributiva ativas, comprovando idoneidade jurídica para novos concursos em Angola.',
    summaryEn: 'The company maintains all tax and social security certificates active, proving legal standing for upcoming public procurement contracts.',
    image: '/IMG/Quem somos.webp',
    date: '2025-12-20',
    author: 'Gabinete Jurídico e Conformidade',
    readTime: '3 min',
    featured: false,
    tags: ['SNCP', 'AGT', 'INSS', 'Conformidade'],
    contentPt: `
      <p class="lead">A regularidade fiscal e a transparência jurídica são pilares inegociáveis na operação corporativa da <strong>PRESTUS</strong> em Angola.</p>
      <p>A administração confirma a renovação de todas as certidões perante a Administração Geral Tributária (AGT), Instituto Nacional de Segurança Social (INSS) e o Serviço Nacional da Contratação Pública (SNCP).</p>
      <p>Este estatuto confere tranquilidade e segurança jurídica a todas as entidades públicas e privadas que celebram parcerias connosco.</p>
    `,
    contentEn: `
      <p class="lead">Tax and legal compliance remain non-negotiable foundations for <strong>PRESTUS</strong> operations across Angola.</p>
      <p>Management confirms active standing before the General Tax Administration (AGT), the National Institute of Social Security (INSS), and public procurement authorities (SNCP).</p>
    `,
  },
];

// In-memory or Firestore data fetch
router.get('/', async (req, res, next) => {
  try {
    const { category, featured } = req.query;

    let articles = [...INITIAL_ARTICLES];

    if (category && category !== 'Todos' && category !== 'All') {
      articles = articles.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase() || a.categoryEn.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === 'true') {
      articles = articles.filter((a) => a.featured);
    }

    res.json({
      success: true,
      total: articles.length,
      data: articles,
    });
  } catch (err) {
    next(err);
  }
});

// Single article by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = INITIAL_ARTICLES.find((a) => a.slug === slug);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artigo não encontrado.',
      });
    }

    res.json({
      success: true,
      data: article,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
