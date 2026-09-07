import bcrypt from "bcryptjs";
import type { IUserRepository } from "../repositories/userRepository";
import type { User } from "../models";
import { test } from "node:test";
import assert from "node:assert/strict";
import { AuthService } from "../services/authServices";

test("login returns the user when the password is correct", async () => {
  const hash = await bcrypt.hash("password123", 10);

  const fakeRepo: IUserRepository = {
    findByEmail: async () => ({ id: 1, email: "alice@example.com", password: hash } as User),
    findById:    async () => null,
    create:      async () => { throw new Error("not called in this test"); },
  };

  const svc = new AuthService(fakeRepo);                       // ← real service, fake data layer
  const user = await svc.login({ email: "alice@example.com", password: "password123" });

  assert.equal(user.id,1);
});