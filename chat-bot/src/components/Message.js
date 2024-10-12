import React, { useEffect, useRef } from "react";
import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";

const Message = (props) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  return (
    <div
      className="h- w-1/2 overflow-y-auto mb-24 hide-scrollbar"
      ref={scrollRef}
      key={props.message[0].user}
    >
      {props.message.map((message) => {
        return (
          <React.Fragment key={message._id}>
            <UserMessage usermessage={message["User-Message"]} />
            <AiMessage aimessage={message["AI-Message"]} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Message;
