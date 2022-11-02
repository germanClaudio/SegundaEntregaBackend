const ContainerFirebase = require('../../contenedores/containerFirebase')
const { options } = require('../../options/config.js')

const formato = require('../../models/carts.models')

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
	  console.log("Carritos: ", response);
	  return response
    } catch (error) {
      console.error("Error FB getCarts: ", error);
    }
  }

  //leer 1 carrito --------------------
  async getById(id) {
    try {
    	//let id = "2";
      	const queryCarrito = query.doc(id)
      	const item = await queryCarrito.get()
      	const respuesta = item.data()
      	console.log("Carrito encontrado: ", respuesta)
		return respuesta
    } catch (error) {
      console.error("Error FB getOneCart: ", error);
    }
  }

  //  Insert 1 Product into the Cart----------------------
  async updateCart(id, dataBody, timestamp) {
    console.log('databody: ',dataBody);
    try {
      //let id = '1'
      console.log('formato ', formato)
      const queryCarrito = query.doc(id);
      const item = await queryCarrito.get()
      const respuesta = item.data()
      const itemInsert = await queryCarrito.update( {
        productos:  {...respuesta}, dataBody,
        // productos: dataBody,
        timestamp: timestamp,
		
	  } ); //{ edad: 50 }
      console.log("El Carrito ha sido actualizado", itemInsert);
      return itemInsert;
    } catch (error) {
      console.error("Error FB updateProduct: ", error);
    }
  }

  //  Delete One Product ----------------------
  async deleteCartById(id) {
    try {
      //let id = '2'
      const queryCarritos = query.doc(`${id}`);
      const item = await queryCarritos.delete();
      console.log("El Carrito ha sido eliminado", item);
		return item
    } catch (error) {
      console.error("Error FB DeleteCart: ", error);
    }
  }

  async emptyCart(id, timestamp) {
    try {
      //let id = '1'
      const queryCarrito = query.doc(`${id}`);
      const item = await queryCarrito.update( {
		timestamp: timestamp,
		productos: []
	  } ); //{ edad: 50 }
      console.log("El Carrito ha sido actualizado", item);
    } catch (error) {
      console.error("Error FB updateProduct: ", error);
    }
  }
    
    async desconectar() {
    }
}

module.exports = CartDaoFirebase