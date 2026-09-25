import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { lockScroll, unlockScroll } from '../utils/scrollLock.js';

const CATEGORIES_ALL = { pt: 'Todos', en: 'All' };

export default function News({ onRequestService }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [openArticle, setOpenArticle] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/news');
        const json = await res.json();
        if (!cancelled && json.success) {
          setArticles(json.data);
        }
      } catch {
        // silently ignore — component shows empty state
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Collect unique categories
  const categories = ['Todos', ...new Set(articles.map((a) => a.category))];

  const filtered =
    activeCategory === 'Todos'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  // Lock body scroll when article modal is open
  useEffect(() => {
    if (openArticle) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [openArticle]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && openArticle) setOpenArticle(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openArticle]);

  const title = (a) => (lang === 'en' ? a.titleEn || a.titlePt : a.titlePt);
  const summary = (a) => (lang === 'en' ? a.summaryEn || a.summaryPt : a.summaryPt);
  const content = (a) => (lang === 'en' ? a.contentEn || a.contentPt : a.contentPt);
  const category = (a) => (lang === 'en' ? a.categoryEn || a.category : a.category);

  return (
    <section id="noticias" className="news-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">{t('news.label')}</span>
          <h2>
            {t('news.titleA')}
            <em>{t('news.titleEm')}</em>
          </h2>
          <p>{t('news.subtitle')}</p>
        </div>

        {/* Category Filter */}
        <div className="news-categories reveal">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`news-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'Todos' ? CATEGORIES_ALL[lang] : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="news-loading">
            <span className="btn-spinner" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="news-empty">{t('news.empty')}</p>
        ) : (
          <div className="news-grid">
            {filtered.map((article) => (
              <article
                className={`news-card reveal ${article.featured ? 'featured' : ''}`}
                key={article.id}
              >
                <div className="news-card-img">
                  <img src={article.image} alt={title(article)} loading="lazy" decoding="async" />
                  {article.featured && <span className="news-badge">{lang === 'en' ? 'Featured' : 'Destaque'}</span>}
                </div>
                <div className="news-card-body">
                  <span className="news-card-category">{category(article)}</span>
                  <h3 className="news-card-title">{title(article)}</h3>
                  <p className="news-card-summary">{summary(article)}</p>
                  <div className="news-card-meta">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setOpenArticle(article)}
                  >
                    {t('news.readMore')}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Article Modal */}
      {openArticle && (
        <div
          className="modal-overlay active"
          role="dialog"
          aria-labelledby="news-modal-title"
          onClick={(e) => {
            if (e.target.classList.contains('modal-overlay')) setOpenArticle(null);
          }}
        >
          <div className="modal-card news-modal-card">
            <button
              type="button"
              className="modal-close"
              aria-label={t('news.closeModal')}
              onClick={() => setOpenArticle(null)}
            >
              &times;
            </button>
            <div className="modal-header">
              <span className="section-label">{category(openArticle)}</span>
              <h3 id="news-modal-title">{title(openArticle)}</h3>
              <div className="news-modal-meta">
                <span>{t('news.datePrefix')} {openArticle.date}</span>
                <span>{t('news.authorPrefix')} {openArticle.author}</span>
                <span>{t('news.readTimePrefix')} {openArticle.readTime}</span>
              </div>
            </div>
            <div
              className="modal-body"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content(openArticle)) }}
            />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => {
                  setOpenArticle(null);
                  onRequestService?.('contacto');
                }}
              >
                {t('news.modalCta')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
