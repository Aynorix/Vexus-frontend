import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Academics from './pages/Academics'
import Hobbies from './pages/Hobbies'
import Goals from './pages/Goals'
import Challenges from './pages/Challenges'
import Community from './pages/Community'
import Analytics from './pages/Analytics'
import ComingSoon from './pages/ComingSoon'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* The seven destinations from the top navigation. */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/academics" element={<Academics />} />
      <Route path="/hobbies" element={<Hobbies />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/community" element={<Community />} />
      <Route path="/analytics" element={<Analytics />} />

      {/* Placeholder destinations — polished stubs until their flows are built. */}
      <Route path="/community/:slug" element={<ComingSoon />} />
      <Route path="/academics/:slug" element={<ComingSoon />} />
      <Route path="/code-red" element={<ComingSoon />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
