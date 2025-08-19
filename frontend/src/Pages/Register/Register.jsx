import React, { useState } from "react";
import TextBox from "../../Components/TextBox/TextBox";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "../../ApiCal";
import { toast } from "react-toastify";
import { URLS } from "../../Utils";
import { Bars } from "react-loader-spinner";

const Register = () => {
  const navigate = useNavigate();
  const [register, setregister] = useState({
    username: "",
    password: "",
    repassword: "",
  });

  const [error, seterror] = useState({});
  const [loading, setloading] = useState(false);

  const handleChanges = (e) =>
    setregister((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  function validate() {
    const errors = {};
    if (!register.username) errors.username = "Username cann't be empty !!!";
    if (!register.password) errors.password = "Password can't be empty !!!";
    if (!register.repassword)
      errors.repassword = "Re password can't be empty !!!";
    if (register.repassword != register.password)
      errors.repassword = "Password dosen't match";
    return errors;
  }

  const handleSubmit = async () => {
    try {
      setloading(true);
      const result = validate();
      if (Object.keys(result).length > 0) {
        seterror(result);
      } else {
        seterror({});
        const response = await API.post(URLS.register, register);
        if (response.status == 200) {
          toast.success(response.data.msg);
          navigate("/");
        }
      }
    } catch (err) {
      toast.warn(err.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Register</h2>

        <div className="login-content">
          <TextBox
            type={"text"}
            name={"username"}
            icon={FaUser}
            label={""}
            value={register.username}
            required={true}
            onChange={handleChanges}
            placeholder={"Enter username"}
            error={error?.username}
          />
          <TextBox
            type={"password"}
            name={"password"}
            icon={FaLock}
            label={""}
            value={register.password}
            required={true}
            onChange={handleChanges}
            placeholder={"Enter password"}
            error={error?.password}
          />
          <TextBox
            type={"password"}
            name={"repassword"}
            icon={FaLock}
            label={""}
            value={register.repassword}
            required={true}
            onChange={handleChanges}
            placeholder={"Re-password"}
            error={error?.repassword}
          />
        </div>
        <div className="group-btn">
          {loading ? (
            <Bars color="blue"/>
          ) : (
            <>
              <button className="submit-btn" onClick={() => handleSubmit()}>
                Submit
              </button>
              <Link to={"/"}>
                <button className="submit-btn">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
