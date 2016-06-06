/*jshint loopfunc: true */
(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('CreateRecipesController', CreateRecipesController);

    CreateRecipesController.$inject = ['$scope', 'RecipeService', '$http', '$q'];

    function CreateRecipesController($scope, RecipeService, $http, $q) {
        var vm = this;

        $scope.data = {};
        $scope.data.nutrition = {};

        // will hold the individual steps
        $scope.ingredientsInputs = [{}];
        $scope.procedureInputs = [{}];

        // will hold images, step wise
        $scope.data.procedureFileInputs = [];

        var fileUploadPromises = [];

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

        function getProcedureList(procedureInputs, fileInputs, recipeId) {
            procedureInputs.forEach(function(listItem, index){
                // for each file upload call, save the promise in a list
                fileUploadPromises.push(uploadFileToServer(fileInputs[index].file, fileInputs[index].index, recipeId).then(function(data){
                    // keep the result set simple, this will be directly set into database
                    return {
                        step: procedureInputs[index].direction,
                        img: data,
                        index: index
                    };
                }));
            });
        }

        function uploadFileToServer(fileObj, fileIndex, recipeId) {
            var fd = new FormData();
            fd.append('fileObj', fileObj);
            var uploadParams = '?recipeId='+recipeId+'&index='+fileIndex; 
            var deferred = $q.defer();
            $http.post('/api/v1/utility_endpoint/file/upload' + uploadParams, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
            }).then(function successCallback(response) {
                deferred.resolve(response.data[0].path);
            }, function errorCallback(response) {
                console.error(response.msg);
            });
            return deferred.promise;
        }

        $scope.createRecipe = function () {

            var newRecipe = new RecipeService();

            // read form data from scope
            newRecipe.title = $scope.data.title;
            newRecipe.description = $scope.data.description;
            newRecipe.details = {
                total_calories: $scope.data.total_calories,
                serving_size: $scope.data.serving_size,
                cooking_time: $scope.data.cooking_time,
                nutrient_value: $scope.data.nutrition
            };
            newRecipe.category = $scope.data.category.categoryType;
            newRecipe.$save(function(newRecipeObj) {
                // we have saved the recipe, now do some updates regarding files
                getProcedureList($scope.procedureInputs, $scope.data.procedureFileInputs, newRecipeObj._id);
                var ingredientsList = getIngredientsList($scope.ingredientsInputs);
                // resolve all promises from the fileUpload list
                $q.all(fileUploadPromises).then(function(directionResults) {
                    newRecipeObj.procedure = {
                        'ingredients': ingredientsList,
                        'directions': directionResults
                    };
                    newRecipeObj.$update();
                });
            });
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