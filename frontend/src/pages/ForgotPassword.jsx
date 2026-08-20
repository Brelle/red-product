import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await api.post('password-reset/', { email })
      setMessage('Si ce compte existe, un email a été envoyé.')
    } catch (err) {
      setMessage('Une erreur est survenue. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#2b2f38] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex items-center gap-2 justify-center mb-6 font-semibold text-lg">
          <span className="text-red-500">▲</span> RED PRODUCT
        </div>
        <p className="font-medium mb-1">Mot de passe oublié?</p>
        <p className="text-sm text-gray-500 mb-6">Entrez votre adresse e-mail et nous vous enverrons les instructions.</p>
        {message && <p className="text-sm text-green-600 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="email" placeholder="Votre e-mail" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-300 outline-none py-2 text-sm" required />
          <button type="submit" disabled={loading}
            className="w-full bg-[#2b2f38] text-white py-2.5 rounded-md text-sm font-medium disabled:opacity-50">
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
          Revenir à la <Link to="/" className="text-yellow-600">connexion</Link>
        </p>
      </div>
    </div>
  )
}