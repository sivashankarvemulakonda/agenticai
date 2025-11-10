import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import App from './App'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import ForumAnalysis from './pages/ForumAnalysis'
import Modules from './pages/Modules'
import StudentDetails from './pages/StudentDetails'
import AdminDashboard from './pages/AdminDashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'students', element: <Students /> },
      { path: 'students/:id', element: <StudentDetails /> },
      { path: 'forum', element: <ForumAnalysis /> },
      { path: 'modules', element: <Modules /> },
      { path: 'admin', element: <AdminDashboard /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
