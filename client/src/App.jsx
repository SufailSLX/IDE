import './App.css'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Signup from './pages/auth/Signup.jsx'
import Home from './pages/home/Home.jsx'
import Chat from './pages/home/Chat.jsx'
import UserPlans from './pages/plans/UserPlans.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth" element={<Navigate to="/" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/plans" element={<UserPlans />} />
    </Routes>
  )
}

export default App