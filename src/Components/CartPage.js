import React, { Component } from "react";
import Cart from "./Cart";
import Navi from "./Navi";
import "./CartPage.css";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import { Container } from "reactstrap";

export default class CartPage extends Component {
  state = {
    cartList: [
      {
        id: 1,
        isSaved: false,
      },
    ],
    categories: [
      {
        id: 1,
        content: "Work",
      },
      {
        id: 2,
        content: "School",
      },
      {
        id: 3,
        content: "Business",
      },
      {
        id: 4,
        content: "Everything",
      },
    ],
    input: "",

    selectedCategoryIds: [],
  };

  addCart = () => {
    const cartList = this.state.cartList;
    const cart = {
      id: Math.floor(Math.random() * 1000),
      isSaved: false,
    };
    this.setState({
      cartList: [...cartList, cart],
    });
  };
  removeCart = (id) => {
    let newCards = this.state.cartList.filter((cart) => {
      return cart.id !== id;
    });

    this.setState({ cartList: newCards });
  };

  addCategory = () => {
    const { categories, input } = this.state;
    if (input !== "") {
      const userInput = {
        id: categories[categories.length - 1].id + 1,
        content: input,
      };
      this.setState(
        {
          categories: [...this.state.categories, userInput],
        },
        () => {
          this.setState({
            input: "",
          });
        }
      );
    }
  };

  inputHandler = (e) => {
    const newVal = e.target.value;
    this.setState({
      input: newVal,
    });
  };

  savedCard = (cart) => {
    const newCartList = [];
    const { cartList } = this.state;
    cartList.forEach((element) => {
      if (element.id === cart.id) {
        newCartList.push({
          ...element,
          title: cart.title,
          categoryId: cart.categoryId,
          isSaved: cart.isSaved,
          categoryName: cart.categoryName,
        });
      } else {
        newCartList.push(element);
      }
    });
    this.setState({
      cartList: newCartList,
    });
  };
  categoryOnChange = (categoryId, isChecked) => {
    const { selectedCategoryIds } = this.state;
    if (isChecked) {
      selectedCategoryIds.push(parseInt(categoryId));
    } else {
      const index = selectedCategoryIds.indexOf(parseInt(categoryId));
      if (index > -1) {
        selectedCategoryIds.splice(index, 1);
      }
    }
    this.setState({
      selectedCategoryIds: selectedCategoryIds,
    });
  };
  getCartList = () => {
    const { selectedCategoryIds, cartList } = this.state;

    if (selectedCategoryIds.length === 0) {
      return cartList;
    } else {
      return cartList.filter((cart) =>
        selectedCategoryIds.includes(cart.categoryId)
      );
    }
  };

  render() {
    return (
      <div className="cartPage">
        <Navi
          addCart={this.addCart}
          categories={this.state.categories}
          add={this.addCategory}
          change={this.inputHandler}
          input={this.state.input}
          categoryOnChange={this.categoryOnChange}
        />

        <div className="carts">
          <Container fluid={true}>
            <Row>
              <Col xs="12">
                <Row>
                  {this.getCartList().map((cart) => {
                    return (
                      <Col md="6" lg="4" style={{ marginBottom: "2%" }}>
                        <Cart
                          saveCard={this.savedCard}
                          removeCart={() => this.removeCart(cart.id)}
                          key={cart.id}
                          {...cart}
                          categories={this.state.categories}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
