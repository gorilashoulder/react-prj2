import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [id, setID] = useState("");
  const [nickName, setNickName] = useState("");
  const [expired, setExpired] = useState(0);
  const [authority, setAuthority] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return;
    }
    login(token);
  }, []);
  //email
  //nickname
  //isLoggedIn
  function isLoggedIn() {
    return Date.now() < expired * 1000;
  }
  //권한 있는지 ? 확인
  function hasAccess(param) {
    return id == param;
  }

  function isAdmin() {
    return authority.includes("admin");
  }
  //login
  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setID(payload.sub);
    setNickName(payload.nickName);
    setAuthority(payload.scope.split(" "));
  }
  //logout
  function logout() {
    localStorage.removeItem("token");
    setExpired(0);
    setID("");
    setNickName("");
    setAuthority([]);
  }

  return (
    <LoginContext.Provider
      value={{
        id: id,
        nickName: nickName,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        hasAccess: hasAccess,
        isAdmin: isAdmin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
