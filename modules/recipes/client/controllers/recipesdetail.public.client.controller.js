(function() {
    'use strict';

    angular
        .module('recipes')
        .controller('RecipesDetailController', RecipesDetailController);

    RecipesDetailController.$inject = ['$scope', '$stateParams', 'RecipeService'];

    function RecipesDetailController($scope, $stateParams, RecipeService) {
        var vm = this;

        $scope.loadRecipeDetails = function (){
            var recipeIdFilter = {
                recipeId: $stateParams.recipeId
            };
            RecipeService.get(recipeIdFilter, function (responseRecipe){
                console.log(responseRecipe);
            });
        };

    }
})();
