// One theme preference across home and all reading pages. Storage is optional.
(() => {
  const html=document.documentElement;
  const toggle=document.getElementById('themeToggle');
  const system=window.matchMedia?.('(prefers-color-scheme: dark)');
  let stored=null;try{stored=localStorage.getItem('theme')}catch{}
  function apply(dark){html.classList.toggle('dark',dark);toggle?.setAttribute('aria-pressed',String(dark));}
  apply(stored?stored==='dark':!!system?.matches);
  if(toggle){if(toggle.tagName!=='BUTTON'){toggle.setAttribute('role','button');toggle.tabIndex=0;toggle.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle.click();}});}toggle.addEventListener('click',()=>{const dark=!html.classList.contains('dark');apply(dark);stored=dark?'dark':'light';try{localStorage.setItem('theme',stored)}catch{}});}
  system?.addEventListener('change',e=>{if(!stored)apply(e.matches);});
})();
