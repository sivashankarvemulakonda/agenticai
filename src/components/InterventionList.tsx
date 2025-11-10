type Intervention = { id: number; type: string; description: string; reason?: string; priority?: string; ai_generated?: boolean; status?: string }

export default function InterventionList({ items }: { items: Intervention[] }) {
  return (
    <div className="space-y-3">
      {items.map(i => (
        <div key={i.id} className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{i.type}</div>
              <div className={`text-xs ${i.priority==='high'?'text-red-600':'text-slate-500'}`}>{i.priority}</div>
            </div>
            <div className="text-sm text-slate-600 mt-1">{i.description}</div>
            {i.reason && <div className="text-xs text-slate-500 mt-1">Reason: {i.reason}</div>}
            {i.ai_generated && <div className="text-xs text-emerald-600 mt-1">AI</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
