import axios from "axios";

export const apiFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REQUEST_URI,
});

apiFetch.interceptors.request.use(
  (request) => {
    const storedAuth = localStorage.getItem("auth");

    request.headers["Accept-Language"] = "TH";
    request.headers["Content-Type"] = "multipart/form-data";
    request.headers["Authorization"] = "Bearer " + JSON.parse(storedAuth).token;
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

export async function getCategory() {
  try {
    const res = await apiFetch
      .get("/items/category")
      .then((res) => res.data)
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function addItem(formData) {
  try {
    const res = await apiFetch
      .post("/items", formData)
      .then((res) => res.data)
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
}
