(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const cfg = window.CONFIG || {};

  // 进度条/数字
  const price = cfg.pricePerNFT || 500;
  const total = cfg.totalSupply || 100;
  const sold  = cfg.sold || 0;

  $("[data-cfg='price']").textContent = price;
  $("[data-cfg='total']").textContent = total;
  $("#sold").textContent = sold;
  const raised = sold * price;
  $("#raised").textContent = raised.toLocaleString();
  const pct = total ? Math.min(100, (sold/total*100)) : 0;
  $("#soldPct").textContent = pct.toFixed(1) + "%";
  $("#bar").style.width = pct + "%";

  // 表单 action 填充
  const form = $("#invest-form");
  if (form && cfg.formspree) form.action = cfg.formspree;

  // 外链填充
  $$("[data-link]").forEach(a=>{
    const k = a.getAttribute("data-link");
    if (cfg.links && cfg.links[k]) a.href = cfg.links[k];
  });
  $$("[data-mail]").forEach(a=>{
    const k = a.getAttribute("data-mail");
    if (cfg.links && cfg.links[k]) { a.href = "mailto:"+cfg.links[k]; a.textContent = cfg.links[k]; }
  });

  // Donut 图（把 data-slices 数字转成角度）
  $$(".donut").forEach(d=>{
    const slices = (d.getAttribute("data-slices")||"").split("|").map(n=>+n);
    const sum = slices.reduce((a,b)=>a+b,0) || 1;
    const a1 = (slices[0]||0)/sum*100;
    const a2 = (slices[1]||0)/sum*100;
    const a3 = (slices[2]||0)/sum*100;
    d.style.setProperty("--a1", a1);
    d.style.setProperty("--a2", a2);
    d.style.setProperty("--a3", a3);
  });

  // 进入视口动画
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("reveal"); io.unobserve(e.target); }
    });
  },{threshold:0.12});
  $$(".card, .tips>div").forEach(el=>io.observe(el));

  // 读取 weekly.json（占位数据）
  fetch("/data/weekly.json").then(r=>r.json()).then(d=>{
    const P = d.P_week_arc ?? d.P_week ?? 0;
    const C = d.C_week_arc ?? d.C_week ?? 1;
    const R = C ? (P/C) : 0;
    $("#Pweek").textContent = P.toLocaleString();
    $("#Cweek").textContent = C.toLocaleString();
    $("#Rval").textContent = R.toFixed(2);
    $("#halving").textContent = (R >= 1.15) ? "下周减半" : (R <= 1 ? "下周回弹25%" : "维持");
  }).catch(()=>{ /* 忽略 */ });

})();
