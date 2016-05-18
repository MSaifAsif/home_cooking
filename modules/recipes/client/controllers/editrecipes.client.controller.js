(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('EditRecipesController', EditRecipesController);

    EditRecipesController.$inject = ['$scope', 'RecipeFinderService', '$http'];

    function EditRecipesController($scope, RecipeFinderService, $http) {
        var vm = this;
        $scope.data = {};

        function parseDateToHumanReadable(dateObj) {
            var date =  new Date(dateObj);
            return date.toDateString();
        }

        $scope.data.tagwords = [{
            text: 'tag1'
        }];

        $scope.tags = [
            { text: 'Tag1' },
            { text: 'Tag2' },
            { text: 'Tag3' }
          ];

        $scope.loadTagWords = function (query) {
            console.log('fetching');
            return [{
                text: 'tag1'
            }, {
                text: 'tag2'
            }, {
                text: 'tag3'
            }];
        };

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