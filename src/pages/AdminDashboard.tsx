import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client'
import MetricCard from '../components/MetricCard'
import { ShieldCheck, MessageSquare, Users, TrendingUp, Sparkles, PlusCircle, RotateCw, Trash2 } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

export default function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [interventions, setInterventions] = useState<any[]>([])
  const [modules, setModules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async()=>{
    setLoading(true)
    try {
      const [s, p, i, m] = await Promise.all([
        api.get('/students'),
        api.get('/posts'),
        api.get('/interventions'),
        api.get('/modules'),
      ])
      setStudents(s.data)
      setPosts(p.data)
      setInterventions(i.data)
      setModules(m.data)
    } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [])

  const todayPosts = useMemo(()=>{
    const today = new Date().toDateString()
    return posts.filter((p:any)=> p.created_at && new Date(p.created_at).toDateString()===today).length
  }, [posts])

  const activeStudents = useMemo(()=>{
    const set = new Set(posts.map((p:any)=> p.student_id))
    return set.size
  }, [posts])

  const engagementRate = useMemo(()=>{
    if (!students.length) return 0
    const engaged = students.filter((s:any)=> (s.engagement_score||0) > 0.5).length
    return Math.round((engaged/students.length)*100)
  }, [students])

  const aiRecs = useMemo(()=> interventions.filter((x:any)=> x.status==='pending').length, [interventions])
  const totalActions = useMemo(()=> posts.length + interventions.length + modules.length, [posts, interventions, modules])

  const barData = useMemo(()=>[
    { name: 'Student', value: 0 },
    { name: 'Intervention', value: interventions.length },
    { name: 'Concept', value: modules.length ? 1 : 0 },
  ], [interventions, modules])

  const alerts = useMemo(()=>{
    const lowActivity = todayPosts === 0
    return lowActivity ? [{ level: 'medium', title: 'Decreased Forum Activity', desc: 'Forum post activity is low today' }] : []
  }, [todayPosts])

  const pendingModules = 0 // backend has no approval state yet

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 grid place-items-center text-white"><ShieldCheck size={22}/></div>
          <div>
            <div className="text-3xl font-bold text-slate-900">Admin Dashboard</div>
            <div className="text-slate-500">Monitor engagement, manage content, and track AI insights</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <MetricCard title="Posts Today" value={loading? '—' : todayPosts} subtitle="New posts" icon={MessageSquare} gradient="bg-gradient-to-br from-sky-500 to-blue-600" />
        <MetricCard title="Active Students" value={loading? '—' : activeStudents} subtitle="Posting today" icon={Users} gradient="bg-gradient-to-br from-green-500 to-emerald-600" />
        <MetricCard title="Engagement Rate" value={loading? '—' : `${engagementRate}%`} subtitle="Last 24h" icon={TrendingUp} gradient="bg-gradient-to-br from-purple-500 to-pink-500" />
        <MetricCard title="AI Recommendations" value={loading? '—' : aiRecs} subtitle="Pending" icon={Sparkles} gradient="bg-gradient-to-br from-orange-500 to-rose-500" />
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <MetricCard title="Total Actions" value={loading? '—' : totalActions} subtitle="All activities" icon={TrendingUp} gradient="bg-gradient-to-br from-violet-500 to-indigo-600" />
        <MetricCard title="Created" value={loading? '—' : modules.length} subtitle="New items" icon={PlusCircle} gradient="bg-gradient-to-br from-emerald-500 to-green-600" />
        <MetricCard title="Updated" value={0} subtitle="Modified items" icon={RotateCw} gradient="bg-gradient-to-br from-sky-500 to-blue-600" />
        <MetricCard title="Deleted" value={0} subtitle="Removed items" icon={Trash2} gradient="bg-gradient-to-br from-rose-500 to-red-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card"><div className="card-body">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Active Alerts</div>
            <div className="text-xs text-amber-600">{alerts.length} Active</div>
          </div>
          <div className="mt-3 space-y-3 max-h-56 overflow-auto pr-1">
            {alerts.length===0 && <div className="text-sm text-slate-500">No active alerts</div>}
            {alerts.map((a, idx)=> (
              <div key={idx} className="rounded-xl border border-slate-200 bg-amber-50 p-4">
                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="px-2 py-1 rounded bg-amber-200 text-amber-800">{a.level}</span>
                  <span className="px-2 py-1 rounded bg-slate-200 text-slate-700">Low Activity</span>
                </div>
                <div className="font-medium text-slate-800">{a.title}</div>
                <div className="text-sm text-slate-600">{a.desc}</div>
              </div>
            ))}
          </div>
        </div></div>
        <div className="card"><div className="card-body">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Module Approval Queue</div>
            <div className="text-xs rounded-full bg-amber-100 text-amber-700 px-2 py-0.5">{pendingModules} Pending</div>
          </div>
          <div className="h-24 grid place-items-center text-slate-500">No modules pending approval</div>
        </div></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2"><div className="card-body">
          <div className="font-semibold mb-3">Content Created by Admin</div>
          <div style={{width:'100%', height:260}}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} domain={[0, 'dataMax + 1']} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div></div>
        <div className="card"><div className="card-body">
          <div className="font-semibold mb-3">Recent Activity</div>
          <div className="space-y-3 max-h-60 overflow-auto pr-1">
            {modules.slice(-5).reverse().map((m:any)=> (
              <div key={m.id} className="rounded-lg border border-slate-200 p-3 bg-slate-50">
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">create</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">Concept</span>
                </div>
                <div className="text-sm">Created module: <span className="font-medium">{m.title}</span></div>
              </div>
            ))}
            {modules.length===0 && <div className="text-sm text-slate-500">No recent activity</div>}
          </div>
        </div></div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="card"><div className="card-body"><div className="text-slate-600 text-sm">Students Managed</div><div className="text-3xl text-blue-600 font-semibold">{students.length}</div></div></div>
        <div className="card"><div className="card-body"><div className="text-slate-600 text-sm">Learning Modules</div><div className="text-3xl text-emerald-600 font-semibold">{modules.length}</div></div></div>
        <div className="card"><div className="card-body"><div className="text-slate-600 text-sm">Concepts Created</div><div className="text-3xl text-violet-600 font-semibold">{modules.length ? 3 : 0}</div></div></div>
        <div className="card"><div className="card-body"><div className="text-slate-600 text-sm">Interventions</div><div className="text-3xl text-orange-600 font-semibold">{interventions.length}</div></div></div>
      </div>
    </div>
  )
}
