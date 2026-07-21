/* ============================================
   AI 知识库 · 全站共享交互脚本 v2(分页模式)
   左侧目录 = Tab:点击切换章节页,不再整页长滚动
   其余:进度条 / 筛选 / 复制 / 灯箱 / ⌘K 跳转 / 阅读记忆
   ============================================ */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const menuBtn=$('#menuBtn'),sidebar=$('#sidebar'),topBtn=$('#topBtn'),prog=$('#prog'),sf=$('#sideFilter');
/* 移动端侧栏遮罩:打开时点正文/遮罩或按 Esc 关闭 */
let sbBackdrop=null;
if(sidebar){
  sbBackdrop=document.createElement('div');sbBackdrop.className='sb-backdrop';
  document.body.appendChild(sbBackdrop);
  const syncSb=()=>sbBackdrop.classList.toggle('on',sidebar.classList.contains('open'));
  sbBackdrop.addEventListener('click',()=>{sidebar.classList.remove('open');syncSb()});
  menuBtn&&menuBtn.addEventListener('click',()=>{sidebar.classList.toggle('open');syncSb()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('open')){sidebar.classList.remove('open');syncSb()}});
  window.__syncSb=syncSb;   /* 供下方链接点击关闭时同步遮罩 */
}
topBtn&&topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

function onScroll(){topBtn&&topBtn.classList.toggle('show',scrollY>600);
  if(prog){const h=document.documentElement;
    const total=h.scrollHeight-innerHeight;
    prog.style.width=(total>0?Math.min(100,scrollY/total*100):0)+'%'}}
addEventListener('scroll',onScroll,{passive:true});

/* ---------- 分页模式:把每个侧栏条目变成一页 ---------- */
const wrap=$('.wrap');
const links=$$('.sidebar a[href^="#"]');
const pageIds=links.map(a=>a.getAttribute('href').slice(1));
const firstId=pageIds[0];
const pages={};                 // pageId -> 顶层元素数组
const elPage=new Map();         // 顶层元素 -> pageId
let curPage=null;

const clean=s=>s.replace(/^\d+\s*/,'').trim();
function labelOf(id){const a=links.find(l=>l.getAttribute('href')==='#'+id);
  return a?clean(a.textContent):id}

(function buildPages(){
  if(!wrap||!pageIds.length)return;
  let cur=null;const pre=[];
  [...wrap.children].forEach(ch=>{
    if(ch.classList&&ch.classList.contains('footer'))return;   // 页脚常驻
    if(ch.id&&pageIds.includes(ch.id))cur=ch.id;
    if(cur===null){pre.push(ch);return}
    (pages[cur]=pages[cur]||[]).push(ch);elPage.set(ch,cur);
  });
  if(pre.length&&pages[firstId]){                               // hero 等归入第一页
    pages[firstId]=[...pre,...pages[firstId]];
    pre.forEach(ch=>elPage.set(ch,firstId));
  }
})();
const order=pageIds.filter(id=>pages[id]);

/* 底部 上一章/下一章 */
let pv=null,nx=null;
if(order.length){
  const pager=document.createElement('div');pager.className='pager';
  pager.innerHTML='<a class="pv"></a><a class="nx"></a>';
  const foot=$('.wrap .footer');
  foot?wrap.insertBefore(pager,foot):wrap.appendChild(pager);
  pv=pager.querySelector('.pv');nx=pager.querySelector('.nx');
}
function updatePager(){
  if(!pv)return;
  const i=order.indexOf(curPage);
  const p=order[i-1],n=order[i+1];
  pv.style.visibility=p?'visible':'hidden';
  nx.style.visibility=n?'visible':'hidden';
  if(p){pv.innerHTML='<span>← 上一章</span><b>'+labelOf(p)+'</b>';pv.onclick=()=>showPage(p)}
  if(n){nx.innerHTML='<span>下一章 →</span><b>'+labelOf(n)+'</b>';nx.onclick=()=>showPage(n)}
}

