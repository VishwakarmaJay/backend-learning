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
  BelongsTo,
} from "@sequelize/core/decorators-legacy";

import { User } from "./user";
import { WatchList } from "./watchlist";

export class Movie extends Model<
  InferAttributes<Movie>,
  InferCreationAttributes<Movie>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(DataTypes.STRING)
  declare overview: string | null;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare release_year: string;

  @Attribute(DataTypes.JSON)
  declare genres: object | null;

  @Attribute(DataTypes.INTEGER)
  declare runtime: number | null;

  @Attribute(DataTypes.STRING)
  declare poster_url: string | null;

  // Foreign key: movies.createdBy -> users.id
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare createdBy: number;

  @BelongsTo(() => User, {
    foreignKey: "createdBy",
  })
  declare creator?: NonAttribute<User>;

  @HasMany(() => WatchList, {
    foreignKey: "movieId",
  })
  declare watchlists?: NonAttribute<WatchList[]>;
}