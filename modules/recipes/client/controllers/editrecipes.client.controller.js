(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('EditRecipesController', EditRecipesController);

    EditRecipesController.$inject = ['$scope', 'RecipeFinderService'];

    function EditRecipesController($scope, RecipeFinderService) {
        var vm = this;
        $scope.data = {};

        function parseDateToHumanReadable(dateObj) {
            var date =  new Date(dateObj);
            return date.toDateString();
        }

        $scope.findRecipes = function() {
            // empty the results before firing query
            $scope.data.retrievedRecipes = [];
            var searchKeyword = $scope.data.keyword;
            var recipeId = $scope.data.recipeId;
            var category = $scope.data.category.categoryType;
            var filtersData = {
                keywords: searchKeyword,
                recipeId: recipeId,
                categoryType: category
            };

            // first get count of results
            var q = RecipeFinderService.countRecipesMatchingFilters.get(filtersData, function(count){
                $scope.data.retrievedRecipesCount = count.total_recipes;
            });

            // Now get the results
            RecipeFinderService.findRecipesMatchingFilters.query(filtersData, function(retrievedRecipes) {
                angular.forEach(retrievedRecipes, function(item) {
                    var innerObject = {};
                    innerObject.id = item._id;
                    innerObject.createdDate = parseDateToHumanReadable(item.createdDate);
                    innerObject.isActive = Boolean(item.isActive) === true ? 'Active' : 'Not active';
                    innerObject.description = item.description;
                    $scope.data.retrievedRecipes.push(innerObject);
                });
            });
        };
    }
})();