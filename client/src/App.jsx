import './App.css'
import { useState } from 'react'
import Auth from './pages/auth/auth'
import Signup from './pages/auth/Signup.jsx'

function App() {
  const [page, setPage] = useState('auth')

  return (
    <div>
      {page === 'auth' ? (
        <Auth onOpenSignup={() => setPage('signup')} />
      ) : (
        <Signup onBackToAuth={() => setPage('auth')} />
      )}
    </div>
  )
}

export default App
