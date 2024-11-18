import * as dotenv from "dotenv";
dotenv.config();

import { Elysia, NotFoundError, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors, HTTPMethod } from "@elysiajs/cors";
import serverTimingConfig from "./library/serverTiming";
import { AuthenticationError } from "./exceptions/AuthenticationError";
import { AuthorizationError } from "./exceptions/AuthorizationError";
import { InvariantError } from "./exceptions/InvariantError";
import { RateLimitError } from "./exceptions/RateLimitError";
import { handleErrors } from "./handlers/error.handle";
import { loggingRequest } from "./library/elysiaLogging";
import { swaggerConfig } from "./library/swagger";
import ratelimitConfig from "./library/rateLimit";
import jwt from "@elysiajs/jwt";
import bearer from "@elysiajs/bearer";
import { responseFormat } from "./library/response.format";
import apiRootRoutes from "./router/api.root.router";
import { logStartupInfo } from "./library/logStartupInfo";
import { initDB } from "./database/sequelize.config";
import { loginError } from "./exceptions/loginError";
import { DuplicateUserError } from "./exceptions/DuplicateUserError";
import { staticPlugin } from "@elysiajs/static";

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: JSON.parse(process.env.CORS_METHODS as string) as HTTPMethod[],
  allowedHeaders: process.env.CORS_HEADERS,
  credentials: process.env.CORS_CREDENTIALS === "true",
};

const app = new Elysia()
  .onStart(({ server }) => {
    logStartupInfo(server.port);
    initDB();
  })
  .use(swagger(swaggerConfig))
  // .use(ratelimitConfig)
  .use(cors(corsOptions))
  .use(serverTimingConfig)
  .use(staticPlugin())
  .error("DUPLICATE_USER", DuplicateUserError)
  .error("AUTHENTICATION_ERROR", AuthenticationError)
  .error("AUTHORIZATION_ERROR", AuthorizationError)
  .error("INVARIANT_ERROR", InvariantError)
  .error("TOO_MANY_REQUEST", RateLimitError)
  .error("LOGIN_ERROR", loginError)
  .error("NOT_FOUND", NotFoundError)
  .onError((params) => handleErrors(params))
  .onRequest(({ request }) => {
    const url = new URL(request.url);
    loggingRequest.logDetails(
      request.method,
      url.pathname,
      "   ",
      false,
      undefined
    );
  })

  .onAfterResponse(async ({ set, request, path }) => {
    const serverTiming = parseFloat(
      set.headers["Server-Timing"].match(/dur=(\d+(\.\d+)?)/)[1]
    );
    await loggingRequest.logDetails(
      request.method,
      path,
      set.status,
      true,
      serverTiming.toFixed(2)
    );
  })
  .onAfterHandle(async ({ request, response }) => {
    return ((response as Response)?.type &&
      (response as Response)?.type !== "default") ||
      (response as Response)?.headers?.get("Content-type") ==
        "text/html; charset=utf8"
      ? response
      : responseFormat(request.method, response);
  })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET_KEY,
    })
  )
  .use(bearer());

app.group(process.env.APP_PREFIX || "/api/v1", apiRootRoutes);
app.group("/webhooks", (webhooks) =>
  webhooks.post("/", ({ body }) => "hi", {
    body: t.Object({ name: t.String() }),
    detail: { tags: ["webhooks"] },
  })
);

app.listen(process.env.APP_PORT);
