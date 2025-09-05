/* ========== 工具 ========== */
const $ = (s,sc=document)=>sc.querySelector(s);
const $$ = (s,sc=document)=>Array.from(sc.querySelectorAll(s));
const fmt = n => Number(n||0).toLocaleString();

/* Reveal on view */
const io = new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('reveal'); io.unobserve(e.target);} });
},{threshold:.12});
$$('.section .card, .v-cards .v-card').forEach(el=>io.observe(el));

/* Tilt */
$$('.tilt').forEach(el=>{
  let r=6;
  el.addEventListener('mousemove',e=>{
    const b=el.getBoundingClientRect(), x=e.clientX-b.left, y=e.clientY-b.top;
    const rx=((y/b.height)-.5)*-r, ry=((x/b.width)-.5)*r;
    el.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='rotateX(0) rotateY(0)');
});

/* Ticker */
(function(){
  const t = $('#ticker'); if(!t) return;
  const items = [
    'ARC 预售 9/8 开启 · 早鸟 20 枚',
    '每周分红：USDT（净收益）+ ARC（损耗）',
    '链上透明：分红/销毁/LP 可查',
    '股东享 LP 滑点与手续费收益'
  ];
  let i=0;
  setInterval(()=>{
    t.innerHTML = `<span class="item">🚀 ${items[i%items.length]}</span>`;
    i++;
  }, 5000);
  t.innerHTML = `<span class="item">🚀 ${items[0]}</span>`;
})();

/* 数字计数 */
function animateCount(el, to, dur=600){
  const from = Number(el.textContent.replace(/,/g,''))||0;
  const st = performance.now();
  function f(t){
    const p = Math.min(1,(t-st)/dur);
    const v = Math.round(from + (to-from)*(0.5-0.5*Math.cos(Math.PI*p)));
    el.textContent = fmt(v);
    if(p<1) requestAnimationFrame(f);
  }
  requestAnimationFrame(f);
}

/* 年份 */
const yel = $('#year'); if (yel) yel.textContent = new Date().getFullYear();

/* ========== KPI / Sparkline ========== */
(function(){
  const c = $('#spark'); if(!c || !window.Chart) return;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0,0,c.width,0); g.addColorStop(0,'#39c3ff'); g.addColorStop(1,'#6b8cff');
  new Chart(c,{
    type:'line',
    data:{ labels:Array.from({length:24},(_,i)=>i+1),
      datasets:[{ data:Array.from({length:24},()=>Math.floor(80+Math.random()*40)),
        borderColor:g, tension:.35, pointRadius:0, fill:false, borderWidth:2 }]},
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}, tooltip:{enabled:false}}, scales:{x:{display:false},y:{display:false}}}
  });
})();

/* ========== 分配饼图 ========== */
let pieChart=null;
function renderPie(firstMonth=true){
  const c = $('#pie'); if(!c || !window.Chart) return;
  const data1 = [50,40,10], data2=[30,40,15,15];
  const labels1 = ['分红(USDT)','注入LP','营销'];
  const labels2 = ['分红(USDT)','注入LP','营销','项目方'];
  const data = firstMonth?data1:data2, labels = firstMonth?labels1:labels2;
  const colors = ['#44d7b6','#5aa0ff','#ffa84d','#a06bff'];
  if(pieChart) pieChart.destroy();
  pieChart = new Chart(c,{ type:'doughnut',
    data:{ labels, datasets:[{ data, backgroundColor:colors, borderWidth:0 }]},
    options:{ plugins:{legend:{position:'bottom',labels:{color:'#cfe0ff'}}}, cutout:'62%' }
  });
}
renderPie(true);

