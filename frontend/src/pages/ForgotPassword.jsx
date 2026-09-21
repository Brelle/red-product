import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Logo from '../components/Logo'
import api from '../api/axios'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!accepted) {
      setError('Merci d\'accepter les termes et la politique.')
      return
    }

    setLoading(true)
    const loadingToast = toast.loading('Création du compte...')
    try {
      await api.post('register/', { name, email, password })
      toast.success('Compte créé avec succès !', { id: loadingToast })
      navigate('/')
    } catch (err) {
      const message = err.response?.data?.detail || 'Erreur lors de la création du compte.'
      setError(message)
      toast.error(message, { id: loadingToast })
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
          <Logo size={28} variant="dark" /> RED PRODUCT
        </div>
        <p className="text-sm text-gray-500 mb-6">Inscrivez-vous en tant qu'Admin</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b border-gray-300 outline-none py-2 text-sm"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-300 outline-none py-2 text-sm"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-300 outline-none py-2 text-sm"
            required
          />
          <label className="flex items-center gap-2 text-sm text-gray-500">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            Accepter les termes et la politique
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2b2f38] text-white py-2.5 rounded-md text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? 'Création en cours...' : "S'inscrire"}
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
          Vous avez déjà un compte ? <Link to="/" className="text-yellow-600">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}