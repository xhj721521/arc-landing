/* ===== 小工具 ===== */
const $ = s=>document.querySelector(s);
const $$ = s=>document.querySelectorAll(s);
const fmt = n=>Number(n).toLocaleString();
const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== 多语言 ===== */
const LANGS=["zh","en","es","vi","th","ms","ar"];
let curLang= localStorage.getItem("lang") || "zh";
$("#lang").value = curLang;
async function loadI18n(){
  try{
    const res = await fetch(`./assets/data/i18n.json?v=${window.__VER__}`);
    const map = await res.json();
    const pack = map[curLang] || map.zh;
    $$("[data-i18n]").forEach(el=>{
      const k = el.getAttribute("data-i18n");
      if(pack[k]) el.textContent = pack[k];
    });
  }catch(e){ console.warn("i18n error", e); }
}
$("#lang").addEventListener("change",e=>{
  curLang = e.target.value; localStorage.setItem("lang", curLang); loadI18n();
});

/* ===== 英雄快讯条 ===== */
$("#ticker").textContent = "【公告】预售 8 号 20:00 开启：早鸟 20 枚 $400/枚，之后 $500/枚。";

/* ===== 倒计时（改成你的预售时间） ===== */
function startCountdown(){
  const t = new Date(); t.setDate(8); t.setHours(20,0,0,0);
  function tick(){
    let s = Math.max(0, Math.floor((t - new Date())/1000));
    const h = String(Math.floor(s/3600)).padStart(2,"0");
    s%=3600; const m = String(Math.floor(s/60)).padStart(2,"0"); s=String(s%60).padStart(2,"0");
    $("#cd").textContent = `${h}:${m}:${s}`; requestAnimationFrame(tick);
  } tick();
}
startCountdown();

/* ===== 认购进度（占位数据，接你的后台即可） ===== */
let SOLD = 12;  // 已售
const CAP  = 100;
function updateProgress(){
  $("#sold").textContent = fmt(SOLD);
  $("#sold2").textContent= fmt(SOLD);
  $("#bar").style.width = `${Math.min(100, SOLD/CAP*100)}%`;
  $("#fundTotal").textContent = fmt(500 * SOLD); // 粗略：按标准价估算资金（也可改成真实USDT）
}
updateProgress();

/* ===== Sparkline ===== */
const funds = [1,2,3,4,5,12,13,14,18,20,26,30,40,48,55,60,68,75,82,90];
new Chart($("#spark"),{
  type:"line",
  data:{labels: funds.map((_,i)=>i+1), datasets:[{data:funds, tension:.35, borderWidth:2, borderColor:"#39c3ff", pointRadius:0, fill:true, backgroundColor:"rgba(57,195,255,.12)"}]},
  options:{plugins:{legend:{display:false}}, scales:{x:{display:false},y:{display:false}}}
});
$("#burn").textContent = fmt(1234);
$("#lp").textContent   = fmt(88888);

/* ===== 分配饼图 ===== */
new Chart($("#pie"),{
  type:"doughnut",
  data:{
    labels:["分红","LP","营销"],
    datasets:[{data:[50,40,10], backgroundColor:["#ffd36e","#39c3ff","#7dd97c"], borderWidth:0}]
  },
  options:{plugins:{legend:{position:"bottom"}}}
});

/* ===== 分红小计算器 ===== */
function calc(){
  const n = +$("#nft").value || 1;
  const rev = +$("#rev").value || 0;
  const per = 50; // 第一月
  const pool = rev*(per/100);
  const you  = pool*(n/100);
  $("#usdtR").textContent = fmt(you.toFixed(2));
  $("#arcR").textContent  = fmt((you*0.75).toFixed(0));
}
$("#nft").addEventListener("input",calc);
$("#rev").addEventListener("input",calc);
calc();

