import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import Message from "./Message";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { createRoot } from "react-dom/client";

const Home = () => {
  const host = "http://localhost:5000";
  const scrollRef = useRef(null);
  const [userMessage, setUserMessage] = useState("");
  const [message, setMessage] = useState([]);
  const [messageLoading, setMessageLoading] = useState(true);
  const navigate = useNavigate();
  const onChange = (e) => {
    setUserMessage(e.target.value);
  };

  // Utility function to format the message
  const formatMessage = (messages) => {
    // Handle newlines (\n) and replace with <br />
    messages = messages.replace(/\n/g, "<br>");
    // Handle code blocks (```code```)
    messages = messages.replace(
      /```([\s\S]*?)```/g,
      "<pre><code>$1</code></pre>"
    );

    // Replace bold **text** with <strong>
    messages = messages.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Replace italic *text* with <em>
    messages = messages.replace(/\*(.*?)\*/g, "<em>$1</em>");

    return messages;
  };

  const getAllChats = async () => {
    const chatPromise = await fetch(`${host}/getallchats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const chat = await chatPromise.json();
    setMessage(chat);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    } else {
      getAllChats();
    }
  }, []);

  const handlePrompt = async () => {
    try {
      // Setting up the user message
      let userMessageHtml = document.createElement("div");
      userMessageHtml.classList.add("flex", "justify-end", "mb-3");

      // Create the inner message div
      let messageDiv = document.createElement("div");
      messageDiv.classList.add(
        "bg-green-200",
        "text-gray-900",
        "p-3",
        "rounded-lg",
        "rounded-br-none",
        "w-auto"
      );
      messageDiv.textContent = userMessage; // Assuming userMessage is a string

      // AI message skeleton setup
      let aiMessageHtml = document.createElement("div");
      aiMessageHtml.classList.add("flex", "mb-3", "max-w-4xl", "w-full");

      let aiMessageDiv = document.createElement("div");
      aiMessageDiv.classList.add(
        "bg-gray-200",
        "text-gray-900",
        "p-3",
        "rounded-t-3xl",
        "rounded-br-3xl",
        "max-w-4xl"
      );

      // // Use createRoot for rendering the Skeleton component
      aiMessageDiv.textContent = "Loading Data...";

      // Append the user and AI message elements
      userMessageHtml.appendChild(messageDiv);
      aiMessageHtml.appendChild(aiMessageDiv);

      // Append the messages to the conversation div
      let convoDiv = document.querySelector(".js-convo-div");
      convoDiv.appendChild(userMessageHtml);
      convoDiv.appendChild(aiMessageHtml);
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      // Clear user input
      let uMessage = document.querySelector(".js-user-message");
      uMessage.value = "";

      // Fetch the AI response
      const sendData = await fetch(
        `${host}/gemini?message=${encodeURIComponent(userMessage)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            apikey: localStorage.getItem("apikey"),
          },
        }
      );

      // Clear the user message state
      setUserMessage("");

      // Parse the AI response
      const responseMessage = await sendData.json();
      // responseMessage["AI-Message"] = JSON.parse(responseMessage["AI-Message"]);
      aiMessageDiv.innerHTML = formatMessage(JSON.parse(responseMessage["AI-Message"]));
      console.log(responseMessage, JSON.parse(responseMessage["AI-Message"]));
    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <div className="flex w-full h-screen pt-14 justify-center items-center flex-col overflow-y-auto">
      {message[0] && (
        <Message
          message={message}
          scrollRef={scrollRef}
          messageLoading={messageLoading}
        />
      )}

      <div className="w-1/2 fixed bottom-4 flex justify-center">
        <input
          type="text"
          className="js-user-message border border-sky-500 rounded-xl w-full h-16 p-2 mr-2"
          value={userMessage}
          onChange={onChange}
        />
        <button
          onClick={() => {
            handlePrompt();
          }}
        >
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
