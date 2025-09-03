<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <style>
      .label { font-family: Cinzel, "Trajan Pro", "Times New Roman", serif; letter-spacing: 2px; }
    </style>
  </defs>

  <rect width="1024" height="1024" fill="#000"/>
  <!-- 外环：先画一条粗、透明度低的“伪光晕”，再画一条细、亮的主线 -->
  <circle cx="512" cy="512" r="380" fill="none" stroke="#FFD56A" stroke-opacity="0.25" stroke-width="50"/>
  <circle cx="512" cy="512" r="380" fill="none" stroke="#FFD56A" stroke-width="18"/>

  <!-- 24 等分符文：同样双描边 -->
  <g stroke="#FFD56A" stroke-linecap="round" fill="none">
    <g stroke-opacity="0.25" stroke-width="12">
      <g transform="translate(512,512)">
        <!-- 复制 24 次，间隔 15° -->
        <!-- 示例一组： -->
        <g transform="rotate(0) translate(0,-380)">
          <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
        </g>
        <g transform="rotate(15) translate(0,-380)">
          <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
        </g>
        <!-- ... 到 345° 共24个 ... -->
      </g>
    </g>
    <g stroke-width="5">
      <g transform="translate(512,512)">
        <g transform="rotate(0) translate(0,-380)">
          <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
        </g>
        <g transform="rotate(15) translate(0,-380)">
          <path d="M0,-16 L0,16"/><path d="M0,0 L10,-10"/><path d="M0,0 L-10,-10"/>
        </g>
        <!-- ... 到 345° 共24个 ... -->
      </g>
    </g>
  </g>

  <!-- 文字：同样双描边模拟光感 -->
  <g text-anchor="middle" class="label">
    <text x="512" y="492" font-size="108" fill="#FFD56A" fill-opacity="0.25" stroke="#FFD56A" stroke-opacity="0.25" stroke-width="12">ARCANE</text>
    <text x="512" y="592" font-size="96" fill="#FFD56A" fill-opacity="0.25" stroke="#FFD56A" stroke-opacity="0.25" stroke-width="10">PROTOCOL</text>

    <text x="512" y="492" font-size="108" fill="#FFD56A">ARCANE</text>
    <text x="512" y="592" font-size="96" fill="#FFD56A">PROTOCOL</text>
  </g>
</svg>
