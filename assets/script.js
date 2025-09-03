(function(){
  const $  = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const cfg = window.CONFIG || {};

  /* ========== 多语言 ========== */
  const I18N = {
    "zh-CN": {
      nav_subscribe:"认购", nav_alloc:"分配", nav_cases:"分红案例", nav_mech:"稳健机制",
      nav_game:"玩法亮点", nav_road:"登顶路线", nav_proof:"可验证",
      hero_line1:"神域探险链游 · 链上可核验",
      hero_line2:"通缩自稳 × 每周 USDT+ARC 双币分红",
      cta_buy:"立即认购", cta_plan:"查看分配方案",
      connect:"连接钱包", connected:"已连接"
    },
    "en": {
      nav_subscribe:"Sale", nav_alloc:"Allocation", nav_cases:"Dividend Cases", nav_mech:"Stability",
      nav_game:"Gameplay", nav_road:"Roadmap", nav_proof:"On-chain Proof",
      hero_line1:"Mythic On-chain Adventure",
      hero_line2:"Deflationary Stabilizer × Weekly USDT + ARC Dividends",
      cta_buy:"Join Sale", cta_plan:"View Allocation",
      connect:"Connect Wallet", connected:"Connected"
    }
  };
  function applyI18N(){
    const L = localStorage.lang || 'zh-CN';
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      const txt = (I18N[L]||{})[key]; if(txt) el.textContent = txt;
    });
    $("#connectText").textContent = (I18N[L]||{}).connect || "连接钱包";
  }
  const langSel = $("#langSel");
  if (langSel){
    langSel.value = localStorage.lang || "zh-CN";
    langSel.addEventListener("change", e => { localStorage.lang = e.target.value; applyI18N(); });
  }
  applyI18N();

  /* ========== 进度与数字 ========== */
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
  $("#footBrand").textContent = cfg.brand || "AOMI Protocol";

  /* ========== 表单提交 ========== */
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

  /* ========== 分配圆环 ========== */
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

  /* ========== 可验证指标（weekly.json） ========== */
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

  /* ========== 钱包连接（MetaMask/兼容钱包） ========== */
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

  /* ========== 购买股东NFT（演示弹窗） ========== */
  const buyModal = $("#buyModal");
  $("#saleAddr").textContent = cfg.contracts?.sale || "—";
  $("#buyBtn").addEventListener("click", async ()=>{
    buyModal.style.display = "flex";
    if (!account) { try{ await connectWallet(); }catch(e){} }
  });
  $("#closeBuy").addEventListener("click", ()=> buyModal.style.display = "none");
  $("#confirmBuy").addEventListener("click", async ()=>{
    if (!account){ alert("请先连接钱包"); return; }
    // 这里仅演示，不发真实交易；接主网时在此调用 saleContract.mint()
    alert("演示：已发送购买请求（仅前端演示，无真实交易）");
    buyModal.style.display = "none";
  });
  window.addEventListener("keydown", e=>{ if(e.key==="Escape") buyModal.style.display="none"; });

  /* ========== 按钮涟漪位置 ========== */
  document.addEventListener("click", e=>{
    const t = e.target.closest(".ripple");
    if(!t) return;
    const rect = t.getBoundingClientRect();
    const d = Math.max(rect.width, rect.height);
    t.style.setProperty("--ripple-x", (e.clientX - rect.left - d/2) + "px");
    t.style.setProperty("--ripple-y", (e.clientY - rect.top  - d/2) + "px");
  });

  /* ========== 路线风格切换（如需塔形，可设 cfg.roadmapStyle='tower'） ========== */
  if ((cfg.roadmapStyle||"mountain") === "tower"){
    document.body.classList.remove("style-mountain");
    document.body.classList.add("style-tower");
  }
})();


