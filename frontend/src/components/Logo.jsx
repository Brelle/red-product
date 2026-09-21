export default function Logo({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Partie principale du papier plié */}
      <path
        d="M12 2 L22 12 L12 22 L2 12 Z"
        fill="white"
      />
      {/* Pli triangulaire (ombre plus sombre) en bas à gauche */}
      <path
        d="M2 12 L12 22 L2 22 Z"
        fill="white"
        fillOpacity="0.55"
      />
    </svg>
  )
}