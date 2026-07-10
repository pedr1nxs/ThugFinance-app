import { useState } from "react";
import './Login.css'

function Login({ onLogin }){
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLogin = async () => {
        const res = await fetch('https://thugfinance-app.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()
        

        if (!data.token){
            alert('Email ou senha inválidos!')
            return
        }
        onLogin(data.token)
    }
    
    return (
            
        <div>
            <div>
                <h1>Login</h1>
            </div>
            <input 
                type="email"
                placeholder="Email"
                value={email}
                className="emailInpt"
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Senha"
                value={password}
                className="passwordInpt"
                onChange={p => setPassword(p.target.value)}
            /><br />
            <button className="loginBtn" onClick={handleLogin}>Entrar</button>
        </div>
    )
}

export default Login