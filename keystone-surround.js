(() => {
 const hero=document.querySelector('.mosaic-hero');
 const header=document.querySelector('.site-header');
 if(!hero||!document.body.classList.contains('keystone-surround')) return;
 const update=()=>{
   const bottom=hero.getBoundingClientRect().bottom+window.scrollY;
   const space=window.matchMedia('(max-width:700px)').matches?20:32;
   document.body.style.setProperty('--keystone-section-end',`${Math.ceil(bottom+space)}px`);
   document.body.style.setProperty('--keystone-texture-size',`${Math.ceil(hero.getBoundingClientRect().width)}px`);
 };
 const observer=new ResizeObserver(update);
 [hero,header].filter(Boolean).forEach(element=>observer.observe(element));
 document.fonts.ready.then(update);
 update();
})();
