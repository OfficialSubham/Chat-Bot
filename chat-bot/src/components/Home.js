import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Message from "./Message";

const Home = () => {
  const host = "http://localhost:5000";
  const [userMessage, setUserMessage] = useState("");
  const [message, setMessage] = useState([]);
  const navigate = useNavigate()
  const onChange = (e) => {
    setUserMessage(e.target.value);
  };

  const getAllChats = async () => {
    const chatPromise = await fetch(`${host}/getallchats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      }
    })
    const chat = await chatPromise.json()
    console.log(chat);
    setMessage(chat)
  }

  useEffect(() => {
    if(!localStorage.getItem("token")) {
      return navigate("/login")
    }
    else{
      getAllChats()
    }
  }, []);


  const handlePrompt = async () => {
    try {
      
      const sendData = await fetch(
        `${host}/gemini?message=${encodeURIComponent(userMessage)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            apikey: localStorage.getItem("apikey")
          }
        }
      );
      setUserMessage("")
      const responseMessage = await sendData.json()
   
      console.log(responseMessage);

    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <div className="flex w-full h-screen pt-14 justify-center items-center flex-col overflow-y-auto">
      {message[0] && <Message message={message}/>}

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
