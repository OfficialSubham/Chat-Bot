import React, { useEffect, useRef } from "react";
import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DOMPurify from "dompurify";
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
          {props.messageLoading && (
        <SkeletonTheme baseColor="#000" highlightColor="#fff">
          <Skeleton count={9} />
        </SkeletonTheme>
      )}

      {props.message.map((message) => {
        // const sanitizedMessage = DOMPurify.sanitize(message["AI-Message"]);
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
