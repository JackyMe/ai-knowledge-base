/* AI 知识库 · 大厂动效:滚动浮现控制器(零依赖,单一职责)
   用法:给任意元素加 data-reveal 属性,首次进入视口时加 .is-visible 触发 CSS 过渡,只播放一次。
   遵守 prefers-reduced-motion:直接跳过观察,所有目标元素立即以最终态显示。 */
(function(){
  var els=document.querySelectorAll('[data-reveal]');
  if(!els.length)return;
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){
    els.forEach(function(el){el.classList.add('is-visible')});
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.15,rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){io.observe(el)});
})();
