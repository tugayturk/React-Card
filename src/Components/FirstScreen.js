import React, { Component } from "react";
import "./FirstScreen.css";

export default class FirstScreen extends Component {
  state = {
    personalDetails: "",
  };
  getNames = (e) => {
    localStorage.setItem(
      "personal",
      JSON.stringify(e.target.value.toUpperCase())
    );
    this.setState({
      personalDetails: e.target.value,
    });
  };
  login = () => {
    this.props.history.push("/cartpage");
  };
  render() {
    return (
      <div className="wrapper">
        <h1>Please Enter Your Personal Details</h1>
        <div className="form">
          <input
            onChange={this.getNames}
            className="enterInput"
            type="text"
            placeholder="Enter Your Name and Surname"
          ></input>
          <button className="submitButton" onClick={this.login}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}
