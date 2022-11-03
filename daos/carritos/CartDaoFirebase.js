const ContainerFirebase = require('../../contenedores/containerFirebase')
const { options } = require('../../options/config.js')

const db = options.firebase.connection.admin.firestore();
const query = db.collection("carritos");

class CartDaoFirebase extends ContainerFirebase {
    constructor() {
        super(options.firebase.connection.serviceAccount)
    }

    //create Carrito ------------------
  async createCart(addCart) {
    try {
      // let id = '2'
      const doc = query.doc(); //`${id}
      await doc.create({
        timestamp: addCart.timestamp,
        productos: []
      });
      console.log("Carrito creado: ", addCart)
    } catch (error) {
      console.error("Error FB createCart: ", error);
    }
  }

  //leer All Carts --------------------
  async getAllCarts() {
    try {
      const queryCarritos = await query.get();
      const response = queryCarritos.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
	  //console.log("Carritos: ", response);
	  return response
    } catch (error) {
      console.error("Error FB getCarts: ", error);
    }
  }

  //leer 1 carrito --------------------
  async getById(id) {
    try {
    		const queryCarrito = query.doc(id)
      	const item = await queryCarrito.get()
      	const respuesta = item.data()
      	console.log("Carrito encontrado: ", respuesta)
		return respuesta
    } catch (error) {
      console.error("Error FB getOneCart: ", error);
    }
  }

  //  Insert 1 Product into the Cart-------------
  async updateCart(id, dataBody, timestamp) {
    //console.log('databody: ',dataBody);
    try {
      const queryCarrito = query.doc(id);
      const itemInsert = await queryCarrito.update( {
        productos:  options.firebase.connection.admin.firestore.FieldValue.arrayUnion(dataBody),
        timestamp: timestamp
    } );
      console.log("Se ha agregado al Carrito un producto id#: ", id);
      return itemInsert;
    } catch (error) {
      console.error("Error FB updateProduct: ", error);
    }
  }

  //  Delete One Product ----- Is not working.......
  async removeProductById(id_Cart, id, timestamp) {
    console.log('id_Cart: ', id_Cart, 'id: ', id, 'timestamp: ', timestamp);
    try {
      const queryCarrito = query.doc(id_Cart)
      
      const item = await queryCarrito.update( {
        productos: options.firebase.connection.admin.firestore.FieldValue.arrayRemove('productos'),  
      }, {merge: true});
      console.log(`El producto Id: ${id}, se ha eliminado del Carrito`, item)
      return queryCarrito
    } catch (error) {
      console.error("Error FB DeleteCart: ", error);
    }
  }

  //   Empty the cart (delete all products from cart) --------------
  async emptyCart(id, timestamp) {
    try {
      const queryCarrito = query.doc(id);
      const item = await queryCarrito.update( {
        timestamp: timestamp,
        productos:  options.firebase.connection.admin.firestore.FieldValue.delete() 
	    }, {merge: true} );
      console.log("El Carrito se ha vaciado de productos", item);
      return queryCarrito
    } catch (error) {
      console.error("Error FB updateProduct: ", error);
    }
  }

  //   Delete the cart --------------
  async deleteCartById(id) {
    try {
      const queryCarrito = query.doc(id);
      const item = await queryCarrito.delete() 
      console.log("El Carrito se sido eliminado completamente", item);
      return item
    } catch (error) {
      console.error("Error FB updateProduct: ", error);
    }
  }
    
    async desconectar() {
    }
}

module.exports = CartDaoFirebase