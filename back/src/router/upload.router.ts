import { NotFoundError, t } from "elysia";
import { apikeysHandler } from "../handlers/apikey.handle";
import { uploadHandler } from "../handlers/upload.handle";
import { loginError } from "../exceptions/loginError";

const uploadRouter = (upload) => {
  upload.guard(
    {
      beforeHandle: apikeysHandler.apikeyAuthentication,
      headers: apikeysHandler.validateApikey,
      detail: {
        tags: ["upload"],
      },
    },
    (root) =>
      root
        .post("/", uploadHandler.uploadFile, {
          body: t.Object({
            upload: t.File(),
          }),
        })
        .get("/:file", async ({ params }) => {
          if (await Bun.file(`public/${params.file}`).exists()) {
            return Bun.file(`public/${params.file}`);
          } else {
            throw new NotFoundError("");
          }
        })
  );
  return upload;
};

export default uploadRouter;
