import { data } from './data.js';

export const state = {
  items: {
    results: [],
    page: 1,
    resultsPerPage: 6,
  },
  orders: [],
  cart: [],
  cartCount: 0,
};

// function geting the data from data.js and supplying the controller.
export const loadItemData = function () {
  state.items.results = data.map(rec => {
    return {
      id: rec.id,
      title: rec.title,
      image: rec.image_url,
      price: rec.price,
    };
  });
  state.items.page = 1;
  // console.log(state.items.results);
};

// function dividing all elements into pages for pagination by slicing the array.
export const ItemsPage = function (page = 1) {
  state.items.page = page;

  const start = (page - 1) * state.items.resultsPerPage; // 0;
  const end = page * state.items.resultsPerPage; // 5;

  return state.items.results.slice(start, end);
};

// Storing Cart in the local storage
const persistCart = function () {
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

// Add to Cart
export const addCart = function (e) {
  const i = state.orders.find(
    el =>
      el.id ===
      +e.target.parentElement.parentElement.parentElement.dataset.order
  );
  console.log(i);
  console.log(state.orders);
  let arr = [];
  arr.push(i);

  arr.forEach(el => {
    if (state.cart.includes(el)) return;
    state.cart.push(el);

    state.cartCount = state.cart.length;
    // console.log(state.cartCount);
    document.querySelector('.counts').textContent = state.cartCount;
  });
};

// Delete Cart
export const deleteCart = function (e) {
  const index = state.cart.findIndex(
    el =>
      el.id ===
      +e.target.parentElement.parentElement.parentElement.dataset.order
  );
  // console.log(index);
  state.cart.splice(index, 1);
};

// Adding each order
export const addOrder = function (e) {
  const data = state.items.results;

  const i = data.map(el => {
    if (el.id === +e.target.dataset.order) return el;
  });

  const filter = i.filter(el => el !== undefined);

  filter.forEach((el, i) => {
    const orderItem = {
      ordered: true,
      counts: 1,
      updatedPrice: el.price,
      ...filter[i],
    };

    state.orders.push(orderItem);
  });

  // console.log(findData);

  // arr.push(findData);
  // console.log(arr);

  // Gets the clicked element
  //  data.forEach((el, i) => {
  //   if (el.id === +e.target.dataset.order) {
  //     // return el, i;
  //     // console.log(el, i);
  //     const orderItem = {
  //       ordered: true,
  //       counts: 1,
  //       updatedPrice: el.price,
  //       ...data[i],
  //     };
  //     // return orderItem;
  //     state.orders.push(orderItem);
  //   }
  // });
};

// Deleting specific orders
export const deleteOrder = function (e) {
  const index = state.orders.map((el, i) => {
    if (el.id === +e.target.parentElement.parentElement.dataset.order) return i;
  });
  state.cart.splice(index, 1);
  state.orders.splice(index, 1);
};

// Increasing order
export const incOrder = function (e) {
  const id =
    +e.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.dataset.order;

  state.orders.find(el => {
    if (el.id === id) el.counts += 1;
    // console.log(el.counts);
  });
  updatePrice(id);
};

// Decrease Order
export const decOrder = function (e) {
  const id =
    +e.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.dataset.order;

  state.orders.find(el => {
    if (el.id === id && el.counts > 1) el.counts -= 1;
    // console.log(el.counts);
  });

  updatePrice(id);
};

// Multiply price by current number of elements and update
const updatePrice = function (id) {
  state.orders.find(el => {
    if (el.id === id) {
      const priceOnly = +el.price.replace('$', '');
      el.updatedPrice = `$${(priceOnly * el.counts).toFixed(2)}`;
      // console.log(el.updatedPrice);
    }
  });
};

// initialises the local storage at the load of the page.
const init = function () {
  const storage = localStorage.getItem('cart');
  if (storage) state.cart = JSON.parse(storage);
};
// init();

// clears the local storage for easy debugging
const clearBookmarks = function () {
  localStorage.clear('cart');
};
// clearBookmarks;
