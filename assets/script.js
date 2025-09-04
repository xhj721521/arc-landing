// ====== 配置（你以后只改这里就行） ======
const CONFIG = {
  TOTAL: 100,              // 总份额
  EARLY_CAP: 20,           // 早鸟数量
  PRICE_EARLY: 400,        // 早鸟单价
  PRICE_STD: 500,          // 标准单价
  PRESALE_START_ISO: '2025-09-08T00:00:00+09:00' // 预售开始（东京时区）
};
// （演示）当前销量：上线后你可从 weekly.json 或合约事件更新
let SOLD_EARLY = 0;
let SOLD_STD   = 0;

// ====== 多语言（全量词库） ======
const I18N = {
  en:{ nav:{buy:'Sale',dist:'Allocation',cases:'Dividends',mech:'Stability',features:'Highlights',route:'Roadmap',verify:'Verifiable',links:'Links'},
       cta:{wallet:'Connect Wallet',buy:'Join Sale',plan:'View Allocation',whitepaper:'Whitepaper'},
       hero:{title:'Awaken the Unknown, Forge Your Legend',subtitle:'Explore • Trials • Bazaar • Expedition — ARC-powered on-chain world.'},
       badge:{scale:'Scale',share:'Share NFT',cycle:'Cycle',cycleVal:'Weekly dividend · On-chain',rights:'Rights',rightsVal:'Governance/LP/Dual'},
       strip:{tier:'Early',std:'Standard',start:'Start',state:'State'},
       sec:{subscribe:'Sale & Progress',allocation:'Allocation & Dividend',cases:'Dividend Cases',mech:'Stability Mechanism',features:'Highlights',route:'Roadmap',verify:'On-chain Verifiable',links:'Quick Links'},
       tier:{early:'Early Bird',limit20:'Cap 20',std:'Standard',limit80:'Cap 80',per:'/ NFT',start8:'Opens Sep 8',afterEarly:'Opens after Early sold out'},
       sub:{total:'Total',target:'Target',raised:'Raised',rights:'Shareholder Rights',
            r1:'Priority LP refill (slippage fees)', r2:'Governance voting (fund/dev/ops)', r3:'USDT + ARC dual dividends (weekly)', r4:'Top-up service spread'},
       count:{title:'Presale Countdown'},
       chart:{m1:'Month 1 Allocation',m2:'From Month 2'},
       legend:{div:'Dividends',lp:'LP Injection',mkt:'Marketing',ops:'Operations'},
       calc:{title:'Dividend Calculator',label:'NFT Holdings',btn:'Calculate',res:'This week: ~ {usdt} USDT + {arc} ARC'},
       div:{title:'Dividend Example (weekly)',note:'Net 10,000 USDT → 50% pool, 100 share NFTs ≈ 50 USDT/NFT; burn part in ARC.'},
       v:{contract:'Contract & Repo',weekly:'Weekly JSON',audit:'Audit (placeholder)'},
       link:{download:'Game Download (placeholder)',wallet:'Connect Wallet (placeholder)',onchain:'On-chain Explorer (placeholder)'},
       f:{terms:'Terms',policy:'Privacy',docs:'Docs'},
       metrics:{title:'Funds Trend & Core Stats', sparkFunds:'Funds Sparkline (USDT)', sparkSales:'Sales Sparkline (Shares)',
                raised:'Raised (USDT)', sold:'Sold (Shares)', lastweek:'Net Last Week (USDT)'} },

  zh:{ nav:{buy:'认购',dist:'分配',cases:'分红案例',mech:'稳健机制',features:'玩法亮点',route:'路线图',verify:'可验证',links:'链接'},
       cta:{wallet:'连接钱包',buy:'立即认购',plan:'查看分配',whitepaper:'白皮书'},
       hero:{title:'唤醒未知，铸就你的传奇',subtitle:'探索·试炼·集市·远征 —— 以 <b>ARC</b> 驱动的神域链游生态。'},
       badge:{scale:'本轮规模',share:'股东NFT',cycle:'周期',cycleVal:'周结分红 · 上链可查',rights:'权益',rightsVal:'治理/补流/双分红'},
       strip:{tier:'早鸟',std:'标准',start:'预售开始',state:'状态'},
       sec:{subscribe:'认购与进度',allocation:'分配与分红',cases:'分红案例',mech:'稳健机制',features:'玩法亮点',route:'路线图',verify:'链上可验证',links:'快速链接'},
       tier:{early:'早鸟',limit20:'限 20 枚',std:'标准',limit80:'限 80 枚',per:'/ 枚',start8:'9 月 8 日开启',afterEarly:'早鸟售罄后开放'},
       sub:{total:'总份额',target:'目标',raised:'已募集',rights:'股东权益',
            r1:'优先补充流动性（赚取滑点手续费）', r2:'治理投票（资金用途/开发/运营）', r3:'USDT + ARC 双分红（周结）', r4:'代为充值服务的价差收益'},
       count:{title:'预售倒计时'},
       chart:{m1:'公测首月分配',m2:'第 2 月起分配'},
       legend:{div:'分红',lp:'注入流动池',mkt:'营销',ops:'运营'},
       calc:{title:'分红小计算器',label:'持有 NFT 数量',btn:'计算',res:'预计本周：~ {usdt} USDT + {arc} ARC'},
       div:{title:'分红案例（周结示意）',note:'例如当周净收益 10,000 USDT：50% → 分红池，100 枚股东NFT 等权 ≈ 50 USDT/枚；损耗以 ARC 代币分发。'},
       v:{contract:'合约 & 开源仓库',weekly:'周报 JSON',audit:'第三方审计（占位）'},
       link:{download:'游戏下载（占位）',wallet:'连接钱包（占位）',onchain:'链上浏览（占位）'},
       f:{terms:'条款',policy:'隐私',docs:'文档'},
       metrics:{title:'资金趋势与核心数据', sparkFunds:'资金曲线（USDT）', sparkSales:'销量曲线（份额）',
                raised:'已募集（USDT）', sold:'已售（份）', lastweek:'上周净收益（USDT）'} },

  es:{ nav:{buy:'Venta',dist:'Distribución',cases:'Casos de dividendos',mech:'Estabilidad',features:'Destacados',route:'Hoja de ruta',verify:'Verificable',links:'Enlaces'},
       cta:{wallet:'Conectar billetera',buy:'Unirse a la venta',plan:'Ver distribución',whitepaper:'Libro blanco'},
       hero:{title:'Despierta lo Desconocido, Forja tu Leyenda',subtitle:'Explorar • Pruebas • Bazar • Expedición — Mundo en cadena impulsado por ARC.'},
       badge:{scale:'Escala',share:'NFT de accionista',cycle:'Ciclo',cycleVal:'Dividendo semanal · On-chain',rights:'Derechos',rightsVal:'Gobernanza/LP/Doble'},
       strip:{tier:'Preventa',std:'Estándar',start:'Inicio',state:'Estado'},
       sec:{subscribe:'Venta y progreso',allocation:'Distribución y dividendos',cases:'Casos de dividendos',mech:'Mecanismo de estabilidad',features:'Destacados',route:'Hoja de ruta',verify:'Verificable en cadena',links:'Enlaces rápidos'},
       tier:{early:'Preventa',limit20:'Límite 20',std:'Estándar',limit80:'Límite 80',per:'/ NFT',start8:'Abre 8 Sep',afterEarly:'Disponible tras agotar Early'},
       sub:{total:'Total',target:'Objetivo',raised:'Recaudado',rights:'Derechos del accionista',
            r1:'Relleno LP prioritario (comisión por deslizamiento)', r2:'Votación de gobernanza (fondos/dev/ops)', r3:'Dividendos dobles USDT + ARC (semanal)', r4:'Margen por recargas delegadas'},
       count:{title:'Cuenta regresiva de preventa'},
       chart:{m1:'Distribución — Mes 1',m2:'Desde Mes 2'},
       legend:{div:'Dividendos',lp:'Inyección LP',mkt:'Marketing',ops:'Operaciones'},
       calc:{title:'Calculadora de dividendos',label:'NFT en posesión',btn:'Calcular',res:'Esta semana: ~ {usdt} USDT + {arc} ARC'},
       div:{title:'Ejemplo de dividendos (semanal)',note:'Neto 10.000 USDT → 50% al pool, 100 NFTs ≈ 50 USDT/NFT; parte quemada en ARC.'},
       v:{contract:'Contrato y repositorio',weekly:'JSON semanal',audit:'Auditoría (marcador)'},
       link:{download:'Descarga del juego (marcador)',wallet:'Conectar billetera (marcador)',onchain:'Explorador on-chain (marcador)'},
       f:{terms:'Términos',policy:'Privacidad',docs:'Documentos'},
       metrics:{title:'Tendencia de fondos y métricas', sparkFunds:'Curva de fondos (USDT)', sparkSales:'Curva de ventas (participaciones)',
                raised:'Recaudado (USDT)', sold:'Vendidas (unid.)', lastweek:'Neto semana pasada (USDT)'} },

  vi:{ nav:{buy:'Bán',dist:'Phân bổ',cases:'Trường hợp cổ tức',mech:'Ổn định',features:'Điểm nổi bật',route:'Lộ trình',verify:'Có thể xác minh',links:'Liên kết'},
       cta:{wallet:'Kết nối ví',buy:'Tham gia bán',plan:'Xem phân bổ',whitepaper:'Sách trắng'},
       hero:{title:'Đánh Thức Điều Chưa Biết, Rèn Nên Huyền Thoại',subtitle:'Khám phá • Thử thách • Chợ • Viễn chinh — Thế giới on-chain bởi ARC.'},
       badge:{scale:'Quy mô',share:'NFT cổ phần',cycle:'Chu kỳ',cycleVal:'Cổ tức hàng tuần · On-chain',rights:'Quyền lợi',rightsVal:'Quản trị/LP/Kép'},
       strip:{tier:'Early',std:'Chuẩn',start:'Bắt đầu',state:'Trạng thái'},
       sec:{subscribe:'Bán & Tiến độ',allocation:'Phân bổ & Cổ tức',cases:'Ví dụ cổ tức',mech:'Cơ chế ổn định',features:'Điểm nổi bật',route:'Lộ trình',verify:'Xác minh on-chain',links:'Liên kết nhanh'},
       tier:{early:'Early Bird',limit20:'Giới hạn 20',std:'Chuẩn',limit80:'Giới hạn 80',per:'/ NFT',start8:'Mở 8/9',afterEarly:'Mở sau khi Early bán hết'},
       sub:{total:'Tổng',target:'Mục tiêu',raised:'Đã huy động',rights:'Quyền cổ đông',
            r1:'Ưu tiên bơm LP (phí trượt)', r2:'Bỏ phiếu quản trị (quỹ/dev/ops)', r3:'Cổ tức kép USDT + ARC (tuần)', r4:'Chênh lệch nạp hộ'},
       count:{title:'Đếm ngược mở bán'},
       chart:{m1:'Phân bổ — Tháng 1',m2:'Từ Tháng 2'},
       legend:{div:'Cổ tức',lp:'Bơm LP',mkt:'Marketing',ops:'Vận hành'},
       calc:{title:'Máy tính cổ tức',label:'Số NFT nắm giữ',btn:'Tính',res:'Tuần này: ~ {usdt} USDT + {arc} ARC'},
       div:{title:'Ví dụ cổ tức (tuần)',note:'Lãi ròng 10.000 USDT → 50% vào pool, 100 NFT ≈ 50 USDT/NFT; phần đốt bằng ARC.'},
       v:{contract:'Hợp đồng & Repo',weekly:'JSON hàng tuần',audit:'Kiểm toán (placeholder)'},
       link:{download:'Tải game (placeholder)',wallet:'Kết nối ví (placeholder)',onchain:'Trình duyệt on-chain (placeholder)'},
       f:{terms:'Điều khoản',policy:'Quyền riêng tư',docs:'Tài liệu'},
       metrics:{title:'Xu hướng vốn & số liệu', sparkFunds:'Đường vốn (USDT)', sparkSales:'Đường bán (suất)',
                raised:'Đã huy động (USDT)', sold:'Đã bán (suất)', lastweek:'Lãi ròng tuần trước (USDT)'} },

  th:{ nav:{buy:'การขาย',dist:'การกระจาย',cases:'กรณีปันผล',mech:'เสถียรภาพ',features:'ไฮไลต์',route:'โรดแมป',verify:'ตรวจสอบได้',links:'ลิงก์'},
       cta:{wallet:'เชื่อมต่อวอลเล็ต',buy:'เข้าร่วมการขาย',plan:'ดูการกระจาย',whitepaper:'ไวท์เปเปอร์'},
       hero:{title:'ปลุกสิ่งที่ไม่รู้จัก สร้างตำนานของคุณ',subtitle:'สำรวจ • ทดลอง • ตลาด • ออกศึก — โลกเกมบนเชนโดย ARC'},
       badge:{scale:'ขนาดรอบ',share:'NFT ผู้ถือหุ้น',cycle:'รอบเวลา',cycleVal:'ปันผลรายสัปดาห์ · On-chain',rights:'สิทธิ์',rightsVal:'กำกับดูแล/LP/สองทาง'},
       strip:{tier:'Early',std:'มาตรฐาน',start:'เริ่ม',state:'สถานะ'},
       sec:{subscribe:'การขาย & ความคืบหน้า',allocation:'การกระจาย & ปันผล',cases:'กรณีปันผล',mech:'กลไกเสถียรภาพ',features:'จุดเด่น',route:'โรดแมป',verify:'ตรวจสอบบนเชน',links:'ลิงก์ด่วน'},
       tier:{early:'Early Bird',limit20:'จำกัด 20',std:'มาตรฐาน',limit80:'จำกัด 80',per:'/ NFT',start8:'เริ่ม 8 ก.ย.',afterEarly:'เปิดหลัง Early หมด'},
       sub:{total:'ทั้งหมด',target:'เป้าหมาย',raised:'ระดมแล้ว',rights:'สิทธิผู้ถือหุ้น',
            r1:'เติม LP ก่อน (รับค่าลื่นไถล)', r2:'โหวตกำกับดูแล (กองทุน/Dev/Ops)', r3:'ปันผลคู่ USDT + ARC (รายสัปดาห์)', r4:'ส่วนต่างบริการเติมแทน'},
       count:{title:'นับถอยหลังพรีเซล'},
       chart:{m1:'การกระจาย — เดือนที่ 1',m2:'ตั้งแต่เดือนที่ 2'},
       legend:{div:'ปันผล',lp:'เติมสภาพคล่อง',mkt:'การตลาด',ops:'ปฏิบัติการ'},
       calc:{title:'เครื่องคำนวณปันผล',label:'จำนวน NFT',btn:'คำนวณ',res:'สัปดาห์นี้: ~ {usdt} USDT + {arc} ARC'},
       div:{title:'ตัวอย่างปันผล (รายสัปดาห์)',note:'กำไรสุทธิ 10,000 USDT → 50% เข้าพูล, 100 NFT ≈ 50 USDT/NFT; ส่วนที่เผาเป็น ARC.'},
       v:{contract:'สัญญา & Repo',weekly:'JSON รายสัปดาห์',audit:'การตรวจสอบ (placeholder)'},
       link:{download:'ดาวน์โหลดเกม (placeholder)',wallet:'เชื่อมต่อวอลเล็ต (placeholder)',onchain:'ตัวสำรวจบนเชน (placeholder)'},
       f:{terms:'ข้อตกลง',policy:'ความเป็นส่วนตัว',docs:'เอกสาร'},
       metrics:{title:'แนวโน้มเงินทุน & ตัวชี้วัด', sparkFunds:'กราฟเงินทุน (USDT)', sparkSales:'กราฟยอดขาย (หน่วย)',
                raised:'ระดมแล้ว (USDT)', sold:'ขายแล้ว (หน่วย)', lastweek:'กำไรสุทธิสัปดาห์ก่อน (USDT)'} },

  ms:{ nav:{buy:'Jualan',dist:'Peruntukan',cases:'Kes dividen',mech:'Kestabilan',features:'Sorotan',route:'Peta jalan',verify:'Boleh disahkan',links:'Pautan'},
       cta:{wallet:'Sambung dompet',buy:'Sertai jualan',plan:'Lihat peruntukan',whitepaper:'Kertas putih'},
       hero:{title:'Bangkitkan Yang Tidak Diketahui, Tempa Legenda Anda',subtitle:'Teroka • Ujian • Bazaar • Ekspedisi — Dunia on-chain dikuasakan ARC.'},
       badge:{scale:'Skala',share:'NFT pemegang saham',cycle:'Kitaran',cycleVal:'Dividen mingguan · On-chain',rights:'Hak',rightsVal:'Tadbir urus/LP/Dual'},
       strip:{tier:'Early',std:'Standard',start:'Mula',state:'Status'},
       sec:{subscribe:'Jualan & Kemajuan',allocation:'Peruntukan & Dividen',cases:'Kes dividen',mech:'Mekanisme kestabilan',features:'Sorotan',route:'Peta jalan',verify:'Sahkan on-chain',links:'Pautan pantas'},
       tier:{early:'Early Bird',limit20:'Had 20',std:'Standard',limit80:'Had 80',per:'/ NFT',start8:'Dibuka 8 Sep',afterEarly:'Dibuka selepas Early habis'},
       sub:{total:'Jumlah',target:'Sasaran',raised:'Terkumpul',rights:'Hak pemegang saham',
            r1:'Isi LP keutamaan (yuran slippage)', r2:'Undian tadbir urus (dana/dev/ops)', r3:'Dividen dwi USDT + ARC (mingguan)', r4:'Margin tambah nilai pihak ketiga'},
       count:{title:'Kiraan detik pra-jualan'},
       chart:{m1:'Peruntukan — Bulan 1',m2:'Mulai Bulan 2'},
       legend:{div:'Dividen',lp:'Suntikan LP',mkt:'Pemasaran',ops:'Operasi'},
       calc:{title:'Kalkulator dividen',label:'Pegangan NFT',btn:'Kira',res:'Minggu ini: ~ {usdt} USDT + {arc} ARC'},
       div:{title:'Contoh dividen (mingguan)',note:'Bersih 10,000 USDT → 50% ke kolam, 100 NFT ≈ 50 USDT/NFT; bahagian dibakar dalam ARC.'},
       v:{contract:'Kontrak & Repo',weekly:'JSON mingguan',audit:'Audit (placeholder)'},
       link:{download:'Muat turun permainan (placeholder)',wallet:'Sambung dompet (placeholder)',onchain:'Pelayar on-chain (placeholder)'},
       f:{terms:'Terma',policy:'Privasi',docs:'Dokumen'},
       metrics:{title:'Aliran dana & metrik', sparkFunds:'Garis dana (USDT)', sparkSales:'Garis jualan (unit)',
                raised:'Terkumpul (USDT)', sold:'Terjual (unit)', lastweek:'Bersih minggu lepas (USDT)'} },

  ar:{ nav:{buy:'البيع',dist:'التوزيع',cases:'أمثلة الأرباح',mech:'الاستقرار',features:'المميزات',route:'خارطة الطريق',verify:'قابل للتحقق',links:'روابط'},
       cta:{wallet:'اتصال المحفظة',buy:'انضم للبيع',plan:'عرض التوزيع',whitepaper:'الورقة البيضاء'},
       hero:{title:'أيقِظ المجهول وصُغ أسطورتك',subtitle:'استكشاف • تجارب • سوق • حملة — عالم ألعاب على السلسلة مدعوم بـ ARC.'},
       badge:{scale:'الحجم',share:'NFT للمساهمين',cycle:'الدورة',cycleVal:'توزيع أسبوعي · على السلسلة',rights:'الحقوق',rightsVal:'حوكمة/سيولة/مزدوج'},
       strip:{tier:'مبكر',std:'قياسي',start:'البدء',state:'الحالة'},
       sec:{subscribe:'البيع والتقدم',allocation:'التوزيع والأرباح',cases:'أمثلة الأرباح',mech:'آلية الاستقرار',features:'المميزات',route:'خارطة الطريق',verify:'قابل للتحقق على السلسلة',links:'روابط سريعة'},
       tier:{early:'الطرح المبكر',limit20:'الحد 20',std:'قياسي',limit80:'الحد 80',per:'/ NFT',start8:'يبدأ 8 سبتمبر',afterEarly:'يفتح بعد نفاد المبكر'},
       sub:{total:'الإجمالي',target:'الهدف',raised:'المجموع المُحَصَّل',rights:'حقوق المساهم',
            r1:'أولوية تزويد السيولة (رسوم الانزلاق)', r2:'تصويت الحوكمة (الأموال/التطوير/التشغيل)', r3:'أرباح مزدوجة USDT + ARC (أسبوعي)', r4:'هامش تعبئة الرصيد بالنيابة'},
       count:{title:'العد التنازلي للبيع المسبق'},
       chart:{m1:'توزيع — الشهر الأول',m2:'ابتداءً من الشهر الثاني'},
       legend:{div:'الأرباح',lp:'ضخ السيولة',mkt:'التسويق',ops:'التشغيل'},
       calc:{title:'حاسبة الأرباح',label:'عدد NFT',btn:'احسب',res:'هذا الأسبوع: ~ {usdt} USDT + {arc} ARC'},
       div:{title:'مثال أرباح (أسبوعي)',note:'صافي 10,000 USDT → ‏50% للصندوق، 100 NFT ≈ ‏50 USDT/NFT؛ جزء الحرق بعملة ARC.'},
       v:{contract:'العقد والمستودع',weekly:'JSON أسبوعي',audit:'تدقيق (عنصر نائب)'},
       link:{download:'تنزيل اللعبة (عنصر نائب)',wallet:'اتصال المحفظة (عنصر نائب)',onchain:'مستكشف السلسلة (عنصر نائب)'},
       f:{terms:'الشروط',policy:'الخصوصية',docs:'المستندات'},
       metrics:{title:'منحنى التمويل والبيانات', sparkFunds:'منحنى الأموال (USDT)', sparkSales:'منحنى المبيعات (وحدات)',
                raised:'المبلغ المُحَصَّل (USDT)', sold:'المباع (وحدات)', lastweek:'الصافي الأسبوع الماضي (USDT)'} }
};