/* ========== 多线图 ========== */
(function(){
  const c = $('#lines'); if(!c || !window.Chart) return;
  const labels = Array.from({length:16},(_,i)=>`W${i+1}`);
  function rand(s){let a=0;return labels.map(()=>a+=Math.round(50+Math.random()*80))}
  new Chart(c,{ type:'line',
    data:{ labels, datasets:[
      {label:'募集累计',  data:rand(), borderColor:'#58d1ff', pointRadius:0, tension:.35},
      {label:'销毁累计',  data:rand(), borderColor:'#a77bff', pointRadius:0, tension:.35},
      {label:'LP 底池',  data:rand(), borderColor:'#44d7b6', pointRadius:0, tension:.35},
      {label:'销量',      data:rand(), borderColor:'#ffa84d', pointRadius:0, tension:.35}
    ]},
    options:{ plugins:{legend:{position:'bottom',labels:{color:'#cfe0ff'}}},
      scales:{x:{ticks:{color:'#b9c9e6'}}, y:{ticks:{color:'#b9c9e6'}}} });
})();

/* ========== 轻量 K 线（占位） ========== */
(function(){
  const el = $('#kline'); if(!el || !window.LightweightCharts) return;
  const chart = LightweightCharts.createChart(el,{ layout:{background:{type:0,color:'transparent'}, textColor:'#cfe0ff'},
    grid:{vertLines:{color:'rgba(255,255,255,.06)'}, horzLines:{color:'rgba(255,255,255,.06)'}},
    crosshair:{mode:LightweightCharts.CrosshairMode.Normal}, rightPriceScale:{borderVisible:false}, timeScale:{borderVisible:false}});
  const s = chart.addCandlestickSeries({ upColor:'#44d7b6', downColor:'#ff6b7a', borderVisible:false, wickUpColor:'#44d7b6', wickDownColor:'#ff6b7a'});
  const now=Date.now(), day=86400000;
  const data = Array.from({length:60},(_,i)=>{ const t = Math.floor((now - (59-i)*day)/1000); const o=100+Math.random()*10; const c=o+(Math.random()*6-3); const hi=Math.max(o,c)+Math.random()*3; const lo=Math.min(o,c)-Math.random()*3; return {time:t, open:o, high:hi, low:lo, close:c};});
  s.setData(data);
})();

/* ========== 认购与进度（sale.json） ========== */
(function () {
  const els = {
    soldA:   $("#sold"), soldB: $("#sold2"), bar: $("#bar"),
    fund:    $("#fundTotal"), cd: $("#cd"),
    btns:    document.querySelectorAll('[data-tier]'),
    priceLine: document.querySelector(".price-line .price")
  };

  function readQueryOverride(state) {
    const q = new URLSearchParams(location.search);
    const e = q.get("early"), s = q.get("std");
    if (e !== null) state.tiers.early.sold    = Math.max(0, Math.min(+e, state.tiers.early.cap));
    if (s !== null) state.tiers.standard.sold = Math.max(0, Math.min(+s, state.tiers.standard.cap));
  }

  async function loadState() {
    try {
      const res = await fetch("/assets/data/sale.json?_=" + (window.__VER__ || Date.now()));
      const json = await res.json();
      readQueryOverride(json);
      return json;
    } catch (e) {
      console.warn("sale.json 加载失败，使用兜底数据", e);
      return {
        currency: "USDT", capTotal: 100,
        tiers: { early:{labelZh:"早鸟",price:400,cap:20,sold:0}, standard:{labelZh:"标准",price:500,cap:80,sold:0} },
        presale: { start: "2025-09-08T00:00:00Z", end: "2025-09-15T00:00:00Z" }
      };
    }
  }

  function computeTotals(state) {
    const e = state.tiers.early, s = state.tiers.standard;
    const sold = e.sold + s.sold;
    const raised = e.sold*e.price + s.sold*s.price;
    const pct = Math.min(100, Math.round((sold/state.capTotal)*100));
    return { sold, raised, pct, e, s };
  }

  function updateUI(state) {
    const { sold, raised, pct, e, s } = computeTotals(state);
    if (els.soldA) animateCount(els.soldA, sold, 600);
    if (els.soldB) els.soldB.textContent = fmt(sold);
    if (els.fund)  animateCount(els.fund,  raised, 600);
    if (els.bar)   els.bar.style.width   = pct + "%";

    const earlyLeft = e.cap - e.sold;
    if (els.priceLine){
      if (earlyLeft <= 0) {
        els.priceLine.innerHTML = `<b>$${s.price}</b> <span>(剩余 ${fmt(s.cap - s.sold)} 枚)</span>`;
      } else {
        els.priceLine.innerHTML = `<s>$${s.price}</s> <b>$${e.price}</b> <span>(早鸟剩余 ${fmt(earlyLeft)} / ${fmt(e.cap)})</span>`;
      }
    }

    const now = Date.now();
    const start = Date.parse(state.presale.start);
    const end   = Date.parse(state.presale.end);
    const started = now >= start, ended = now >= end;

    els.btns.forEach((btn) => {
      const tier = btn.getAttribute("data-tier");
      const t = state.tiers[tier];
      let disabled = false, label = "购买";
      if (!started) { disabled = true; label = "未开始"; }
      if (ended)    { disabled = true; label = "已结束"; }
      if (t.sold >= t.cap) { disabled = true; label = "售罄"; }
      btn.classList.toggle("disabled", disabled);
      btn.setAttribute("aria-disabled", disabled ? "true" : "false");
      btn.querySelector("span") && (btn.querySelector("span").textContent = label);
      btn.onclick = (e) => { e.preventDefault(); if (disabled) return; alert(`即将购买：${t.labelZh}（$${t.price}），敬请期待连接钱包`); };
    });
  }

  function startCountdown(state) {
    if (!els.cd) return;
    const start = Date.parse(state.presale.start);
    const end   = Date.parse(state.presale.end);
    function tick() {
      const now = Date.now();
      const target = (now < start) ? start : (now < end ? end : end);
      let diff = target - now; if (diff < 0) diff = 0;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      els.cd.textContent = [h,m,s].map(n=>String(n).padStart(2,"0")).join(":");
      const labelEl = els.cd.previousElementSibling;
      if (labelEl) {
        if (now < start) labelEl.textContent = "预售倒计时";
        else if (now < end) labelEl.textContent = "结束倒计时";
        else labelEl.textContent = "已结束";
      }
    }
    tick(); setInterval(tick, 1000);
  }

  window.__demoSold = (partial) => {
    if (!window.__SALE_STATE) return;
    Object.assign(window.__SALE_STATE.tiers.early,    partial.early    || {});
    Object.assign(window.__SALE_STATE.tiers.standard, partial.standard || {});
    updateUI(window.__SALE_STATE);
  };

  loadState().then((state) => {
    window.__SALE_STATE = state;
    updateUI(state);
    startCountdown(state);
  });
})();


