function svgToDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function createCategoryArtwork({ title, subtitle, accent = '#d4af37' }) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#060606" />
          <stop offset="55%" stop-color="#121212" />
          <stop offset="100%" stop-color="#050505" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.6" />
          <stop offset="40%" stop-color="${accent}" stop-opacity="0.12" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="900" rx="48" fill="url(#bg)"/>
      <circle cx="880" cy="180" r="230" fill="url(#glow)"/>
      <path d="M140 640 C 320 520, 420 820, 620 650 S 980 500, 1090 620" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="6"/>
      <rect x="116" y="126" width="180" height="46" rx="23" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-opacity="0.45"/>
      <text x="206" y="156" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" letter-spacing="6" fill="${accent}">LUXE HAVEN</text>
      <text x="100" y="500" font-family="Arial, sans-serif" font-size="84" font-weight="700" fill="#ffffff">${title}</text>
      <text x="100" y="580" font-family="Arial, sans-serif" font-size="32" fill="#d5d5d5">${subtitle}</text>
      <rect x="100" y="660" width="300" height="10" rx="5" fill="${accent}"/>
      <rect x="100" y="690" width="180" height="10" rx="5" fill="#ffffff" fill-opacity="0.18"/>
    </svg>
  `

  return svgToDataUri(svg)
}

export function createProductArtwork({ title, colorHex = '#d4af37', accent = '#ffffff' }) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#090909" />
          <stop offset="100%" stop-color="#1a1a1a" />
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stop-color="${colorHex}" stop-opacity="0.6" />
          <stop offset="55%" stop-color="${colorHex}" stop-opacity="0.08" />
          <stop offset="100%" stop-color="${colorHex}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1000" height="1000" rx="56" fill="url(#bg)"/>
      <circle cx="500" cy="360" r="280" fill="url(#halo)"/>
      <path d="M330 250 L500 190 L670 250 L735 350 L665 390 L625 300 L625 770 L375 770 L375 300 L335 390 L265 350 Z" fill="${colorHex}" fill-opacity="0.9" stroke="#ffffff" stroke-opacity="0.25" stroke-width="6"/>
      <rect x="390" y="335" width="220" height="30" rx="15" fill="#ffffff" fill-opacity="0.14"/>
      <rect x="360" y="410" width="280" height="12" rx="6" fill="${accent}" fill-opacity="0.6"/>
      <rect x="360" y="450" width="180" height="12" rx="6" fill="#ffffff" fill-opacity="0.2"/>
      <text x="500" y="860" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" letter-spacing="6" fill="#ffffff" fill-opacity="0.85">${title}</text>
    </svg>
  `

  return svgToDataUri(svg)
}
