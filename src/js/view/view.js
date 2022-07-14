'use strick';

import icon from 'url:../../img/icons.svg';
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();
    this._data = data;
    const html = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' &&
        //adding additional condition to solve cannot reat "undefined" of nodeValue QAing
        newEl.firstChild?.nodeValue.trim() !== undefined
      ) {
        curEl.firstChild.nodeValue = newEl.firstChild.nodeValue;
      }
      if (!newEl.isEqualNode(curEl)) {
        const newAttributes = Array.from(newEl.attributes);
        newAttributes.forEach(newAttribute => {
          curEl.setAttribute(newAttribute.name, newAttribute.nodeValue);
        });
      }
    });
  }

  renderSpinner() {
    const html = ` <div class="spinner">
        <svg>
          <use href="${icon}#icon-loader"></use>
        </svg>
      </div> `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderErrorMessage(msg = this._errorMessage) {
    const html = `       
    <div class="error">
      <div>
        <svg>
          <use href="${icon}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${msg}</p>
  </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderSuccessMessage(msg = this._successMessage) {
    const html = `        
    <div class="message">
      <div>
        <svg>
          <use href="${icon}icon-smile"></use>
        </svg>
      </div>
      <p>${msg}</p>
    </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
}
