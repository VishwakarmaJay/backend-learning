import { DataTypes , Model} from "sequelize";
import connection from "../config/db.js";

class User extends Model {
     static associate(models) {
        User.hasMany(models.WatchList, {
            foreignKey: "userId",
            as: "watchlists"
        });
        
         User.hasMany(models.Movie, {
            foreignKey: "createdBy",
            as: "movies"
        });
    }

}

User.init({
    id :{
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    "first_name" : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    "last_name" : {
        type : DataTypes.STRING,
    },
    "email" :{
        type : DataTypes.STRING,
        unique : true,
        allowNull: false
    },
    "password" :{
        type : DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize: connection,
    modelName : "User",
    tableName : "users",
    timestamps : true
})


export default User;