// 导航激活态
document.querySelectorAll('.nav .nav-item').forEach(a=>{
  a.addEventListener('click', ()=>{
    document.querySelectorAll('.nav .nav-item').forEach(n=>n.classList.remove('is-active'));
    a.classList.add('is-active');
  });
});

// 数字滚动
function countUp(el, dur=900){
  const tgt = +el.dataset.count || 0;
  const start = performance.now();
  (function step(t){
    const k = Math.min(1,(t-start)/dur);
    const ease = 1 - Math.pow(1-k,3);
    el.textContent = Math.floor(tgt*ease).toLocaleString();
    if(k<1) requestAnimationFrame(step);
  })(start);
}
document.querySelectorAll('[data-count]').forEach(el=>countUp(el));

// 环形进度（58% 示例）——只改这里即可
(function(){
  const r=58, C=2*Math.PI*r; // 周长≈364
  const pct=0.58; // 58%
  const ring=document.getElementById('ringProg');
  if(ring) ring.setAttribute('stroke-dasharray', (C*pct).toFixed(0)+' '+C.toFixed(0));
})();

// 页脚年份
const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();





