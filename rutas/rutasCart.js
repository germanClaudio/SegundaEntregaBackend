const express = require('express')
const routerCart = express.Router()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { options } = require('../options/config')

//-------------- Carritos ----------------
//FILE .JSON
// const ContainerCarts = require('../daos/carritos/CartDaoArchivo.js')
// const containerCart = new ContainerCarts('./DB/carritos.json')

//FIREBASE
const ContainerCarts = require('../daos/carritos/CartDaoFirebase.js')
const containerCart = new ContainerCarts('carritos', options.firebase)

//--------Router GET ALL CARTS ---------
routerCart.get('/', async (req, res) => {
    try {
        const carritos = await containerCart.getAllCarts()
        console.log('getAllCarts: '+ JSON.stringify(carritos, null, 2))
        if (carritos !== {} ){
            res.status(200).json( { data: carritos } )
        } else {
            res.status(200).json({Msg: 'No Carts founded' })
        }
    } catch (error) {
        res.status(400).json({msg: 'No Carts availables' , error })
    }
})


//-------- Cart Router POST ---------
routerCart.post("/", async (req, res) => {
        //console.log('Post: ' + JSON.stringify(req.body, null, 2))
        const today = new Date()
        const timestamp = today.toLocaleString('en-GB')
    
        const addCart = {
            timestamp: timestamp,
            productos: []
        }
        
        try {
            await containerCart.createCart(addCart)
            res.json({ Success: `Cart Added successfully - ${JSON.stringify(addCart)} ` })
        } catch (error) {
            res.status(400).json({msg: 'Error! The Cart was not created!!' })
        }
    })

//--------Router DELETE CART BY ID ---------
routerCart.delete('/:id', (req, res) => {
    const { id } = req.params
    const cartDeleted = containerCart.deleteCartById(id)
    // console.log('Carrito a borrar: ' + JSON.stringify(cartDeleted))
    res.json(JSON.stringify(cartDeleted))
})

//--------Router GET CART BY T ID ---------
routerCart.get('/:id_Cart', async (req, res) => {
    const id_Cart = req.params.id_Cart
    // console.log('--- params: ' + id_Cart)
    
    try {
        const getCart = await containerCart.getById(id_Cart)
        //console.log('--- params: ' + id_Cart)
        if (getCart !== null) {
            // console.log('---- getCart: ' + JSON.stringify(getCart, null, 2));
            res.status(200).json( { ServerAnswer: getCart, id: id_Cart } )
        }
    } catch (error) {
        res.status(400).json({msg: `No Cart available with the Id# ${id_Cart} given`, error })
    }
})

//--------Router GET BY PRODUCT ID ---------
routerCart.get('/:id_Cart/productos', (req, res) => {
    const { id_Cart } = req.params
    console.log('params: ' + JSON.stringify(id_Cart))
    const getCart = containerCart.getCartById(id_Cart)

    if (id_Cart !== undefined) {
        res.json({ Error: 'Upps! You do not have permissions to see this!' })
    } else {
        
        if (getCart.productos === undefined) {
            res.json({ Error: `Sorry, we could not find the Product with the ID# ${id_Cart}!` })
        }
        res.json({ ServerAnswer: `Id Cart#: ${getCart.id_Cart} , Products: ${JSON.stringify(getCart.productos, null, 2)} ` })
    }
})

//--------Router POST [ADD PRODUCTS TO CART] ---------
routerCart.post('/:id_Cart/productos', async (req, res) => {
    const { id_Cart } = req.params
    const body = req.body
    const today = new Date()
    const timestamp = today.toLocaleString('en-GB')

    try {
        const dbresponse = await containerCart.updateCart(id_Cart, body, timestamp)
        res.json({ ServerAnswer: `Id Cart#: ${id_Cart} - Product added: ${JSON.stringyfy(dbresponse, null, 2)}` })
        
    } catch (error) {
        res.status(400).json({msg: `Error! The product was not added to the Cart Id# ${id_Cart}!!` })
    }
})

//--------Router DELETE PRODUCT IN CART BY ID PRODUCT ---------
routerCart.delete('/:id_Cart/productos/:id', (req, res) => {
    const { id_Cart, id } = req.params
    let respuesta = containerCart.deleteCarttById(id_Cart, id)
    
    res.json(JSON.stringify(respuesta))
})


module.exports = routerCart;