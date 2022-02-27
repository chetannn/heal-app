import axios from "axios";
import api from "./api";
import { destroyCookie } from "nookies";

//TODO: it is just for demo purpose... (will be removed in future)
const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest({ email, password }) {
  let response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
    { email, password }
  );
  return response.data;
}

//TODO: it is just for demo purpose... (will be removed in future)
export async function recoverUserInformation() {
  await delay();

  return {
    user: {
      name: "Chetan Kharel",
      email: "chetankharel7@gmail.com",
      avatar_url: "",
    },
  };
}

export async function logout() {
  try {
    let response = await api.post(`/api/logout`);
    destroyCookie(undefined, "nextauth.token");
    return response.data;
  } catch (e) {
    throw e;
  }
}
