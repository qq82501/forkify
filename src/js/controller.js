import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/SearchView.js';
import searchResultView from './view/searchResultView.js';
import { async } from 'regenerator-runtime';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';

const searchResult = document.querySelector('.search-results');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    //Get recipe data
    const id = window.location.hash.slice(1);
    if (!id) return;
    //Render spinner
    recipeView.renderSpinner();
    bookmarksView.update(model.state.bookmarks);

    searchResultView.update(
      model.getSearchResultByPage(model.state.search.currentPage)
    );
    await model.showRecipe(id);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErrorMessage();
    console.error(err);
    // alert(err);
  }
};

const controlSearchResult = async function () {
  try {
    //1. get query from UI
    const query = searchView.getQuery();
    if (!query) return;

    // searchResult spinner
    searchResultView.renderSpinner();

    await model.loadSearchResult(query);
    await searchResultView.render(model.getSearchResultByPage());
    paginationView.render(model.state.search);
    console.log(model.state.search.result);
  } catch (err) {
    // searchResultView.renderErrorMessage(err);
  }
};

const controlPagination = async function (page) {
  await searchResultView.render(model.getSearchResultByPage(page));
  paginationView.render(model.state.search);
};

const controlUpdateServings = function (newServings) {
  model.getUpdateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarkPreview = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarkPreview);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};

init();
