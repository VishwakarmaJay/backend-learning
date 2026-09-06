import {
  DataTypes,
  Model,
  NonAttribute,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "@sequelize/core";

import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  HasMany,
  BeforeSave,
  Unique,
} from "@sequelize/core/decorators-legacy";

import { Movie } from "./movie";
import { WatchList } from "./watchlist";
import bcrypt from "bcryptjs";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare first_name: string;

  @Attribute(DataTypes.STRING)
  declare last_name: string | null;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;

  @HasMany(() => WatchList, {
    foreignKey: "userId",
  })
  declare watchlists?: NonAttribute<WatchList[]>;

  @HasMany(() => Movie, {
    foreignKey: "createdBy",
  })
  declare movies?: NonAttribute<Movie[]>;

  @BeforeSave
  static async hashPassword(user : User)
  {
      if(user.changed('password'))
      {
        user.password = await bcrypt.hash(user.password ,10) 
      }
  }

}