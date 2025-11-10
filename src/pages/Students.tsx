import { useEffect, useState } from 'react'
import { api } from '../api/client'
import StudentCard from '../components/StudentCard'
import { Plus, Bot, Search } from 'lucide-react'

export default function Students() {
  const [students, setStudents] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [interventions, setInterventions] = useState<any[]>([])
  const [form, setForm] = useState({ full_name: '', email: '', learning_style: 'Visual' })
  const [showForm, setShowForm] = useState(false)
  const [query, setQuery] = useState('')
  const [risk, setRisk] = useState('all')
  const [loading, setLoading] = useState(true)

  const load = async ()=> {
    setLoading(true)
    try {
      const [s, p, i] = await Promise.all([
        api.get('/students'),
        api.get('/posts'),
        api.get('/interventions'),
      ])
      setStudents(s.data||[])
      setPosts(p.data||[])
      setInterventions(i.data||[])
    } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [])

  const addStudent = async (e: React.FormEvent)=>{
    e.preventDefault()
    await api.post('/students', { ...form, engagement_score: 0.67, risk_level: 'low' })
    setForm({ full_name: '', email: '', learning_style: 'Visual' })
    setShowForm(false)
    load()
  }

  const analyzeAllPosts = async ()=>{
    const postIds: number[] = posts.map((p:any)=>p.id)
    for (const id of postIds) {
      try { await api.post(`/posts/${id}/analyze`) } catch {}
    }
    load()
  }

  const filtered = students.filter(s=>{
    const matchesQuery = (s.full_name+" "+s.email).toLowerCase().includes(query.toLowerCase())
    const matchesRisk = risk==='all' ? true : (s.risk_level||'low').toLowerCase()===risk
    return matchesQuery && matchesRisk
  })

  const getCounts = (sid:number)=>{
    const pc = posts.filter((p:any)=>p.student_id===sid).length
    const ic = interventions.filter((it:any)=>it.student_id===sid).length
    const last = posts.filter((p:any)=>p.student_id===sid).sort((a:any,b:any)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime())[0]?.created_at
    return { posts: pc, ints: ic, last }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-slate-900">Students</div>
          <div className="text-slate-500">Manage and monitor student engagement</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost" onClick={analyzeAllPosts}><Bot size={16} className="mr-1"/> AI Analysis</button>
          <button className="btn btn-primary" onClick={()=>setShowForm(v=>!v)}><Plus size={16} className="mr-1"/> Add Student</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input className="input pl-9" placeholder="Search by name or email..." value={query} onChange={e=>setQuery(e.target.value)} />
        </div>
        <div>
          <select className="input" value={risk} onChange={e=>setRisk(e.target.value)}>
            <option value="all">All Risk Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {showForm && (
        <form onSubmit={addStudent} className="card"><div className="card-body grid md:grid-cols-4 gap-4">
          <div>
            <div className="label">Full Name</div>
            <input className="input" value={form.full_name} onChange={e=>setForm({...form, full_name: e.target.value})} required />
          </div>
          <div>
            <div className="label">Email</div>
            <input className="input" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
          </div>
          <div>
            <div className="label">Learning Style</div>
            <select className="input" value={form.learning_style} onChange={e=>setForm({...form, learning_style: e.target.value})}>
              <option>Visual</option>
              <option>Auditory</option>
              <option>Kinesthetic</option>
              <option>Reading-Writing</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn btn-primary w-full" type="submit">Add Student</button>
          </div>
        </div></form>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {loading ? <div className="text-slate-500">Loading...</div> :
          filtered.map((s, idx)=> {
            const { posts: pc, ints: ic, last } = getCounts(s.id)
            return (
              <div key={s.id} className="anim-fade" style={{ animationDelay: `${idx * 60}ms` }}>
                <StudentCard s={s} posts={pc} interventions={ic} lastActive={last} onDeleted={load} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
