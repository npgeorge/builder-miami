(() => {
  for(const item of window.BUILDER_ART_LIBRARY){
    const scene=item.category==='Coastal scenes';
    const figure=document.createElement('figure');
    const link=document.createElement('a');link.href=item.original;link.target='_blank';link.rel='noopener noreferrer';link.className=scene?'landscape-image':'detail-image';link.setAttribute('aria-label','Open '+item.name+' original');
    const img=document.createElement('img');img.src=item.preview;img.alt=item.name;img.loading='lazy';
    if(scene)link.append(img);else{
      const b=item.bounds,ratio=b.w*b.ratio/b.h,w=Math.min(205,218*ratio),crop=document.createElement('span');
      crop.className='detail-crop';crop.style.width=w+'px';crop.style.aspectRatio=String(ratio);
      img.style.width=(100/b.w)+'%';img.style.left=(-100*b.x/b.w)+'%';img.style.top=(-100*b.y/b.h)+'%';
      crop.append(img);link.append(crop);
    }
    const caption=document.createElement('figcaption'),labels=document.createElement('div'),heading=document.createElement('h3'),dimensions=document.createElement('span'),download=document.createElement('a');
    heading.textContent=item.name;dimensions.className='art-dimensions';dimensions.textContent=item.width+' × '+item.height+' · PNG';labels.append(heading,dimensions);
    download.href=item.original;download.download=item.id+'.png';download.className='art-download';download.textContent='Download ↗︎';caption.append(labels,download);figure.append(link,caption);
    document.getElementById(scene?'landscapes':item.category==='Talk markers'?'markers':'details').append(figure);
  }
  document.querySelector('[data-art-count]').textContent=window.BUILDER_ART_LIBRARY.length+' original illustrations preserved at full resolution.';
})();
