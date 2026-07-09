const db = require('../database')

const listCategories = (req, res) => {
    const { page = 1, limit = 10, name = '', order = 'id' } = req.query
    const offset = (page - 1) * limit 

    const categories = db.prepare(`SELECT * FROM categories WHERE user_id = ? AND name LIKE ? ORDER BY ${order} LIMIT ? OFFSET ?`).all(req.userId, `%${name}%`, limit, offset)

    res.json({ categories })
}

const searchCategoriesForId = (req, res) => {
    const id = req.params.id

    const category = db.prepare('SELECT * FROM categories WHERE id = ? AND user_id = ?').get(id, req.userId)
    if (!category){
        return res.status(404).json({ mensagem: "Category not found!"})
    }

    res.json({ category })
}

const createCategories = (req, res) => {
    console.log(req.body);
    const { name, type} = req.body

    console.log("name:", name);
    console.log("type:", type);

    const category = db.prepare('INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)').run(req.userId, name, type)
    res.status(201).json({
        id: category.lastInsertRowid,
        user_id: req.userId,
        type,
        name
    })
}

const updateCategories = (req, res) => {
    const id = req.params.id
    const { type, name } = req.body

    const category = db.prepare('SELECT * FROM categories WHERE id = ? AND user_id = ?').get(id, req.userId)
    if (!category){
        return res.status(404).json({ mensagem: "Category not found!" })
    }

    const updateC = db.prepare('UPDATE categories SET type = ?, name = ? WHERE id = ? AND user_id = ?').run(type, name, id, req.userId)

    res.json({
        id: Number(id),
        user_id: req.userId,
        type,
        name
    })
}

const deleteCategories = (req, res) => {
    const id = req.params.id
    const category = db.prepare('SELECT * FROM categories WHERE id = ? AND user_id = ?').get(id, req.userId)
    if (!category){
        return res.status(404).json({ mensagem: "Category not found!" })
    }

    const deleted = db.prepare('DELETE FROM categories WHERE id = ? AND user_id = ?').run(id, req.userId)

    res.json({ mensagem: "Removido com sucesso!" })
}

module.exports = { listCategories, searchCategoriesForId, createCategories, updateCategories, deleteCategories }