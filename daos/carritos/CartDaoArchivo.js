const fs = require("fs")
const ContainerArchivo = require("../../contenedores/containerArchivo")

module.exports = class ContainerDaoArchivo extends ContainerArchivo {
    constructor() {
        super('DB/carritos.json')
    }

    async getAllCarts() {
        const fileContent = await this.readFile();
        if (fileContent.length > 0) {
            console.log(
              "Lista de Carts: \n" + JSON.stringify(fileContent, null, 2)
            );
            return fileContent
          } else {
            console.log("Lo sentimos, la lista de Carritos está vacía!!!");
          }
    }
    
    async saveCart(addCart) {
        const fileContent = await this.readFile();
        //console.log('FileContent: '+ fileContent)
        if (addCart !== undefined && fileContent !== undefined) {
            const cartToSave = JSON.stringify([...fileContent, { id_Cart: fileContent[fileContent.length - 1].id_Cart + 1 , ...addCart}], null, 2)
            try {
                this.carts = fs.writeFileSync(this.myFile, cartToSave)
                // console.log('try de saveproducts: '+ productToSave)
                return { addCart }
            } catch (error) {
                // console.log(error)
                return { Error: 'Upps! Hubo un error y no pudimos guardar el Producto.' }
            }
        } else {
            return { Error: 'Upps! We had some problems saving the Product, try later.' }
        }
    }
    

    async deleteById(id_Cart) {
            const fileContent = await this.readFile();
            const nonDeletedCarts = fileContent.filter(item => item.id_Cart !== parseInt(id_Cart))
            const cartToBeDeleted = fileContent.filter(item => item.id_Cart === parseInt(id_Cart))
            //console.log('cartToBe deleted: '+ JSON.stringify(cartToBeDeleted))
            let arrayOrdered = nonDeletedCarts.sort((a,b) => { return a.id - b.id })
            //console.log('id cart: '+id_Cart)    
            
            if (cartToBeDeleted !== undefined && cartToBeDeleted.length > 0) {
                    try {
                        this.carts = fs.writeFileSync(this.myFile, JSON.stringify(arrayOrdered, null, 2));
                        return { Success: `Cart Deleted successfully - ${JSON.stringify(cartToBeDeleted)} `}
                    
                    } catch (error) {
                        return { Error: `Upps! The cart with the Id#${id_Cart} was not founded.`}
                    }
    
            } else {
                return { Error: `Sorry, the Cart Id#${id_Cart}, DOES NOT exists on the DB!` }
            }
        }


    async getCartById(id_Cart) {
            const fileContent = await this.readFile();
            const cart = fileContent.filter((cart) => cart.id_Cart === Number(id_Cart))
            
            if (cart.length > 0) {
                console.log("Carrito encontrado: " + JSON.stringify(cart, true, 2));
                return cart
            } else {
                return { Error: `We could not find the Cart with the Id# ${id_Cart}` }
            }
    }


    async updateCart(id_Cart, producToAdd) {
            const fileContent = await this.readFile();
            const cartId = fileContent.find(item => item.id_Cart === Number(id_Cart))
            
            if ( cartId.id_Cart !== undefined && cartId.id_Cart > 0 || cartId !== {} ) {
                const nonUpdatedCarts = fileContent.filter(item => item.id_Cart !== parseInt(id_Cart))
                const updatedCart = { id_Cart: Number(id_Cart), timestamp: producToAdd.timestamp , productos: [...cartId.productos, producToAdd] }
                
                let array = [updatedCart, ...nonUpdatedCarts]
                let arrayOrdered = array.sort((a,b) => { return a.id_Cart - b.id_Cart })
                
                try {
                    this.carts = fs.writeFileSync(this.myFile, JSON.stringify(arrayOrdered))
                    return updatedCart
    
                } catch (error) {
                    return { Error: `Error Actualizando el Carrito. Descripción error: ${error}` }
                }
    
            } else {
                return { Error: 'Carrito no encontrado!!' }
            }
        }
    
        // deleteProductById(id_Cart, id) {
        //     const fileContent = this.carts
        //     const nonDeletedProductCarts = fileContent.filter(item => item.id_Cart !== parseInt(id_Cart))
        //     const productCartToBeDeleted = fileContent.filter(item => item.id_Cart === parseInt(id_Cart))
            
        //     console.log('1-productCartToBeDeleted: ' + JSON.stringify(productCartToBeDeleted))

        //     const specificIdProductNonDeleted = productCartToBeDeleted.filter(item => item.productos.id !== Number(id))
        //     const specificIdProductDeleted = productCartToBeDeleted.filter(item => item.productos.id === Number(id))
            
        //     console.log('2-Product especifico NON To Be deleted: '+ specificIdProductDeleted)
        //     console.log('3-Product especifico To Be deleted: '+ specificIdProductDeleted)
            
        //     let arrayProductOrdered = specificIdProductNonDeleted.sort((a,b) => { return a.id - b.id })

        //     let arrayCartOrdered = nonDeletedProductCarts.sort((a,b) => { return a.id - b.id })
                        
        //     console.log('id cart: '+id_Cart + ' - id prod: ' + id)    
            
        //     // let arrayToSave = { arrayProductOrdered }

        //     if (specificIdProductDeleted !== undefined && specificIdProductDeleted.length > 0) {
        //             try {
        //                 this.carts = fs.writeFileSync(this.myFile, JSON.stringify(arrayProductOrdered, null, 2));
        //                 return { Success: `Product in Cart Deleted successfully - ${JSON.stringify(productCartToBeDeleted)} `}
                    
        //             } catch (error) {
        //                 return { Error: `Upps! The Product in cart id#${id_Cart} with the Id#${id} was not founded.`}
        //             }
    
        //     } else {
        //         return { Error: `Sorry, the Cart Id#${id_Cart}, DOES NOT exists on the DB!` }
        //     }
        // }
}