import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      // console.log(btn);
      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    // console.log(this._data);
    const curPage = this._data.page; //items.page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); // rounds it up to the nearest integer

    // Page 1, and there are other page
    if (curPage === 1 && numPages > 1) {
      return `
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1} &#8594;</span>
            </button>
          `;
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return `
          <button  data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
          <span>&#8592; Page ${curPage - 1}</span>
        </button>
          `;
    }
    // Other Page
    if (curPage < numPages) {
      return `
              <button data-goto="${
                curPage - 1
              }" class="btn--inline pagination__btn--prev">
                  <span>&#8592; Page ${curPage - 1}</span>
              </button>
  
              <button data-goto="${
                curPage + 1
              }" class="btn--inline pagination__btn--next">
                  <span>Page ${curPage + 1} &#8594;</span>
              </button>
        `;
    }
    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
