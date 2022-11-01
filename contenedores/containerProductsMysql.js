const { options } = require('../options/config.js')  
const knex = require('knex')(options.mysql)


 module.exports = class ContainerProductsMysql {  
    constructor(table, { configConnection } ) {
        this.table = table
        // console.log('table name: ',table)
        this.knex = knex(configConnection)
        //console.log('knex: ', configConnection)
    }
   
    async getAllProducts() {
        try {
            return await this.knex.from(this.table).select("*")
        } catch (error) {
            return new Error(`Error getting all products ${error}`)
        }
    }  
    
    async createProduct(addProduct) {
        const id = 0
        try {
            const result = await this.knex('productos').insert( {id, ...addProduct } )
            console.log('Producto agregado: ', { id, ...addProduct } )
            return result
            
        } catch (error) {
            return new Error(`Error saving product ${error}`)
        }                
    }

    async getById(id) {
        try {
            return await this.knex.from(this.table).select('*').where('id', "=", parseInt(id))
        } catch (error) {
            return new Error(`Error getting one product ${error}`)
        }
    }

    async deleteProduct(id) {
        try {
            return await this.knex.from(this.table).where('id', "=", parseInt(id)).del()
        } catch (error) {
            return new Error(`Error deleting one product ${error}`)
        }
    }

    async updateProduct(id, producto) {
        try {
            return await this.knex.from(this.table).where('id', "=", parseInt(id)).update(producto)
        } catch (error) {
            return new Error(`Error updating one product ${error}`)
        }
    }
}