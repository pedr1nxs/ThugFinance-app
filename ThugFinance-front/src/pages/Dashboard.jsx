import { useEffect, useState } from "react"
import Chart from '../components/Chart'
import './Dashboard.css'

function Dashboard({ token }){

    const [ transactions, setTransaction ] = useState([])

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await fetch('https://thugfinance-app.onrender.com/transactions', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()
            setTransaction(data.user)
        }
        fetchTransactions()
    }, [])

    const saldo = transactions.reduce((total, t) => {
        if (t.type === "Entrada") return total + t.value
        return total - t.value
    }, 0)

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    const [ showTransactions, setTransactions ] = useState(false)


    const [ name, setName] = useState(localStorage.getItem('name') || '')

    const [ valueTransaction, setValueTransaction ] = useState('')
    const [ descriptionTransaction, setDescriptionTransaction ] = useState('')
    const [ date_transaction, setDate_transaction ] = useState('')
 
    const createTransaction = async () => {
        const res = await fetch('https://thugfinance-app.onrender.com/transactions', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ 
                value: valueTransaction, 
                description: descriptionTransaction,
                date_transactions: date_transaction,
                category_id: categoryId })
        })

        const data = await res.json()
        window.location.reload()
    }

    const [ nameCategory, setNameCategory ] = useState('')
    const [ typeCategory, setTypeCategory ] = useState('')

    const createCategory = async () => {
        const res = await fetch('https://thugfinance-app.onrender.com/categories', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ 
                name: nameCategory, 
                type: typeCategory })
        })

        const data = await res.json()
        window.location.reload()
    }

    const [ category, setCategory ] = useState([])

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await fetch('https://thugfinance-app.onrender.com/categories', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()
            setCategory(data.categories)
        }
        fetchCategory()
    }, [])

    const [ categoryId, setCategoryId ] = useState('')

    return (
        <div>
            <div>
                <h1>Bem vindo, {name}</h1>
                <button className="logoutBtn" onClick={handleLogout}>Sair</button>
            </div>

            <div className="bankballance">
                <span>Saldo Atual:</span>
                <span style={{color : saldo < 0 ? "red" : "green"}}>R${saldo.toFixed(2)}</span>
            </div>

            <div>
                <div>
                    <div className="container">
                        <div className="card_createCategory">
                            <h2>Crie sua categoria:</h2>
                            <input 
                                type="text"
                                placeholder="Nome"
                                value={nameCategory}
                                className="nameCategoryInpt"
                                onChange={n => setNameCategory(n.target.value)}
                            />
                            
                            <select className="selectTypeCategory" value={typeCategory} onChange={t => setTypeCategory(t.target.value)}>
                                <option value="">Selecione</option>
                                <option value="Entrada">Entrada</option>
                                <option value="Saida">Saída</option>
                            </select><br />
                            <button className="createCategoryBtn" onClick={createCategory}>Criar Categoria</button>
                        </div>

                        <div className="card_createTransaction">
                            <h2>Crie sua transação:</h2>
                            <input 
                                type="number"
                                placeholder="Valor"
                                value={valueTransaction}
                                className="valueTransactionInpt"
                                onChange={v => setValueTransaction(v.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Descrição"
                                value={descriptionTransaction}
                                className="descriptionTransactionInpt"
                                onChange={d => setDescriptionTransaction(d.target.value)}
                            />
                            <input 
                                type="date"
                                placeholder="Data da Transação"
                                value={date_transaction}
                                className="date_transactionInpt"
                                onChange={dt => setDate_transaction(dt.target.value)}
                            /><br />
                            <span>Categoria:</span>
                            <select className="selectCategoryTransaction" value={categoryId} onChange={c => setCategoryId(c.target.value)}> 
                                <option value="">Selecione uma</option>
                                {category.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select><br />

                            <button className="createTransactionBtn" onClick={createTransaction}>Criar transação</button>
                        </div>
                    </div>

                    <h1>Transações:</h1>

                    <button className="BtnshowTransactions" style={{ backgroundColor : showTransactions === false ? "rgb(28, 121, 70)" : "red" }} onClick={() => setTransactions(!showTransactions)}>
                        {showTransactions ? 'Ocultar' : 'Mostrar'}
                    </button>


                    {showTransactions && (
                        <div>
                            {transactions.map(t => (
                                <div className="card" key={t.id}>
                                    <div className="header">
                                        <h3 className="card_description">{t.description}</h3>
                                        <span className="card_type" style={{ color : t.type === "Entrada" ? "green" : "red", backgroundColor : t.type === "Entrada" ? "rgb(12, 43, 11)" : "rgb(48, 17, 17)" }}>{t.type}</span><br /><br />
                                        <span>{t.date_transactions}</span>
                                    </div>

                                    <div className="value">
                                        R${t.value.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <Chart transactions={transactions} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard