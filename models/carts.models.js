const { Schema, model } = require('mongoose')

const carritosCollection = 'Carritos'

const CartSchema = new Schema({
    timestamp: {
        type: Date,
        required: true
    },
    productos: {
        type: Array,
        required: true
    }
})

module.exports = model(carritosCollection, CartSchema)