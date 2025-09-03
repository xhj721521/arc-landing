<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <!-- Gold glow filter: blur + source merge -->
    <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <style>
      .goldstroke { stroke: #FFD56A; fill: none; filter: url(#goldGlow); }
      .goldfill { fill: #FFD56A; filter: url(#goldGlow); }
      .label { font-family: Cinzel, "Trajan Pro", "Times New Roman", serif; letter-spacing: 2px; }
    </style>
  </defs>

  <!-- Black background -->
  <rect width="1024" height="1024" fill="#000000"/>

  <!-- Outer glowing ring -->
  <circle cx="512" cy="512" r="380" class="goldstroke" stroke-width="22"/>

  <!-- 24 evenly-spaced rune marks (glowing strokes) -->
  <g id="runes" stroke="#FFD56A" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#goldGlow)">
    <g transform="translate(512,512) rotate(0) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(15) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(30) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(45) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(60) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(75) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(90) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(105) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(120) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(135) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(150) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(165) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(180) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(195) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(210) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(225) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(240) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(255) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(270) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(285) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(300) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(315) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(330) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
    <g transform="translate(512,512) rotate(345) translate(0,-380)">
      <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
    </g>
  </g>

  <!-- Title inside the ring -->
  <g text-anchor="middle" class="label goldfill">
    <text x="512" y="492" font-size="108">ARCANE</text>
    <text x="512" y="592" font-size="96">PROTOCOL</text>
  </g>
</svg>
