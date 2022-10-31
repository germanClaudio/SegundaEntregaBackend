const mongoose = require('mongoose');  //import mongoose from 'mongoose'
const Productos = require('../models/products.models.js')

const { options } = require('../options/config.js')

module.exports = class ContainerMongoDB {
    constructor() {
        this.connect()
    }
    
    connect() {
         try {
             //const URL = 'mongodb+srv://germanClaudio:germanclaudio@cluster0.oqkw9q9.mongodb.net/ecommerce?retryWrites=true&w=majority'   //mongodb://localhost:27017/ecommerce  127.0.0.1   mongodb+srv://germanClaudio:<password>@cluster0.oqkw9q9.mongodb.net/?retryWrites=true&w=majority
             const URL = options.mongoDB.connection.URL
             mongoose.connect(URL, {
                 useNewUrlParser: true,
                 useUnifiedTopology: true
             })
             console.log('Connected to MongoDB Server')
            
         } catch (error) {
             console.error('Error connection to DB: '+error)
         }
     }


    async createProduct(product){
        try {
            const newProduct = new Productos(product)
            await newProduct.save()
            console.log('Product created: ', newProduct)
        } catch (error) {
            console.log("Error MongoDB createProduct: ",error)
        }
    }

    async getAllProducts(){
        try {
            const products = await Productos.find()
            console.log('Productos encontrados: ',products)
            return products
        } catch (error) {
            console.log("Error MongoDB getProducts: ",error)
        }
    }

    async getById(id) {
        try {
            const product = await Productos.findById(`${id}`)
            console.log('Producto encontrado: ',product)
            return product
        } catch (error) {
            console.log("Error MongoDB getOneProducts: ",error)
        }
    }

    async updateProduct(id, dataBody, timestamp){
        try {
            const newValues = {
                 $set: dataBody,
                 timestamp: timestamp
            }
            const product = await Productos.updateOne({ _id: id}, newValues)
            console.log('Producto actualizado ', product)
            return product
        } catch (error) {
            console.log("Error MongoDB updateProduct: ",error)
        }
    }

    async deleteProduct(id){
        try {
            const productDeleted = await Productos.deleteOne({ "_id": `${id}` })  //{name: 'Peter'}
            console.log('Producto eliminado: ' + JSON.stringify(productDeleted, null, 2))
            return productDeleted
        } catch (error) {
            console.log("Error MongoDB deleteProduct: ",error)
        }
    }
}