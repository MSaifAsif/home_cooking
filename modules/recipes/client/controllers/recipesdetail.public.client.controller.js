(function() {
    'use strict';

    angular
        .module('recipes')
        .controller('RecipesDetailController', RecipesDetailController);

    RecipesDetailController.$inject = ['$scope', '$stateParams', 'RecipeService'];

    function RecipesDetailController($scope, $stateParams, RecipeService) {
        var vm = this;

        $scope.data = {};

        $scope.loadRecipeDetails = function (){
            RecipeService.get({
                recipeId: $stateParams.recipeId
            }).$promise.then(function(recipeResponse){
                $scope.data.recipeBean = recipeResponse;
            });
        };
    }
})();
