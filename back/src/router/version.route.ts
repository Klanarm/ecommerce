import { t } from "elysia";
import { versionHandler } from "../handlers/version.handle";

const versionRouter = (api) => {
  api.get("", versionHandler.versionDetails, {
    detail: { tags: ["versions"] },
  });

  return api;
};

export default versionRouter;
