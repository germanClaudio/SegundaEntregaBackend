const mongoose = require('mongoose');  //import mongoose from 'mongoose'
const { options } = require('../options/config.js')

module.exports = class ContainerMongoDB {
    constructor() {
        this.connect()
    }
    
    connect() {
         try {
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
}