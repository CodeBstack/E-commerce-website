import View from './view';
import iconDelete from 'url:../../img/delete-icon.svg';
import iconMark from 'url:../../img/mark.svg';

class CartView extends View {
  _parentElement = document.querySelector('.cart__list');

  _generateMarkup() {
    return this._data
      .map(result => {
        // console.log(result);
        return `
        <div class="order-preview" id="${result.id}" data-order=${result.id}>
        <div class="items-title ">
          <h3>${result.title}</h3>
        </div>
    
        <div class="order-item-main">
          <div class="img">
            <img src="${result.image}" alt="" />
          </div>
          <div class="cart-title">
            <p>${result.title}</p>
          </div>

          <div class="preview-footer2">
          <div class="price cart-add">
            <h4>${result.updatedPrice}</h4>
          </div>
        </div>
      </div>
        </div>
    
       
                  `;
      })
      .join('');
  }
}

export default new CartView();
