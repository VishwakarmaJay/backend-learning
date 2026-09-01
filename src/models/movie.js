import { DataTypes, Model } from "sequelize";
import connection from "../config/db.js";
import WatchList from "./watchlist.js";


class Movie extends Model{

    static associate(models) {


            Movie.belongsTo(models.User, {
            foreignKey: "createdBy",
            as: "creator"
        })

        Movie.hasMany(models.WatchList, {
            foreignKey: "movieId",
            as: "watchlists"
        });
    }

}
Movie.init({
    "id" : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    }, 
    "title" :{
        type : DataTypes.STRING,
        allowNull : false
    },
    "overview" :{ 
        type : DataTypes.STRING,
        allowNull : true
    },
    "releaseYear" : {
        type : DataTypes.STRING,
        allowNull: false
    }, 
    "genres" : {
        type : DataTypes.JSON
    },
    "runtime" : {
        type : DataTypes.INTEGER,
    },
    "posterUrl" : {
        type : DataTypes.STRING
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    }

},{
    sequelize :connection,
    modelName : "Movie",
    tableName : "movies",
    timestamps : true
})

export default Movie;