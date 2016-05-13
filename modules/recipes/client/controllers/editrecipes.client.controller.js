(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('EditRecipesController', EditRecipesController);

    EditRecipesController.$inject = ['$scope', 'RecipeService'];

    function EditRecipesController($scope, RecipeService) {
        var vm = this;

        $scope.findRecipes = function() {
            // first we need to build filters
        }
        
    }
})();