function showPage(id,anchor){
  if(!order.length)return;
  if(!pages[id])id=firstId;
  if(curPage!==id){
    Object.entries(pages).forEach(([pid,els])=>
      els.forEach(el=>el.classList.toggle('page-hidden',pid!==id)));
    curPage=id;
    pages[id].forEach(el=>{el.classList.remove('pg-anim');void el.offsetWidth;el.classList.add('pg-anim')});
    links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
    updatePager();
    try{localStorage.setItem('pkb-last',JSON.stringify({
      page:location.pathname.split('/').pop(),anchor:id,label:labelOf(id),
      doc:document.title.split('·')[0].trim(),ts:Date.now()}))}catch(e){}
  }
  history.replaceState(null,'','#'+(anchor||id));
  if(anchor&&anchor!==id){const el=document.getElementById(anchor);
    if(el){setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),40)}}
  else scrollTo({top:0});
  onScroll();
}
/* 任意锚点(含章节内 h3)→ 先切页再定位 */
function revealAnchor(id){
  if(pages[id]){showPage(id);return}
  const el=document.getElementById(id);
  if(!el){showPage(firstId);return}
  let p=el;while(p&&p.parentElement&&p.parentElement!==wrap)p=p.parentElement;
  showPage(elPage.get(p)||firstId,id);
}
/* 侧栏点击 = 切页 */
links.forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();
  showPage(a.getAttribute('href').slice(1));
  sidebar&&sidebar.classList.remove('open');
  window.__syncSb&&window.__syncSb();
}));
/* 正文内部锚点链接(速查卡片、交叉引用)同样切页 */
wrap&&wrap.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');
  if(!a||!wrap.contains(a))return;
  e.preventDefault();revealAnchor(a.getAttribute('href').slice(1));
});

/* ---------- 图片:失败兜底 + 灯箱 ---------- */
const lb=document.createElement('div');lb.className='lightbox';
const lbImg=document.createElement('img');lb.appendChild(lbImg);document.body.appendChild(lb);
lb.addEventListener('click',()=>lb.classList.remove('on'));
$$('figure img').forEach(im=>{
  im.addEventListener('error',()=>{const fb=im.getAttribute('data-fallback');
    if(fb){im.removeAttribute('data-fallback');im.src=fb;return}
    const f=im.closest('figure');if(f)f.style.display='none'});
  im.addEventListener('click',()=>{lbImg.src=im.src;lb.classList.add('on')})});

/* ---------- 代码块复制 ---------- */
$$('pre').forEach(p=>{const b=document.createElement('button');b.className='copy-btn';b.textContent='复制';
  b.addEventListener('click',async()=>{const c=p.querySelector('code');const t=(c||p).innerText;
    try{await navigator.clipboard.writeText(t)}
    catch(e){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);
      ta.select();document.execCommand('copy');ta.remove()}
    b.textContent='已复制 ✓';b.classList.add('ok');
    setTimeout(()=>{b.textContent='复制';b.classList.remove('ok')},1600)});
  p.appendChild(b)});

/* ---------- 侧栏章节筛选 ---------- */
sf&&sf.addEventListener('input',()=>{const q=sf.value.trim().toLowerCase();
  $$('.nav-group').forEach(g=>{let vis=0;
    g.querySelectorAll('a').forEach(a=>{const hit=!q||a.textContent.toLowerCase().includes(q);
      a.style.display=hit?'':'none';if(hit)vis++});
    g.style.display=vis?'':'none'})});

