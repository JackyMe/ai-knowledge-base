/* Shared home: locale-specific content remains in the topic registries. */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const L = JSON.parse($('#home-strings').textContent);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const lang = document.documentElement.lang.split('-')[0];
  const suffix = ['en','ja','ko'].includes(lang) ? '-' + lang : '';
  const external = href => /^https?:\/\//.test(href);
  const attrs = href => external(href) ? ' target="_blank" rel="noopener"' : '';
  const store = {get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,value){try{localStorage.setItem(key,value)}catch{}}};
  const topics = [...TOPICS];
  const priority = ['claude-code-guide','codex-guide','google-ai-ecosystem','prompt-context-engineering','ai-leverage-guide','env-auth-clinic'];
  const rank = t => {const i=priority.findIndex(p=>t.href.split('/').pop().startsWith(p+'.'));return i<0?priority.length:i;};
  topics.sort((a,b)=>rank(a)-rank(b));
  const initials = t => {
    const file=t.href.split('/').pop();
    if(file.startsWith('claude'))return 'Cl'; if(file.startsWith('codex'))return 'Cx';
    if(file.startsWith('google'))return 'G'; if(file.startsWith('grok'))return 'xAI';
    if(file.startsWith('gpt'))return 'GPT'; if(file.startsWith('pencil'))return 'P';
    if(t.href.includes('/docker/'))return 'D'; return String(topics.indexOf(t)+1).padStart(2,'0');
  };
  const grid=$('#grid');
  grid.innerHTML=topics.map(t=>`<article class="topic" data-tag="${esc(t.tag)}">
    <div class="topic-head"><span class="topic-icon" aria-hidden="true">${initials(t)}</span><span class="topic-tag">${esc(t.tag)}</span><a href="${esc(t.href)}" aria-label="${esc(t.title)}">↗</a></div>
    <h3><a href="${esc(t.href)}">${esc(t.title)}</a></h3><p>${esc(t.desc)}</p>
    <div class="topic-bottom"><details><summary>${t.sections.length} ${L.chapterUnit} · ${L.chapters}</summary><div class="chapter-links">${t.sections.map(s=>`<a href="${esc(s.href||t.href)}${s.id?"#"+esc(s.id):""}">${esc(s.label)}</a>`).join('')}</div></details><a href="${esc(t.href)}">${L.read} →</a></div></article>`).join('');
  $('#topicCount').textContent=`${topics.length} ${L.topicUnit} / ${topics.reduce((n,t)=>n+t.sections.length,0)} ${L.chapterUnit}`;
  const tags=[...new Set(topics.map(t=>t.tag))];
  const tabs=$('#tabs');
  tabs.innerHTML=[null,...tags].map((tag,i)=>`<button type="button" class="${i===0?'on':''}" data-index="${i}" aria-pressed="${i===0}"><span>${esc(tag||L.all)}</span><span class="n">${tag?topics.filter(t=>t.tag===tag).length:topics.length}</span></button>`).join('');
  function filter(index){
    const tag=index===0?null:tags[index-1];
    tabs.querySelectorAll('button').forEach(b=>{const on=Number(b.dataset.index)===index;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));});
    grid.querySelectorAll('.topic').forEach(c=>c.hidden=!!tag&&c.dataset.tag!==tag);
    $('#filterCount').textContent=`${tag||L.all} · ${tag?topics.filter(t=>t.tag===tag).length:topics.length} ${L.topicUnit}`;
  }
  tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)filter(Number(b.dataset.index));});filter(0);
  $('#quickref').innerHTML=topics.flatMap(t=>t.sections.filter(s=>s.quick).map(s=>`<a href="${esc(s.href||t.href)}${s.id?"#"+esc(s.id):""}">${esc(s.quickLabel||s.label)} ↗</a>`)).join('');
  $('#paths').innerHTML=PATHS.map((p,i)=>`<details class="path"><summary><span class="path-number">${String(i+1).padStart(2,'0')}</span>${esc(p.title)}</summary><p>${esc(p.desc)}</p><ol>${p.steps.map((s,n)=>`<li><a href="${esc(s.href)}"${attrs(s.href)}><span class="n">${n+1}</span><span>${esc(s.label)}${external(s.href)?' ↗':''}<small>${esc(s.note)}</small></span></a></li>`).join('')}</ol></details>`).join('');
  $('#learnGrid').innerHTML=LEARN.map(l=>`<article class="learn"><span class="learn-tag">${esc(l.tag)}</span><h3><a href="${esc(l.href)}"${attrs(l.href)}>${esc(l.title)} ↗</a></h3><p>${esc(l.desc)}</p><div class="quick">${(l.links||[]).map(k=>`<a href="${esc(k.href)}"${attrs(k.href)}>${esc(k.label)}</a>`).join('')}</div></article>`).join('');
  try{
    const last=JSON.parse(store.get('pkb-last')||'null');
    // Match the full registered path, including multi-page Docker chapters.
    const hit=last&&topics.find(t=>t.href.split('/').pop()===last.page || (t.href.includes('/docker/') && /^\d{2}-[\w-]+(?:\.(?:en|ja|ko))?\.html$/.test(last.page)));
    if(hit&&store.get('pkb-resume-dismissed')!==String(last.ts)){
      const path=hit.href.includes('/docker/')?'topics/docker/'+last.page:hit.href;
      $('#resume').hidden=false;$('#resumeLink').href=path+'#'+encodeURIComponent(last.anchor||'');
      $('#resumeLabel').textContent=[last.doc,last.label].filter(Boolean).join(' › ');
      $('#resumeClose').addEventListener('click',()=>{store.set('pkb-resume-dismissed',String(last.ts));$('#resume').hidden=true;});
    }
  }catch{}
  const index=[];const byHref=new Map(topics.map(t=>[t.href,t]));
  topics.forEach(t=>t.sections.forEach(s=>{if(s.href)byHref.set(s.href,{...t,href:s.href});}));
  topics.forEach(t=>{
    const keywords=t.keywords||'';
    index.push({topic:t,label:t.title,id:'',text:`${t.title} ${t.desc} ${t.tag} ${keywords}`.toLowerCase(),isTopic:true});
    t.sections.forEach(s=>index.push({topic:s.href?{...t,href:s.href}:t,label:s.label,id:s.id,text:`${s.label} ${t.title} ${keywords}`.toLowerCase()}));
  });
  LEARN.forEach(t=>index.push({topic:t,label:t.title,id:'',text:`${t.title} ${t.desc} ${t.tag}`.toLowerCase(),isTopic:true}));
  let state='idle',selected=0,shown=[];
  const q=$('#q'),results=$('#results'),browse=$('#browse'),status=$('#searchStatus');
  function ensureContent(){
    if(state!=='idle')return;state='loading';status.textContent=L.loading;
    const script=document.createElement('script');script.src=`assets/js/search-index${suffix}.js`;
    script.onload=()=>{
      if(typeof CONTENT_INDEX!=='undefined')CONTENT_INDEX.forEach(c=>{const topic=byHref.get(c.href);if(topic)index.push({topic,label:c.label,id:c.id,raw:c.text,text:`${c.label} ${c.text}`.toLowerCase()});});
      state='ready';status.textContent='';if(q.value.trim())search();
    };
    script.onerror=()=>{state='error';status.textContent=L.error;};document.body.appendChild(script);
  }
  function highlight(text,term){const pos=text.toLowerCase().indexOf(term);return pos<0?esc(text):esc(text.slice(0,pos))+'<mark>'+esc(text.slice(pos,pos+term.length))+'</mark>'+esc(text.slice(pos+term.length));}
  function snippet(text,term){const pos=text.toLowerCase().indexOf(term);const start=Math.max(0,pos-45);const end=Math.min(text.length,Math.max(0,pos)+110);return (start?'…':'')+highlight(text.slice(start,end),term)+(end<text.length?'…':'');}
  function fuzzy(text,query){let at=-1,first=-1;for(const ch of query){at=text.indexOf(ch,at+1);if(at<0)return false;if(first<0)first=at;}return at-first<Math.max(12,query.length*5);}
  function selectResult(){results.querySelectorAll('.res').forEach((r,i)=>r.classList.toggle('sel',i===selected));const item=results.querySelector('.res.sel');if(item)item.scrollIntoView({block:'nearest'});}
  function search(){
    const query=q.value.trim().toLowerCase();$('#clearSearch').hidden=!q.value;
    if(!query){results.hidden=true;browse.hidden=false;shown=[];return;}
    ensureContent();const terms=query.split(/\s+/);const matches=new Map();
    for(const item of index){
      if(!terms.every(t=>item.text.includes(t)))continue;
      const key=item.topic.href+'#'+item.id;
      const score=(item.isTopic?100:0)+(terms.every(t=>item.label.toLowerCase().includes(t))?50:0)+(item.raw?5:0);
      if(!matches.has(key)||matches.get(key).score<score)matches.set(key,{...item,score});
    }
    if(matches.size<8&&query.replace(/\s/g,'').length>=2){
      for(const item of index){const key=item.topic.href+'#'+item.id;if(matches.has(key)||item.raw)continue;
        if(fuzzy(item.label.toLowerCase(),query.replace(/\s/g,'')))matches.set(key,{...item,score:-1,related:true});
      }
    }
    shown=[...matches.values()].sort((a,b)=>b.score-a.score).slice(0,40);selected=Math.min(selected,Math.max(0,shown.length-1));
    results.hidden=false;browse.hidden=true;
    results.innerHTML=`<div class="result-heading"><h2>${L.results} <small>· ${matches.size} ${L.resultUnit}${matches.size>40?' (40)':''}</small></h2><button class="text-button" type="button" data-clear>${L.back} ↗</button></div>`+(shown.length?shown.map((it,i)=>`<a class="res${i===selected?' sel':''}" href="${esc(it.topic.href)}${it.id?'#'+esc(it.id):''}"${attrs(it.topic.href)}><small>${esc(it.topic.tag)} · ${esc(it.topic.title)}${it.related?' · '+L.fuzzy:''}${external(it.topic.href)?' · '+L.external+' ↗':''}</small><h3>${highlight(it.label,terms[0])}</h3>${it.raw?'<p>'+snippet(it.raw,terms[0])+'</p>':''}</a>`).join(''):`<div class="res-empty"><strong>${L.empty}</strong><p>${L.emptyHint}</p><button class="text-button" type="button" data-clear>${L.back} →</button></div>`);
  }
  function clear(){q.value='';selected=0;search();q.focus();}
  $('#clearSearch').addEventListener('click',clear);results.addEventListener('click',e=>{if(e.target.closest('[data-clear]'))clear();});
  q.addEventListener('focus',ensureContent,{once:true});q.addEventListener('input',()=>{selected=0;search();});
  q.addEventListener('keydown',e=>{
    if(e.isComposing)return;
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();selected=Math.max(0,Math.min(shown.length-1,selected+(e.key==='ArrowDown'?1:-1)));selectResult();}
    else if(e.key==='Enter'){e.preventDefault();results.querySelectorAll('.res')[selected]?.click();}
    else if(e.key==='Escape'){clear();q.blur();}
  });
  $('#hot').insertAdjacentHTML('beforeend',[L.hot1,L.hot2,L.hot3,'MCP'].map(t=>`<button type="button">${esc(t)}</button>`).join(''));
  $('#hot').addEventListener('click',e=>{const b=e.target.closest('button');if(b){q.value=b.textContent;selected=0;search();q.focus();}});
  document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;if(e.key==='/'||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k')){e.preventDefault();q.focus();q.select();}});
  document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{q.value='';search();document.querySelectorAll('.main-nav a').forEach(n=>n.classList.toggle('active',n===a));}));
})();
