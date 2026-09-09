/* Non-invasive reading affordances; original pagination/navigation owns chapter state. */
(() => {
  const lang=document.documentElement.lang.split('-')[0];
  const copy={zh:['跳至正文','切换深色模式','横向滚动阅读表格','打开章节目录'],en:['Skip to content','Toggle dark mode','Scrollable table','Open chapter navigation'],ja:['本文へ移動','ダークモード切替','横スクロールの表','章の目次を開く'],ko:['본문으로 이동','다크 모드 전환','가로 스크롤 표','챕터 목록 열기']}[lang]||['Skip to content','Toggle dark mode','Scrollable table','Open chapter navigation'];
  const main=document.querySelector('main,.main,.main-wrap');
  if(main){if(!main.id)main.id='readerContent';main.tabIndex=-1;const skip=document.createElement('a');skip.className='reader-skip';skip.href='#'+main.id;skip.textContent=copy[0];skip.addEventListener('click',e=>{e.preventDefault();main.focus();main.scrollIntoView({block:'start'});});document.body.prepend(skip);}
  const tools=document.querySelector('.topbar .right,.topbar-right');
  if(tools&&!document.getElementById('themeToggle')){const b=document.createElement('button');b.id='themeToggle';b.type='button';b.className='reader-theme';b.textContent='◐';b.setAttribute('aria-label',copy[1]);tools.append(b);}
  document.querySelectorAll('table').forEach(table=>{if(table.parentElement.classList.contains('table-scroll'))return;const scroller=document.createElement('div');scroller.className='table-scroll';scroller.tabIndex=0;scroller.setAttribute('role','region');scroller.setAttribute('aria-label',copy[2]);table.before(scroller);scroller.append(table);});
  if(location.pathname.includes('/topics/docker/')){
    const title=document.querySelector('h1')?.textContent.trim();
    try{localStorage.setItem('pkb-last',JSON.stringify({page:location.pathname.split('/').pop(),anchor:'',label:title,doc:'Docker',ts:Date.now()}));}catch{}
  }
  const sidebar=document.getElementById('sidebar')||document.querySelector('.sidebar');
  const menu=document.querySelector('#menuBtn,.menu-toggle');
  if(sidebar&&menu){if(!sidebar.id)sidebar.id='sidebar';menu.setAttribute('aria-controls',sidebar.id);menu.setAttribute('aria-label',copy[3]);const sync=()=>{const open=sidebar.classList.contains('open');menu.setAttribute('aria-expanded',String(open));const mobile=getComputedStyle(menu).display!=='none';sidebar.inert=mobile&&!open;};new MutationObserver(sync).observe(sidebar,{attributes:true,attributeFilter:['class']});window.addEventListener('resize',sync);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('open')){sidebar.classList.remove('open');document.querySelector('.sidebar-backdrop')?.classList.remove('active');menu.focus();sync();}});sync();}
})();
