const { options } = require('../options/config.js')
const admin = options.firebase.connection.admin
const serviceAccount = options.firebase.connection.serviceAccount

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})


module.exports = class ContainerFirebase {
  constructor() {
    this.connect()
  }
  
  async connect() {
      try {
          console.log('Connected to Firebase DB ')	
      }
      catch (error) {
          console.error("Error FB connection: ", error);
      }
  }
}