import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaPowerOff, FaUpload } from "react-icons/fa";
import logo from "../../assets/images/logo.png";


const Navbar = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/")
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-items">
        <Link to={"dashboard"} className="active">
          <li>
            {" "}
            <FaHome /> Dashboard
          </li>
        </Link>
        <Link to={"upload"}>
          <li>
            <FaUpload /> Upload CSV
          </li>
        </Link>
        <li onClick={()=>logout()}>
          <FaPowerOff /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
