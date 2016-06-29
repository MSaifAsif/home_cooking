'use strict';

angular.module('recipes').factory('RecipeSearchService', ['$resource',
    function ($resource) {


        // Public API
        return {
            findRecipesMatchingFilters: $resource('/api/v1/recipes/search/find', {}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        categoryType: '@categoryType',
                        recipeId: '@recipeId',
                        tagwords: '@tagwords'
                    }
                }
            }),
            countRecipesMatchingFilters: $resource('/api/v1/recipes/search/count', {}, {
                get: {
                    method: 'GET',
                    params: {
                        categoryType: '@categoryType',
                        recipeId: '@recipeId',
                        tagwords: '@tagwords'
                    }
                }
            }),
            // this is a find_any query, any param can be passed in
            findRecipesMatchingIngredients: $resource('/api/v1/recipes/search/find_from_ingredients', {}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        ingredients: '@ingredients'
                    }
                }
            }),
            // get the top featured recipes for home page
            getTopFeaturedRecipes: $resource('/api/v1/recipes/search/get_featured', {}, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            })
        };
    }
]);