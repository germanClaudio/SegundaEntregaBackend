const express = require('express')
const app = express()
const router = require('./rutas/rutas.js')
const routerCart = require('./rutas/rutasCart')
const PORT = process.env.PORT || 8082

// const ContainerMessages = require('./contenedores/containerMessages')
// const containerMsg = new ContainerMessages( 'messages', options.sqlite )

//app.use(express.static('public'))
//app.use(express.static('src/images'))
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))

//------------ ROUTER ----------
app.use('/api/productos', router)

app.use('/api/carritos', routerCart)

app.all('*', (req, res) => {
    return res.status(404).send({
        Error: 'Path Not Found'
    })
})

// Servidor funcionando en el puerto 8080
app.listen(PORT, () => {
    console.log(`SERVER listen on port ${PORT}`)
})