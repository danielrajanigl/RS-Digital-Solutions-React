export default function Logo({ width = 48, height = 47, className = "logo-svg" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="155 50 150 145" width={width} height={height}>
      <polygon points="230,60 285,92 285,153 230,185 175,153 175,92" fill="none" stroke="#7ba7cc" strokeWidth="2.5"/>
      <polygon points="230,73 274,100 274,145 230,172 186,145 186,100" fill="none" stroke="#5f83b3" strokeWidth="0.5" opacity="0.2"/>
      <text x="230" y="130" textAnchor="middle" dominantBaseline="central" fontFamily="'Inter', -apple-system, sans-serif" fontSize="58" fontWeight="600" fill="#ffffff" letterSpacing="-2">RS</text>
      <circle cx="230" cy="60" r="3" fill="#7ba7cc"/>
      <circle cx="285" cy="92" r="3" fill="#7ba7cc"/>
      <circle cx="285" cy="153" r="3" fill="#7ba7cc"/>
      <circle cx="230" cy="185" r="3" fill="#7ba7cc"/>
      <circle cx="175" cy="153" r="3" fill="#7ba7cc"/>
      <circle cx="175" cy="92" r="3" fill="#7ba7cc"/>
    </svg>
  );
}
