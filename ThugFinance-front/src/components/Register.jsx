import { useState } from "react";
import './Register.css'

function Register({ onRegister }) {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleRegister = async () => {
        const res = await fetch('https://thugfinance-app.onrender.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        const data = await res.json()
        
        if (data.id){
            localStorage.setItem('name', data.name)
            alert("Cadastro concluído com sucesso!")
            onRegister(data.id)
        }
    }

    return (

        <div className="card-register">
            <div>
               <h1>Register</h1>
            </div>
            <input 
                type="text" 
                placeholder="Name"
                value={name}
                className="nameInpt"
                onChange={n => setName(n.target.value)}
            />
            <input 
                type="email"
                placeholder="Email"
                value={email}
                className="emailInpt"
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password"
                value={password}
                className="passwordInpt"
                onChange={p => setPassword(p.target.value)}
            /><br />
            <button className="registerBtn" onClick={handleRegister}>Criar conta</button>
        </div>
    )
}

export default Register