/**
 * i18n.js
 * Handles language auto-detection, 4-way routing (zh / en / ja / ko),
 * and the [ 中 | EN | JA | KO ] segmented language switcher.
 */
(function() {
  // Explicit document URLs take precedence; storage is an optional preference.
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };
  function getCurrentPageLang() {
    const path = window.location.pathname;
    if (path.endsWith('.ko.html')) return 'ko';
    if (path.endsWith('.ja.html')) return 'ja';
    if (path.endsWith('.en.html')) return 'en';
    return 'zh';
  }

  function getPathForLang(targetLang) {
    let path = window.location.pathname;
    if (path.endsWith('/') || !path.endsWith('.html')) {
      path = path.replace(/\/?$/, '/index.html');
    }
    
    // Normalize to base .html
    let basePath = path.replace(/\.(en|ja|ko)\.html$/, '.html');
    
    if (targetLang === 'zh') {
      return basePath;
    } else if (targetLang === 'en') {
      return basePath.replace(/\.html$/, '.en.html');
    } else if (targetLang === 'ja') {
      return basePath.replace(/\.html$/, '.ja.html');
    } else if (targetLang === 'ko') {
      return basePath.replace(/\.html$/, '.ko.html');
    }
    return path;
  }

  function getPreferredLang() {
    let savedLang = storage.get('site_lang');
    if (savedLang === 'en' || savedLang === 'zh' || savedLang === 'ja' || savedLang === 'ko') return savedLang;
    
    // Auto-detect based on browser language
    let browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('zh')) return 'zh';
    return 'en';
  }

  function applyLanguageRedirect() {
    if (window.location.pathname.endsWith('.html')) return;
    const currentLang = getCurrentPageLang();
    const targetLang = getPreferredLang();
    
    if (currentLang !== targetLang) {
      const newPath = getPathForLang(targetLang);
      window.location.replace(newPath + window.location.search + window.location.hash);
    }
  }

  // Execute redirect check immediately to prevent flicker
  applyLanguageRedirect();

  // Setup UI toggle on DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentPageLang();

    // 1. Support 4-way segmented buttons (.lang-switcher)
    const buttons = document.querySelectorAll('.lang-switcher .lang-btn');
    buttons.forEach(btn => {
      const lang = btn.dataset.lang;
      const isActive = lang === currentLang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
      // Remove hardcoded inline styles so CSS theme handles active state
      btn.style.background = '';
      btn.style.color = '';
      btn.style.boxShadow = '';

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (lang === currentLang) return;
        storage.set('site_lang', lang);
        const targetPath = getPathForLang(lang);
        window.location.href = targetPath + window.location.search + window.location.hash;
      });
    });

    // 2. Backward-compatibility for old checkbox toggle if any remains
    const toggleCb = document.getElementById('lang-toggle-cb');
    if (toggleCb) {
      toggleCb.checked = currentLang === 'en';
      const knob = toggleCb.nextElementSibling ? toggleCb.nextElementSibling.querySelector('.knob') : null;
      if (knob) {
        knob.style.transform = currentLang === 'en' ? 'translateX(28px)' : 'translateX(0)';
      }
      toggleCb.addEventListener('change', () => {
        const newLang = toggleCb.checked ? 'en' : 'zh';
        storage.set('site_lang', newLang);
        window.location.href = getPathForLang(newLang) + window.location.search + window.location.hash;
      });
    }
  });
})();
