import { rejects } from "assert";
import http from "axios";

const login = (data: any) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (data.accountNumber === "00000000") {
        resolve(data);
      } else {
        reject("Invalid account number.");
      }
    }, 3000)
  );
  // return http.post("/login", data).then((res) => {
  //   localStorage.setItem("api_token", res.data.token);

  //   return res.data;
  // });
};

const register = (data: any) => {
  return http.post("/register", data).then((res) => {
    return res.data;
  });
};

const logout = () => {
  return http.get("/logout").then((res) => {
    localStorage.removeItem("api_token");

    return res.data;
  });
};

const current = () => {
  return http.get("/user").then((res) => {
    return res.data;
  });
};

export const authService = {
  login,
  logout,
  register,
  current,
};
