(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('EditRecipesController', EditRecipesController);

    EditRecipesController.$inject = ['$scope', 'RecipeSearchService', 'TagwordService'];

    function EditRecipesController($scope, RecipeSearchService, TagwordService) {
        var vm = this;
        $scope.data = {};

        function parseDateToHumanReadable(dateObj) {
            var date =  new Date(dateObj);
            return date.toDateString();
        }

        function getTagwordsForQuery(tagwordsTextList) {
            // need to contruct a comma separated string
            var arr = [];
            if (tagwordsTextList === undefined) {
                return '';
            }
            for (var i = tagwordsTextList.length - 1; i >= 0; i--) {
                arr.push(tagwordsTextList[i].text);
            }
            return arr.join(',');
        }

        $scope.loadTagwords = function(query) {
            return TagwordService.query().$promise;
        };

        $scope.findRecipes = function() {
            // empty the results before firing query
            $scope.data.retrievedRecipes = [];

            var searchTags = getTagwordsForQuery($scope.data.tagwords);
            var recipeId = $scope.data.recipeId;
            var category = $scope.data.category.categoryType;
            var filtersData = {
                tagwords: searchTags,
                recipeId: recipeId,
                categoryType: category
            };

            // first get count of results
            var q = RecipeSearchService.countRecipesMatchingFilters.get(filtersData, function(count){
                $scope.data.retrievedRecipesCount = count.total_recipes;
            });

            // Now get the results
            RecipeSearchService.findRecipesMatchingFilters.query(filtersData, function(retrievedRecipes) {
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