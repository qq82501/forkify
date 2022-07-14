//Model should include Business Logic & Data-Fetching & state
'use strict';
import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    resultPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
};

export const showRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    if (!data) throw new Error('Cannot find recipe');
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      imageURL: recipe.image_url,
      ingredients: recipe.ingredients,
      sourceURL: recipe.source_url,
      title: recipe.title,
      servings: recipe.servings,
      publisher: recipe.publisher,
      cookingTime: recipe.cooking_time,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // if (!data.results)
    //   throw new Error(
    //     `Cannot find anything relating to "${query}", please try another.`
    //   );

    //reformat property's name
    state.search.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        imageURL: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultByPage = function (page = 1) {
  state.search.currentPage = page;
  const startItem = (page - 1) * state.search.resultPerPage;
  const endItem = page * state.search.resultPerPage;
  return state.search.result.slice(startItem, endItem);
};

export const getUpdateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addgitBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
