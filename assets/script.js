// 火焰波纹交互：按钮 & 导航
function addRipple(el){
  el.style.position='relative'; el.style.overflow='hidden';
  el.addEventListener('click', e=>{
    const r=document.createElement('span'); r.className='ripple';
    const rect=el.getBoundingClientRect(); const size=Math.max(rect.width,rect.height);
    r.style.width=r.style.height=size+'px';
    r.style.left=(e.clientX-rect.left-size/2)+'px';
    r.style.top=(e.clientY-rect.top-size/2)+'px';
    el.appendChild(r); setTimeout(()=>r.remove(),650);
  });
}
document.querySelectorAll('.btn, .nav-item').forEach(addRipple);

// 导航激活
document.querySelectorAll('.nav-item').forEach(a=>{
  a.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('is-active'));
    a.classList.add('is-active');
  });
});

// 数字跳动
function countUp(el, dur=900){
  const tgt = +el.dataset.count || 0;
  const start = performance.now();
  (function step(t){
    const k = Math.min(1,(t-start)/dur);
    const ease = 1 - Math.pow(1-k,3);
    const val = Math.floor(tgt * ease).toLocaleString();
    el.textContent = val;
    if(k<1) requestAnimationFrame(step);
  })(start);
}
document.querySelectorAll('[data-count]').forEach(el=>countUp(el));

// 环形进度示例（58%）
(function(){
  const r=58, C=2*Math.PI*r; // ~364
  const pct=0.58; const first=(C*pct).toFixed(0);
  const ring=document.getElementById('ringProg');
  if(ring) ring.setAttribute('stroke-dasharray', first+' '+C.toFixed(0));
})();

// 年份
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// 复制合约地址 + 跳转浏览器
function bySel(sel){ return document.querySelector(sel); }
function copyText(txt){
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(()=>console.log('copied')).catch(()=>prompt('复制失败，手动复制：', txt));
  } else {
    prompt('复制该地址：', txt);
  }
}
document.querySelectorAll('.btn-copy').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const el = bySel(btn.dataset.target);
    if(!el) return;
    copyText(el.textContent.trim());
  });
});
document.querySelectorAll('.contract-card .btn[href], .contract-card .btn[data-explorer]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const card = e.currentTarget.closest('.contract-card');
    const codeEl = card.querySelector('code');
    const url = a.dataset.explorer || a.getAttribute('href');
    if(url && codeEl){
      a.setAttribute('href', url + codeEl.textContent.trim());
    }
  }, { once:true });
});

// Stats 百分比文本（示例）
document.querySelectorAll('[data-pct]').forEach(el=>{
  el.textContent = (+el.dataset.pct).toFixed(1);
});



