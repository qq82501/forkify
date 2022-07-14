'use strick';

import View from './view.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;

  _generateMarkup() {
    // const pages = Math.ceil(this._data.length / 10);
    // if (pages > 1) _generatePageButton();
    // const firstPageResults = this._data.slice(0, 10);
    // return firstPageResults.map(this._generateResultsMarkup).join('');
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
