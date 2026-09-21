import { FileText, MessageSquare, Users, Mail, Building2, Layers } from 'lucide-react'

const stats = [
  { label: 'Formulaires', count: '125', note: 'Je ne sais pas quoi mettre', color: 'bg-purple-600', icon: FileText },
  { label: 'Messages', count: '40', note: 'Je ne sais pas quoi mettre', color: 'bg-teal-500', icon: MessageSquare },
  { label: 'Utilisateurs', count: '600', note: 'Je ne sais pas quoi mettre', color: 'bg-amber-400', icon: Users },
  { label: 'E-mails', count: '25', note: 'Je ne sais pas quoi mettre', color: 'bg-red-500', icon: Mail },
  { label: 'Hôtels', count: '40', note: 'Je ne sais pas quoi mettre', color: 'bg-indigo-600', icon: Building2 },
  { label: 'Entités', count: '02', note: 'Je ne sais pas quoi mettre', color: 'bg-blue-500', icon: Layers },
]

export default function Dashboard() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-normal text-gray-800">Bienvenue sur RED Product</h2>
        <p className="text-gray-500 text-xs mt-0.5">Lorem ipsum dolor sit amet consectetur</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(({ label, count, note, color, icon: Icon }) => (
          <div key={label} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${color} text-white flex items-center justify-center shrink-0`}>
              <Icon size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {count} <span className="font-normal text-gray-600 text-xs">{label}</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}