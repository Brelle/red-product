import logoLight from '../assets/logo-light.png'

export default function Logo({ size = 20, variant = 'light', className = '' }) {
  let filterStyle = 'none'
  if (variant === 'dark') filterStyle = 'brightness(0)'
  if (variant === 'brand') {
    // Teinte l'image en #2b2f38 (couleur de la sidebar)
    filterStyle = 'brightness(0) saturate(100%) invert(16%) sepia(9%) saturate(1352%) hue-rotate(179deg) brightness(94%) contrast(87%)'
  }

  return (
    <img
      src={logoLight}
      alt="Red Product"
      style={{ width: size, height: size, filter: filterStyle }}
      className={className}
    />
  )
}