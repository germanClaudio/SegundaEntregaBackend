let admin = require("firebase-admin");
let serviceAccount = require("../options/comision32125-backend-firebase-adminsdk-lhyej-0e32c2b4a8.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

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
			admin.initializeApp({
				credential : admin.credential.cert(serviceAccount),
			})
			console.log('Connected to Firebase DB')	
		}
		catch (error) {
			console.error("Error FB connection: ", error);
		}
	}

  //create Producto ------------------
  async createProduct() {
    try {
      // let id = '2'
      const doc = query.doc(); //`${id}
      await doc.create({
        title: "Perfume Te fuiste a la BB",
        price: 125,
        thumbnail: "http://localhost:8080/Perfume_6.jpg",
        stock: 15,
      });
      console.log("Producto creado");
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
  async getProduct(id) {
    try {
      //let id = "2";
      const queryProducto = query.doc(`${id}`)
      const item = await queryProducto.get()
      const respuesta = item.data()

      console.log("Producto encontrado: ", respuesta);
    } catch (error) {
      console.error("Error FB getOneProduct: ", error);
    }
  }

  //  Update 1 Product ----------------------
  async updateProduct(id) {
    try {
      //let id = '1'
      const queryProductos = query.doc(`${id}`);
      const item = await queryProductos.update(); //{ edad: 50 }
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
    } catch (error) {
      console.error("Error FB DeleteProduct: ", error);
    }
  }
}