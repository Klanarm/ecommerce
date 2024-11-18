import { HTTPMethod } from "elysia";

export async function responseFormat(method: HTTPMethod, message: any) {
  let format = {
    res_code: "0000",
    res_message: "REQUEST_REQUEST_SUCCESSFULLY",
    res_data: message || {},
  };
  switch (method) {
    case "GET":
      format.res_message = "GET_REQUEST_SUCCESSFULLY";
      break;
    case "POST":
      format.res_message = "POST_REQUEST_SUCCESSFULLY";
      break;
    case "DELETE":
      format.res_message = "DELETE_REQUEST_SUCCESSFULLY";
      break;
    case "PUT":
      format.res_message = "PUT_REQUEST_SUCCESSFULLY";
      break;
    case "PATCH":
      format.res_message = "PATCH_REQUEST_SUCCESSFULLY";
      break;
    default:
      format.res_message = "REQUEST_SUCCESSFULLY";
      break;
  }
  return format;
}
