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
  BelongsTo,
  Unique,
} from "@sequelize/core/decorators-legacy";

import { User } from "./user";
import { Movie } from "./movie";

export class WatchList extends Model<
  InferAttributes<WatchList>,
  InferCreationAttributes<WatchList>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @Unique("uq_user_movie")
  declare userId: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @Unique("uq_user_movie")
  declare movieId: number;

  @Attribute(DataTypes.STRING)
  declare status: string | null;

  @Attribute(DataTypes.INTEGER)
  declare rating: number | null;

  @Attribute(DataTypes.STRING)
  declare notes: string | null;

  @BelongsTo(() => User, {
    foreignKey: "userId",
  })
  declare user?: NonAttribute<User>;

  @BelongsTo(() => Movie, {
    foreignKey: "movieId",
  })
  declare movie?: NonAttribute<Movie>;
}