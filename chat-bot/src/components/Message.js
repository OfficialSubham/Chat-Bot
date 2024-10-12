import React from "react";
import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";

const Message = (props) => {
  return (
    <div className="rounded-xl h- w-1/2 overflow-y-auto mb-24 hide-scrollbar"  key={props.message[0].user}>
      {props.message.map((message) => {
        return (
          <React.Fragment key={message._id}>
            <UserMessage usermessage={message["User-Message"]}/>
            <AiMessage aimessage={message["AI-Message"]}/>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Message;
