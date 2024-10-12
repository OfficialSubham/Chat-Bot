import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertError from "./AlertError.js";

const Signup = () => {
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [hideAlert, setHideAlert] = useState("hidden");

  const [errors, setErrors] = useState([]);

  const onChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleNewUser = async () => {
    const sendData = await fetch(`${host}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newUser }),
    });
    if (sendData.ok === true) {
      const response = await sendData.json();
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "apikey",
          "AIzaSyDmKjLFvuB_rL_pLkGPiOreGS7jRXK7y2M"
        );
        navigate("/");
      } else {
        setErrors(response.errors);
        setHideAlert("");
      }
    }
  };

  const handleError = (wrongText) => {
    return errors.some((error) => {
      return error.path === wrongText;
    });
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
              Name
            </label>
            <input
              type="text"
              className="border rounded-md p-1 border-gray-400"
              name="name"
              onChange={onChange}
              value={newUser.name}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold">
              username
            </label>
            <input
              type="text"
              className={`border rounded-md p-1 ${
                handleError("username") ? "border-red-500" : "border-gray-400"
              }`}
              name="username"
              onChange={onChange}
              value={newUser.username}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              className={`border rounded-md p-1 ${
                handleError("email") ? "border-red-500" : "border-gray-400"
              }`}
              name="email"
              onChange={onChange}
              value={newUser.email}
            />
          </div>

          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              className={`border rounded-md p-1 ${
                handleError("password") ? "border-red-500" : "border-gray-400"
              }`}
              name="password"
              onChange={onChange}
              value={newUser.password}
            />
          </div>
          <div className="flex w-full justify-center">
            <button
              className="bg-cyan-400 rounded-lg p-1 px-3"
              onClick={handleNewUser}
            >
              Submit
            </button>
          </div>
        </div>
        <Link className="mt-3 text-cyan-500 hover:underline" to="/login">
          Login to existing account!
        </Link>
      </div>
    </>
  );
};

export default Signup;
