import { createContext, useEffect, useState } from "react";
import { signInRequest } from "../services/auth";
import { parseCookies, setCookie } from "nookies";
import Router from "next/router";
import api from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
        api.get('/api/user')
        .then(res => {
            setUser(res.data)
        })
    }
  }, []);

  async function signIn({ email, password }) {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, "nextauth.token", token, {
      path: "/",
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setUser(user);

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    Router.push("/app/dashboard");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
