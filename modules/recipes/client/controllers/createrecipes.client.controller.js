(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('CreateRecipesController', CreateRecipesController);

    CreateRecipesController.$inject = ['$scope', 'RecipeServiceUtils'];

    function CreateRecipesController($scope, RecipeServiceUtils) {
        var vm = this;

        $scope.ingredientsInputs = [{}];
        $scope.procedureInputs = [{}];

        init();

        function init() {
            $scope.recipeCategoryTypes = RecipeServiceUtils.getCategoryTypes();
        }

        function addMoreIngredientsFields() {
            $scope.ingredientsInputs.push({});
        }

        function addMoreProcedureFields() {
            $scope.procedureInputs.push({});
        }

        $scope.keyPressEvent = function($event, el) {
            var elName = $event.target.name;
            if (RecipeServiceUtils.isKeyEnter($event.keyCode)) {
                if (RecipeServiceUtils.isIngredientElement(elName)) {
                    addMoreIngredientsFields();
                } else if (RecipeServiceUtils.isProcedureElement(elName)) {
                    addMoreProcedureFields();
                }
            }
        };
    }
})();