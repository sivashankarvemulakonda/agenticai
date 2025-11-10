import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api/client'
import InterventionList from '../components/InterventionList'

export default function StudentDetails() {
  const { id } = useParams()
  const [student, setStudent] = useState<any>()
  const [interventions, setInterventions] = useState<any[]>([])
  const [manual, setManual] = useState({ type: 'One-on-One Session', description: '', reason: '', priority: 'High' })

  const load = ()=> Promise.all([
    api.get(`/students/${id}`).then(r=>setStudent(r.data)),
    api.get('/interventions').then(r=>setInterventions(r.data.filter((x:any)=>x.student_id===Number(id))))
  ])

  useEffect(()=>{ load() }, [id])

  const aiGenerate = async ()=>{
    await api.post(`/students/${id}/generate_interventions`)
    load()
  }

  const addManual = async (e: React.FormEvent)=>{
    e.preventDefault()
    await api.post('/interventions', { ...manual, student_id: Number(id), ai_generated: false, status: 'pending' })
    setManual({ type: 'One-on-One Session', description: '', reason: '', priority: 'High' })
    load()
  }

  if (!student) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-800">{student.full_name}</div>
          <div className="text-slate-500">{student.email}</div>
        </div>
        <button className="btn btn-primary" onClick={aiGenerate}>AI Generate</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card md:col-span-2"><div className="card-body">
          <div className="font-semibold mb-2">Interventions</div>
          <InterventionList items={interventions} />
        </div></div>
        <form onSubmit={addManual} className="card"><div className="card-body space-y-3">
          <div className="font-semibold">Add Manual</div>
          <div>
            <div className="label">Type</div>
            <select className="input" value={manual.type} onChange={e=>setManual({...manual, type: e.target.value})}>
              <option>One-on-One Session</option>
              <option>Peer Discussion</option>
              <option>Practice Quiz</option>
              <option>Interactive Visual Module</option>
            </select>
          </div>
          <div>
            <div className="label">Description</div>
            <textarea className="input" rows={3} value={manual.description} onChange={e=>setManual({...manual, description: e.target.value})} required />
          </div>
          <div>
            <div className="label">Reason</div>
            <textarea className="input" rows={2} value={manual.reason} onChange={e=>setManual({...manual, reason: e.target.value})} required />
          </div>
          <div>
            <div className="label">Priority</div>
            <select className="input" value={manual.priority} onChange={e=>setManual({...manual, priority: e.target.value})}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">Add Manual</button>
        </div></form>
      </div>

      <div className="card"><div className="card-body grid md:grid-cols-3 gap-4">
        <div>
          <div className="label">Learning Style</div>
          <div className="text-slate-700">{student.learning_style || '—'}</div>
        </div>
        <div>
          <div className="label">Engagement</div>
          <div className="text-slate-700">{(student.engagement_score*100).toFixed(0)}%</div>
        </div>
        <div>
          <div className="label">Risk</div>
          <div className="text-slate-700">{student.risk_level}</div>
        </div>
      </div></div>
    </div>
  )
}
