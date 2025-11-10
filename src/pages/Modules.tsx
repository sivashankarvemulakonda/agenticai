import { useEffect, useState } from 'react'
import { api } from '../api/client'
import ModuleCard from '../components/ModuleCard'

export default function Modules() {
  const [modules, setModules] = useState<any[]>([])
  const [form, setForm] = useState({ title: '', description: '', module_type: 'Interactive', learning_style: 'Visual', difficulty: 'Beginner', duration_minutes: 45, content: '' })
  const [typeFilter, setTypeFilter] = useState<'all' | 'Quiz' | 'Video' | 'Interactive' | 'Reading' | 'Project' | 'Discussion'>('all')
  const [open, setOpen] = useState(false)

  const load = ()=> api.get('/modules').then(r=>setModules(r.data))
  useEffect(()=>{ load() }, [])

  const addModule = async (e: React.FormEvent)=>{
    e.preventDefault()
    await api.post('/modules', form)
    setForm({ title: '', description: '', module_type: 'Interactive', learning_style: 'Visual', difficulty: 'Beginner', duration_minutes: 45, content: '' })
    load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold text-slate-900">Learning Modules</div>
        <button className="btn btn-primary" onClick={()=>setOpen(true)}>+ Create Module</button>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-60">
          <select className="input" value={typeFilter} onChange={(e)=> setTypeFilter(e.target.value as any)}>
            <option value="all">All Types</option>
            <option value="Quiz">Quiz</option>
            <option value="Video">Video</option>
            <option value="Interactive">Interactive</option>
            <option value="Reading">Reading</option>
            <option value="Project">Project</option>
            <option value="Discussion">Discussion</option>
          </select>
        </div>
        <div />
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)} />
          <div className="relative max-h-[90vh] overflow-auto w-full max-w-3xl mx-auto mt-10">
            <div className="bg-white rounded-xl shadow-xl">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div className="text-xl font-semibold text-slate-900">Create Learning Module</div>
                <button className="btn btn-ghost" onClick={()=>setOpen(false)}>✕</button>
              </div>
              <form onSubmit={addModule} className="p-5 grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="label">Title *</div>
                    <input className="input" placeholder="e.g., Introduction to Machine Learning" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
                  </div>
                  <div>
                    <div className="label">Learning Style *</div>
                    <select className="input" value={form.learning_style} onChange={e=>setForm({...form, learning_style: e.target.value})}>
                      <option>Visual</option>
                      <option>Auditory</option>
                      <option>Kinesthetic</option>
                      <option>Reading-Writing</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="label">Description *</div>
                  <textarea className="input" rows={3} placeholder="Brief overview of what students will learn..." value={form.description} onChange={e=>setForm({...form, description: e.target.value})} required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="label">Module Type *</div>
                    <select className="input" value={form.module_type} onChange={e=>setForm({...form, module_type: e.target.value})}>
                      <option>Interactive</option>
                      <option>Video</option>
                      <option>Quiz</option>
                      <option>Reading</option>
                      <option>Project</option>
                      <option>Discussion</option>
                    </select>
                  </div>
                  <div>
                    <div className="label">Duration (minutes)</div>
                    <input type="number" className="input" value={form.duration_minutes} onChange={e=>setForm({...form, duration_minutes: Number(e.target.value)})} />
                  </div>
                </div>
                <div>
                  <div className="label">Content / Instructions</div>
                  <textarea className="input" rows={5} placeholder="Detailed module content, instructions, or learning materials..." value={form.content} onChange={e=>setForm({...form, content: e.target.value})} />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button type="button" className="btn btn-ghost" onClick={()=>setOpen(false)}>Cancel</button>
                  <button className="btn btn-primary" type="submit" onClick={()=>setTimeout(()=>setOpen(false), 50)}>Create Module</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {modules
          .filter(m=> typeFilter==='all' ? true : (m.module_type===typeFilter))
          .map(m=> (
            <ModuleCard key={m.id} m={m} />
        ))}
      </div>
    </div>
  )
}
