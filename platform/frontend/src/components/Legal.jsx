import { useTranslation } from 'react-i18next';

function LegalSection({ id, block }) {
  if (!block || typeof block !== 'object') return null;
  return (
    <section id={id} className="legal-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">{block.label}</span>
          <h2>
            {block.titleA}
            <em>{block.titleEm}</em>
          </h2>
          <p>{block.intro}</p>
        </div>
        <div className="legal-content reveal">
          {(block.sections || []).map((item) => (
            <div className="legal-item" key={item.h}>
              <h3>{item.h}</h3>
              <p>{item.p}</p>
            </div>
          ))}
          <p className="legal-updated">{block.updated}</p>
        </div>
      </div>
    </section>
  );
}

export default function Legal() {
  const { t } = useTranslation();
  const privacy = t('legal.privacy', { returnObjects: true });
  const terms = t('legal.terms', { returnObjects: true });

  return (
    <>
      <LegalSection id="privacidade" block={privacy} />
      <LegalSection id="termos" block={terms} />
    </>
  );
}
