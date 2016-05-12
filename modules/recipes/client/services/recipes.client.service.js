'use strict';

angular.module('recipes').factory('RecipeService', ['$resource',
    function ($resource) {

        // Public API
        return $resource('/api/recipes/add', {}, {
            save: {
                method: 'POST',
                params: {}
            }
        };
    }
]);