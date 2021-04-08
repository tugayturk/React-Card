import React, { Component } from "react";

export default class Category extends Component {
  state = {
    isChecked: false,
  };
  onChange = (e) => {
    const categoryId = e.target.value;
    this.setState({
      isChecked: !this.state.isChecked,
    });
    if (this.props.onChange) {
      this.props.onChange(categoryId, !this.state.isChecked);
    }
  };

  render() {
    return (
      <div className="categoryInputDiv">
        <input
          type="checkbox"
          className="catgoryCheck"
          onChange={this.onChange}
          isChecked={this.state.isChecked}
          value={this.props.id}
        />
        <label className="categoryLabel">{this.props.content} </label>
      </div>
    );
  }
}
