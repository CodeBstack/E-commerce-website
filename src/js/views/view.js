export default class View {
  _data;

  render(data, render = true) {
    this._data = data;
    const markup = this._generateMarkup();



    if (render) this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
