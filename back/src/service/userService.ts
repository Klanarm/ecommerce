import { USER } from "../database/elysia/USER.model";
import { AuthenticationError } from "../exceptions/AuthenticationError";
import { DuplicateUserError } from "../exceptions/DuplicateUserError";
import { InvariantError } from "../exceptions/InvariantError";
import { loginError } from "../exceptions/loginError";

type user = {
  email: string;
  password: string;
};

export const userService = {
  createUser: async (payload: user) => {
    try {
      await USER.create(payload);
      return;
    } catch (error) {
      console.log(error);

      throw new DuplicateUserError("user already exists");
    }
  },

  getPasswordByUsername: async (username: string) => {
    const getPassword = await USER.findOne({
      where: {
        email: username,
      },
      attributes: ["password", "id"],
      raw: true,
    });
    if (!getPassword) throw new loginError("Username is not found");
    return getPassword;
  },

  findUserById: async (userId: string) => {
    const userDetails = await USER.findByPk(userId, {
      attributes: ["email", "id"],
      raw: true,
    });
    if (!userDetails) throw new AuthenticationError("Invalid bearer token");
    return userDetails;
  },
};
