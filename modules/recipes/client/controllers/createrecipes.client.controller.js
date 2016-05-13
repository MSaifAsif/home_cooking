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

        $scope.createRecipe = function () {
            data = {
                // get form data here
                x:1
            };
            RecipeService.save({}, data);
        };

        $scope.addMoreTextFields = function ($event, el) {
            var elName = $event.target.name;
            console.log(elName);
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