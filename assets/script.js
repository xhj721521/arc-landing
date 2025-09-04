(function(){
  const $  = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const cfg = window.CONFIG || {};

  /* ========== 多语言（可扩展） ========== */
  const I18N = {
    "zh-CN": { connect:"连接钱包" },
    "en":    { connect:"Connect Wallet" }
  };
  function applyI18N(){
    const L = localStorage.lang || 'zh-CN';
    $("#connectText").textContent = (I18N[L]||{}).connect || "连接钱包";
  }
  const langSel = $("#langSel");
  if (langSel){
    langSel.value = localStorage.lang || "zh-CN";
    langSel.addEventListener("change", e => { localStorage.lang = e.target.value; applyI18N(); });
  }
  applyI18N();

  /* ========== 认购进度 ========== */
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
  $("#barLabel").textContent = pct.toFixed(0) + "%";
  const remain = Math.max(0, total - sold);
  const closeTip = document.createElement('p');
  closeTip.className = 'small';
  closeTip.textContent = `剩余名额：${remain} 枚 · 预计关账：本月最后一个周五（JST）`;
  document.querySelector('#subscribe .grid-2 > div').appendChild(closeTip);

  /* ========== 外链/邮箱填充 ========== */
  $$("[data-link]").forEach(a=>{
    const k = a.getAttribute("data-link");
    if (cfg.links && cfg.links[k]) a.href = cfg.links[k];
  });
  $$("[data-mail]").forEach(a=>{
    const k = a.getAttribute("data-mail");
    if (cfg[k]) { a.href = "mailto:"+cfg[k]; a.textContent = cfg[k]; }
  });
  $("#footBrand").textContent = cfg.brand || "ARCANE PROTOCOL";

  /* ========== 表单（演示） ========== */
  const form = $("#invest-form");
  if (form) {
    if (cfg.formspree) form.action = cfg.formspree;
    form.addEventListener("submit", e=>{
      if (!cfg.formspree){
        e.preventDefault();
        alert("演示站未配置表单端点。请在 CONFIG.formspree 填写地址。");
      }
    });
  }

  /* ========== 圆环 ========== */
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

  /* ========== 锁仓演示 ========== */
  const cliff = cfg.vesting?.cliffMonths ?? 1;
  const vm    = cfg.vesting?.vestingMonths ?? 12;
  $("#cliffVal").textContent = cliff;
  $("#vmVal").textContent = vm;
  const range = $("#vestRange");
  range.max = vm;
  function renderVest(){
    const m = +range.value;
    let unlocked = 0;
    if (m <= cliff) unlocked = 0;
    else unlocked = Math.min(100, Math.round((m - cliff) / (vm - cliff) * 100));
    $("#vestOut").textContent = `${m} 个月 · 预计解锁 ${unlocked}%`;
    $("#vbarInner").style.width = unlocked + "%";
  }
  range.addEventListener("input", renderVest); renderVest();

  /* ========== weekly.json 指标 ========== */
  fetch("data/weekly.json")
    .then(r => r.json())
    .then(d => {
      if (!d || !d.cumulative) return;
      const n = v => (v || 0).toLocaleString();
      const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = n(val); };
      set("m-burn",  d.cumulative.burn_arc);
      set("m-addlp", d.cumulative.addLP_arc);
      set("m-divu",  d.cumulative.dividend_usdt);
      set("m-diva",  d.cumulative.dividend_arc);
    })
    .catch(console.warn);

  /* ========== 首屏视频（YouTube） ========== */
  (function mountHeroVideo(){
    if (!cfg.heroYtId) return;
    const box = $("#heroVideo");
    if (!box) return;
    box.innerHTML =
      `<iframe width="100%" height="100%" class="yt"
         src="https://www.youtube.com/embed/${cfg.heroYtId}?rel=0&modestbranding=1&playsinline=1"
         title="AOMI Trailer" frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  })();

  /* ========== 画廊图片（自动注入） ========== */
  (function mountShots(){
    const wrap = $("#shotsWrap");
    if (!wrap || !Array.isArray(cfg.gallery)) return;
    cfg.gallery.forEach(src=>{
      const div = document.createElement('div');
      div.className = 'shot';
      div.style.backgroundImage = `url('${src}')`;
      wrap.appendChild(div);
    });
    if (!wrap.children.length){
      // 占位
      for (let i=0;i<4;i++){
        const div = document.createElement('div');
        div.className = 'shot';
        wrap.appendChild(div);
      }
    }
  })();

  /* ========== 钱包连接 ========== */
  let provider, signer, account;
  function short(addr){ return addr ? addr.slice(0,6)+"…"+addr.slice(-4) : ""; }
  async function switchNetworkIfNeeded(){
    if (!window.ethereum) throw new Error("No wallet");
    const target = cfg.chain?.chainId;
    const cur = (await ethereum.request({ method:"eth_chainId" })) || "";
    if (cur.toLowerCase() === target.toLowerCase()) return true;
    try{
      await ethereum.request({ method:"wallet_switchEthereumChain", params:[{ chainId: target }] });
      return true;
    }catch(e){
      if (e.code === 4902 && cfg.chain){
        await ethereum.request({ method:"wallet_addEthereumChain", params:[cfg.chain] });
        return true;
      }
      throw e;
    }
  }
  async function connectWallet(){
    if (!window.ethereum){ alert("未检测到钱包插件（MetaMask等）。"); return; }
    await switchNetworkIfNeeded();
    const accounts = await ethereum.request({ method:"eth_requestAccounts" });
    account = accounts[0];
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer   = provider.getSigner();
    $("#connectText").textContent = short(account);
    $("#connectBtn").classList.add("connected");
  }
  $("#connectBtn").addEventListener("click", connectWallet);
  if (window.ethereum){
    ethereum.on("accountsChanged", (acc)=>{ account = acc[0]; $("#connectText").textContent = short(account||""); });
    ethereum.on("chainChanged", ()=>{ window.location.reload(); });
  }

  /* ========== 购买股东NFT（演示） ========== */
  const buyModal = $("#buyModal");
  $("#saleAddr").textContent = cfg.contracts?.sale || "—";
  $("#buyBtn").addEventListener("click", async ()=>{
    buyModal.style.display = "flex";
    if (!account) { try{ await connectWallet(); }catch(e){} }
  });
  $("#closeBuy").addEventListener("click", ()=> buyModal.style.display = "none");
  $("#confirmBuy").addEventListener("click", async ()=>{
    if (!account){ alert("请先连接钱包"); return; }
    alert("演示：已发送购买请求（仅前端演示，无真实交易）");
    buyModal.style.display = "none";
  });
  window.addEventListener("keydown", e=>{ if(e.key==="Escape") buyModal.style.display="none"; });

  /* ========== 涟漪位置 ========== */
  document.addEventListener("click", e=>{
    const t = e.target.closest(".ripple");
    if(!t) return;
    const rect = t.getBoundingClientRect();
    const d = Math.max(rect.width, rect.height);
    t.style.setProperty("--ripple-x", (e.clientX - rect.left - d/2) + "px");
    t.style.setProperty("--ripple-y", (e.clientY - rect.top  - d/2) + "px");
  });// ScrollSpy
const sections = ['subscribe','allocation','cases','mechanism','gameplay','roadmap','proof','docs','team','faq'];
const links = sections.map(id => [id, document.querySelector(`.menu a[href="#${id}"]`)]);
const spy = new IntersectionObserver(es=>{
  es.forEach(e=>{
    const id = e.target.id;
    if (e.isIntersecting){
      links.forEach(([k,a])=> a && a.classList.toggle('active', k===id));
    }
  });
}, {rootMargin: "-40% 0px -55% 0px", threshold: 0});
sections.forEach(id=>{ const el = document.getElementById(id); if(el) spy.observe(el); });


})();









