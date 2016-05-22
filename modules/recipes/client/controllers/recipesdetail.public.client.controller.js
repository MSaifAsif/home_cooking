(function() {
    'use strict';

    angular
        .module('recipes')
        .controller('RecipesDetailController', RecipesDetailController);

    RecipesDetailController.$inject = ['$scope', '$stateParams', 'RecipeService'];

    function RecipesDetailController($scope, $stateParams, RecipeService) {
        var vm = this;

        $scope.loadRecipeDetails = function (){
            var recipeId = $stateParams.recipeId;
            console.log('Fetching', recipeId);
        };

    }
})();
