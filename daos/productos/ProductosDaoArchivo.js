import ContainerArchivo from '../../contenedores/containerArchivo'

class ProductosDaoArchivo extends ContainerArchivo {
    constructor() {
        super('DB/productos.json')
    }

    async desconectar() {
    }
}

export default ProductosDaoArchivo