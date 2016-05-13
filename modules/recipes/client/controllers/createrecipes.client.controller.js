(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('CreateRecipesController', CreateRecipesController);

    CreateRecipesController.$inject = ['$scope', 'RecipeService'];

    function CreateRecipesController($scope, RecipeService) {
        var vm = this;

        $scope.ingredientsInputs = [{}];
        $scope.procedureInputs = [{}];

        $scope.imageFiles = [];

        $scope.data = {};

        $scope.uploadAllFiles = function () {
            console.log($scope.imageFiles);
        };

        function getIngredientsList(ingredientsInputs) {
            var inList = [];
            for (var i = ingredientsInputs.length - 1; i >= 0; i--) {
                if (ingredientsInputs[i].ingredient === undefined) {
                    continue;
                }
                inList.push(ingredientsInputs[i].ingredient);
            }
            return inList;
        }

        function getProcedureList(procedureInputs) {
            var inList = [];
            for (var i = procedureInputs.length - 1; i >= 0; i--) {
                if (procedureInputs[i].direction === undefined) {
                    continue;
                }
                inList.push(procedureInputs[i].direction);
            }
            return inList;
        }

        $scope.createRecipe = function () {
            var ingredientsList = getIngredientsList($scope.ingredientsInputs);
            var procedureList = getProcedureList($scope.procedureInputs);
            var newRecipe = new RecipeService();
            newRecipe.title = $scope.data.title;
            newRecipe.description = $scope.data.description;
            newRecipe.procedure = {
                'ingredients': ingredientsList,
                'directions': procedureList
            };
            newRecipe.category = $scope.data.category.categoryType;
            console.log(newRecipe);
            newRecipe.$save();
        };

        $scope.addMoreTextFields = function (elName) {
            if (elName === 'ingredients') {
                $scope.ingredientsInputs.push({});
            } else if (elName === 'directions') {
                $scope.procedureInputs.push({});
            }
        };
    }
})();