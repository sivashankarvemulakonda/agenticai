import { LucideIcon } from 'lucide-react'

type Props = {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  gradient?: string
  accent?: 'primary' | 'mint'
}

export default function MetricCard({ title, value, subtitle, icon: Icon, gradient, accent='primary' }: Props) {
  const color = accent === 'mint' ? 'text-mint' : 'text-primary'
  const badge = gradient || 'bg-gradient-to-br from-blue-500 to-blue-600'
  return (
    <div className="card shadow-sm card-glass">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600 font-medium">{title}</div>
          {Icon && (
            <div className={`w-10 h-10 rounded-xl text-white grid place-items-center ${badge} anim-float`}>
              <Icon size={20}/>
            </div>
          )}
        </div>
        <div className={`text-3xl font-semibold mt-1 ${color}`}>{value}</div>
        {subtitle && <div className="text-xs text-slate-500 mt-1">{subtitle}</div>}
      </div>
    </div>
  )
}