// ====== 工具 ======
function dict(lang){ return Object.assign({}, I18N.en, I18N[lang] || {}); }
function getByPath(obj, path){ return path.split('.').reduce((o,k)=> (o && o[k]!==undefined ? o[k] : null), obj); }
function applyI18n(lang){
  const d = dict(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir  = (lang === 'ar') ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const val = getByPath(d, key);
    if (typeof val === 'string'){
      if (val.includes('<b>')) el.innerHTML = val;
      else el.textContent = val;
    }
  });
  const sel = document.getElementById('langSelect');
  if (sel && sel.value !== lang) sel.value = lang;
  localStorage.setItem('arc_lang', lang);
}

// 移动端菜单
(function(){ const t=document.getElementById('menuToggle'); const l=document.querySelector('.nav-links');
  if(!t||!l) return; t.addEventListener('click', ()=> l.style.display=(l.style.display==='flex'?'none':'flex')); })();

// 极光背景（Canvas）
(function(){
  const c=document.getElementById('aurora'); if(!c) return; const ctx=c.getContext('2d');
  function resize(){ c.width=innerWidth; c.height=innerHeight; } resize(); addEventListener('resize',resize);
  let t=0; (function loop(){ t+=.005; const w=c.width,h=c.height; ctx.clearRect(0,0,w,h);
    const grd=ctx.createLinearGradient(0,0,w,h); const a=.5+.5*Math.sin(t*1.2), b=.5+.5*Math.cos(t*.9);
    grd.addColorStop(0,`rgba(83,183,255,${.25+.25*a})`); grd.addColorStop(1,`rgba(82,229,168,${.20+.20*b})`);
    ctx.fillStyle=grd; ctx.beginPath(); const amp=60; ctx.moveTo(0,h*.35+Math.sin(t)*amp);
    for(let x=0;x<=w;x+=40){ const y=h*.35+Math.sin(t+x*.004)*amp; ctx.lineTo(x,y); }
    ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath(); ctx.fill(); requestAnimationFrame(loop); })();
})();

