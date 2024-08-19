"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      draggable={true}
      pauseOnHover={true}
      theme="light"
    />
  );
};
