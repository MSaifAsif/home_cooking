'use strict';

angular.module('recipes').factory('RecipeSearchService', ['$resource',
    function ($resource) {


        // Public API
        return {
            findRecipesMatchingFilters: $resource('/api/v1/recipes/find', {}, {
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
            countRecipesMatchingFilters: $resource('/api/v1/recipes/count', {}, {
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
            findRecipesMatchingIngredients: $resource('/api/v1/recipes/find_any', {}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        ingredients: '@ingredients'
                    }
                }
            })
        };
    }
]);