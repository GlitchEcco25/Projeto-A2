const express = require('express')
const app = express();
const pedidoRoutes = require('./routes/pedidoRoutes')

app.use(express.json())

app.use('/pedidos', pedidoRoutes)

app.listen(3000, function(){
    console.log('servidor rodando na porta 3000')
})