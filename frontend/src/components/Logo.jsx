import logoLight from '../assets/logo-light.png'

export default function Logo({ size = 20, variant = 'light', className = '' }) {
  return (
    <img
      src={logoLight}
      alt="Red Product"
      style={{
        width: size,
        height: size,
        filter: variant === 'dark' ? 'brightness(0)' : 'none',
      }}
      className={className}
    />
  )
}