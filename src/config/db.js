import {Sequelize} from 'sequelize'

const connection = new Sequelize("mysql://root:123@127.0.0.1:3306/practice",{
    // host : '127.0.0.1',
    // database : 'practice',
    // username : 'root',
    // password : "123",
    // port : 3306,
    dialect: 'mysql'
});

export async function dbConnection () {
    try {
        await connection.authenticate();
        console.log("Connection has Established");
    }
    catch(e){
        console.log(`Errror is ${e}`);
    }
}

export default connection;

