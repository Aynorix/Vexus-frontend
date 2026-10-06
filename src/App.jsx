import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ComingSoon from './pages/ComingSoon'
import './App.css'

export default function App() {
  return (
    <Routes>
      {/* Dashboard holds the intro, auth CTAs and the five live feature systems. */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Sub-category destinations — placeholders until the Gateway is wired. */}
      <Route path="/community/:slug" element={<ComingSoon />} />
      <Route path="/academics/:slug" element={<ComingSoon />} />
      <Route path="/hobbies" element={<ComingSoon />} />
      <Route path="/challenges" element={<ComingSoon />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}