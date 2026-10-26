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
} from "@sequelize/core/decorators-legacy";

import { Event } from "./event";

export class Venue extends Model<
  InferAttributes<Venue>,
  InferCreationAttributes<Venue>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare address: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare capacity: number;

  @HasMany(() => Event, {
    foreignKey: "venueId",
  })
  declare events?: NonAttribute<Event[]>;
}