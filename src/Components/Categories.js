import React, { Component } from "react";
import "./Categories.css";
import Category from "./Category";

export default class Categories extends Component {
  

  render() {
    return (
      <div className="categoriesDiv">
        {this.props.categories.map((category) => {
          return <Category 
          {...category}
          key={category.id}
          onChange={this.props.categoryOnChange}
          />
        })}
      </div>
    );
  }
}
