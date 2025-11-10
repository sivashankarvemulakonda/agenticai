import { Link } from 'react-router-dom'
import { api } from '../api/client'

type Student = {
  id: number
  full_name: string
  email: string
  learning_style?: string
  engagement_score: number
  risk_level?: string
}

type Props = {
  s: Student
  posts?: number
  interventions?: number
  lastActive?: string
  onDeleted?: () => void | Promise<void>
}

export default function StudentCard({ s, posts = 0, interventions = 0, lastActive, onDeleted }: Props) {
  const risk = (s.risk_level || 'low').toLowerCase()
  const riskBar = risk === 'critical' ? 'bg-red-600' : risk === 'high' ? 'bg-red-500' : risk === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
  const topAccent = risk === 'critical' ? 'bg-red-700' : risk === 'high' ? 'bg-red-600' : risk === 'medium' ? 'bg-amber-600' : 'bg-emerald-600'

  const pct = Math.round((s.engagement_score || 0) * 100)

  const deleteStudent = async () => {
    try { await api.delete(`/students/${s.id}`) } catch {}
    if (onDeleted) await onDeleted()
  }

  const lastDate = lastActive ? new Date(lastActive) : undefined
  const lastLabel = lastDate ? lastDate.toLocaleDateString() : '—'

  return (
    <div className="card overflow-hidden">
      <div className={`${topAccent} h-1 w-full`} />
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold text-slate-800">{s.full_name}</div>
            <div className="text-sm text-slate-500">{s.email}</div>
          </div>
          <div className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 capitalize">{risk}</div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Engagement</span>
            <div className="w-24 h-2 bg-slate-200 rounded">
              <div className={`h-2 rounded ${riskBar}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-slate-700">{pct}%</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Last Active</span>
            <span className="text-slate-700">{lastLabel}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="py-2 rounded bg-slate-50">
            <div className="text-2xl font-semibold text-slate-800">{posts}</div>
            <div className="text-xs text-slate-500">Posts</div>
          </div>
          <div className="py-2 rounded bg-slate-50">
            <div className="text-2xl font-semibold text-slate-800">{interventions}</div>
            <div className="text-xs text-slate-500">Interventions</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link to={`/students/${s.id}`} className="btn btn-primary">View Details</Link>
          <button className="btn btn-ghost" title="Edit" disabled>✎</button>
          <button className="btn btn-ghost" title="Delete" onClick={deleteStudent}>🗑</button>
        </div>
      </div>
    </div>
  )
}
