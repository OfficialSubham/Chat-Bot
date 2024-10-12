import React from "react";

const AiMessage = (props) => {
  return (
    <div className="flex mb-3">
      <div className="bg-gray-200 text-gray-900 p-3 rounded-t-3xl max-w-4xl rounded-br-3xl">
        {props.aimessage}
      </div>
    </div>
  );
};

export default AiMessage;
