'use strict';

angular.module('recipes').factory('RecipeService', ['$resource',
    function ($resource) {

        // Public API
        return {
            someMethod: function () {
                return true;
            },

            createRecipe: function (recipeJson) {

            },

            isKeyEnter: function (keyCode) {
                return keyCode === 13;
            },

            isIngredientElement: function (elName) {
                return elName === 'ingredients';
            },

            isProcedureElement: function (elName) {
                return elName === 'direction';
            }

        };
    }
]);