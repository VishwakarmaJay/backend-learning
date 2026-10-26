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
  Default,
  BelongsTo,
  HasMany,
  Index,
} from "@sequelize/core/decorators-legacy";

import { Venue } from "./venue";
import { Booking } from "./booking";

export class Event extends Model<
  InferAttributes<Event>,
  InferCreationAttributes<Event>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @Index({ name: "events_venue_start_time_idx" })
  declare venueId: number;

  @Attribute(DataTypes.DATE)
  @NotNull
  @Index({ name: "events_venue_start_time_idx" })
  @Index({ name: "events_start_time_idx" })
  declare startTime: Date;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @Default(0)
  declare booked: CreationOptional<number>;

  @BelongsTo(() => Venue, {
    foreignKey: "venueId",
  })
  declare venue?: NonAttribute<Venue>;

  @HasMany(() => Booking, {
    foreignKey: "eventId",
  })
  declare bookings?: NonAttribute<Booking[]>;
}