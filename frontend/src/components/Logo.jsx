export default function Logo({ size = 20, colorLeft = '#9CA3AF', colorRight = 'white', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Moitié gauche (plus sombre) */}
      <path d="M4 3 H12 V21 L4 9 Z" fill={colorLeft} />
      {/* Moitié droite (plus claire) */}
      <path d="M12 3 H20 V9 L12 21 Z" fill={colorRight} />
    </svg>
  )
}