import { DataTypes, Model } from "sequelize";
import connection from "../config/db.js";



class WatchList extends Model {

    static associate(models) {

        WatchList.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user"
        });

        WatchList.belongsTo(models.Movie, {
            foreignKey: "movieId",
            as: "movie"
        });

    }
}

WatchList.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },

    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "movies",
            key: "id"
        }
    },

    status: {
        type: DataTypes.STRING
    },

    rating: {
        type: DataTypes.INTEGER
    },

    notes: {
        type: DataTypes.STRING
    }

}, {
    sequelize: connection,
    modelName: "WatchList",
    tableName: "watchlists",
    timestamps: true
});



export default WatchList;