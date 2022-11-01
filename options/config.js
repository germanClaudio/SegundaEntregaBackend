//-----------------MONGO DB -----------
//const mongoose = require("mongoose"); //import mongoose from ('mongoose')

//----------------firebase -----------
// let admin = require("firebase-admin");
let serviceAccount = require("./comision32125-backend-firebase-adminsdk-lhyej-0e32c2b4a8.json")

const options = {
  mysql: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "products"
    }
  },

  sqlite: {
    client: "sqlite3",
    connection: {
      filename: "../DB/ecommerce.sqlite",
    },
    useNullAsDefault: true
  },

  mongoDB: {
      "connection": {
        URL: "mongodb+srv://germanClaudio:germanclaudio@cluster0.oqkw9q9.mongodb.net/ecommerce?retryWrites=true&w=majority", //mongodb://localhost:27017/ecommerce  127.0.0.1   mongodb+srv://germanClaudio:<password>@cluster0.oqkw9q9.mongodb.net/?retryWrites=true&w=majority
      }
    },
  

  firebase: {
     "connection" : {
        URL: serviceAccount,
     }
     }
  }

module.exports = {
  options
}