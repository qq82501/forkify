'use strick';

import icon from 'url:../../img/icons.svg';
export default class View {
  _data;

  /**
   * @param {object|object[]} data The data you want to render
   * @param {boolean} [render=true] render If render = false, only generate HTML markup but not render data.
   * @returns {undefined|string} If render = false, return HTML markup.
   * @author Cindy
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();
    this._data = data;
    const html = this._generateMarkup();
    if (!render) return html;
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
        newEl.firstChild?.nodeValue.trim() !== ''
        //adding additional condition to solve cannot reat "undefined" of nodeValue QAing
        // newEl.firstChild?.nodeValue.trim() !== undefined
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        const newAttributes = Array.from(newEl.attributes);
        newAttributes.forEach(newAttribute => {
          curEl.setAttribute(newAttribute.name, newAttribute.nodeValue);
        });
      }
    });
  }
  /**
   * Render spinner when data is loading.
   */
  renderSpinner() {
    const html = ` <div class="spinner">
        <svg>
          <use href="${icon}#icon-loader"></use>
        </svg>
      </div> `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  /**
   * When problem occurs, shows error message on user interface.
   * @param {string} msg Error message showed to users
   */
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
  /**
   * When specific action runs smoothly, shows message to let user know the task is done.
   * @param {string} msg successful message showed to users
   */
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

  /**
   * Clear parent element's current inner HTML and ready for rendering other data.
   */
  _clear() {
    this._parentEl.innerHTML = '';
  }
}
