import Elysia, { t } from "elysia";
import { AuthenticationError } from "../exceptions/AuthenticationError";
import { apikeysHandler } from "../handlers/apikey.handle";
import { userHandler } from "../handlers/user.handle";
import { authenticationHandler } from "../handlers/authentication.handle";
import uploadRouter from "./upload.router";
import itemsRouter from "./items.router";
import { itemsHandler } from "../handlers/items.handle";

const apiRootRoutes = (api) => {
  api
    .guard(
      {
        beforeHandle: apikeysHandler.apikeyAuthentication,
        headers: apikeysHandler.validateApikey,
        detail: {
          tags: ["user authentication"],
        },
      },
      (apikey) =>
        apikey
          .post("/login", userHandler.loginUser, {
            body: userHandler.userValidate,
          })
          .post("/register", userHandler.createUser, {
            body: userHandler.userValidate,
          })
          .get(
            "/product",
            ({ query }) =>
              itemsHandler.getItems(
                query.page,
                query.limit,
                query.category_id,
                query.search
              ),
            {
              query: t.Object({
                page: t.Number({ minimum: 1 }),
                limit: t.Number(),
                category_id: t.Optional(t.String()),
                search: t.Optional(t.String()),
              }),
            }
          )
          .get("/category", ({}) => itemsHandler.findCategory())
          .post("/purchase", ({ body }) => itemsHandler.purchaseItem(body))
    )
    .guard(
      {
        detail: { tags: ["user"] },
        headers: authenticationHandler.validateAuthentication,
      },
      (user) =>
        user
          .resolve(authenticationHandler.AuthenticationToken)
          .get("/information", ({ user_details }) => {
            return { ...user_details };
          })
    )
    .group("/upload", uploadRouter)
    .group("/items", itemsRouter);

  return api;
};

export default apiRootRoutes;
