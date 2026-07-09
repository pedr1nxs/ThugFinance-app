import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Chart({ transactions }){


    const dataForMonth = transactions.reduce((acc, t) => {
        const month = t.date_transactions.slice(0, 7) //catch 2026-07
        
        if (!acc[month]){
            acc[month] = { month, entradas: 0, saidas: 0 }
        }

        if (t.type === "Entrada"){
            acc[month].entradas += t.value
        } else {
            acc[month].saidas += t.value
        }

        return acc
    }, {})

    const data = Object.values(dataForMonth).sort((a, b) => a.month.localeCompare(b.month))

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <CartesianGrid />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="entradas" stroke="#1baf7a" fill="rgba(27, 175, 122, 0.1)" />
                <Area type="monotone" dataKey="saidas" stroke="e34948" fill="rgba(227, 73, 72, 0.1)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default Chart