// Reveal 动效
(function(){
  const io=new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('_in'); io.unobserve(e.target);} });},{threshold:.12});
  document.querySelectorAll('.anim').forEach(el=> io.observe(el));
})();

// 数码“翻牌”效果（轻量）
function setFlip(el, val){
  if (!el) return;
  const old = el.getAttribute('data-val') || '';
  const v = String(val);
  if (old === v) return;
  el.setAttribute('data-val', v);
  el.textContent = v.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 千分位
  el.classList.add('flip');
  setTimeout(()=> el.classList.remove('flip'), 360);
}

// 进度 & 倒计时 & 档位按钮
function renderProgress(){
  const earlyPct = Math.round((SOLD_EARLY/CONFIG.EARLY_CAP)*100);
  const stdPct   = Math.round((SOLD_STD/ (CONFIG.TOTAL - CONFIG.EARLY_CAP))*100);
  const totalSold= SOLD_EARLY + SOLD_STD;
  const totalPct = Math.round((totalSold/CONFIG.TOTAL)*100);
  const raised   = SOLD_EARLY*CONFIG.PRICE_EARLY + SOLD_STD*CONFIG.PRICE_STD;

  // 进度条与文本
  const earlyFill=document.getElementById('earlyFill'); const earlyText=document.getElementById('earlyText');
  const stdFill  =document.getElementById('stdFill');  const stdText  =document.getElementById('stdText');
  const totalFill=document.getElementById('totalFill');const totalText=document.getElementById('totalText');
  const raisedEl =document.getElementById('raised');

  if(earlyFill) earlyFill.style.width = Math.min(100, earlyPct) + '%';
  if(earlyText) earlyText.textContent = `${SOLD_EARLY} / ${CONFIG.EARLY_CAP}（${Math.min(100,earlyPct)}%）`;

  if(stdFill) stdFill.style.width = Math.min(100, stdPct) + '%';
  if(stdText) stdText.textContent = `${SOLD_STD} / ${CONFIG.TOTAL - CONFIG.EARLY_CAP}（${Math.min(100,stdPct)}%）`;

  if(totalFill) totalFill.style.width = Math.min(100, totalPct) + '%';
  if(totalText) totalText.textContent = `${totalSold} / ${CONFIG.TOTAL}（${Math.min(100,totalPct)}%）`;

  if(raisedEl) raisedEl.textContent = String(raised).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  setFlip(document.getElementById('flipRaised'), raised);
  setFlip(document.getElementById('flipSold'), totalSold);
}

