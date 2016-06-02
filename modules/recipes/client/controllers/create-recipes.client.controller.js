(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('CreateRecipesController', CreateRecipesController);

    CreateRecipesController.$inject = ['$scope', 'RecipeService', '$http'];

    function CreateRecipesController($scope, RecipeService, $http) {
        var vm = this;

        $scope.data = {};

        // will hold the individual steps
        $scope.ingredientsInputs = [{}];
        $scope.procedureInputs = [{}];

        // will hold images, step wise
        $scope.data.procedureFileInputs = [];

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

        function getProcedureList(procedureInputs, fileInputs) {
            var inList = [];
            for (var i = procedureInputs.length - 1; i >= 0; i--) {
                if (procedureInputs[i].direction === undefined) {
                    continue;
                }
                var pathToImageOnFS = uploadFileToServer(fileInputs[i].file);
                var directionObj = {
                    step: procedureInputs[i].direction,
                    img: pathToImageOnFS
                };
                inList.push(directionObj);
            }
            return inList;
        }

        // TODO make it run with deferred.promise
        function uploadFileToServer(fileObj) {
            var fd = new FormData();
            fd.append('file', fileObj);

            $http.post('/', fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
            }).success(function(){
                // on success
                return '';
            }).error(function(){
                // on error
                console.error('Something')
            });
        }

        $scope.createRecipe = function () {
            var ingredientsList = getIngredientsList($scope.ingredientsInputs);
            var procedureList = getProcedureList($scope.procedureInputs, $scope.data.procedureFileInputs);
            var newRecipe = new RecipeService();
            newRecipe.title = $scope.data.title;
            newRecipe.description = $scope.data.description;
            newRecipe.procedure = {
                'ingredients': ingredientsList,
                'directions': procedureList
            };
            newRecipe.category = $scope.data.category.categoryType;
            newRecipe.$save();
        };

        $scope.addMoreTextFields = function (elName) {
            if (elName === 'ingredients') {
                $scope.ingredientsInputs.push({});
            } else if (elName === 'directions') {
                $scope.procedureInputs.push({});
            }
        };

        $scope.uploadStepFileHandler = function(event) {
            var fileElement = event.target.files[0];
            var indexCount = event.target.attributes['index-count'].value;
            var fileObj = {
                index: indexCount,
                file: fileElement
            };
            $scope.data.procedureFileInputs.push(fileObj);
        };
    }
})();