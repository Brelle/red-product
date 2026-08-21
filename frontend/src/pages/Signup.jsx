import { Link } from 'react-router-dom'

export default function Signup() {
  return (
     <div
     className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
     style={{
    backgroundImage: "linear-gradient(rgba(20, 22, 28, 0.75), rgba(20, 22, 28, 0.75)), url('https://res.cloudinary.com/gwhpv6xz/image/upload/v1787306185/94c992138e12276ca66f489ef860cd3e376efe77.jpg')"
     }}
     >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex items-center gap-2 justify-center mb-6 font-semibold text-lg">
          <span className="text-red-500">▲</span> RED PRODUCT
        </div>
        <p className="text-sm text-gray-500 mb-6">Inscrivez-vous en tant qu'Admin</p>
        <form className="space-y-5">
          <input type="text" placeholder="Nom" className="w-full border-b border-gray-300 outline-none py-2 text-sm" />
          <input type="email" placeholder="E-mail" className="w-full border-b border-gray-300 outline-none py-2 text-sm" />
          <input type="password" placeholder="Mot de passe" className="w-full border-b border-gray-300 outline-none py-2 text-sm" />
          <label className="flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox" /> Accepter les termes et la politique
          </label>
          <button type="submit" className="w-full bg-[#2b2f38] text-white py-2.5 rounded-md text-sm font-medium">
            S'inscrire
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
          Vous avez déjà un compte ? <Link to="/" className="text-yellow-600">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}