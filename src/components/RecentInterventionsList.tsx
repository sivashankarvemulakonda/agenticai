type Intervention = { id: number; type: string; description: string; reason?: string; priority?: string; ai_generated?: boolean; status?: string; created_at?: string }

export default function RecentInterventionsList({ items, loading }: { items: Intervention[]; loading?: boolean }) {
  if (loading) return <div className="text-slate-500 text-sm">Loading...</div>
  if (!items?.length) return <div className="text-slate-500 text-sm">No interventions yet</div>

  const sorted = [...items].sort((a,b)=>{
    const da = a.created_at ? new Date(a.created_at).getTime() : 0
    const db = b.created_at ? new Date(b.created_at).getTime() : 0
    return db - da
  }).slice(0,8)

  const badgeCls = (p?: string)=> p?.toLowerCase()==='high' ? 'bg-red-100 text-red-700' : p?.toLowerCase()==='medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'

  return (
    <div className="divide-y divide-slate-200">
      {sorted.map(i=> (
        <div key={i.id} className="py-3 flex items-start justify-between gap-4">
          <div>
            <div className="font-medium text-slate-800">{i.type}</div>
            <div className="text-sm text-slate-600">{i.description}</div>
            {i.reason && <div className="text-xs text-slate-500 mt-1">Reason: {i.reason}</div>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {i.priority && <span className={`text-xs px-2 py-1 rounded ${badgeCls(i.priority)}`}>{i.priority}</span>}
            {i.status && <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">{i.status}</span>}
            {i.ai_generated && <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">AI</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
