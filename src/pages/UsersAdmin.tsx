import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { Plus, Trash2 } from 'lucide-react'

export default function UsersAdmin() {
  const [users, setUsers] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ full_name: '', email: '', role: 'admin', active: true })

  const load = ()=> api.get('/users').then(r=> setUsers(r.data || []))
  useEffect(()=>{ load() }, [])

  const addUser = async (e: React.FormEvent)=>{
    e.preventDefault()
    await api.post('/users', form)
    setForm({ full_name: '', email: '', role: 'admin', active: true })
    setOpen(false)
    load()
  }

  const remove = async (id:number)=>{
    await api.delete(`/users/${id}`)
    load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-slate-900">User Management</div>
          <div className="text-slate-500">Manage admin users for the platform</div>
        </div>
        <button className="btn btn-primary" onClick={()=>setOpen(true)}><Plus size={16} className="mr-1"/> Add User</button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Active</th>
                  <th className="py-2 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u:any)=> (
                  <tr key={u.id} className="border-t border-slate-200">
                    <td className="py-2">{u.full_name}</td>
                    <td className="py-2 text-slate-600">{u.email}</td>
                    <td className="py-2 capitalize">{u.role}</td>
                    <td className="py-2">{u.active? 'Yes':'No'}</td>
                    <td className="py-2">
                      <button className="text-red-600 hover:text-red-700" onClick={()=>remove(u.id)}><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
                {users.length===0 && (
                  <tr><td colSpan={5} className="py-6 text-center text-slate-500">No users yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)} />
          <div className="relative max-h-[90vh] overflow-auto w-full max-w-lg mx-auto mt-10">
            <div className="bg-white rounded-xl shadow-xl">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div className="text-xl font-semibold text-slate-900">Add User</div>
                <button className="btn btn-ghost" onClick={()=>setOpen(false)}>✕</button>
              </div>
              <form onSubmit={addUser} className="p-5 grid gap-4">
                <div>
                  <div className="label">Full Name *</div>
                  <input className="input" value={form.full_name} onChange={e=>setForm({...form, full_name: e.target.value})} required />
                </div>
                <div>
                  <div className="label">Email *</div>
                  <input className="input" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="label">Role</div>
                    <select className="input" value={form.role} onChange={e=>setForm({...form, role: e.target.value})}>
                      <option>admin</option>
                      <option>moderator</option>
                    </select>
                  </div>
                  <div>
                    <div className="label">Active</div>
                    <select className="input" value={form.active? 'true':'false'} onChange={e=>setForm({...form, active: e.target.value==='true'})}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button type="button" className="btn btn-ghost" onClick={()=>setOpen(false)}>Cancel</button>
                  <button className="btn btn-primary" type="submit">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
