const express = require('express');
const router = express.Router();

const { options } = require('../options/config')

//MONGO_DB
// const containerMongoDB = require('../daos/productos/ProductosDaoMongoDB') //../contenedores/containerMongoDB
// const containerProduct = new containerMongoDB('productos', options.mongoDB)

//FIREBASE
// const containerFirebase = require('../daos/productos/ProductosDaoFirebase')  //../contenedores/containerFirebase
// const containerProduct = new containerFirebase('productos', options.firebase)

//FILE .JSON
// const ContainerArchivo = require('../daos/productos/ProductosDaoArchivo') //../contenedores/containerArchivo
// const containerProduct = new ContainerArchivo('./DB/productos.json')

//MYSQL
const ContainerMysql = require('../daos/productos/ProductosDaoMysql.js') //../contenedores/containerProductsMysql.js
const containerProduct = new ContainerMysql( 'productos', options.mysql )


//--------Router GET ALL ---------
router.get('/', async (req, res) => {
    try {
        const productos = await containerProduct.getAllProducts()
        
        if (productos !== {} ){
            res.status(200).json( { data: productos } )
        } else {
            res.status(200).json({Msg: 'No products founded' })
        }
    } catch (error) {
        res.status(400).json({msg: 'No products availables' })
    }
})

//--------Router GET BY ID ---------
router.get('/:id', async (req, res) => {
    const id = req.params.id
    //console.log('id ', id)
    try {
        const productos = await containerProduct.getById(id)
        //console.log('Producto: '+ productos)
        if (productos){
            res.status(200).json( { data: productos })
        } else {
            res.status(200).json({Msg: 'No product founded with the ID given'  })
        }
    } catch (error) {
        res.status(400).json({msg: 'No product available with the ID given' })
    }
})

//--------Router POST ---------
router.post("/", async (req, res) => {
    console.log('Post: ' + JSON.stringify(req.body, null, 2))
    const today = new Date()
    const timestamp = today.toLocaleString('en-GB')

    const addProduct = {
        timestamp: timestamp,
        name: req.body.name,
        description: req.body.description,
        price: parseInt(req.body.price),
        picture: req.body.picture,
        code: req.body.code,
        stock: parseInt(req.body.stock)
    }
    try {
        await containerProduct.createProduct(addProduct)
        res.json(addProduct)
    } catch (error) {
        res.status(400).json({msg: 'Error! The product was not added!!' })
    }
})

//--------Router DELETE ---------
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    //console.log('ID: ', id)
    try {
        const product = await containerProduct.deleteProduct(id)
        if (product){
            res.status(200).json({data: 'Product Deleted: ', product })
        } else {
            res.status(200).json({Msg: 'No product founded to delete with the ID given'  })
        }
    } catch (error) {
        res.status(400).json({msg: 'Error! The product was not deleted!!' })
    }
})


//--------Router UPDATE BY ID ---------
router.put('/:id', async (req, res) => {
    const today = new Date()
    const timestamp = today.toLocaleString()
    const { id } = req.params
    const dataBody = req.body
    
    try {
        const productUpdated = await containerProduct.updateProduct(id, dataBody, timestamp)
        if (productUpdated !== null){
            res.status(200).json({data: 'Product Updated: ', productUpdated })
        } else {
            res.status(200).json({Msg: 'No product founded to update with the ID given'  })
        }
    } catch (error) {
        res.status(400).json({msg: 'Error! NO product was updated!!' })
    }
})

module.exports = router;
