import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import MessageList from "./MessageList";

export default class Message extends Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    if (!this.props.roomId) {
      return (
        <div className="messageEmpty">
          <div className="messageEntry">&larr; Click a group!</div>
        </div>
      );
    }
    return (
      <div className="messageArea">
        {this.props.messages.map(message => {
          return (
            <div key={message.id}>
              <MessageList sender={message.senderId} message={message.text} />
            </div>
          );
        })}
      </div>
    );
  }
}

// Defining the Prop-Types

Message.propTypes = {
  roomId: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired
};
