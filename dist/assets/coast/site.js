(() => {
 const key='builder-roundtable-theme-v1';
 function setTheme(value,save=false){
  const theme=value==='night'?'night':'day';document.documentElement.dataset.theme=theme;
  document.querySelector('meta[name="theme-color"]').content=theme==='day'?'#ffffff':'#0b0d18';
  document.querySelectorAll('button[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===theme)));
  document.querySelectorAll('[data-theme-art]').forEach(img=>{
   img.src=img.dataset[theme];img.alt=theme==='day'?'An imagined Satoshi sculpted in marble in a sunlit courtyard.':'An imagined Satoshi sculpted in marble, framed by classical columns and neon light.';
  });
  if(save){try{localStorage.setItem(key,theme);}catch{}}
 }
 document.querySelectorAll('button[data-theme]').forEach(b=>b.addEventListener('click',()=>setTheme(b.dataset.theme,true)));
 window.addEventListener('storage',e=>{if(e.key===key)setTheme(e.newValue);});
 setTheme(document.documentElement.dataset.theme);
 function updateStatus(){
  const now=Date.now();document.querySelectorAll('[data-start][data-end]').forEach(s=>{
   const start=Date.parse(s.dataset.start),end=Date.parse(s.dataset.end);
   s.textContent=now>=end?'Past roundtable':now>=start?'Happening now':'Upcoming';
   s.dataset.status=now>=end?'past':now>=start?'live':'upcoming';
  });
 }
 updateStatus();setInterval(updateStatus,60000);
})();
