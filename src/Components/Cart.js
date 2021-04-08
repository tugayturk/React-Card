import React, { Component } from "react";
import { Card, CardBody, Button } from "reactstrap";
import "./Cart.css";
import alertify from "alertifyjs";

export default class Cart extends Component {
  state = {
    todos: [],
    userInput: "",
    title: "",
    categoryId: this.props.categoryId ?? 1,
    categoryName: this.props.categoryName ?? "Work",
  };
  addItem = () => {
    const currentValue = this.state.userInput;

    if (this.state.userInput !== "") {
      const userInput = {
        id: Math.floor(Math.random() * 1000),
        content: currentValue,
      };

      this.setState(
        {
          todos: [...this.state.todos, userInput],
        },
        () => {
          this.setState({
            userInput: "",
          });
        }
      );

      alertify.success(this.state.userInput + " added");
    } else {
      alertify.error("Please Enter A Valid ToDo");
    }
  };

  onInputChange = (e) => {
    const newVal = e.target.value;
    this.setState({
      userInput: newVal,
    });
  };

  removeItem = (id) => {
    let newTodos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });

    this.setState({ todos: newTodos });
  };
  submitHandler = (e) => {
    const titleName = e.target.value;
    this.setState({
      title: titleName,
    });
  };
  onCategoryChange = (e) => {
    this.setState({
      categoryId: parseInt(e.target.value),
      categoryName: e.target.options[e.target.selectedIndex].text,
    });
  };

  render() {
    return this.props.isSaved ? (
      <Card className="savedCard" key={this.props.key}>
        <CardBody className="cardBody">
          <div>
            <h4 className="cardTitle">{this.state.title.toUpperCase()}</h4>
          </div>

          <ul>
            {this.state.todos.map((todo) => {
              return (
                <li key={todo.id} className="liTodo">
                  <input className="checkboxInput" type="checkbox" />
                  <label> {todo.content} </label>
                </li>
              );
            })}
          </ul>

          <p >
            <strong>Category: </strong>
            {this.state.categoryName}
          </p>

          <div className="middle">
            <button
              onClick={() => {
                this.props.saveCard({
                  id: this.props.id,
                  title: this.state.title,
                  categoryId: this.state.categoryId,
                  categoryName: this.state.categoryName,
                  isSaved: false,
                });
              }}
              className="editButton"
            >
              Edit
            </button>
          </div>
        </CardBody>
      </Card>
    ) : (
      <Card className="Card" key={this.props.key}>
        <CardBody className="cardBody">
          <Button
            onClick={() => this.props.removeCart(this.props.id)}
            className="deleteButton btn-danger"
          >
            X
          </Button>

          <div>
            <input
              type="text"
              onChange={this.submitHandler}
              className="titleInput"
              placeholder="Title"
              value={this.state.title}
            ></input>
          </div>

          <input
            onChange={this.onInputChange}
            type="text"
            placeholder="Text a ToDo"
            className="todoInput"
            value={this.state.userInput}
          ></input>

          <button
            onClick={this.addItem}
            className="addButton"
            style={{ color: "white" }}
          >
            +
          </button>

          <ul>
            {this.state.todos.map((todo) => {
              return (
                <li key={todo.id} className="liTodo">
                  <input className="checkboxInput" type="checkbox" />
                  <label> {todo.content} </label>
                  <button
                    onClick={() => this.removeItem(todo.id)}
                    className="removeTodo"
                  >
                    -
                  </button>
                </li>
              );
            })}
          </ul>

          <label className="label">
            Category:
            <select
              value={this.state.categoryId}
              onChange={this.onCategoryChange}
              className="selectBox"
            >
              {this.props.categories.map((category) => {
                return <option value={category.id}>{category.content}</option>;
              })}
            </select>
          </label>

          <Button
            onClick={() => {
              this.props.saveCard({
                id: this.props.id,
                title: this.state.title,
                categoryId: this.state.categoryId,
                categoryName: this.state.categoryName,
                isSaved: true,
              });
            }}
            color="dark"
            className="saveButton"
          >
            Save
          </Button>
        </CardBody>
      </Card>
    );
  }
}
