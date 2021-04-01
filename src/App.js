import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import { Button, Container } from 'react-bootstrap';
import { addToCart, enlargeCarQuantity, decreaseCarQuantity, removeCarFromCart } from './reducer.js'

const UserInterface = () => (
  <div>
    <Cart />
    <ShopContent />
  </div>
)

const Cart = () => {
  var isOpenCart = useSelector((state)=>(state.isOpenCart));
  var total_sum = useSelector((state)=>(state.total_sum));
  var cars = useSelector((state)=>(state.cars));
  var cart = useSelector((state)=>(state.cart));
  const dispatch = useDispatch();
  var renderAddedItem = (cart_item) => {
    return (
      <AddedCar cart_item={cart_item} key={cart_item.id} />
    );
  }
  var table_body = [];
  for (var i=0;i<cart.length;i++) {
    table_body = table_body.concat(renderAddedItem(cart[i]));
  }
  if (isOpenCart) {
    return (
      <div id="cart">
        <div id="cart_left_part">
            <div>
                Ваш заказ:
            </div>
            <div id="cart_details">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Mark</th>
                            <th scope="col">Model</th>
                            <th scope="col">Color</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody id="table_body">
                      {table_body}
                    </tbody>
                </table>
                <div id="total">
                    <div>
                        Сумма заказа:
                    </div>
                    <div id="total_sum">
                        {total_sum}
                    </div>
                </div>
            </div>
        </div>
        <div id="cart_right_part">
            <div>
                ВВЕДИТЕ ВАШИ ДАННЫЕ
            </div>
            <div>
                Фамилия, имя, отчество *
            </div>
            <div>
                <input id="name_surname_input" name="name_surname" type="text" placeholder="Иванов Иван Иванович" required />
            </div>
            <div>
                Телефон (+3 80 xxx xx xx) *
            </div>
            <div>
                <input className="phone" name="phone" type="text" required />
            </div>
            <div>
                Электронная почта *
            </div>
            <div>
                <input id="mail_input" name="mail" type="text" required />
            </div>
            <div>
                <Button id="checkout" variant="warning">Checkout</Button>
            </div>
        </div>
    </div>
    );
  } else {
    return (
      <div>
      </div>
    );
  }
}

const AddedCar = (props) => {
  var cars = useSelector((state)=>(state.cars));
  const dispatch = useDispatch();
  var removeOneCar = (id) => {
    dispatch(decreaseCarQuantity(id));
  }
  var addElseCar = (id) => {
    dispatch(enlargeCarQuantity(id));
  }
  var removeCar = (id) => {
    dispatch(removeCarFromCart(id));
  }
  return (
    <tr>
      <td><img className="image_in_cart" src={"tt/images/"+cars[props.cart_item.id].url} alt="" /></td>
      <td>{cars[props.cart_item.id].manufacturer}</td>
      <td>{cars[props.cart_item.id].model}</td>
      <td>{cars[props.cart_item.id].color}</td>
      <td>{cars[props.cart_item.id].price}</td>
      <td><span onClick={()=>{removeOneCar(props.cart_item.id)}}>-</span> <span>{props.cart_item.quantity}</span> <span onClick={()=>{addElseCar(props.cart_item.id)}}>+</span> <span onClick={()=>{removeCar(props.cart_item.id)}}>x</span></td>
    </tr>
  );
}

const ShopContent = () => {
  var cars = useSelector((state)=>(state.cars));
  var renderCarItem = (id) => {
    return (
      <Car id={id} key={id} />
    );
  }
  var content = [];
  for (var i=0;i<cars.length;i++) {
    content = content.concat(renderCarItem(i));
  }
  return (
    <div className="row" id="content">
      {content}
    </div>
  );
}

const Car = (props) => {
  var cars = useSelector((state)=>(state.cars));
  var cart = useSelector((state)=>(state.cart));
  const dispatch = useDispatch();
  var addCarToCart = (id) => {
    dispatch(addToCart(id));
  }
  var buy_button_disabled;
  for (var i=0;i<cart.length;i++) {
    if (cart[i].id == props.id) {
      var buy_button_disabled = true;
    }
  }
  if (!buy_button_disabled) {
    var buy_button_disabled = false;
  }
  return (
    <div className="col-md-4 d-flex flex-column">
      <div className="d-flex justify-content-center">
        <img className="img_size" src={"tt/images/"+cars[props.id].url} alt="" />
      </div>
      <div className="d-flex justify-content-center">
        {cars[props.id].manufacturer}
      </div>
      <div className="d-flex justify-content-center">
        {cars[props.id].model}
      </div>
      <div className="d-flex justify-content-center">
        {cars[props.id].color}
      </div>
      <div className="d-flex justify-content-center">
        {cars[props.id].price}
      </div>
      <div className="d-flex justify-content-center">
        <div><Button className="buy-button" onClick={()=>{addCarToCart(props.id)}} variant="success" disabled={buy_button_disabled}>
          Buy
        </Button></div>
      </div>
    </div>
  );
}

export default UserInterface;
