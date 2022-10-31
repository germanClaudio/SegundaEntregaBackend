import ContainerMongoDB from '../../contenedores/containerMongoDB'

import { connection } from '../../options/config.js'

const connectionMongoDb = connection.mongoDB

class ProductosDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super(connectionMongoDb)
    }

    async desconectar() {
    }
}

export default ProductosDaoMongoDB