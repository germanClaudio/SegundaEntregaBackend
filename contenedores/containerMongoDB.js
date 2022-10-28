//import mongoose from ('mongoose')//const mongoose = require('mongoose');
const Productos = require('../models/products.models.js')

const { options } = require('../options/config.js')

module.exports = class ContainerMongoDB {
    constructor() {
        //this.connect()
        this.connect = options.mongoDB
    }
    
    // connect() {
    //     try {
    //         const URL = 'mongodb+srv://germanClaudio:germanclaudio@cluster0.oqkw9q9.mongodb.net/ecommerce?retryWrites=true&w=majority'   //mongodb://localhost:27017/ecommerce  127.0.0.1   mongodb+srv://germanClaudio:<password>@cluster0.oqkw9q9.mongodb.net/?retryWrites=true&w=majority
    //         mongoose.connect(URL, {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true
    //         })
    //         console.log('Connected to MongoDB Server')
            
    //     } catch (error) {
    //         console.error('Error connection to DB: '+error)
    //     }
    // }

    
    async createProduct(product){
        try {
            const newProduct = new Productos(product)
            await newProduct.save()
            console.log('Product created: ', newProduct)
        } catch (error) {
            console.log(error)
        }
    }

    async getProducts(){
        try {
            const products = await Productos.find()
            console.log('Productos encontrados: ',products)
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(){
        try {
            await Productos.updateOne(  )  //{name: 'John'}, {$set: {name: 'Juan'}}
            console.log('Producto actualizado')
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(){
        try {
            const productDeleted = await Productos.deleteOne(  )  //{name: 'Peter'}
            console.log('Producto eliminado: ' + JSON.stringify(productDeleted, null, 2))
        } catch (error) {
            console.log(error)
        }
    }
    
}