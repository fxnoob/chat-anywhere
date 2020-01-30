import React from "react";
import { secondsToString } from "../../services/dateService";
export default props => {
  let html;
  const { profilePicUrl, userName, text, timestamp, userType } = props;
  if (userType == "me") {
    html = (
      <div className="rcw-message">
        <img src={profilePicUrl} className="rcw-avatar" alt="profile" />
        <div className="rcw-response">
          <div className="rcw-message-text">
            <p>{text}</p>
            <p style={{ fontSize: "smaller" }}>{userName}</p>
            <p style={{ fontSize: "smaller", color: "#483d8b8a" }}>
              {secondsToString(timestamp)}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    html = (
      <div className="rcw-message">
        <img src={profilePicUrl} className="rcw-avatar" alt="profile" />
        <div className="rcw-response">
          <div className="rcw-message-text">
            <p>{text}</p>
            <p style={{ fontSize: "smaller" }}>{userName}</p>
            <p style={{ fontSize: "smaller", color: "#483d8b8a" }}>
              {secondsToString(timestamp)}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return html;
};