// 倒计时 & 按钮状态
function setButtonsState(now){
  const start = new Date(CONFIG.PRESALE_START_ISO).getTime();
  const btnEarly = document.getElementById('btnEarly');
  const btnStd   = document.getElementById('btnStd');
  const pillState= document.getElementById('pillState');

  if(now < start){
    btnEarly && (btnEarly.disabled = true);
    btnStd   && (btnStd.disabled   = true);
    pillState && (pillState.textContent = 'COUNTDOWN');
  } else {
    btnEarly && (btnEarly.disabled = SOLD_EARLY >= CONFIG.EARLY_CAP);
    btnStd   && (btnStd.disabled   = SOLD_EARLY < CONFIG.EARLY_CAP);
    pillState && (pillState.textContent = (SOLD_EARLY >= CONFIG.EARLY_CAP ? 'LIVE: STANDARD' : 'LIVE: EARLY'));
  }
}
function startCountdown(){
  const els={d:document.getElementById('cd-d'),h:document.getElementById('cd-h'),m:document.getElementById('cd-m'),s:document.getElementById('cd-s')};
  const start = new Date(CONFIG.PRESALE_START_ISO).getTime();
  function pad(n){ return n<10 ? '0'+n : ''+n; }
  function tick(){
    const now = Date.now(); const diff = Math.max(0, start - now);
    const d = Math.floor(diff/86400000);
    const h = Math.floor(diff%86400000/3600000);
    const m = Math.floor(diff%3600000/60000);
    const s = Math.floor(diff%60000/1000);
    if(els.d){ els.d.textContent = pad(d); els.h.textContent=pad(h); els.m.textContent=pad(m); els.s.textContent=pad(s); }
    setButtonsState(now);
    requestAnimationFrame(tick);
  }
  tick();
}
(function initPills(){
  document.getElementById('pillEarly') && (document.getElementById('pillEarly').textContent = `${CONFIG.EARLY_CAP} 枚 @ ${CONFIG.PRICE_EARLY} USDT`);
  document.getElementById('pillStd')   && (document.getElementById('pillStd').textContent   = `${CONFIG.TOTAL - CONFIG.EARLY_CAP} 枚 @ ${CONFIG.PRICE_STD} USDT`);
  document.getElementById('pillStart') && (document.getElementById('pillStart').textContent = CONFIG.PRESALE_START_ISO.slice(0,10));
})();

