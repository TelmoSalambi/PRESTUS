import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Marquee() {
  const { t } = useTranslation();
  const items = t('marquee', { returnObjects: true }) || [];

  const renderContent = () => (
    <div className="marquee-content">
      {items.map((text, idx) => (
        <React.Fragment key={idx}>
          <span>{text}</span>
          <span className="marquee-dot">&bull;</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="corporate-marquee" aria-hidden="true">
      <div className="marquee-track">
        {renderContent()}
        {renderContent()}
      </div>
    </div>
  );
}
