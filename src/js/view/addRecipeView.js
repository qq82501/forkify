'use strict';

import View from './view';

class AddRecipeView extends View {
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }
  _successMessage = 'Receipe was uploaded successfully';
  _parentEl = document.querySelector('.upload');
  _addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _generateMarkup() {
    return `        <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="" required name="title" type="text" />
    <label>URL</label>
    <input value="" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="" required name="image" type="text" />
    <label>Publisher</label>
    <input value="" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value=""
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value=""
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=""
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="src/img/icons.svg#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;
  }

  _toggleModal() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
    if (this._overlay.classList.contains('hidden')) {
      if (!this._parentEl.querySelector('.upload__column')) {
        this.render(1);
        this._parentEl.reset();
      }
    }
  }

  _addHandlerShowWindow() {
    this._addRecipeBtn.addEventListener('click', this._toggleModal.bind(this));
  }

  _addHandlerCloseWindow() {
    const classSelf = this;
    this._overlay.addEventListener('click', this._toggleModal.bind(this));
    window.addEventListener('keydown', function (e) {
      if (
        e.key === 'Escape' &&
        !classSelf._window.classList.contains('hidden')
      ) {
        classSelf._toggleModal();
      }
    });
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      console.log(new FormData(this));
      console.log(dataArray);
      const data = Object.fromEntries(dataArray);
      console.log(data);
      handler(data);
    });
  }
  getUploadRecipe() {}
}

export default new AddRecipeView();
