import React, { useEffect, useState } from "react";

const AiMessage = (props) => {
  const [message, setMessage] = useState("");

  // Utility function to detect HTML or plain text with newlines
  const formatMessage = (messages) => {
    // Check if the message contains valid HTML
    const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;

    if (htmlTagRegex.test(messages)) {
      // If message contains HTML, return as-is
      return messages;
    } else {
      // If it's plain text, replace \n with <br> for proper line breaks
      return (
        messages
          .replace(/\n/g, "<br />")
          // Replace code blocks: ``` --> <code></code>
          .replace(/```(.*?)```/gs, "<code>$1</code>")

          // Replace bold **text** with <h2>text</h2>
          .replace(/\*\*(.*?)\*\*/g, "<h2>$1</h2>")

          // Replace italic *text* with <h5>text</h5>
          .replace(/\*(.*?)\*/g, "<h5>$1</h5>")
      );
    }
  };

  useEffect(() => {
    const formatedMessage = formatMessage(props.aimessage);
    setMessage(formatedMessage);
  }, []);

  return (
    <div className="flex mb-3 ai-message">
      <div
        className="bg-gray-200 text-gray-900 p-3 rounded-t-3xl max-w-4xl rounded-br-3xl ai-message"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

export default AiMessage;
