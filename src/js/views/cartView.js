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
        <div class="items-title">
          <h3>${result.title}</h3>
          <img class="delete" src="${iconDelete}" alt="" />
        </div>
    
        <div class="order-item-main">
          <div class="img">
            <img src="${result.image}" alt="" />
          </div>
          <div class="title">
            <p>${result.title}</p>
          </div>
          <div class="quantity">
            <div class="quantity-heading">
              <p>Quantity</p>
              <div class="increments">
                <p class="sign minus">&minus;</p>
                <p>${result.counts}</p>
                <p class="sign plus">&plus;</p>
              </div>
            </div>
          </div>
        </div>
    
        <div class="preview-footer2">
          <div class="price cart-add">
            <h4>${result.updatedPrice}</h4>
          </div>
        </div>
      </div>
                  `;
      })
      .join('');
  }
}

export default new CartView();
