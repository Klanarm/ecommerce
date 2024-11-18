import axios from "axios";

export const apiFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REQUEST_URI,
});

apiFetch.interceptors.request.use(
  (request) => {
    request.headers["Accept-Language"] = "TH";
    request.headers["Content-Type"] = "multipart/form-data";
    request.headers["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.data?.res_code == "0401") return undefined;
    return error?.response?.data;
  }
);

export async function uploadImage(file) {
  try {
    let data = new FormData();
    data.append("upload", file);
    const res = await apiFetch
      .post("/upload", data)
      .then((res) => res.data)
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
}
