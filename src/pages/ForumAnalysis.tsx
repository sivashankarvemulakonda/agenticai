import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { Settings, Pencil, Trash2 } from 'lucide-react'

export default function ForumAnalysis() {
  const [posts, setPosts] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [form, setForm] = useState({ student_id: '', title: '', content: '' })
  const [open, setOpen] = useState(false)

  const load = ()=> Promise.all([
    api.get('/posts').then(r=>setPosts(r.data)),
    api.get('/students').then(r=>setStudents(r.data)),
  ])
  useEffect(()=>{ load() }, [])

  const addPost = async (e: React.FormEvent)=>{
    e.preventDefault()
    await api.post('/posts', { ...form, student_id: Number(form.student_id) })
    setForm({ student_id: '', title: '', content: '' })
    load()
    setOpen(false)
  }

  const analyze = async (id: number)=>{
    await api.post(`/posts/${id}/analyze`)
    load()
  }

  const remove = async (id: number)=>{
    await api.delete(`/posts/${id}`)
    load()
  }

  const findStudent = (id:number)=> students.find((s:any)=>s.id===id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-slate-900">Forum Analysis</div>
          <div className="text-slate-500">AI-powered analysis of student interactions</div>
        </div>
        <button className="btn btn-primary" onClick={()=>setOpen(true)}>+ Add Forum Post</button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)} />
          <div className="relative max-h-[90vh] overflow-auto w-full max-w-3xl mx-auto mt-10">
            <div className="bg-white rounded-xl shadow-xl">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div className="text-xl font-semibold text-slate-900">Add Forum Post</div>
                <button className="btn btn-ghost" onClick={()=>setOpen(false)}>✕</button>
              </div>
              <form onSubmit={addPost} className="p-5 grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="label">Student *</div>
                    <select className="input" value={form.student_id} onChange={e=>setForm({...form, student_id: e.target.value})} required>
                      <option value="" disabled>Select student</option>
                      {students.map(s=> <option key={s.id} value={s.id}>{s.full_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="label">Title *</div>
                    <input className="input" placeholder="Question about the assignment" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
                  </div>
                </div>
                <div>
                  <div className="label">Content *</div>
                  <textarea className="input" rows={5} placeholder="Write the forum message here..." value={form.content} onChange={e=>setForm({...form, content: e.target.value})} required />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button type="button" className="btn btn-ghost" onClick={()=>setOpen(false)}>Cancel</button>
                  <button className="btn btn-primary" type="submit">Add Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {posts.map(p=> (
          <div key={p.id} className="card hover-lift anim-fade">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-lg text-slate-900">{p.title}</div>
                    {p.needs_attention && <span className="text-xs px-2 py-1 rounded bg-rose-100 text-rose-700">Needs Attention</span>}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {findStudent(p.student_id)?.full_name || 'Unknown'} • {p.created_at ? new Date(p.created_at).toLocaleString() : ''}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-ghost icon-hover" onClick={()=>analyze(p.id)}><Settings size={16} className="mr-1"/> Analyze</button>
                  <button className="btn btn-ghost icon-hover" title="Edit" disabled><Pencil size={16}/></button>
                  <button className="btn btn-ghost icon-hover" title="Delete" onClick={()=>remove(p.id)}><Trash2 size={16}/></button>
                </div>
              </div>

              <div className="text-sm text-slate-700 mt-3">{p.content}</div>
              <div className="border-t border-slate-200 my-3" />

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {p.sentiment && <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 lowercase">{p.sentiment}</span>}
                {p.quality_score !== undefined && <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">Quality: {p.quality_score}</span>}
              </div>
              {p.indicators && (
                <div className="mt-3">
                  <div className="text-xs font-medium text-slate-600 mb-1">Engagement Indicators:</div>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      try {
                        const arr = JSON.parse(p.indicators)
                        return Array.isArray(arr) ? arr.map((x:string, idx:number)=> <span key={idx} className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs">{x}</span>) : null
                      } catch { return null }
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
