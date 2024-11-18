import moment from "moment";
import colors from "colors";
import { HTTPMethod } from "elysia";

export const loggingRequest = {
  logDetails: async (
    method: HTTPMethod,
    path: string,
    status: string | number,
    isResponse: boolean,
    duration: string | undefined
  ) => {
    let direction = colors.yellow("<--");
    let colorsStatus =
      +status == 200
        ? colors.green(status.toString())
        : status
        ? colors.red(status.toString())
        : colors.red("500");
    if (isResponse) {
      direction = +status == 200 ? colors.green("-->") : colors.red("-->");
    }
    console.log(
      `${direction} ${colors.bold(method)} ${path} ${colorsStatus} ${
        duration ? `${colors.bold(duration)} ms` : ""
      } `
    );
  },
};
