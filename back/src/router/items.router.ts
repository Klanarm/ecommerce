import { NotFoundError, t } from "elysia";
import { apikeysHandler } from "../handlers/apikey.handle";
import { uploadHandler } from "../handlers/upload.handle";
import { loginError } from "../exceptions/loginError";
import { authenticationHandler } from "../handlers/authentication.handle";
import { itemsHandler } from "../handlers/items.handle";

const itemsRouter = (items) => {
  items.guard(
    {
      headers: authenticationHandler.validateAuthentication,
      detail: {
        tags: ["items"],
      },
    },
    (root) =>
      root
        .resolve(authenticationHandler.AuthenticationToken)
        .get("/category", () => itemsHandler.findCategory())
        .post("/", (body) => itemsHandler.addItem(body))
  );
  return items;
};

export default itemsRouter;
