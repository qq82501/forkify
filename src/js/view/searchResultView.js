'use strick';

import View from './view.js';
import previewView from './previewView.js';

class searchResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = `Cannot find any result, please try another.`;

  _generateMarkup() {
    // const pages = Math.ceil(this._data.length / 10);
    // if (pages > 1) _generatePageButton();
    // const firstPageResults = this._data.slice(0, 10);
    // return firstPageResults.map(this._generateResultsMarkup).join('');
    //this._data = bookmarks[]
    return this._data.map(result => previewView.render(result, false)).join('');
  }

  // _generateResultsMarkup(result) {
  //   const id = window.location.hash.slice(1);
  //   return `
  //   <li class="preview">
  //   <a class="preview__link ${
  //     id === result.id ? 'preview__link--active' : ''
  //   }" href="#${result.id}">
  //     <figure class="preview__fig">
  //       <img src="${result.imageURL}" alt="${result.title}" />
  //     </figure>
  //     <div class="preview__data">
  //       <h4 class="preview__title">${result.title}</h4>
  //       <p class="preview__publisher">${result.publisher}</p>
  //     </div>
  //   </a>
  // </li>
  //   `;
  // }
}

export default new searchResultView();
