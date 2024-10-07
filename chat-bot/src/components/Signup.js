import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value})
  };

  const handleNewUser = () => {
    console.log(newUser);
  }

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center flex-col">
        <div className="rounded-lg box-border border border-solid border-black p-4">
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              className="border rounded-md p-1"
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
              className="border rounded-md p-1"
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
              className="border rounded-md p-1"
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
              className="border rounded-md p-1"
              name="password"
              onChange={onChange}
              value={newUser.password}
            />
          </div>
          <div className="flex w-full justify-center">
            <button className="bg-cyan-400 rounded-lg p-1 px-3" onClick={handleNewUser}>Submit</button>
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
