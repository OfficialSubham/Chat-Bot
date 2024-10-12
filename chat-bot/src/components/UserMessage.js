import React from "react";

const UserMessage = (props) => {
  return (
    <div className="flex justify-end mb-3">
      <div className="bg-green-200 text-gray-900 p-3 rounded-lg rounded-br-none max-w-xs">
        {props.usermessage}
      </div>
    </div>
  );
};

export default UserMessage;
