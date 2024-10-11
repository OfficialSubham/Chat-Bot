import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const host = "http://localhost:5000";
  const [userMessage, setUserMessage] = useState("");
  const navigate = useNavigate()
  const onChange = (e) => {
    setUserMessage(e.target.value);
  };

  useEffect(() => {
    if(!localStorage.getItem("token")) {
      navigate("/login")
    }
  },);


  const handlePrompt = async () => {
    try {
      const sendData = await fetch(
        `${host}/gemini?message=${encodeURIComponent(userMessage)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: JSON.stringify(localStorage.getItem("token")),
            // "apikey": JSON.stringify(localStorage.getItem("apikey"))
            apikey: process.env.apikey,
          },
        }
      );

      const message = await sendData.json()
      console.log(message);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-screen pt-14 justify-center items-center flex-col overflow-y-auto">
      <div className="rounded-xl h- w-1/2 overflow-y-auto mb-24 hide-scrollbar">
        <div className="flex mb-3">
          <div className="bg-gray-200 text-gray-900 p-3 rounded-lg rounded-bl-none max-w-xs">
            Hey, how's everything going?
          </div>
        </div>

        <div className="flex justify-end mb-3">
          <div className="bg-green-200 text-gray-900 p-3 rounded-lg rounded-br-none max-w-xs">
            All good! Just working on a project.
          </div>
        </div>

        <div className="flex mb-3">
          <div className="bg-gray-200 text-gray-900 p-3 rounded-lg rounded-bl-none max-w-xs">
            Hey, how's everything going?
          </div>
        </div>

        <div className="flex justify-end mb-3">
          <div className="bg-green-200 text-gray-900 p-3 rounded-lg rounded-br-none max-w-xs">
            All good! Just working on a project.
          </div>
        </div>

        <div className="flex mb-3">
          <div className="bg-gray-200 text-gray-900 p-3 rounded-lg rounded-bl-none max-w-xs">
            Hey, how's everything going?
          </div>
        </div>

        <div className="flex justify-end mb-3">
          <div className="bg-green-200 text-gray-900 p-3 rounded-lg rounded-br-none max-w-xs">
            All good! Just working on a project.
          </div>
        </div>

        <div className="flex mb-3">
          <div className="bg-gray-200 text-gray-900 p-3 rounded-lg rounded-bl-none max-w-xs">
            Hey, how's everything going?
          </div>
        </div>

        <div className="flex justify-end mb-3">
          <div className="bg-green-200 text-gray-900 p-3 rounded-lg rounded-br-none max-w-xs">
            All good! Just working on a project.
          </div>
        </div>

        <div className="flex mb-3">
          <div className="bg-gray-200 text-gray-900 p-3 rounded-lg rounded-bl-none max-w-xs">
            Hey, how's everything going?
          </div>
        </div>

        <div className="flex justify-end mb-3">
          <div className="bg-green-200 text-gray-900 p-3 rounded-lg rounded-br-none max-w-xs">
            All good! Just working on a project.
          </div>
        </div>

        <div className="flex mb-3">
          <div className="bg-gray-200 text-gray-900 p-3 rounded-lg rounded-bl-none max-w-xs">
            Nice! What are you working on?
          </div>
        </div>

        <div className="flex justify-end mb-3">
          <div className="bg-green-200 text-gray-900 p-3 rounded-lg rounded-br-none max-w-xs">
            A chatbot backend using Node.js and Express.
          </div>
        </div>
      </div>

      <div className="w-1/2 fixed bottom-4 flex justify-center">
        <input
          type="text"
          className="border border-sky-500 rounded-xl w-full h-16 p-2 mr-2"
          value={userMessage}
          onChange={onChange}
        />
        <button onClick={handlePrompt}>
          <svg
            className="h-8 w-8 text-sky-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <line x1="10" y1="14" x2="21" y2="3" />{" "}
            <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
