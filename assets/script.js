/* ========= Utils ========= */
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

/* 年份 */
$('#year') && ($('#year').textContent = new Date().getFullYear());

/* ========= Mobile Nav Toggle ========= */
(function () {
  const btn = $('#menuToggle');
  const panel = $('#navPanelMobile');
  if (!btn || !panel) return;

  function openMenu(){ panel.hidden = false; btn.setAttribute('aria-expanded','true'); document.body.classList.add('no-scroll'); }
  function closeMenu(){ panel.hidden = true; btn.setAttribute('aria-expanded','false'); document.body.classList.remove('no-scroll'); }

  closeMenu();
  btn.addEventListener('click', ()=> panel.hidden ? openMenu() : closeMenu());
  panel.addEventListener('click', e => { if (e.target.classList.contains('nav-link')) closeMenu(); });
  document.addEventListener('click', e => { if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', ()=> { if (window.innerWidth >= 1024) closeMenu(); });
})();

/* ========= Hero video fallback ========= */
(function(){
  const v = $('#heroVideo');
  const img = $('#heroFallback');
  if (!v || !img) return;

  function showFallback(){ if (img) img.style.display='block'; if (v) v.style.display='none'; }

  // 如果视频加载失败或被策略阻止，显示兜底图
  v.addEventListener('error', showFallback);
  const play = v.play?.();
  if (play !== undefined) play.catch(showFallback);
})();

/* ========= Progress demo（你也可以改成真实值） ========= */
(function(){
  const soldBar = $('#soldBar');
  const soldText = $('#soldText');
  // 演示：已售 0% → 20%（你可以把这个改成从后端/链上读取）
  let p = 0; const target = 20;
  const tick = () => {
    p += 1; if (p>target) p=target;
    soldBar.style.width = p + '%';
    soldText.textContent = p + '%';
    if (p < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

/* ========= Wallet stub ========= */
$('#walletBtn')?.addEventListener('click', ()=>{
  alert('钱包连接即将上线：将支持 MetaMask / WalletConnect。现在为占位按钮。');
});

/* ========= Smooth scroll ========= */
$$('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id.length>1) {
      const el = $(id);
      if (el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }
  });
});

/* ========= i18n ========= */
const I18N = {
  zh: {
    nav_subscribe:'认购', nav_allocation:'分配', nav_cases:'分红案例', nav_mechanism:'稳健机制',
    nav_highlights:'玩法亮点', nav_roadmap:'登顶路线', nav_verify:'可验证', nav_docs:'文档', nav_team:'团队',
    hero_title:'唤醒未知，铸就你的传奇',
    hero_sub:'探索 · 试炼 · 集市 · 远征 —— 以 <b>ARC</b> 驱动的神域链游生态。连接九大功能页与团队地图，延展长期玩法与价值。',
    cta_subscribe:'立即认购', cta_whitepaper:'查看白皮书',
    chip_scale:'规模：', chip_nft:'股东NFT：', chip_weekly:'周结分红 · 上链可查',
    sec_subscribe:'认购与进度', sub_round:'本轮规模', sub_price:'价格/枚', sub_total:'总量',
    btn_apply:'申请白名单', sub_hint:'早期认购者将获得专属徽章与限时增益。',
    sub_progress:'进度', sub_sold:'已售', sub_note:'链上记录公开可查，资金用途由股东投票治理。',
    sec_allocation:'分配与分红', alloc_phase1_title:'公测首月', alloc_phase1:'50% 分红 · 40% 注入流动池 · 10% 营销',
    alloc_phase2_title:'第2月起', alloc_phase2:'30% 分红 · 40% 注入流动池 · 15% 营销 · 15% 项目运营',
    alloc_dual_title:'双币分红', alloc_dual:'净收入以 USDT 发放；损耗以 ARC 代币发放',
    alloc_more:'收入来源：NFT 铸造 / 会员费用 / 竞猜损耗 / 交易手续费 / 地图升级 / 探险队升级 / 质押手续费 等。',
    sec_cases:'分红案例（示意）', case_week1:'周度示例 A', case_week2:'周度示例 B', case_week3:'周度示例 C',
    case_a_text:'总净收入 20,000 USDT → 50% 分红=10,000 USDT；100 股东NFT，平均每枚 100 USDT。',
    case_b_text:'净收入 12,000 + 损耗 6,000 ARC → USDT/ARC 双发；LP 滑点手续费归股东。',
    case_c_text:'第二月起按 30% 分红，结合竞猜与会员增长，头部 NFT 可叠加增益。',
    sec_mechanism:'稳健机制（不会崩盘的原理）',
    mech_halving_title:'地图减半 & 周期调节',
    mech_halving_text:'每周统计产出与消耗：若产出显著高于消耗，则次周产量按阶梯减半；若低于阈值则维持常量。配合交易损耗（5%），其中 50% 销毁、30% 补充流动性、20% 进入分红池，建立向下压力释放与向上价值累积的双循环。',
    mech_lp_title:'LP 深度与滑点返还', mech_lp_text:'股东优先补充流动性，滑点手续费由股东赚取；分红以 USDT+ARC 双轨发放，上链可验。',
    mech_gov_title:'链上治理', mech_gov_text:'资金使用、模块上线、营销与开发路线均由 100 枚股东 NFT 投票治理，透明公开。',
    mech_zero_title:'可玩可赚，零门槛体验', mech_zero_text:'多区域语言支持，面向北美/拉美/东南亚/中东及中国用户；新手可通过任务/地图掉落获得初始资产。',
    sec_highlights:'玩法亮点', hl_team_map:'团队地图', hl_team_map_text:'个人地图 + 团队地图双轨成长，排行榜与拉新激励绑定，强驱动自然增长。',
    hl_tower:'12 层爬塔', hl_tower_text:'挑战爬塔解锁增益与碎片，碎片可合成稀有 NFT；地图中掉落 NFT 碎片与资源。',
    hl_br:'大逃杀 + 观众下注', hl_br_text:'独特的观战下注模式，玩家与大玩家对赌、代币波动预测、可设置 5/30/60 分钟一局。',
    hl_esports:'电竞/体育竞猜', hl_esports_text:'LOL/刀塔/永劫无间，以及 NBA/欧洲杯/世界杯与搏击赛事；代币作为筹码参与。',
    hl_stake:'质押理财', hl_stake_text:'支持 USDT/ARC 质押获取收益；项目方仅保留 10~15% 用于风控与运维。',
    hl_market:'自由市场', hl_market_text:'NFT、材料与增益道具自由买卖，形成闭环经济；手续费进入分红与流动池。',
    sec_roadmap:'登顶路线', rm_p1_title:'阶段一（1 个月）', rm_p1_text:'上线 App + 大逃杀核心地图 + 社群体系 + 基础经济与分红看板。',
    rm_p2_title:'阶段二（+1 个月）', rm_p2_text:'引入电竞/体育竞猜，开放会员、质押与排行榜，代币公测上线自由兑换。',
    rm_p3_title:'阶段三（+2 个月）', rm_p3_text:'金融衍生品、子游戏互通、代币生态扩展；持续运营与全球化增长。',
    sec_verify:'链上可核验', verify_text:'所有销毁、产出、资金流向与治理投票均上链可查；后续开放区块浏览器与多签地址展示。',
    sec_docs:'文档与白皮书', docs_text:'白皮书、代币经济、合约审计等材料上线后将在此处展示。',
    sec_team:'团队', team_text:'核心成员匿名公开、履历与职责披露，社区协作与外包开发将逐步开放。',
    btn_wallet:'连接钱包'
  },
  en: {
    nav_subscribe:'Sale', nav_allocation:'Allocation', nav_cases:'Payout Cases', nav_mechanism:'Stability',
    nav_highlights:'Highlights', nav_roadmap:'Roadmap', nav_verify:'Verifiable', nav_docs:'Docs', nav_team:'Team',
    hero_title:'Awaken the Unknown, Forge Your Legend',
    hero_sub:'Explore · Trials · Bazaar · Expedition — an ARC-powered on-chain gaming world with 9 feature hubs and guild maps.',
    cta_subscribe:'Join Sale', cta_whitepaper:'Read Whitepaper',
    chip_scale:'Scale: ', chip_nft:'Shareholder NFT: ', chip_weekly:'Weekly Payout · On-chain',
    sec_subscribe:'Sale & Progress', sub_round:'Round Size', sub_price:'Price / NFT', sub_total:'Total',
    btn_apply:'Apply Whitelist', sub_hint:'Early supporters receive badges and temporary boosts.',
    sub_progress:'Progress', sub_sold:'Sold', sub_note:'On-chain and governed by 100 shareholder NFTs.',
    sec_allocation:'Allocation & Dividends', alloc_phase1_title:'Public Beta — Month 1',
    alloc_phase1:'50% Payout · 40% Liquidity · 10% Marketing',
    alloc_phase2_title:'From Month 2', alloc_phase2:'30% Payout · 40% Liquidity · 15% Marketing · 15% Ops',
    alloc_dual_title:'Dual-Token Payout', alloc_dual:'Net income in USDT; burn fees in ARC.',
    alloc_more:'Revenue: NFT mint, membership, prediction fees, trading fees, map/party upgrades, staking fees...',
    sec_cases:'Sample Payouts', case_week1:'Weekly A', case_week2:'Weekly B', case_week3:'Weekly C',
    case_a_text:'Net 20,000 USDT → 50% = 10,000 USDT; 100 NFTs → 100 USDT each.',
    case_b_text:'Net 12,000 + burn 6,000 ARC → USDT + ARC payouts; LP fee goes to shareholders.',
    case_c_text:'From Month 2 payout=30%, growth driven by membership and prediction volume.',
    sec_mechanism:'Stability (Anti-Death Spiral)',
    mech_halving_title:'Map Halving & Weekly Control',
    mech_halving_text:'Weekly compare production vs burn: if production >> burn, next week halving; else steady. 5% tx fee: 50% burn, 30% to LP, 20% to dividend pool.',
    mech_lp_title:'LP Depth & Fee Share', mech_lp_text:'Shareholders add LP first, earn slippage fees; payouts in USDT+ARC.',
    mech_gov_title:'On-chain Governance', mech_gov_text:'100 shareholder NFTs vote on spending, features and marketing.',
    mech_zero_title:'Play & Earn, Low Barrier', mech_zero_text:'Multi-language for NA/LATAM/SEA/MENA & CN; new players get starter tasks and drops.',
    sec_highlights:'Highlights', hl_team_map:'Guild/Personal Maps', hl_team_map_text:'Dual growth with leaderboards & referral incentives.',
    hl_tower:'12-Floor Tower', hl_tower_text:'Climb, get boosts and shards; craft rare NFTs.',
    hl_br:'Battle Royale + Spectator Bets', hl_br_text:'Bet as a spectator; PvP duels; ARC volatility predictions (5/30/60m).',
    hl_esports:'Esports & Sports', hl_esports_text:'LOL/Dota/Naraka, NBA/Euro/WC/Fighting with ARC as chips.',
    hl_stake:'Staking', hl_stake_text:'USDT/ARC staking; team only keeps 10–15% for ops & risk.',
    hl_market:'Open Market', hl_market_text:'NFTs/materials/boosts free trade; fees feed payout & LP.',
    sec_roadmap:'Roadmap', rm_p1_title:'Phase 1 (1 mo)', rm_p1_text:'Launch app + BR core map + community & dashboards.',
    rm_p2_title:'Phase 2 (+1 mo)', rm_p2_text:'Add esports/sports bets, membership, staking, leaderboards; ARC listed for swap.',
    rm_p3_title:'Phase 3 (+2 mo)', rm_p3_text:'Derivatives, sub-games, token interoperability and global ops.',
    sec_verify:'On-chain Verifiable', verify_text:'All burns, outputs, funds and votes are on-chain with explorer links.',
    sec_docs:'Docs / Whitepaper', docs_text:'Whitepaper, tokenomics and audits will be published here.',
    sec_team:'Team', team_text:'Core contributors public; community & outsourcing will expand.',
    btn_wallet:'Connect Wallet'
  },
  es:{ /* 省略: 为了长度，页面会 fallback 英文 */ },
  vi:{}, th:{}, ms:{}, ar:{
    nav_subscribe:'الاكتتاب', nav_allocation:'التوزيع', nav_cases:'أمثلة التوزيع', nav_mechanism:'الاستقرار',
    nav_highlights:'المزايا', nav_roadmap:'خارطة الطريق', nav_verify:'قابل للتحقق', nav_docs:'الوثائق', nav_team:'الفريق',
    hero_title:'أيقظ المجهول واصنع أسطورتك',
    hero_sub:'استكشاف وتجارب وسوق وحملات — منظومة ألعاب مدفوعة بـ ARC على السلسلة.',
    cta_subscribe:'شارك الآن', cta_whitepaper:'الورقة البيضاء',
    chip_scale:'الحجم: ', chip_nft:'NFT المساهمين: ', chip_weekly:'توزيع أسبوعي · على السلسلة',
    sec_subscribe:'الاكتتاب والتقدم', sub_round:'حجم الجولة', sub_price:'السعر/قطعة', sub_total:'الإجمالي',
    btn_apply:'قائمة السماح', sub_hint:'المبكرون يحصلون على شارات ومكافآت مؤقتة.',
    sub_progress:'التقدم', sub_sold:'المباع', sub_note:'شفاف ومحكوم بـ 100 NFT مساهم.',
    sec_allocation:'التوزيع والأرباح', alloc_phase1_title:'الشهر الأول', alloc_phase1:'50% أرباح · 40% سيولة · 10% تسويق',
    alloc_phase2_title:'من الشهر الثاني', alloc_phase2:'30% أرباح · 40% سيولة · 15% تسويق · 15% تشغيل',
    alloc_dual_title:'توزيع مزدوج', alloc_dual:'الدخل الصافي USDT؛ الحرق بعملة ARC.',
    alloc_more:'المصادر: سكّ NFT والعضوية والرهانات والرسوم وترقيات الخرائط والرهان…',
    sec_cases:'أمثلة', case_week1:'أسبوعي A', case_week2:'أسبوعي B', case_week3:'أسبوعي C',
    case_a_text:'صافي 20,000 USDT → 50% = 10,000 USDT؛ 100 NFT → 100 USDT لكل واحدة.',
    case_b_text:'صافي 12,000 + حرق 6,000 ARC → توزيع USDT+ARC؛ رسوم السيولة للمساهمين.',
    case_c_text:'من الشهر الثاني 30% أرباح مع نمو الرهانات والعضوية.',
    sec_mechanism:'الاستقرار', mech_halving_title:'تخفيض إنتاج الخريطة', mech_halving_text:'مقارنة أسبوعية بين الإنتاج والحرق…',
    mech_lp_title:'سيولة ورسوم', mech_lp_text:'المساهمون يضيفون السيولة أولًا ويكسبون الرسوم.',
    mech_gov_title:'حوكمة على السلسلة', mech_gov_text:'قرارات الإنفاق والتطوير عبر تصويت NFT.',
    mech_zero_title:'سهلة البدء', mech_zero_text:'لغات متعددة تشمل العربية.',
    sec_highlights:'المزايا', hl_team_map:'خرائط الفريق', hl_team_map_text:'نمو ثنائي ولوائح المتصدرين.',
    hl_tower:'برج 12 طابقًا', hl_tower_text:'تعزيزات وفتات NFT.',
    hl_br:'رويال + رهانات المتفرجين', hl_br_text:'رهان زمني 5/30/60 دقيقة.',
    hl_esports:'رياضات إلكترونية', hl_esports_text:'LOL/Dota/Naraka و NBA/Euro/WC…',
    hl_stake:'الرهان', hl_stake_text:'USDT/ARC مع رسوم منخفضة.',
    hl_market:'السوق', hl_market_text:'تداول حر ورسوم توزع.',
    sec_roadmap:'خارطة الطريق', rm_p1_title:'المرحلة 1', rm_p1_text:'إطلاق التطبيق والخريطة الأساسية.',
    rm_p2_title:'المرحلة 2', rm_p2_text:'إضافة رهانات الرياضة والعضوية والرهان وقوائم الصدارة.',
    rm_p3_title:'المرحلة 3', rm_p3_text:'مشتقات وألعاب فرعية وتشغيل عالمي.',
    sec_verify:'قابل للتحقق', verify_text:'كل شيء على السلسلة.',
    sec_docs:'الوثائق', docs_text:'تنشر لاحقًا.',
    sec_team:'الفريق', team_text:'المساهمون الأساسيون.',
    btn_wallet:'اتصل بالمحفظة'
  }
};

function applyI18n(lang){
  const dict = I18N[lang] || I18N.en;
  $$('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });
  // RTL for Arabic
  if (lang === 'ar'){ document.documentElement.dir = 'rtl'; }
  else { document.documentElement.dir = 'ltr'; }
  document.documentElement.lang = lang;
  localStorage.setItem('arc_lang', lang);
}

// 初始化语言
(function(){
  const sel = $('#langSelect');
  const saved = localStorage.getItem('arc_lang') || 'zh';
  sel.value = saved;
  applyI18n(saved);
  sel.addEventListener('change', ()=> applyI18n(sel.value));
})();









