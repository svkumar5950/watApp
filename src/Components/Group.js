import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Group extends Component {
  render() {
    const orderedRoom = this.props.room.sort((a, b) => a.id > b.id);
    return (
      <div className="groupArea">
        <h2>Groups</h2>
        <ul>
          {orderedRoom.map(room => {
            return (
              <li
                key={room.id}
                className={"groupName "}
                style={{ opacity: room.id === this.props.roomId ? "1" : "0.7" }}
              >
                <button onClick={() => this.props.subscribeToRoom(room.id)}>
                  # {room.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

Group.propTypes = {
  room: PropTypes.array.isRequired,
  roomId: PropTypes.object.isRequired,
  subscribeToRoom: PropTypes.func.isRequired
};
