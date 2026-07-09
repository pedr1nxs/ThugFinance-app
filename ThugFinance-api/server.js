require('dotenv').config()
const express = require('express')
const app = express()

const categoriesRoutes = require('./routes/categories')
const transactionsRoutes = require('./routes/transactions')
const authRoutes = require('./routes/auth')

app.use(express.json())
const cors = require('cors')
app.use(cors())

app.use('/categories', categoriesRoutes)
app.use('/transactions', transactionsRoutes)
app.use('/auth', authRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server rodando na porta ${process.env.PORT}`)
})