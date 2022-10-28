import { Schema, model } from 'mongoose' //const { Schema, model } = require('mongoose')

const carritosCollection = 'Carritos'

const CartSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: { 
        type: String,
        required: true,
        maxlength: 250        
    },
    stock: { 
        type: Number,
        required: true
    }
})

module.exports = model(carritosCollection, CartSchema)