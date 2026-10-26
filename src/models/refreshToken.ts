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
  BeforeSave,
  Unique,
  BelongsTo,
} from "@sequelize/core/decorators-legacy";

import { User } from "./user";
import { hashToken } from "../utils/hash";

export class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare tokenHash: string;

  @BelongsTo(() => User, { foreignKey: "userId" })
  declare user?: NonAttribute<User>;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare expiresAt: Date;

  @Attribute(DataTypes.DATE)
  declare revokedAt: CreationOptional<Date | null>;

  @BeforeSave
  static hashTokenBeforeSave(instance: RefreshToken) {
    if (instance.changed("tokenHash")) {
      instance.tokenHash = hashToken(instance.tokenHash);
    }
  }

  
}
