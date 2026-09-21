import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Logo from '../components/Logo'
import api from '../api/axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const loadingToast = toast.loading('Connexion en cours...')
    try {
      const res = await api.post('token/', { email, password })
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      toast.success('Connecté avec succès !', { id: loadingToast })
      navigate('/dashboard')
    } catch (err) {
      setError('Identifiants incorrects.')
      toast.error('Identifiants incorrects.', { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
     className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
    style={{
    backgroundImage: "linear-gradient(rgba(20, 22, 28, 0.75), rgba(20, 22, 28, 0.75)), url('https://res.cloudinary.com/gwhpv6xz/image/upload/v1787306185/94c992138e12276ca66f489ef860cd3e376efe77.jpg')"
       }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex items-center gap-2 justify-center mb-6 font-medium text-lg">
          <Logo size={20} /> RED PRODUCT
        </div>
        <p className="text-sm text-gray-500 mb-6">Connectez-vous en tant qu'Admin</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="email" placeholder="E-mail" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-300 focus:border-gray-800 outline-none py-2 text-sm" required />
          <input type="password" placeholder="Mot de passe" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-300 focus:border-gray-800 outline-none py-2 text-sm" required />
          <label className="flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox" /> Gardez-moi connecté
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2b2f38] text-white py-2.5 rounded-md text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        <div className="text-center text-sm mt-4 space-y-1">
          <p><Link to="/forgot-password" className="text-yellow-600">Mot de passe oublié?</Link></p>
          <p className="text-gray-500">Vous n'avez pas de compte ? <Link to="/signup" className="text-yellow-600">S'inscrire</Link></p>
        </div>
      </div>
    </div>
  )
}