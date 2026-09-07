import { CreationAttributes } from "@sequelize/core";
import { User } from "../models";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: CreationAttributes<User>): Promise<User>;
  findById(id : number) : Promise<User | null>;
}

export class UserRepository implements IUserRepository {
 
  findByEmail(email: string): Promise<User | null> {
    return User.withoutScope().findOne({ where: { email } });
  }

  findById(id : number) : Promise<User | null>
  {
    return User.findByPk(id);
  }

  create(data: CreationAttributes<User>): Promise<User> {
    return User.create(data);
  }
}
