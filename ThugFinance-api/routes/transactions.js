const express = require('express')
const Router = express.Router()
const transactionsController = require('../controllers/transactionsControllers')
const autentication = require('../middlewares/auth')

Router.get('/', autentication ,transactionsController.listTransactions)
Router.get('/:id', autentication ,transactionsController.searchTransactionsForId)
Router.post('/', autentication , transactionsController.createTransactions)
Router.put('/:id', autentication , transactionsController.updateTransactions)
Router.delete('/:id', autentication , transactionsController.deleteTransactions)

module.exports = Router