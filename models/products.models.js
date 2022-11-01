const { Schema, model } = require('mongoose') //import { Schema, model } from 'mongoose' //const { Schema, model } = require('mongoose')
let newDate = new Date()

const productosCollection = 'Productos'

const ProductSchema = new Schema({
    timestamp: {
        type: String,
        default: newDate.toLocaleString(),
    },
    name : {
        type: String,
        required: true,
        maxlength: 100
    },
    description : {
        type: String,
        required: true,
        maxlength: 200
    },
    price: {
        type: Number,
        required: true
    },
    picture: { 
        type: String,
        required: true,
        maxlength: 250        
    },
    code: {
        type: String,
        required: true,
        maxlength: 8 
    },
    stock: { 
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = model(productosCollection, ProductSchema)