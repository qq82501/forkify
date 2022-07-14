'use strick';
import View from './view';
import icon from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _currentPage;

  addHandlerClick(handler) {
    //Using event delegation & bubbling
    this._parentEl.addEventListener('click', function (e) {
      if (!e.target.closest('.btn--inline')) return;
      const button = e.target.closest('.btn--inline');
      handler(button.dataset.pageGoto);
    });
  }
  _generateMarkup() {
    const totalPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    this._currentPage = +this._data.currentPage;

    if (!this._data.result.length) return '';

    // At 1st page and has next page
    if (this._currentPage === 1 && totalPages > 1) {
      return this._generateButtonMarkup('next');
    }
    //only 1 page
    if (totalPages === 1) {
      return ``;
    }
    //At Middle page and has next & previous page
    if (this._currentPage < totalPages) {
      return `${this._generateButtonMarkup(
        'previous'
      )}${this._generateButtonMarkup('next')}`;
    }
    //Last page
    if (this._currentPage === totalPages && totalPages !== 1) {
      return this._generateButtonMarkup('prev');
    }
    console.log(totalPages);
    console.log(this._data);
  }
  _generateButtonMarkup(button) {
    const diretion = button === 'next' ? 'next' : 'prev';
    const goToPage =
      button === 'next' ? this._currentPage + 1 : this._currentPage - 1;
    const iconPath =
      button === 'next'
        ? `${icon}#icon-arrow-right`
        : `${icon}#icon-arrow-left`;

    return `<button class="btn--inline pagination__btn--${diretion}" data-page-goTo = "${goToPage}">
              ${diretion === 'next' ? `<span>Page ${goToPage}</span>` : ''}
              <svg class="search__icon">
              <use href="${iconPath}"></use>
              </svg>
              ${diretion === 'prev' ? `<span>Page ${goToPage}</span>` : ''}
            </button>`;
  }
}

export default new PaginationView();
