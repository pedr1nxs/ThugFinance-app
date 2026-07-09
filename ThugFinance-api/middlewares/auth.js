const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const autentication = (req, res, next) => {

    //Verify if token is correct
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token){
        return res.status(401).json({ mensagem: "Token not provided!" })
    }

    try{
        const decoded = jwt.verify(token, SECRET)
        req.userId = decoded.id
        next()
    } catch {
        return res.status(401).json({ mensagem: "Token disabled!"})
    }
}

module.exports = autentication