import View from './view';
import iconDelete from 'url:../../img/delete-icon.svg';
import iconMark from 'url:../../img/mark.svg';

class OrderView extends View {
  _parentElement = document.querySelector('.order-items');

  addHandlerAddCart(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.add-to-cart');
      if (btn) {
        handler(e);
        e.target.style.display = 'none';
        e.target.nextElementSibling.style.display = 'block';
      }
      // handler(e);
      // e.target.style.display = 'none';
      // e.target.nextElementSibling.style.display = 'block';
    });
  }
  addHandlerDeleteCart(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.mark');
      if (btn) {
        handler(e);
        e.target.style.display = 'none';
        e.target.previousElementSibling.style.display = 'block';
      }
      // handler(e);
      // e.target.style.display = 'none';
      // e.target.previousElementSibling.style.display = 'block';
    });
  }

  addHandlerDeleteOrder(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.classList.contains('delete');
      if (!btn) return;
      handler(e);
    });
  }

  addHandlerDecOrder(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.classList.contains('minus');
      if (!btn) return;
      handler(e);
    });
  }

  addHandlerIncOrder(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.classList.contains('plus');
      if (!btn) return;
      handler(e);
    });
  }

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
    
        <div class="preview-footer">
          <div>
            <p class="add-to-cart">Add to Cart</p>
            <img class="mark" src="${iconMark}" alt="" />
          </div>
          <div class="price">
            <h4>${result.updatedPrice}</h4>
          </div>
        </div>
      </div>
                  `;
      })
      .join('');
  }
}

export default new OrderView();
