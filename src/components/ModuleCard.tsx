import { Clock, Star, Play, HelpCircle, Pencil, Trash2 } from 'lucide-react'
import { api } from '../api/client'

type Module = {
  id: number
  title: string
  description: string
  module_type: string
  learning_style?: string
  difficulty?: string
  duration_minutes?: number
}

const typeColors: Record<string, { bar: string; chip: string; chipText: string; iconBg: string }>= {
  Interactive: { bar: 'bg-blue-500', chip: 'bg-blue-100', chipText: 'text-blue-700', iconBg: 'bg-blue-50' },
  Video: { bar: 'bg-indigo-500', chip: 'bg-indigo-100', chipText: 'text-indigo-700', iconBg: 'bg-indigo-50' },
  Quiz: { bar: 'bg-purple-500', chip: 'bg-purple-100', chipText: 'text-purple-700', iconBg: 'bg-purple-50' },
  Reading: { bar: 'bg-teal-500', chip: 'bg-teal-100', chipText: 'text-teal-700', iconBg: 'bg-teal-50' },
  Project: { bar: 'bg-orange-500', chip: 'bg-orange-100', chipText: 'text-orange-700', iconBg: 'bg-orange-50' },
  Discussion: { bar: 'bg-pink-500', chip: 'bg-pink-100', chipText: 'text-pink-700', iconBg: 'bg-pink-50' },
}

export default function ModuleCard({ m, onDeleted }: { m: Module; onDeleted?: () => void | Promise<void> }) {
  const colors = typeColors[m.module_type] || typeColors.Interactive
  const handleDelete = async () => {
    try { await api.delete(`/modules/${m.id}`) } catch {}
    if (onDeleted) await onDeleted()
  }
  return (
    <div className="card overflow-hidden hover-lift anim-fade">
      <div className={`${colors.bar} h-1 w-full`} />
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className={`w-10 h-10 rounded-lg ${colors.iconBg} grid place-items-center text-slate-700`}>🧩</div>
          <span className={`text-xs px-2 py-1 rounded ${colors.chip} ${colors.chipText} capitalize`}>{m.module_type.toLowerCase()}</span>
        </div>
        <div className="mt-3 text-xl font-semibold text-blue-700">{m.title}</div>
        <div className="text-slate-600 mt-1">{m.description}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {m.difficulty && (
            <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 lowercase">{m.difficulty}</span>
          )}
          {m.learning_style && (
            <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700 lowercase">{m.learning_style}</span>
          )}
        </div>
      </div>
      <div className="border-t border-slate-200 px-5 py-3 flex items-center gap-5 text-slate-600">
        <div className="flex items-center gap-1"><Clock size={16}/><span>{m.duration_minutes ?? 0}</span><span className="text-xs">min</span></div>
        <div className="flex items-center gap-1"><Star size={16} className="text-amber-500"/><span className="text-sm">4.6</span></div>
        <div className="flex items-center gap-1"><Play size={16}/></div>
        <div className="flex items-center gap-1"><HelpCircle size={16}/></div>
        <div className="ms-auto flex items-center gap-3">
          <button className="text-slate-600 hover:text-slate-800 icon-hover" title="Edit"><Pencil size={16}/></button>
          <button className="text-red-600 hover:text-red-700 icon-hover" title="Delete" onClick={handleDelete}><Trash2 size={16}/></button>
        </div>
      </div>
    </div>
  )
}
