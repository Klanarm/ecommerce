import { t } from "elysia";
import { userService } from "../service/userService";
import { loginError } from "../exceptions/loginError";

export const userHandler = {
  createUser: async ({ body, set }) => {
    const passwordHash = await Bun.password.hash(body.password, {
      algorithm: "bcrypt",
      cost: parseInt(process.env.SALT_COST),
    });
    await userService.createUser({
      email: body.email,
      password: passwordHash,
    });
    return {};
  },

  loginUser: async ({ jwt, body, set }) => {
    const hashedPassword = await userService.getPasswordByUsername(body.email);
    const isMatch = await Bun.password.verify(
      body.password,
      hashedPassword.password
    );

    if (!isMatch) {
      throw new loginError("Username is not found");
    }

    return { token: await jwt.sign({ id: hashedPassword.id }) };
  },

  userValidate: t.Object({
    email: t.TemplateLiteral("${string}@${string}.com"),
    password: t.String({ maxLength: 12, minLength: 8 }),
  }),
};
