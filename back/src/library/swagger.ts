import type { ElysiaSwaggerConfig } from "@elysiajs/swagger/dist/types";

export const swaggerConfig: ElysiaSwaggerConfig = {
  provider: "scalar",
  documentation: {
    components: {
      securitySchemes: {
        "x-api-key": {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "Key used to log into the soundcloud API.",
        },
        // Authorization: {
        //   type: "http",
        //   scheme: "bearer",
        // },
      },
    },
    info: {
      title: process.env.PROJECT_NAME,
      version: "1.0.0",
    },
  },
};
