import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'

export default function ResetPassword() {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)
    try {
      await api.post('password-reset-confirm/', {
        uid,
        token,
        new_password: newPassword,
      })
      setSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      setError('Lien invalide ou expiré.')
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
        <p className="font-medium mb-1">Nouveau mot de passe</p>
        <p className="text-sm text-gray-500 mb-6">Choisissez un nouveau mot de passe pour votre compte.</p>

        {success ? (
          <p className="text-sm text-green-600">Mot de passe réinitialisé ! Redirection...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input type="password" placeholder="Nouveau mot de passe" value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border-b border-gray-300 outline-none py-2 text-sm" required />
            <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-b border-gray-300 outline-none py-2 text-sm" required />
            <button type="submit" disabled={loading}
              className="w-full bg-[#2b2f38] text-white py-2.5 rounded-md text-sm font-medium disabled:opacity-50">
              {loading ? 'Enregistrement...' : 'Réinitialiser'}
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-4 text-gray-500">
          Revenir à la <Link to="/" className="text-yellow-600">connexion</Link>
        </p>
      </div>
    </div>
  )
}