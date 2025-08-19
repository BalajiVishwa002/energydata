import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protector = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to={"/"} />;
};

export default Protector;
