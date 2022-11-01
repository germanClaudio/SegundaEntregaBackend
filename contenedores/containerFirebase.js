let admin = require("firebase-admin");
let serviceAccount = require("../options/comision32125-backend-firebase-adminsdk-lhyej-0e32c2b4a8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const query = db.collection("productos");

// admin.initializeApp({
// 	credential : admin.credential.cert(serviceAccount),
// 	databaseURL: "https://comision32125-backend.firebaseio.com" // databaseURL: 'https://comision32125-backend.firebaseio.com'//options.firebase.connection.URL
// })

module.exports = class ContainerFirebase {
  constructor() {
    	this.connect()
  }

  connect() {
		try {
			// admin.initializeApp({
			// 	credential : admin.credential.cert(serviceAccount),
			// })
			console.log('Connected to Firebase DB')	
		}
		catch (error) {
			console.error("Error FB connection: ", error);
		}
	}

  //create Producto ------------------
  async createProduct(addProduct) {
    try {
      // let id = '2'
      const doc = query.doc(); //`${id}
      await doc.create({
        timestamp: addProduct.timestamp,
        name: addProduct.name,
        description: addProduct.description,
        price: addProduct.price,
        picture: addProduct.picture,
        code: addProduct.code,
        stock: addProduct.stock
      });
      console.log("Producto creado: ", addProduct)
    } catch (error) {
      console.error("Error FB createProduct: ", error);
    }
  }

  //leer All Products --------------------
  async getAllProducts() {
    try {
      const queryProductos = await query.get();
      const response = queryProductos.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
	  console.log("Productos: ", response);
	  return response
    } catch (error) {
      console.error("Error FB getProducts: ", error);
    }
  }

  //leer 1 product --------------------
  async getById(id) {
    try {
    	//let id = "2";
      	const queryProducto = query.doc(`${id}`)
      	const item = await queryProducto.get()
      	const respuesta = item.data()
      	console.log("Producto encontrado: ", respuesta)
		return respuesta
    } catch (error) {
      console.error("Error FB getOneProduct: ", error);
    }
  }

  //  Update 1 Product ----------------------
  async updateProduct(id, dataBody, timestamp) {
    try {
      //let id = '1'
      const queryProductos = query.doc(`${id}`);
      const item = await queryProductos.update( {
		timestamp: timestamp,
		name: dataBody.name,
        description: dataBody.description,
        price: dataBody.price,
        picture: dataBody.picture,
        code: dataBody.code,
        stock: dataBody.stock
	  } ); //{ edad: 50 }
      console.log("El Producto ha sido actualizado", item);
    } catch (error) {
      console.error("Error FB updateProduct: ", error);
    }
  }

  //  Delete One Product ----------------------
  async deleteProduct(id) {
    try {
      //let id = '2'
      const queryProductos = query.doc(`${id}`);
      const item = await queryProductos.delete();
      console.log("El Producto ha sido eliminado", item);
		return item
    } catch (error) {
      console.error("Error FB DeleteProduct: ", error);
    }
  }
}