import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers["x-access-token"] = token;

  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  // function (error) {
  //   if (error.response.status === 401) {
  //     localStorage.clear();
  //     toast.error(
  //       "You have been logged out. Login with your credentials to continue!"
  //     );
  //     window.location.href = "/";
  //     window.location.reload();
  //   }
  // }

  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // toast.error("User doesn't exist. Please sign in.");
        // localStorage.clear();
        // window.location.href = "/";
        // window.location.reload();
      }
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ToastContainer />
    <App />
  </BrowserRouter>
);
