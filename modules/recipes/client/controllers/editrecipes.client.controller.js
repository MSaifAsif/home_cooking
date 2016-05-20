(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('EditRecipesController', EditRecipesController);

    EditRecipesController.$inject = ['$scope', 'RecipeFinderService', '$http', 'TagwordService'];

    function EditRecipesController($scope, RecipeFinderService, $http, TagwordService) {
        var vm = this;
        $scope.data = {};
        // $scope.data.tag = {};

        function parseDateToHumanReadable(dateObj) {
            var date =  new Date(dateObj);
            return date.toDateString();
        }

        $scope.data.tagwords = [
            // load initial level tags here
            { text: 'breakfast' }
        ];

        $scope.loadTagwords = function(query) {
            var tagSuggestions = [];
            TagwordService.query(query, function(tagwords){
                angular.forEach(tagwords, function (tagObject) {
                    console.log(tagObject.key);
                    var innerObject = {
                        text: tagObject.key
                    };
                    tagSuggestions.push(innerObject);
                });
            });
            return tagSuggestions;
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