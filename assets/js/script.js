/*
 * 主脚本文件
 * 负责初始化星空背景动画、滚动触发动画、多语言切换、动态进度显示、预售倒计时、代币经济饼图等功能。
 */

// 星空背景动画
function initStarfield() {
  const canvas = document.getElementById('background');
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

  function updateStars() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      // update position (simple downward movement)
      star.y += star.speed;
      if (star.y > height) {
        star.y = 0;
        star.x = Math.random() * width;
      }
    });
    requestAnimationFrame(updateStars);
  }

  resize();
  initStars();
  window.addEventListener('resize', () => {
    resize();
    initStars();
  });
  updateStars();
}

// IntersectionObserver 用于滚动触发动画
function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate').forEach(el => observer.observe(el));
}

// 多语言切换
async function initI18n() {
  const res = await fetch('./assets/data/i18n.json');
  const data = await res.json();
  let currentLang = 'zh';

  function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = data[currentLang][key];
      if (translation) el.textContent = translation;
    });
  }

  // 语言按钮绑定
  document.querySelectorAll('.language-selector button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (data[lang]) {
        currentLang = lang;
        updateTexts();
      }
    });
  });

  updateTexts();
}

// 动态认购进度演示
function initProgress() {
  const fill = document.getElementById('progress-fill');
  const raisedEl = document.getElementById('raised');
  const soldEl = document.getElementById('sold');
  const burnedEl = document.getElementById('burned');
  // 模拟数据，可以替换为实际数据接口
  const targetRaised = 50000;
  const targetSold = 60;
  const targetBurned = 10;
  let current = 0;
  const duration = 2000; // 动画时长
  const startTime = performance.now();

  function animate(time) {
    const progress = Math.min((time - startTime) / duration, 1);
    current = progress;
    const raised = Math.floor(targetRaised * current);
    const sold = Math.floor(targetSold * current);
    const burned = Math.floor(targetBurned * current);
    raisedEl.textContent = raised.toLocaleString();
    soldEl.textContent = sold;
    burnedEl.textContent = burned;
    fill.style.width = `${Math.floor((sold / 100) * 100)}%`;
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

// 预售倒计时
function initCountdown() {
  const countdownEl = document.querySelector('.countdown');
  // 设定倒计时目标日期，可根据需要修改
  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() + 1);

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
      countdownEl.textContent = '00天00:00:00';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${days.toString().padStart(2, '0')}天${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// 绘制代币经济饼图
function initTokenChart() {
  const ctx = document.getElementById('tokenChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['早鸟', '标准', '团队', '预留'],
      datasets: [
        {
          data: [20, 50, 20, 10],
          backgroundColor: ['#9146ff', '#ffce00', '#00c19d', '#ff5656'],
          borderColor: '#10081c',
          borderWidth: 1
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#f5f5f5'
          }
        }
      }
    }
  });
}

// 更新页脚年份
function updateYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initAnimations();
  initI18n();
  initProgress();
  initCountdown();
  initTokenChart();
  updateYear();
});

