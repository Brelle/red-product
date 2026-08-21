import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { LayoutGrid, Building2, Search, Bell, LogOut, Menu, X } from 'lucide-react'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen font-sans bg-cover bg-center relative" style={{ backgroundImage: "linear-gradient(rgba(20, 22, 28, 0.75), rgba(20, 22, 28, 0.75)), url('https://res.cloudinary.com/gwhpv6xz/image/upload/v1787306185/94c992138e12276ca66f489ef860cd3e376efe77.jpg')" }}>

      {/* Overlay sombre sur mobile quand le menu est ouvert */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#2b2f38] text-gray-300 flex flex-col justify-between fixed md:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div>
          <div className="p-6 flex items-center justify-between gap-2 text-white font-bold text-lg tracking-wide border-b border-gray-700/50">
            <span className="flex items-center gap-2">
              <span className="text-white text-xl font-black">▲</span> RED PRODUCT
            </span>
            <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <p className="px-6 text-[11px] uppercase tracking-wider text-gray-400 mt-6 mb-3 font-medium">Principal</p>
          <nav className="px-3 space-y-1">
            <NavLink
              to="/dashboard"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-gray-700/60 text-white' : 'hover:bg-gray-700/30 text-gray-400'
                }`
              }
            >
              <LayoutGrid size={18} /> Dashboard
            </NavLink>
            <NavLink
              to="/hotels"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-gray-700/60 text-white' : 'hover:bg-gray-700/30 text-gray-400'
                }`
              }
            >
              <Building2 size={18} /> Liste des hôtels
            </NavLink>
          </nav>
        </div>

        {/* User Info Bottom */}
        <div className="p-4 border-t border-gray-700/50 flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#2b2f38]" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Brelle MOUELE</p>
            <p className="text-xs text-green-400 flex items-center gap-1">en ligne</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center gap-2 text-gray-400 bg-gray-100 rounded-full px-4 py-2 w-40 md:w-72 focus-within:ring-2 focus-within:ring-gray-300">
              <Search size={18} />
              <input
                type="text"
                placeholder="Recherche"
                className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="relative cursor-pointer">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover cursor-pointer"
            />
            <LogOut
              size={18} className="text-gray-500 cursor-pointer"
              onClick={() => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.href = '/'
              }}
            />
          </div>
        </header>

        {/* Content Page */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-white/70 backdrop-blur-sm">
          <Outlet />
        </main>
      </div>
    </div>
  )
}