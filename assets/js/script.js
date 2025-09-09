/*
 * Modern site JavaScript
 * Handles starfield animation, scroll-triggered animations, multi-language support,
 * radial gauge updates, countdown timer, pie chart for tokenomics,
 * and footer year update.
 */

// Starfield animation similar to new_site but for #starfield
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  const stars = [];
  const numStars = 150;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.8 + 0.2
      });
    }
  }

  function update() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      star.y += star.speed;
      if (star.y > height) {
        star.y = 0;
        star.x = Math.random() * width;
      }
    });
    requestAnimationFrame(update);
  }

  resize();
  initStars();
  window.addEventListener('resize', () => {
    resize();
    initStars();
  });
  update();
}

// Scroll-trigger animations using IntersectionObserver
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.section-title, .feature-hex, .gauge-card, .benefit-item, .shareholder-card, .chart-wrapper, .carousel-item, .team-card, .roadmap-step, .contact').forEach(el => {
    el.classList.add('animate');
    observer.observe(el);
  });
}

// Multi-language support using i18n.json
async function initI18n() {
  try {
    const res = await fetch('./assets/data/i18n.json');
    const translations = await res.json();
    // Set default language to English on initial load
    let currentLang = 'en';

    function applyTranslations() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = translations[currentLang][key];
        if (text) {
          el.textContent = text;
        }
      });
    }
    document.querySelectorAll('.lang-selector button').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (translations[lang]) {
          currentLang = lang;
          applyTranslations();
        }
      });
    });
    applyTranslations();
  } catch (err) {
    console.error('Failed to load translations', err);
  }
}

// Initialize radial gauges (conic-gradient) based on data-value attribute
function initGauges() {
  document.querySelectorAll('.gauge').forEach(gauge => {
    const value = gauge.getAttribute('data-value');
    gauge.style.setProperty('--value', value);
    // The displayed percentage inside gauge will be updated automatically by CSS
  });
}

// Countdown timer for all elements with class "countdown"
function initCountdown() {
  document.querySelectorAll('.countdown').forEach(el => {
    const targetTime = new Date(el.getAttribute('data-start')).getTime();
    const digits = [...el.querySelectorAll('.digit')];

    const pad = n => String(Math.max(0, Math.floor(n))).padStart(2, '0');

    const set = (d, h, m, s) => {
      const values = [pad(d), pad(h), pad(m), pad(s)];
      digits.forEach((digit, i) => {
        const v = values[i];
        if (digit.getAttribute('data-val') !== v) {
          digit.setAttribute('data-val', v);
          const span = digit.querySelector('span');
          if (span) span.textContent = v;
          digit.classList.remove('flipping');
          void digit.offsetWidth;
          digit.classList.add('flipping');
        }
      });
    };

    const tick = () => {
      let diff = Math.max(0, targetTime - Date.now());
      const d = diff / 86400000; diff %= 86400000;
      const h = diff / 3600000; diff %= 3600000;
      const m = diff / 60000; diff %= 60000;
      const s = diff / 1000;
      set(d, h, m, s);
      requestAnimationFrame(tick);
    };

    tick();
  });
}

// Draw tokenomics chart using Chart.js
function initTokenomicsChart() {
  const canvas = document.getElementById('tokenChart2');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['早鸟', '标准', '团队', '预留'],
      datasets: [
        {
          data: [20, 50, 20, 10],
          backgroundColor: ['#9146ff', '#ffce00', '#00c19d', '#ff5656'],
          borderColor: '#0a0520',
          borderWidth: 1
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#faf7ff'
          }
        }
      }
    }
  });
}

// Update footer year
function updateYear() {
  const yearEl = document.getElementById('year2');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initScrollAnimations();
  initI18n();
  initGauges();
  initCountdown();
  initTokenomicsChart();
  updateYear();
});


// Apply entrance animation to elements marked with reveal-fade or reveal-slow
window.addEventListener("load", function(){
  document.querySelectorAll('.reveal-fade, .reveal-slow').forEach(el => el.classList.add('is-in'));
});
