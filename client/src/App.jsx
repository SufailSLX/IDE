import './App.css'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Signup from './pages/auth/Signup.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth" element={<Navigate to="/" replace />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
