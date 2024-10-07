import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center flex-col">
        <div className="rounded-lg box-border border border-solid border-black p-4">
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold">
              username
            </label>
            <input
              type="text"
              className="border rounded-md p-1"
              name="username"
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
            />
          </div>
          <div className="flex w-full justify-center">
            <button className="bg-cyan-400 rounded-lg p-1 px-3">Submit</button>
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
