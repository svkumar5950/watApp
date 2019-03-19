import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormText extends Component {
  state = {
    message: ""
  };
  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({ message: "" });
  };
  render() {
    return (
      <form className="formArea" onSubmit={this.handleSubmit}>
        <input
          type="search"
          disabled={this.props.disabled}
          placeholder="Type your message and hit Enter ! "
          value={this.state.message}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
FormText.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};