// Donut 入场动画
(function(){ document.querySelectorAll('.donut .donut-segment').forEach(seg=>{
  seg.style.transition='stroke-dashoffset 1.2s ease'; const off=seg.getAttribute('stroke-dashoffset')||0;
  requestAnimationFrame(()=> seg.setAttribute('stroke-dashoffset', off)); }); })();

// 分红计算器
(function(){
  const $n = document.getElementById('nftCount');
  const $b = document.getElementById('calcBtn');
  const $r = document.getElementById('calcResult');
  if (!$n || !$b || !$r) return;
  function calc(){
    const lang = localStorage.getItem('arc_lang') || 'zh';
    const d = dict(lang);
    const num = Math.max(0, Number($n.value||0));
    const usdt = (num * 5).toFixed(0);
    const arc  = (num * 50).toFixed(0);
    const tpl  = d.calc?.res || 'This week: ~ {usdt} USDT + {arc} ARC';
    $r.textContent = tpl.replace('{usdt}', usdt).replace('{arc}', arc);
  }
  $b.addEventListener('click', calc);
})();

// 钱包/认购按钮占位
document.getElementById('btnWallet')?.addEventListener('click', ()=> alert('钱包连接占位：后续接 Web3Modal / WalletConnect。'));
document.getElementById('btnEarly') ?.addEventListener('click', ()=> alert('认购早鸟占位：9 月 8 日开启。'));
document.getElementById('btnStd')   ?.addEventListener('click', ()=> alert('认购标准占位：早鸟售罄后开放。'));

