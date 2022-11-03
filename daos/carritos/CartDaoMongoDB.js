const ContainerMongoDB = require('../../contenedores/containerMongoDB')
const { options } = require('../../options/config.js')

const Carts = require('../../models/carts.models.js')

class CartDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super(options.mongoDB.connection.URL)
    }

    async createCart(product){
        try {
            const newCarts = new Carts(product)
            await newCarts.save()
            console.log('Cart created: ', newCarts)
            return newCarts
        } catch (error) {
            console.log("Error MongoDB createCart: ",error)
        }
    }

    async getAllCarts(){
        try {
            const carts = await Carts.find()
            console.log('Carritos encontrados: ', carts)
            return carts
        } catch (error) {
            console.log("Error MongoDB getCarts: ", error)
        }
    }

    async getById(id) {
        try {
            const cart = await Carts.findById(`${id}`)
            console.log('Carrito encontrado: ', cart)
            return cart
        } catch (error) {
            console.log("Error MongoDB getOneCart: ",error)
        }
    }

    async updateCart(id, dataBody, timestamp){
        console.log('id: ', id, ' - dataBody: ', dataBody, ' - timestamp: ', timestamp)
        try {
            const newValues = {
                 productos: dataBody
            }
            const productAdded = await Carts.updateOne({ _id: id}, {$push: newValues}, {timestamp: timestamp})

            console.log('Producto agregado al carrito ', productAdded)
            return productAdded
        } catch (error) {
            console.log("Error MongoDB adding product to a Cart: ",error)
        }
    }


    async deleteCartById(id){
        try {
            const cartDeleted = await Carts.deleteOne({ "_id": `${id}` })  //{name: 'Peter'}
            console.log('Carrito eliminado: ' + JSON.stringify(cartDeleted, null, 2))
            return cartDeleted
        } catch (error) {
            console.log("Error MongoDB deleteCart: ",error)
        }
    }


    async emptyCart(id){
        const products = {
            productos: []
        }
        try {
            const cartEmptied = await Carts.updateOne({ _id: id}, products )  //{name: 'Peter'}

            console.log('Carrito Vaciado: ' + JSON.stringify(cartEmptied, null, 2))
            return cartEmptied
        } catch (error) {
            console.log("Error MongoDB deleteCart: ",error)
        }
    }

    async desconectar() {
    }
}

module.exports = CartDaoMongoDB
// export default ProductosDaoMongoDB