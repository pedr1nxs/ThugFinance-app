const express = require('express')
const Router = express.Router()
const categoriesController = require('../controllers/categoriesControllers')
const autentication = require('../middlewares/auth')

Router.get('/', autentication , categoriesController.listCategories)
Router.get('/:id', autentication , categoriesController.searchCategoriesForId)
Router.post('/', autentication , categoriesController.createCategories)
Router.put('/:id', autentication , categoriesController.updateCategories)
Router.delete('/:id', autentication , categoriesController.deleteCategories)

module.exports = Router