import axios from "axios";
import { getCookies, deleteCookie, setCookie } from "cookies-next";

export const apiFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REQUEST_URI,
});

apiFetch.interceptors.request.use(
  (request) => {
    request.headers["Accept-Language"] = "TH";
    request.headers["Content-Type"] = "application/json";
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

export async function login(form: { email: string; password: string }) {
  try {
    const res = await apiFetch
      .post("/login", form)
      .then((res) => res.data)
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function findProducts(
  page: number,
  limit: number,
  category_id: string,
  search: string
) {
  try {
    const res = await apiFetch
      .get(
        `/product?page=${page}&limit=${limit}&category_id=${category_id}&search=${search}`
      )
      .then((res) => res.data)
      .catch((err) => err);
    console.log({ res });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function findAllCategory() {
  try {
    const res = await apiFetch
      .get("/category")
      .then((res) => res.data)
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function postPurchase(form) {
  try {
    const res = await apiFetch
      .post("/purchase", form)
      .then((res) => res.data)
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
}
