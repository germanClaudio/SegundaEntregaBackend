module.exports = class ContainerMysql {  
    constructor() {
        this.connect()
    }
   
    async connect() {
        try {
            console.log('Connected to MySql DataBase ')
        }
        catch (error) {
            console.error("Error FB connection: ", error);
        }
    }
}