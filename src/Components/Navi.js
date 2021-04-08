import React, { Component } from "react";
import Categories from "./Categories";
import Avatar from "./avatar.png";
import "./Navi.css";

export default class Navi extends Component {
  method = () => {
    return JSON.parse(localStorage.getItem("personal"));
  };

  render() {
    return (
      <div className="Navi">
        <div className="Navi-top">
          <img src={Avatar} alt="avatar" className="avatar" />
          <h1 className="userInfo">{this.method()}</h1>
        </div>
        <Categories
          categories={this.props.categories}
          categoryOnChange={this.props.categoryOnChange}
        />

        <div className="Navi-buttons">
          <input
            value={this.props.input}
            onChange={this.props.change}
            className="newCategoryInput"
            placeholder="Add Category"
          ></input>
          <button onClick={this.props.add} className="newCatButton">
            Add New Category
          </button>
          <button onClick={this.props.addCart} className="cardButton">
            New Card
          </button>
        </div>
      </div>
    );
  }
}
