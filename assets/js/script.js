/* =========================================
   ARC Protocol - Script v1.5 (Full Replace)
   ========================================= */
(function(){
  const $ = (s, d=document)=>d.querySelector(s);
  const $$ = (s, d=document)=>d.querySelectorAll(s);

  // --------------------------
  // 0) Basic boot
  // --------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

    initI18n();
    initTicker();
    initKPI();
    initCountdown('2025-09-08T00:00:00Z'); // 预售倒计时目标（UTC）
    initCharts();        // Sparkline + Pie + Multi-lines
    initKline();         // 代币K线示例
    initStars();         // 星空粒子
    initTilt();          // 卡片 3D 倾斜
    bindBuyButtons();    // 认购按钮占位
    setLaunchDate();     // Token launch 占位日期
  });

  // --------------------------
  // 1) i18n
  // --------------------------
  async function initI18n(){
    const select = $('#lang');
    let dict = {};
    try{
      const res = await fetch('/assets/data/i18n.json', {cache:'no-store'});
      dict = await res.json();
    }catch(e){
      console.warn('i18n load fail', e);
    }
    const prefer = localStorage.getItem('lang') || 'zh';
    applyLang(prefer, dict);
    if (select){
      select.value = prefer;
      select.addEventListener('change', e=>{
        const lang = e.target.value;
        localStorage.setItem('lang', lang);
        applyLang(lang, dict);
      });
    }
  }
  function applyLang(lang, dict){
    const nodes = $$('[data-i18n]');
    nodes.forEach(n=>{
      const k = n.getAttribute('data-i18n');
      const val = dict?.[lang]?.[k];
      if (val) n.textContent = val;
    });
  }

  // --------------------------
  // 2) Ticker (首屏快讯)
  // --------------------------
  function initTicker(){
    const t = $('#ticker');
    if (!t) return;
    const items = [
      '链上透明：销毁 / 产出 / 分红 / LP 可查',
      '公测第1月：50%分红 / 40%LP / 10%营销',
      '每周分红：USDT（净收益）+ ARC（损耗）',
      '团队地图裂变：排行榜与周赛激励',
      'K线与多线资金曲线：长期机制可视化'
    ];
    const ul = document.createElement('ul');
    items.concat(items).forEach(txt=>{
      const li = document.createElement('li'); li.textContent = txt; ul.appendChild(li);
    });
    t.innerHTML = '';
    t.appendChild(ul);
  }

  // --------------------------
  // 3) KPI / Sparkline / Progress
  // --------------------------
  const STATE = {
    cap: 100,          // 总发行 NFT 枚数
    sold: 12,          // 已售
    burn: 300,         // 销毁（枚）
    fund: 4800,        // 累计募集 USDT
    lp: 1200,          // 流动池 USDT
    spark: [1800,2100,2400,2600,3200,3600,4200,4300,4500,4800] // 示例
  };

  function initKPI(){
    // 数字
    setText('#sold', STATE.sold);
    setText('#sold2', STATE.sold);
    setText('#burn', STATE.burn);
    setText('#lp', STATE.lp);

    // 翻牌动画
    const flipEl = $('#fundTotal');
    animateFlip(flipEl, STATE.fund, 900);

    // 进度条
    const pct = Math.min(100, (STATE.sold/STATE.cap)*100);
    const bar = $('#bar'); if (bar) bar.style.width = pct + '%';

    // Sparkline
    const ctx = $('#spark');
    if (ctx && window.Chart){
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: STATE.spark.map((_,i)=>i+1),
          datasets: [{
            data: STATE.spark,
            tension: .35, borderWidth: 2, pointRadius: 0,
            fill: true,
            borderColor: '#60a5ff',
            backgroundColor: 'rgba(96,165,255,.15)'
          }]
        },
        options: {
          animation:false,
          plugins:{legend:{display:false}, tooltip:{enabled:false}},
          responsive:true, maintainAspectRatio:false,
          scales:{
            x:{display:false, grid:{display:false}},
            y:{display:false, grid:{display:false}}
          }
        }
      });
    }
  }
  function setText(sel, v){ const el=$(sel); if (el) el.textContent = v; }
  function animateFlip(el, to=0, dur=800){
    if (!el) return; const from = parseInt(el.textContent.replace(/\D/g,''))||0;
    const start = performance.now();
    const step = t=>{
      const p = Math.min(1, (t-start)/dur);
      const val = Math.floor(from + (to - from) * easeOutCubic(p));
      el.textContent = val.toLocaleString();
      if (p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const easeOutCubic = x => 1 - Math.pow(1 - x, 3);

  // --------------------------
  // 4) 倒计时
  // --------------------------
  function initCountdown(iso){
    const el = $('#cd'); if (!el) return;
    const target = new Date(iso).getTime();
    const tick = ()=>{
      const now = Date.now();
      let s = Math.max(0, Math.floor((target - now)/1000));
      const h = String(Math.floor(s/3600)).padStart(2,'0'); s%=3600;
      const m = String(Math.floor(s/60)).padStart(2,'0');  s%=60;
      const sec=String(s).padStart(2,'0');
      el.textContent = `${h}:${m}:${sec}`;
    };
    tick(); setInterval(tick, 1000);
  }

  // --------------------------
  // 5) Charts: Pie / Multi-lines
  // --------------------------
  function initCharts(){
    // Pie
    const pie = $('#pie');
    if (pie && window.Chart){
      new Chart(pie, {
        type:'doughnut',
        data: {
          labels: ['分红(50%)','LP(40%)','营销(10%)'],
          datasets:[{ data:[50,40,10], borderWidth:0,
            backgroundColor:['#60d394','#6b8cff','#39c3ff']
          }]
        },
        options:{
          cutout:'68%', plugins:{legend:{display:true, position:'bottom'}}, animation:false
        }
      });
    }

    // Multi-lines
    const lines = $('#lines');
    if (lines && window.Chart){
      const labels = Array.from({length:12}, (_,i)=>`W${i+1}`);
      const funds = [1.2,1.6,2.2,2.8,3.4,4.1,4.5,4.8,5.3,6.0,6.6,7.2]; // 万USDT
      const burns = [20,25,28,33,38,45,52,58,63,70,76,83];           // k枚
      const lps   = [0.3,0.5,0.9,1.2,1.6,2.1,2.5,3.1,3.7,4.4,5.0,5.7]; // 万USDT
      const sales = [4,8,16,22,28,34,40,48,60,72,85,100];             // 枚

      new Chart(lines, {
        type:'line',
        data:{
          labels,
          datasets:[
            {label:'累计募集(万USDT)', data:funds, borderColor:'#39c3ff', backgroundColor:'rgba(57,195,255,.15)', tension:.35, fill:true, pointRadius:0, borderWidth:2},
            {label:'LP(万USDT)', data:lps, borderColor:'#6b8cff', backgroundColor:'rgba(107,140,255,.12)', tension:.35, fill:true, pointRadius:0, borderWidth:2},
            {label:'销毁(k枚)', data:burns, borderColor:'#ef4444', backgroundColor:'rgba(239,68,68,.10)', tension:.35, fill:false, pointRadius:0, borderWidth:2, yAxisID:'y2'},
            {label:'已售(枚)', data:sales, borderColor:'#22c55e', backgroundColor:'rgba(34,197,94,.10)', tension:.35, fill:false, pointRadius:0, borderWidth:2, yAxisID:'y3'}
          ]
        },
        options:{
          interaction:{mode:'index', intersect:false},
          animation:false, responsive:true, maintainAspectRatio:false,
          plugins:{legend:{display:true, position:'bottom'}},
          scales:{
            x:{grid:{color:'rgba(120,150,200,.12)'}},
            y:{grid:{color:'rgba(120,150,200,.12)'}, ticks:{callback:v=>v}},
            y2:{position:'right', grid:{drawOnChartArea:false}, ticks:{callback:v=>v+'k'}},
            y3:{position:'right', grid:{drawOnChartArea:false}, display:false}
          }
        }
      });
    }
  }

  // --------------------------
  // 6) Lightweight Charts - Kline
  // --------------------------
  function initKline(){
    const el = $('#kline');
    if (!el || !window.LightweightCharts) return;
    const chart = LightweightCharts.createChart(el, {
      layout:{ background:{ type:'solid', color:'transparent' }, textColor:'#bcd2ff' },
      rightPriceScale:{ borderColor:'rgba(120,150,200,.2)' },
      timeScale:{ borderColor:'rgba(120,150,200,.2)' },
      grid:{ vertLines:{color:'rgba(120,150,200,.08)'}, horzLines:{color:'rgba(120,150,200,.08)'} },
      crosshair:{ mode: LightweightCharts.CrosshairMode.Normal }
    });
    const series = chart.addAreaSeries({
      lineColor:'#6b8cff', topColor:'rgba(107,140,255,.35)', bottomColor:'rgba(107,140,255,0)'
    });
    // 示例数据
    const now = Math.floor(Date.now()/1000);
    const data = Array.from({length:90}, (_,i)=>({ time: now - (90-i)*3600*24, value: 0.9 + Math.sin(i/9)*0.08 + i*0.003 }));
    series.setData(data);
    // 自适应
    const ro = new ResizeObserver(()=>chart.applyOptions({ width: el.clientWidth, height: el.clientHeight }));
    ro.observe(el);
    chart.timeScale().fitContent();
  }

  // --------------------------
  // 7) 星空粒子（轻量）
  // --------------------------
  function initStars(){
    const cvs = $('#stars'); if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    let W, H, stars = [];
    function resize(){
      W = cvs.clientWidth = window.innerWidth;
      H = cvs.clientHeight = Math.max(window.innerHeight, 800);
      cvs.width = W*DPR; cvs.height = H*DPR; ctx.scale(DPR,DPR);
      stars = Array.from({length: 120}, ()=>({
        x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.2+0.3, v:.15+Math.random()*.35, a:.2+Math.random()*.6
      }));
    }
    function draw(){
      ctx.clearRect(0,0,W,H);
      for (const s of stars){
        s.y += s.v; if (s.y>H) s.y= -5;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(160,200,255,${s.a})`; ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize, {passive:true});
    resize(); draw();
  }

  // --------------------------
  // 8) 3D Tilt
  // --------------------------
  function initTilt(){
    const cards = $$('.tilt');
    cards.forEach(card=>{
      let rq; card.addEventListener('mousemove', e=>{
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left)/r.width, py = (e.clientY - r.top)/r.height;
        const rx = (py-.5)*8, ry = (px-.5)*-10;
        card.setAttribute('data-tilt-active','1');
        cancelAnimationFrame(rq);
        rq=requestAnimationFrame(()=>{ card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`; });
      });
      card.addEventListener('mouseleave', ()=>{
        card.removeAttribute('data-tilt-active'); card.style.transform='';
      });
    });
  }

  // --------------------------
  // 9) 购买按钮占位
  // --------------------------
  function bindBuyButtons(){
    $$('.tiers .btn-neon').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        e.preventDefault();
        const tier = btn.getAttribute('data-tier') || 'standard';
        alert(`占位：准备购买【${tier==='early'?'早鸟':'标准'}】。这里挂接你的钱包/表单逻辑。`);
      });
    });
  }

  // --------------------------
  // 10) 其它小功能
  // --------------------------
  function setLaunchDate(){
    const el = $('#launch'); if (!el) return;
    // 占位：设为“今天 + 30天”
    const d = new Date(Date.now() + 30*24*3600*1000);
    const y = d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0');
    el.textContent = `${y}-${m}-${day}`;
  }

})();


