'use strict';

angular.module('recipes').factory('RecipeServiceUtils', ['$resource',
    function ($resource) {
        // Recipesserviceutils service logic
        // ...

        // Public API
        return {
            someMethod: function () {
                return true;
            },

            /**
              * Recipe API calls
              */
            getCategoryTypes: function () {

                return $resource('/api/category').get();
                // return [{
                //     'categoryName': 'Default',
                //     'categoryType': 'default',
                //     'categoryDescription': 'General (no category)'
                // }, {
                //     'categoryName': 'Dessert',
                //     'categoryType': 'dessert',
                //     'categoryDescription': 'Desserts and sweets'
                // }, {
                //     'categoryName': 'Breakfast',
                //     'categoryType': 'breakfast',
                //     'categoryDescription': 'Morning breakfasts'
                // }, {
                //     'categoryName': 'Lunch',
                //     'categoryType': 'lunch',
                //     'categoryDescription': 'Lunch'
                // }, {
                //     'categoryName': 'High-tea',
                //     'categoryType': 'hightea',
                //     'categoryDescription': 'High-tea and evening snacks'
                // }, {
                //     'categoryName': 'Dinner',
                //     'categoryType': 'dinner',
                //     'categoryDescription': 'Dinner'
                // }, {
                //     'categoryName': 'Snacks',
                //     'categoryType': 'snacks',
                //     'categoryDescription': 'Late night snacks'
                // }];
            },

            createRecipe: function(recipeJson) {

            },

            isKeyEnter: function (keyCode) {
                return keyCode === 13;
            },

            isIngredientElement: function (elName){
                return elName === 'ingredients';
            },

            isProcedureElement: function (elName){
                return elName === 'direction';
            }

        };
    }
]);
