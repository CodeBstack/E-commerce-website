import { data } from '../data.js';
import View from './view.js';

class ItemView extends View {
  _parentElement = document.querySelector('.items');

  addHandlerAddOrder(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.item');
      if (!btn) return;
      document.querySelector('.orders').style.display = 'block';
      handler(e);
    });
  }

  cartDisplay() {
    document
      .querySelector('.cart-icon-img')
      .addEventListener('click', function () {
        document.querySelector('.cart').classList.toggle('cart-display');
      });
  }

  _generateMarkup() {
    return this._data
      .map(result => {
        // console.log(result);
        return ` <div class="item"  id="${result.id}" data-order="${result.id}">
         <img src="${result.image}" alt="item" />
         <p class="item-title">${result.title}</p>
         <p class="price">${result.price}</p>
       </div>
       `;
      })
      .join('');
  }
}
export default new ItemView();