/* ===== 四曲线（资金/销量/销毁/底池） ===== */
new Chart($("#lines"),{
  type:"line",
  data:{
    labels: Array.from({length:12},(_,i)=>`W${i+1}`),
    datasets:[
      {label:"资金(USDT)", data:[2,4,6,8,10,12,15,18,20,22,25,28], borderColor:"#39c3ff", backgroundColor:"rgba(57,195,255,.10)", tension:.35, pointRadius:0, fill:true},
      {label:"销量(枚)",    data:[1,2,4,5,7,10,12,14,16,18,20,22], borderColor:"#ffd36e", backgroundColor:"rgba(255,211,110,.10)", tension:.35, pointRadius:0, fill:true},
      {label:"销毁(枚)",    data:[0,0,1,2,3,4,6,7,8,10,12,13],    borderColor:"#ff7a7a", backgroundColor:"rgba(255,122,122,.08)", tension:.35, pointRadius:0, fill:true},
      {label:"底池(USDT)", data:[0,1,2,3,5,8,10,12,14,17,20,24], borderColor:"#7dd97c", backgroundColor:"rgba(125,217,124,.10)", tension:.35, pointRadius:0, fill:true}
    ]
  },
  options:{responsive:true, plugins:{legend:{position:"bottom"}}, scales:{y:{beginAtZero:true}}}
});

/* ===== 代币K线（占位） ===== */
(function(){
  const el = document.getElementById('kline');
  const chart = LightweightCharts.createChart(el, {
    layout:{background:{type:'solid', color:'transparent'}, textColor:'#cfe2ff'},
    grid:{vertLines:{color:'rgba(255,255,255,0.06)'}, horzLines:{color:'rgba(255,255,255,0.06)'}},
    rightPriceScale:{borderVisible:false}, timeScale:{borderVisible:false}
  });
  const series = chart.addCandlestickSeries({
    upColor:'#7dd97c', downColor:'#ff7a7a', borderUpColor:'#7dd97c', borderDownColor:'#ff7a7a', wickUpColor:'#7dd97c', wickDownColor:'#ff7a7a'
  });
  const base=100; const data=Array.from({length:30},(_,i)=>{
    const t=Math.floor(Date.now()/1000)-(30-i)*21600;
    const o=base+i*2+Math.random()*4; const c=o+(Math.random()*6-3);
    const h=Math.max(o,c)+Math.random()*3; const l=Math.min(o,c)-Math.random()*3;
    return {time:t, open:o, high:h, low:l, close:c};
  });
  series.setData(data);
})();

/* ===== 星空粒子（低耗） ===== */
(function starfield(){
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d',{alpha:true});
  let w,h, stars=[]; const count = 140;
  function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight }
  function resetStar(s){ s.x=Math.random()*w; s.y=Math.random()*h; s.z=.2+Math.random()*1.2; s.r=.3+s.z*.8; s.v=.05+s.z*.07 }
  function init(){ resize(); stars = Array.from({length:count},()=>{const s={}; resetStar(s); return s}) }
  function draw(){
    if(prefersReduce) return; // 尊重系统降级
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle="rgba(255,255,255,.8)";
    for(const s of stars){
      ctx.globalAlpha = .15 + s.z*.35;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
      s.x += s.v; if(s.x>s.r+w) s.x = -s.r;
    }
    requestAnimationFrame(draw);
  }
  init(); draw(); window.addEventListener('resize',resize);
})();

/* ===== 卡片轻微倾斜（桌面） ===== */
if (window.matchMedia('(pointer:fine)').matches){
  $$(".tilt").forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect(), cx=e.clientX-r.left, cy=e.clientY-r.top;
      const dx=(cx-r.width/2)/r.width, dy=(cy-r.height/2)/r.height;
      el.style.transform=`perspective(700px) rotateX(${dy*-4}deg) rotateY(${dx*4}deg)`;
    });
    el.addEventListener('mouseleave',()=>{ el.style.transform='perspective(700px) rotateX(0) rotateY(0)' });
  });
}

/* ===== init ===== */
loadI18n();
$("#year").textContent = new Date().getFullYear();

