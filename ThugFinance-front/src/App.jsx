import { useState, useEffect } from 'react'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'

function App(){

  const [ showLogin, setShowLogin] = useState(!!localStorage.getItem('token') || !!localStorage.getItem('name'))
  const [ id, setId] = useState(null)
  const [ token, setToken ] = useState(localStorage.getItem('token'))

  const handleRegister = (id) => {
    setShowLogin(true)
  }

  const handleLogin = (token) => {
    console.log('token recebido:', token)
    localStorage.setItem('token', token)
    setToken(token)
  }

  return (
    <div>
      <Header />
      {token ? (
        <Dashboard token={token}/>
      ) : showLogin ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Register onRegister={handleRegister} />
      )}
    </div>
  )
}

export default App