import axios from "axios";
import Router from "next/router";
import { parseCookies } from "nookies";
import { logout } from "./auth";
import { destroyCookie } from "nookies";

const { "nextauth.token": token } = parseCookies();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    
    destroyCookie(undefined, "nextauth.token");
    Router.push("/");

    return Promise.reject(error);
  }
);

export default api;
