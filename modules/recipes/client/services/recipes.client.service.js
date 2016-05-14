'use strict';

angular.module('recipes').factory('RecipeService', ['$resource',
    function ($resource) {

        // Public API
        return $resource('/api/v1/recipes', {}, {
            save: {
                method: 'POST'
            },
            get: {
                method: 'GET',
                params: {recipeId: '@recipeId'}
            },
            delete: {
                method: 'DELETE',
                params: {recipeId: '@recipeId'}
            }
        });
    }
]);