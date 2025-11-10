import { useEffect, useState } from 'react'
import { api } from '../api/client'
import MetricCard from '../components/MetricCard'
import RiskPie from '../components/RiskPie'
import RecentInterventionsList from '../components/RecentInterventionsList'
import { Users, AlertTriangle, TrendingUp, MessageSquare } from 'lucide-react'

// Define RiskCounts type so it matches what RiskPie expects
type RiskCounts = {
  low: number
  medium: number
  high: number
  critical: number
}

export default function Dashboard() {
  const [students, setStudents] = useState<any[]>([])
  const [interventions, setInterventions] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const [s, i, p] = await Promise.all([
        api.get('/students'),
        api.get('/interventions'),
        api.get('/posts'),
      ])
      setStudents(s.data || [])
      setInterventions(i.data || [])
      setPosts(p.data || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const atRiskCount = students.filter(
    (s: any) => ['high', 'critical'].includes((s.risk_level || '').toLowerCase())
  ).length

  const avgEngagement = students.length
    ? (
        (students.reduce((sum: any, s: any) => sum + (s.engagement_score || 0), 0) / students.length) *
        100
      ).toFixed(1)
    : '0.0'

  const activeInterventions = interventions.filter(
    (i: any) =>
      (i.status || 'pending').toLowerCase() === 'active' ||
      (i.status || 'pending').toLowerCase() === 'pending'
  ).length

  // ✅ Fixed: Explicit RiskCounts type and keyof usage
  const riskCounts: RiskCounts = (() => {
    const buckets: RiskCounts = { low: 0, medium: 0, high: 0, critical: 0 }
    for (const s of students) {
      const r = (s.risk_level || 'low').toLowerCase() as keyof RiskCounts
      if (r in buckets) buckets[r]++
      else buckets.low++
    }
    return buckets
  })()

  return (
    <div className="space-y-6">
      <div>
        <div className="text-3xl font-bold text-slate-900">Dashboard</div>
        <div className="text-slate-500">
          Monitor student engagement and AI-powered interventions
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Students"
          value={loading ? '—' : students.length}
          subtitle="Enrolled learners"
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <MetricCard
          title="At Risk"
          value={loading ? '—' : atRiskCount}
          subtitle="Requiring attention"
          icon={AlertTriangle}
          gradient="bg-gradient-to-br from-rose-500 to-red-600"
        />
        <MetricCard
          title="Avg Engagement"
          value={loading ? '—' : `${avgEngagement}%`}
          subtitle="Overall score"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-emerald-500 to-green-600"
          accent="mint"
        />
        <MetricCard
          title="Active Interventions"
          value={loading ? '—' : activeInterventions}
          subtitle="In progress"
          icon={MessageSquare}
          gradient="bg-gradient-to-br from-purple-500 to-violet-600"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <div className="card-body">
            <div className="font-semibold mb-2">Recent Posts</div>
            <div className="text-3xl">{loading ? '—' : posts.length}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="font-semibold mb-2">Interventions (All)</div>
            <div className="text-3xl">{loading ? '—' : interventions.length}</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card md:col-span-2 shadow-sm">
          <div className="card-body">
            <div className="font-semibold mb-3">Recent Interventions</div>
            <RecentInterventionsList items={interventions} loading={loading} />
          </div>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="font-semibold mb-3">Risk Distribution</div>
            <RiskPie data={riskCounts} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}