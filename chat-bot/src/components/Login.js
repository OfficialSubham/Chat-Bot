import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertError from "./AlertError";

const Login = () => {
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const [hideAlert, setHideAlert] = useState("hidden");

  const [errors, setErrors] = useState([]);

  const [existingUser, setExistingUser] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setExistingUser({ ...existingUser, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const sendData = await fetch(`${host}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...existingUser }),
    });
    if (sendData.ok === true) {
      const response = await sendData.json();
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("apikey", "AIzaSyDmKjLFvuB_rL_pLkGPiOreGS7jRXK7y2M")
        navigate("/");
      } else {
        setErrors(response.errors);
        setHideAlert("");
      }
    }
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center flex-col">
        <AlertError
          hideAlert={hideAlert}
          setHideAlert={setHideAlert}
          errors={errors}
        />
        <div className="rounded-lg box-border border border-solid border-black p-4">
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold">
              username
            </label>
            <input
              type="text"
              className="border rounded-md p-1"
              name="username"
              value={existingUser.username}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              className="border rounded-md p-1"
              name="password"
              value={existingUser.password}
              onChange={onChange}
            />
          </div>
          <div className="flex w-full justify-center">
            <button
              className={`bg-cyan-400 rounded-lg p-1 px-3`}
              disabled={
                existingUser.username.length < 1 ||
                existingUser.password.length < 1
              }
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>
        </div>
        <Link className="mt-3 text-cyan-500 hover:underline" to="/signup">
          Create a new account!
        </Link>
      </div>
    </>
  );
};

export default Login;
