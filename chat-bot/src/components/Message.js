import React, { useEffect, useRef } from "react";
import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";


const Message = (props) => {
  useEffect(() => {
    props.scrollRef.current.scrollTop = props.scrollRef.current.scrollHeight;
  }, [props.message]);

  return (
    <div
      className="h- w-1/2 overflow-y-auto mb-24 hide-scrollbar js-convo-div"
      ref={props.scrollRef}
      key={props.message[0].user}
    >
      {props.message &&
        props.message.map((message) => {
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
