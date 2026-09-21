import { useEffect, useState } from 'react'
import { Plus, ImagePlus, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'

export default function HotelList() {
  const [hotels, setHotels] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', address: '', email: '', phone: '', price: '', currency: 'XOF', image: null,
  })

  const loadHotels = () => {
    api.get('products/').then((res) => setHotels(res.data))
  }

  useEffect(() => {
    loadHotels()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '')
    setForm({ ...form, phone: digitsOnly })
  }

  const handlePriceChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '')
    setForm({ ...form, price: digitsOnly })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setForm({ ...form, image: file })
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const loadingToast = toast.loading('Enregistrement de l\'hôtel...')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (value) data.append(key, value)
      })
      await api.post('products/', data)
      toast.success('Hôtel créé avec succès !', { id: loadingToast })
      setForm({ name: '', address: '', email: '', phone: '', price: '', currency: 'XOF', image: null })
      setPreview(null)
      setShowForm(false)
      loadHotels()
    } catch (err) {
      toast.error('Erreur lors de la création de l\'hôtel.', { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }

  if (showForm) {
    return (
      <div className="bg-white rounded-lg p-6 max-w-3xl">
        <button
          onClick={() => setShowForm(false)}
          className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gray-500 mb-6 pb-4 border-b border-dashed border-gray-300 w-full"
        >
          <ArrowLeft size={16} /> Créer un nouvel hôtel
        </button>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="text-sm text-gray-500">Nom de l'hôtel</label>
            <input name="name" value={form.name} onChange={handleChange} required
              className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Adresse</label>
            <input name="address" value={form.address} onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-500">E-mail</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Numéro de téléphone</label>
            <input
              name="phone"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={form.phone}
              onChange={handlePhoneChange}
              className="w-full border rounded-md px-3 py-2 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Prix par nuit</label>
            <input
              name="price"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={form.price}
              onChange={handlePriceChange}
              required
              className="w-full border rounded-md px-3 py-2 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Devise</label>
            <select name="currency" value={form.currency} onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm mt-1">
              <option value="XOF">F XOF</option>
              <option value="EUR">€ EUR</option>
              <option value="USD">$ USD</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-sm text-gray-500">Ajouter une photo</label>
            <label className="mt-1 flex flex-col items-center justify-center border-2 border-dashed rounded-md h-32 cursor-pointer text-gray-400 overflow-hidden">
              {preview ? (
                <img src={preview} alt="aperçu" className="h-full object-cover" />
              ) : (
                <>
                  <ImagePlus size={22} />
                  <span className="text-sm mt-1">Ajouter une photo</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-800 text-white text-sm px-6 py-2.5 rounded-md disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl text-gray-800">Hôtels <span className="text-gray-400">{hotels.length}</span></p>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-white text-gray-800 border border-gray-300 text-sm px-4 py-2 rounded-md"
        >
          <Plus size={16} /> Créer un nouvel hôtel
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {hotel.image ? (
              <img src={hotel.image} alt={hotel.name} className="w-full h-36 object-cover" />
            ) : (
              <div className="w-full h-36 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                Pas de photo
              </div>
            )}
            <div className="p-3">
              <p className="text-xs text-red-500">{hotel.address || 'Adresse non renseignée'}</p>
              <p className="font-medium">{hotel.name}</p>
              <p className="text-xs text-gray-400">
                {Math.round(hotel.price).toLocaleString('fr-FR').replace(/\s/g, '.')} {hotel.currency} par nuit
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}