// ====== Sparkline 资金曲线（Canvas） ======
function drawSparkline(canvasId, data, opts={}){
  const c = document.getElementById(canvasId); if(!c) return;
  const ctx = c.getContext('2d');
  const w = c.width, h = c.height;
  ctx.clearRect(0,0,w,h);

  const pad = 18;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const dy  = (max - min) || 1;

  // 轴线（淡）
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad, h-pad); ctx.lineTo(w-pad, h-pad); ctx.stroke();

  // 渐变线
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(83,183,255,1)');
  grad.addColorStop(1, 'rgba(83,183,255,0.15)');

  // 线
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#53B7FF';
  ctx.beginPath();
  data.forEach((v, i)=>{
    const x = pad + i*( (w-2*pad) / Math.max(1,(data.length-1)) );
    const y = pad + (max - v) * ( (h-2*pad) / dy );
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();

  // 面积
  ctx.lineTo(w-pad, h-pad);
  ctx.lineTo(pad, h-pad);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // 当前点
  const i = data.length-1;
  const x = pad + i*( (w-2*pad) / Math.max(1,(data.length-1)) );
  const y = pad + (max - data[i]) * ( (h-2*pad) / dy );
  ctx.fillStyle = '#53B7FF';
  ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill();
}

// ====== 从 weekly.json 读取（可选，没文件也不报错） ======
async function hydrateFromWeekly(){
  try{
    const res = await fetch('assets/weekly.json', {cache:'no-store'});
    if(!res.ok) throw 0;
    const j = await res.json();

    // 示例：你可以在 weekly.json 里记录 sold/raised/net/history
    // 这里做容错：若没有字段，就忽略
    if (Array.isArray(j.funds_history)) drawSparkline('sparkFunds', j.funds_history);
    else drawSparkline('sparkFunds', [1000,1800,2600,2500,3200,4200,5800]);

    if (Array.isArray(j.sales_history)) drawSparkline('sparkSales', j.sales_history);
    else drawSparkline('sparkSales', [1,3,4,6,10,12,15,20]);

    if (typeof j.net_usdt === 'number') setFlip(document.getElementById('flipNet'), j.net_usdt);
    else setFlip(document.getElementById('flipNet'), 10000);

    if (typeof j.sold_early === 'number') SOLD_EARLY = j.sold_early;
    if (typeof j.sold_std   === 'number') SOLD_STD   = j.sold_std;
    renderProgress();
  }catch(e){
    // 后备：用内置示例数据
    drawSparkline('sparkFunds', [1000,1800,2600,2500,3200,4200,5800]);
    drawSparkline('sparkSales', [1,3,4,6,10,12,15,20]);
    setFlip(document.getElementById('flipNet'), 10000);
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', ()=>{
  const lang = localStorage.getItem('arc_lang') || 'zh';
  applyI18n(lang);
  document.getElementById('langSelect')?.addEventListener('change', (e)=> applyI18n(e.target.value));
  renderProgress();
  startCountdown();
  hydrateFromWeekly();
});










