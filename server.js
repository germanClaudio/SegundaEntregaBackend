const express = require('express')

const app = express()

const { options } = require('./options/config')

const PORT = process.env.PORT || 8082

// const ContainerMessages = require('./contenedores/containerMessages')
// const containerMsg = new ContainerMessages( 'messages', options.sqlite )

// const ContainerProductsMysql = require('./contenedores/containerProductsMysql')
// const containerProduct = new ContainerProductsMysql( 'productos', options.mysql)

const containerFirebase = require('./contenedores/containerFirebase')
const containerProduct = new containerFirebase('productos', options.firebase)
console.log(containerProduct.connect)

//app.use(express.static('public'))
//app.use(express.static('src/images'))
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))


app.get('/', async (req, res) => {
    try {
        const productos = await containerProduct.getAllProds()
        // const getAllMsgDB = await containerMsg.getAllMsg()
        // console.log('getAllMsg: '+ getAllMsgDB)
        if (productos){
            res.status(200).json( { data: productos,  msg: getAllMsgDB } )
            //res.render('index' , { productos, getAllMsgDB } )
        } else {
            res.status(200).json({msg: 'No products founded' })
        }
    } catch (error) {
        res.status(400).json({msg: 'No products availables' })
        
    }
    }) 

app.get('/:id', async (req, res) => {
    try {
        const productos = await containerProduct.getById(parseInt(req.params.id))
        console.log('Productos: '+ productos)
        if (productos){
            res.status(200).json( { data: productos })
        } else {
            res.status(200).json({msg: 'No products founded' })
        }
    } catch (error) {
        res.status(400).json({msg: 'No products availables' })
    }
})

app.get('/historial', async (req, res) => {
    try {
        const productos = await containerProduct.getAllProds()
        res.status(200).json( { data: productos })
    } catch (error) {
        res.status(400).json({msg: 'No products availables' })
    }
})

app.delete('/:id', async (req, res) => {
    try {
        res.status(200).json({data: await containerProduct.deleteById(parseInt(req.params.id)) })
    } catch (error) {
        res.status(400).json({msg: 'Error! The product was not deleted!!' })
    }
})

app.all('*', (req, res) => {
    return res.status(404).send({
        Error: 'Path Not Found'
    })
})

// Servidor funcionando en el puerto 8080
app.listen(PORT, () => {
    console.log(`SERVER listen on port ${PORT}`)
})