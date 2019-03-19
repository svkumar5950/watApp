import React from "react";
import PropTypes from "prop-types";

export default function MessageList(props) {
  return (
    <div className="messageContainer">
      <p className="senderId">{props.sender}</p>
      <p className="incomingText">{props.message}</p>
    </div>
  );
}
MessageList.propTypes = {
  sender: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};
