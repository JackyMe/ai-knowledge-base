/**
 * i18n.js
 * Handles language auto-detection, redirection, and the CN/EN toggle.
 */
(function() {
  const isEnPage = window.location.pathname.endsWith('.en.html');
  
  function getPreferredLang() {
    let savedLang = localStorage.getItem('site_lang');
    if (savedLang === 'en' || savedLang === 'zh') return savedLang;
    
    // Auto-detect based on browser language
    let browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }

  function applyLanguageRedirect() {
    const targetLang = getPreferredLang();
    
    if (targetLang === 'en' && !isEnPage) {
      // Avoid redirecting if the page might not exist (optional safety, but we ensure all .en.html are created)
      let currentPath = window.location.pathname;
      if (currentPath.endsWith('/')) currentPath += 'index.html';
      
      let newPath = currentPath.replace(/\.html$/, '.en.html');
      if (newPath === currentPath) newPath = currentPath + 'index.en.html';
      
      window.location.replace(newPath + window.location.search + window.location.hash);
    } 
    else if (targetLang === 'zh' && isEnPage) {
      let newPath = window.location.pathname.replace(/\.en\.html$/, '.html');
      window.location.replace(newPath + window.location.search + window.location.hash);
    }
  }

  // Execute redirect check immediately to prevent flicker
  applyLanguageRedirect();

  // Setup UI toggle on DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    const toggleCb = document.getElementById('lang-toggle-cb');
    if (toggleCb) {
      const currentLang = isEnPage ? 'en' : 'zh';
      
      // Update checkbox state
      toggleCb.checked = currentLang === 'en';
      
      // Move knob based on state
      const knob = toggleCb.nextElementSibling.querySelector('.knob');
      if (knob) {
        knob.style.transform = currentLang === 'en' ? 'translateX(28px)' : 'translateX(0)';
      }
      
      toggleCb.addEventListener('change', () => {
        const newLang = toggleCb.checked ? 'en' : 'zh';
        localStorage.setItem('site_lang', newLang);
        // Reload will trigger the redirect script
        window.location.reload();
      });
    }
  });
})();
