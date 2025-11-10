import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, MessageSquare, BookOpen, Shield } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="bg-white border-r border-slate-200 p-4">
        <div className="text-2xl font-semibold text-slate-800 mb-6">EngageAI</div>
        <nav className="space-y-2">
          <NavLink to="/" end className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'}`}><LayoutDashboard size={18}/>Dashboard</NavLink>
          <NavLink to="/students" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'}`}><Users size={18}/>Students</NavLink>
          <NavLink to="/forum" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'}`}><MessageSquare size={18}/>Forum Analysis</NavLink>
          <NavLink to="/modules" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'}`}><BookOpen size={18}/>Learning Modules</NavLink>
          <NavLink to="/admin" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'}`}><Shield size={18}/>Admin Dashboard</NavLink>
        </nav>
      </aside>
      <main className="p-6 bg-soft smooth-scroll">
        <Outlet />
      </main>
    </div>
  )
}
