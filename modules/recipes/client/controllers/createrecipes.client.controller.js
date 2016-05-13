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

        $scope.uploadAllFiles = function () {
            console.log($scope.imageFiles);
        };

        function getIngredientsList(ingredientsInputs) {
            var inList = [];
            console.log(ingredientsInputs);
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
            console.log(procedureInputs);
            for (var i = procedureInputs.length - 1; i >= 0; i--) {
                if (procedureInputs[i].ingredient === undefined) {
                    continue;
                }
                inList.push(ingredientsInputs[i].ingredient);
            }
            return inList;
        }

        $scope.createRecipe = function () {
            var ingredientsList = getIngredientsList($scope.ingredientsInputs);
            var procedureList = getProcedureList($scope.procedureInputs);
            console.log(ingredientsList);
            // var newRecipeData = {
            //     // get form newRecipeData here
            //     title: $scope.title,
            //     description: $scope.description,
            //     procedure: {
            //         'ingredients': getIngredientsList(''),
            //         'directions': getDirectionsList('')
            //     },
            //     category: ''
            // };
            // RecipeService.save({}, newRecipeData);
        };

        $scope.addMoreTextFields = function ($event, el) {
            var elName = $event.target.name;
            if ($event.keyCode === 13) {
                if (elName === 'ingredients') {
                    $scope.ingredientsInputs.push({});
                } else if (elName === 'directions') {
                    $scope.procedureInputs.push({});
                }
            }
        };
    }
})();