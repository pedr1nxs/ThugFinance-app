const db = require('../database')

const listTransactions = (req, res) => {
    
    const { page = 1, limit = 10, description = '', order = 'id' } = req.query
    const offset = (page - 1) * limit

    const user = db.prepare(`
        SELECT transactions .*, categories.type, categories.name as category_name
        FROM transactions
        JOIN categories ON transactions.category_id = categories.id
        WHERE transactions.user_id = ?
        AND transactions.description LIKE ?
        ORDER BY ${order}
        LIMIT ? OFFSET ?
    `).all(req.userId, `%${description}%`, limit, offset)

    res.json({ user })
}

const searchTransactionsForId = (req, res) => {
    const id = req.params.id
    const transaction = db.prepare(`
        SELECT transactions .*, categories.type, categories.name as category_name
        FROM transactions
        JOIN categories ON transactions.category_id = categories.id
        WHERE transactions.id = ? AND transactions.user_id = ?
    `).get(id, req.userId)
    if (!transaction){
        return res.status(404).json({ mensagem: "Transaction not found!"})
    }

    res.json({ transaction })
}

const createTransactions = (req, res) => {
    const { description, date_transactions, value, category_id } = req.body

    const transaction = db.prepare('INSERT INTO transactions (category_id, value, user_id, description, date_transactions) VALUES (?, ?, ?, ?, ?)').run(category_id, value, req.userId, description, date_transactions)
    res.status(201).json({
        id: transaction.lastInsertRowid,
        category_id,
        value,
        user_id: req.userId,
        description,
        date_transactions
    })
}

const updateTransactions = (req, res) => {
    const id = req.params.id
    const { category_id, value, description, date_transactions } = req.body

    const transaction = db.prepare('SELECT * FROM transactions WHERE id = ? AND user_id = ?').get(id, req.userId)
    if (!transaction){
        return res.status(404).json({ mensagem: "Transaction not found!" })
    }

    const result = db.prepare('UPDATE transactions SET category_id = ?, value = ?, description = ?, date_transactions = ? WHERE id = ? AND user_id = ?').run(category_id, value, description, date_transactions, id, req.userId)
    
    res.json({
        id: Number(id),
        category_id,
        value,
        description,
        date_transactions
    })
}

const deleteTransactions = (req, res) => {
    const id = req.params.id

    const transaction = db.prepare('SELECT * FROM transactions WHERE id = ? AND user_id = ?').get(id, req.userId)
    if (!transaction){
        return res.status(404).json({ mensagem: "Transaction not found!" })
    }

    const deleted = db.prepare('DELETE FROM transactions WHERE id = ? AND user_id = ?').run(id, req.userId)

    res.json({ mensagem: "Removido com sucesso!" })
}

module.exports = { listTransactions, searchTransactionsForId, createTransactions, updateTransactions, deleteTransactions}