import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { lockScroll, unlockScroll } from '../utils/scrollLock.js';

const ALL_CATEGORIES = 'Todos';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function News() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [openArticle, setOpenArticle] = useState(null);
  const overlayRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled && json.success) {
          setArticles(json.data);
        } else if (!cancelled) {
          setLoadError(true);
        }
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Collect unique categories
  const categories = [ALL_CATEGORIES, ...new Set(articles.map((a) => a.category))];

  const filtered =
    activeCategory === ALL_CATEGORIES
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

  // Focus management: focus the dialog on open, restore trigger on close
  useEffect(() => {
    if (!openArticle) return undefined;
    const closeBtn = overlayRef.current?.querySelector('.modal-close');
    closeBtn?.focus();
    return () => {
      const prev = previousFocusRef.current;
      if (prev && typeof prev.focus === 'function') prev.focus();
    };
  }, [openArticle]);

  // Tab focus trap inside the article dialog
  useEffect(() => {
    if (!openArticle) return undefined;
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const focusables = overlayRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusables || !focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (!overlayRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openArticle]);

  const openModal = (article) => {
    previousFocusRef.current = document.activeElement;
    setOpenArticle(article);
  };

  const title = (a) => (lang === 'en' ? a.titleEn || a.titlePt : a.titlePt);
  const summary = (a) => (lang === 'en' ? a.summaryEn || a.summaryPt : a.summaryPt);
  const content = (a) => (lang === 'en' ? a.contentEn || a.contentPt : a.contentPt);
  const category = (a) => (lang === 'en' ? a.categoryEn || a.category : a.category);
  const author = (a) => (lang === 'en' ? a.authorEn || a.author : a.author);

  // Parse 'YYYY-MM-DD' manually to avoid timezone shifts from Date parsing.
  const formatDate = (iso) => {
    const [y, m, d] = String(iso).split('-').map(Number);
    if (!y || !m || !d) return iso;
    const locale = lang === 'en' ? 'en-GB' : 'pt-PT';
    return new Date(y, m - 1, d).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Category button labels in the active language (filtering stays on PT keys).
  const categoryLabel = (cat) => {
    if (cat === ALL_CATEGORIES) return t('news.allCategories');
    const sample = articles.find((a) => a.category === cat);
    return lang === 'en' ? sample?.categoryEn || cat : cat;
  };

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
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="news-loading" role="status" aria-label={t('news.label')}>
            <span className="btn-spinner" />
          </div>
        ) : loadError ? (
          <p className="news-empty">{t('news.error')}</p>
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
                  {article.featured && <span className="news-badge">{t('news.featured')}</span>}
                </div>
                <div className="news-card-body">
                  <span className="news-card-category">{category(article)}</span>
                  <h3 className="news-card-title">{title(article)}</h3>
                  <p className="news-card-summary">{summary(article)}</p>
                  <div className="news-card-meta">
                    <span>{formatDate(article.date)}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => openModal(article)}
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
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
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
                <span>
                  {t('news.datePrefix')} {formatDate(openArticle.date)}
                </span>
                <span>
                  {t('news.authorPrefix')} {author(openArticle)}
                </span>
                <span>
                  {t('news.readTimePrefix')} {openArticle.readTime}
                </span>
              </div>
            </div>
            <div
              className="modal-body"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content(openArticle)) }}
            />
            <div className="modal-footer">
              <a href="#contacto" className="btn btn-accent" onClick={() => setOpenArticle(null)}>
                {t('news.modalCta')}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
