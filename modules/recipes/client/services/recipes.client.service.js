'use strict';

angular.module('recipes').factory('RecipeService', ['$resource',
    function ($resource) {

        // Public API
        return $resource('/api/v1/recipes', {}, {
            save: {
                method: 'POST'
            },
            update: {
                method: 'PUT'
            },
            patch: {
                method: 'PATCH',
                params: {
                    recipeId: '@recipeId',
                    updatedFieldsJson: '@updatedFieldsJson'
                }
            },
            get: {
                method: 'GET',
                params: {
                    recipeId: '@recipeId'
                }
            },
            delete: {
                method: 'DELETE',
                params: {
                    recipeId: '@recipeId'
                }
            }
        });
    }
]);