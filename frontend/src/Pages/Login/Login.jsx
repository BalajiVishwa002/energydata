import React, { useState } from "react";
import "./Login.css";
import TextBox from "../../Components/TextBox/TextBox";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "../../ApiCal";
import { baseurl, URLS } from "../../Utils";
import axios from "axios";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    username: "",
    password: "",
  });
  const [error, seterror] = useState({});
  const [loading, setloading] = useState(false);

  const handleChages = (e) =>
    setuser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const errors = {};
    if (!user.username) errors.username = "Username cann't be empty !!!";
    if (!user.password) errors.password = "Password can't be empty !!!";
    return errors;
  };

  const handleSubmit = async () => {
    try {
      setloading(true)
      const result = validate();
      if (Object.keys(result).length > 0) {
        seterror(result);
      } else {
        seterror({});
        const response = await axios.post(baseurl + URLS.login, {
          username: user.username,
          password: user.password,
        });
        if (response.status == 200) {
          localStorage.setItem("token", response.data?.access);
          localStorage.setItem("refresh", response.data?.refresh);
          navigate("/admin/dashboard");
        }
      }
    } catch (err) {
      toast.warn(err.message);
    }
    finally{
      setloading(false)
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <div className="login-content">
          <TextBox
            type={"text"}
            name={"username"}
            icon={FaUser}
            label={""}
            value={user.username}
            required={true}
            onChange={handleChages}
            placeholder={"Enter username"}
            error={error?.username}
          />
          <TextBox
            type={"password"}
            name={"password"}
            icon={FaLock}
            label={""}
            value={user.password}
            required={true}
            onChange={handleChages}
            placeholder={"Enter password"}
            error={error?.password}
          />
        </div>
        <div className="group-btn">
          {loading ? (
            <Bars color="blue" />
          ) : (
            <>
              <button className="submit-btn" onClick={() => handleSubmit()}>
                Submit
              </button>
              <Link to={"/register"}>
                <button className="submit-btn">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
