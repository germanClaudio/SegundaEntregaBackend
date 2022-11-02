import ContainerProductsMysql from '../../contenedores/containerProductsMysql'
import { options } from '../../options/config.js'

const connectionMysql = options.mysql

class ProductosDaoMysql extends ContainerProductsMysql {
    constructor() {
        super(connectionMysql)
        console.log('Conectado a Mysql')
    }

    async desconectar() {
    }
}

export default ProductosDaoMysql