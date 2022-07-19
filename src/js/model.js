//Model should include Business Logic & Data-Fetching & state
'use strict';
import { isGeneratorFunction } from 'regenerator-runtime';
import { API_KEY, API_URL, RESULTS_PER_PAGE } from './config';
import { AJAX } from './helpers';

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

const setRecipeObject = function (recipe) {
  state.recipe = {
    id: recipe.id,
    imageURL: recipe.image_url,
    ingredients: recipe.ingredients,
    sourceURL: recipe.source_url,
    title: recipe.title,
    servings: recipe.servings,
    publisher: recipe.publisher,
    cookingTime: recipe.cooking_time,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const showRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    if (!data) throw new Error('Cannot find recipe');
    let { recipe } = data.data;
    setRecipeObject(recipe);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
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
        ...(recipe.key && { key: recipe.key }),
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

const persistBookmarks = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

export const uploadRecipe = async function (data) {
  try {
    const ingredient = Object.entries(data)
      .filter(entry => entry[0].includes('ingredient') && entry[1] !== '')
      .map(entry => {
        const ing = entry[1].split(',');
        if (ing.length !== 3)
          throw new Error(
            'Ingredient format is incorrect, please enter with correct format'
          );
        const [quantity, unit, description] = ing;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const newRecipeData = {
      image_url: data.image,
      ingredients: ingredient,
      source_url: data.sourceUrl,
      title: data.title,
      servings: data.servings,
      publisher: data.publisher,
      cooking_time: data.cookingTime,
    };
    const sendResult = await AJAX(`${API_URL}?key=${API_KEY}`, newRecipeData);
    const { recipe: newRecipe } = sendResult.data;
    setRecipeObject(newRecipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  const data = JSON.parse(localStorage.getItem('bookmark'));
  if (data) state.bookmarks = data;
};
init();

// const clearBookmark = function () {
//   localStorage.clear('bookmark');
// };
// clearBookmark();
