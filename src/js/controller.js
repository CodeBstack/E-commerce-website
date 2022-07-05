import * as model from './model.js';
import itemView from './views/itemView.js';
import paginationView from './views/paginationView.js';
import cartView from './views/cartView.js';
import orderView from './views/orderView.js';

const controlItems = function () {
  model.loadItemData();

  itemView.render(model.ItemsPage());

  // Render initial pagination button
  paginationView.render(model.state.items);
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  itemView.render(model.ItemsPage(goToPage));

  // 2) Render NEW pagination  buttons
  paginationView.render(model.state.items);
};

const controlAddCart = function (e) {
  model.addCart(e);

  cartView.render(model.state.cart);
};

const controlDeleteCart = function (e) {
  model.deleteCart(e);

  cartView.render(model.state.cart);
};

const controlAddOrder = function (e) {
  model.addOrder(e);

  // model.state.orders;
  orderView.render(model.state.orders, false);
};

const controlDeleteOrder = function (e) {
  model.deleteOrder(e);

  orderView.render(model.state.orders);
  // cartView.render(model.state.cart);
};

const controlIncOrder = function (e) {
  model.incOrder(e);

  orderView.render(model.state.orders);
};

const controlDecOrder = function (e) {
  model.decOrder(e);

  orderView.render(model.state.orders);
};

// Using the publisher subscriber pattern.
// The listener is in the VIEW and the handler is in the CONTROLLER
const init = function () {
  controlItems();
  itemView.cartDisplay();
  paginationView.addHandlerClick(controlPagination);
  itemView.addHandlerAddOrder(controlAddOrder);
  orderView.addHandlerDeleteOrder(controlDeleteOrder);
  orderView.addHandlerIncOrder(controlIncOrder);
  orderView.addHandlerDecOrder(controlDecOrder);

  orderView.addHandlerAddCart(controlAddCart);
  orderView.addHandlerDeleteCart(controlDeleteCart);
};
init();
