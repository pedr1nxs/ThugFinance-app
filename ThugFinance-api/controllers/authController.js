const db = require('../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET  // CHAVE SECRETA PARA ASSINAR O TOKEN

const register = (req, res) => {
    const {name, email, password } = req.body

    //Verify if user exists
    const userExists = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (userExists){
        return res.status(400).json({mensagem: "Usuário ja cadastrado!"})
    }

    //Encrypted the password
    const passwordEncrypted = bcrypt.hashSync(password, 10)

    //Save in database
    const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, passwordEncrypted)
    res.status(201).json({
        id: result.lastInsertRowid,
        name,
        email
    })
}


const login = (req, res) => {
    const {email, password} = req.body

    //Verify Login
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (!user){
        return res.status(400).json({mensagem: "Email ou senha inválidos!"})
    }

    //Verify password
    const passwordCorrect = bcrypt.compareSync(password, user.password)
    if (!passwordCorrect){
        return res.status(400).json({mensagem: "Email ou senha inválidos!"})
    }

    //Generate token
    const token = jwt.sign( {id: user.id}, SECRET, {expiresIn: '1d'} )

    res.json({ token })
}

module.exports = {register, login}