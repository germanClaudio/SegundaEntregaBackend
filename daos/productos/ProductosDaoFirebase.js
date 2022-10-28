import ContainerFirebase from '../../contenedores/containerFirebase'

import { connection } from ('../../options/config.js')

const connectionFirebase = connection.firebase

class ProductosDaoFirebase extends ContainerFirebase {
    constructor() {
        super(connectionFirebase)
    }

    async desconectar() {
    }
}

export default ProductosDaoFirebase