/* ---------- ⌘K 快速跳转(自动切页) ---------- */
function escq(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
const items=[];let lastH2='';
$$('h2, h3').forEach((h,i)=>{
  let anchor=h.id;
  if(!anchor){const sec=h.closest('section[id]');
    if(h.tagName==='H2'&&sec)anchor=sec.id;else{h.id=h.tagName.toLowerCase()+'-'+i;anchor=h.id}}
  if(h.tagName==='H2'){lastH2=h.textContent.trim();items.push({id:anchor,label:lastH2,group:''})}
  else items.push({id:anchor,label:h.textContent.trim(),group:lastH2})});
const pal=document.createElement('div');pal.className='palette';
pal.innerHTML='<div class="box"><input placeholder="输入关键词,跳转到任意章节…"><div class="list"></div>'+
  '<div class="hint"><span>↑↓ 选择</span><span>Enter 跳转</span><span>Esc 关闭</span><span>← → 翻章</span></div></div>';
document.body.appendChild(pal);
const pin=pal.querySelector('input'),plist=pal.querySelector('.list');
let sel=0,shown=[];
function renderPal(){const q=pin.value.trim().toLowerCase();
  shown=items.filter(it=>!q||(it.label+' '+it.group).toLowerCase().includes(q)).slice(0,40);
  if(sel>=shown.length)sel=Math.max(0,shown.length-1);
  plist.innerHTML=shown.length?shown.map((it,i)=>
    '<div class="it'+(i===sel?' sel':'')+'" data-i="'+i+'">'+
    (it.group?escq(it.label):'<b>'+escq(it.label)+'</b>')+
    (it.group?'<span class="g">'+escq(it.group)+'</span>':'')+'</div>').join('')
    :'<div class="empty">没有匹配的章节</div>';
  plist.querySelectorAll('.it').forEach(el=>el.addEventListener('click',()=>go(+el.dataset.i)));
  const s=plist.querySelector('.it.sel');s&&s.scrollIntoView({block:'nearest'})}
function openPal(){pal.classList.add('on');pin.value='';sel=0;renderPal();setTimeout(()=>pin.focus(),30)}
function closePal(){pal.classList.remove('on')}
function go(i){const it=shown[i];if(!it)return;closePal();revealAnchor(it.id)}
pin.addEventListener('input',()=>{sel=0;renderPal()});
pin.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'){e.preventDefault();if(sel<shown.length-1)sel++;renderPal()}
  else if(e.key==='ArrowUp'){e.preventDefault();if(sel>0)sel--;renderPal()}
  else if(e.key==='Enter'){e.preventDefault();go(sel)}});
pal.addEventListener('click',e=>{if(e.target===pal)closePal()});

/* ---------- 顶栏跳转按钮 ---------- */
const kb=document.createElement('button');kb.className='kbtn';
kb.innerHTML='跳转 <span>'+(navigator.platform.indexOf('Mac')>-1?'⌘K':'Ctrl K')+'</span>';
kb.addEventListener('click',openPal);
const tr=$('.topbar .right');tr&&tr.prepend(kb);

/* ---------- 全局键盘 ---------- */
addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();
    pal.classList.contains('on')?closePal():openPal();return}
  if(e.key==='Escape'){
    if(pal.classList.contains('on')){closePal();return}
    if(lb.classList.contains('on')){lb.classList.remove('on');return}}
  const t=e.target;
  const typing=t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable;
  if(typing||pal.classList.contains('on'))return;
  if(e.key==='/'&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault();
    if(sf&&innerWidth>1080)sf.focus();else openPal();return}
  /* ← → 上一章/下一章 */
  if((e.key==='ArrowLeft'||e.key==='ArrowRight')&&order.length&&!e.metaKey&&!e.ctrlKey&&!e.altKey){
    const i=order.indexOf(curPage);
    if(e.key==='ArrowLeft'&&order[i-1])showPage(order[i-1]);
    if(e.key==='ArrowRight'&&order[i+1])showPage(order[i+1]);
  }
});

/* ---------- 初始化:按 URL 锚点直达对应页 ---------- */
if(order.length){
  const hash=decodeURIComponent(location.hash.slice(1));
  hash?revealAnchor(hash):showPage(firstId);
}
onScroll();
