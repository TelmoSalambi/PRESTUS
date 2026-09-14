/**
 * src/routes/services.js
 * Returns list and metadata of the 10 services.
 */
import { Router } from 'express';

const router = Router();

const SERVICES = [
  { id: 'construcao', category: 'Construção Civil e Obras Públicas', alvara: '1637/CCOP/IRCOP/SC/2026', limit: '750.000.000,00 AKZ' },
  { id: 'fiscalizacao', category: 'Fiscalização de Obras Públicas', alvara: '99/FO/IRCOP/SC/2024', limit: '250.000.000,00 AKZ' },
  { id: 'saude', category: 'Saúde e Material Hospitalar', certification: 'SNCP Nº 671/2025' },
  { id: 'limpeza', category: 'Limpeza, Saneamento e Higienização' },
  { id: 'informatica', category: 'Materiais e Redes Informáticas' },
  { id: 'escritorio', category: 'Mobiliário e Consumíveis de Escritório' },
  { id: 'diversos', category: 'Fornecimento de Bens e Serviços Diversos' },
  { id: 'alimentacao', category: 'Merenda e Alimentação Escolar' },
  { id: 'logistica', category: 'Logística e Planificação' },
  { id: 'pesca', category: 'Gestão de Recursos Pesqueiros' },
];

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: SERVICES,
  });
});

export default router;
