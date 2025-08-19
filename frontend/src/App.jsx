import React from "react";
import { Bars } from "react-loader-spinner";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import RootLayout from "./Layout/RootLayout";
import Register from "./Pages/Register/Register";
import AdminLayout from "./Layout/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import Uploads from "./Pages/Admin/Uploads/Uploads";
import { ToastContainer } from "react-toastify";
import Protector from "./Components/Protector/Protector";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<Protector />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="upload" element={<Uploads />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
