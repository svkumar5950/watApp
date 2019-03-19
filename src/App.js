import React, { Component } from "react";
import ChatKit from "@pusher/chatkit";
import Group from "./Components/Group";
import Message from "./Components/Message";
import AddGroup from "./Components/AddGroup";
import FormText from "./Components/FormText";
import { instanceLocator, tokenURL } from "./config";
import "./App.css";

class App extends Component {
  state = {
    roomId: null,
    message: [],
    joinableRooms: [],
    joinedRooms: []
  };
  componentDidMount = () => {
    const chatManager = new ChatKit.ChatManager({
      instanceLocator,
      userId: "svkumar5950",
      tokenProvider: new ChatKit.TokenProvider({
        url: tokenURL
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRoom();
      })
      .catch(err => console.log("Error in Connecting", err));
  };
  getRoom = () => {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("Error on Joining Room", err));
  };
  subscribeToRoom = roomId => {
    this.setState({ message: [] });
    this.currentUser
      .subscribeToRoom({
        roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({ message: [...this.state.message, message] });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.getRoom();
      })
      .catch(err => console.log("Error on getting the Group", err));
  };

  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  };

  addGroup = name => {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log("Error on Adding a New Room", err));
  };

  render() {
    return (
      <div className="app">
        <Group
          room={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
        />
        <Message roomId={this.state.roomId} messages={this.state.message} />
        <AddGroup addGroup={this.addGroup} />
        <FormText
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}

export default App;
