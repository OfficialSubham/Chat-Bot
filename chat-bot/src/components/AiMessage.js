import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const AiMessage = (props) => {
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    const formattedMessage = formatMessage(props.aimessage || "");
    const safeHTML = DOMPurify.sanitize(formattedMessage);
    setMessage(JSON.parse(safeHTML));
  }, [props.aimessage]);

  return (
    <div className="flex mb-3 ai-message">
      <div
        className="bg-gray-200 text-gray-900 p-3 rounded-t-3xl max-w-4xl rounded-br-3xl ai-message"
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

export default AiMessage;
