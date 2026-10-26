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
  Index,
} from "@sequelize/core/decorators-legacy";

import { Event } from "./event";
import { User } from "./user";

export class Booking extends Model<
  InferAttributes<Booking>,
  InferCreationAttributes<Booking>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @Index({ name: "bookings_event_status_idx" })
  @Unique("event_user_unique")
  declare eventId: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @Index({ name: "bookings_user_idx" })
  @Unique("event_user_unique")
  declare userId: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare seatCount: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Index({ name: "bookings_event_status_idx" })
  declare status: string;

  @BelongsTo(() => Event, {
    foreignKey: "eventId",
  })
  declare event?: NonAttribute<Event>;

  @BelongsTo(() => User, {
    foreignKey: "userId",
  })
  declare user?: NonAttribute<User>;
}