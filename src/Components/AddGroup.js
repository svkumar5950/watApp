import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AddGroup extends Component {
  state = {
    roomName: ""
  };
  handleChange = e => {
    this.setState({
      roomName: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addGroup(this.state.roomName);
    this.setState({ roomName: "" });
  };
  render() {
    return (
      <div className="addGroupArea">
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            placeholder="Create Group"
            value={this.state.roomName}
            onChange={this.handleChange}
          />
          <button>+</button>
        </form>
      </div>
    );
  }
}
AddGroup.propTypes = {
  addGroup: PropTypes.func.isRequired
};
