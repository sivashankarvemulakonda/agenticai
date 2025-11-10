import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

type RiskCounts = { low: number; medium: number; high: number; critical: number }

const COLORS = {
  Low: '#10B981',
  Medium: '#F59E0B',
  High: '#EF4444',
  Critical: '#991B1B',
}

function RiskTooltip({ active, payload }: any) {
  if (active && payload?.length) {
    const p = payload[0]
    return (
      <div className="bg-white border border-slate-200 rounded-md shadow px-3 py-2 text-sm">
        <div className="font-medium">{p?.name} Risk : {p?.value}</div>
      </div>
    )
  }
  return null
}

export default function RiskPie({ data, loading }: { data: RiskCounts; loading?: boolean }) {
  const entries = [
    { name: 'Low', value: data.low, color: COLORS.Low },
    { name: 'Medium', value: data.medium, color: COLORS.Medium },
    { name: 'High', value: data.high, color: COLORS.High },
    { name: 'Critical', value: data.critical, color: COLORS.Critical },
  ]

  if (loading) return <div className="text-slate-500 text-sm">Loading...</div>

  const total = entries.reduce((s, e) => s + e.value, 0)
  if (!total) return <div className="text-slate-500 text-sm">No data</div>

  const atRiskPct = Math.round(((data.high + data.critical) / total) * 100)

  return (
    <div>
      <div className="text-sm text-rose-600 mb-2">Risk: {atRiskPct}%</div>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={entries} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} stroke="#ffffff" strokeWidth={2}>
              {entries.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
            </Pie>
            <Tooltip content={<RiskTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{background: COLORS.Low}} /> <span className="text-slate-700">Low Risk</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{background: COLORS.Medium}} /> <span className="text-slate-700">Medium Risk</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{background: COLORS.High}} /> <span className="text-slate-700">High Risk</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{background: COLORS.Critical}} /> <span className="text-slate-700">Critical</span></div>
      </div>
    </div>
  )
}
