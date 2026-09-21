import logoLight from '../assets/logo-light.png'
import logoDark from '../assets/logo-dark.png'

export default function Logo({ size = 20, variant = 'light', className = '' }) {
  const src = variant === 'dark' ? logoDark : logoLight
  return <img src={src} alt="Red Product" style={{ width: size, height: size }} className={className} />
}