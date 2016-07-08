(function() {
    'use strict';

    angular
        .module('recipes')
        .controller('RecipesSearchController', RecipesSearchController);

    RecipesSearchController.$inject = ['$scope', 'RecipeSearchService', 'CategoryService'];

    function RecipesSearchController($scope, RecipeSearchService, CategoryService) {
        var vm = this;
        $scope.data = {};

        function loadTopRecipes() {
            $scope.data.topRecipes = [];
        }

        function loadCategories() {
            $scope.data.navigableCategories = [];
            CategoryService.query(function(categories){
                angular.forEach(categories, function (cat) {
                    $scope.data.navigableCategories.push(cat.categoryName);
                });
            });
        }

        $scope.getRecipesForCategory = function(categoryName) {
            $scope.data.recipesForCategory = [];
            var filters = {
                category: categoryName
            };
            RecipeSearchService.findRecipesMatchingCategory.query(filters, function(matchingRecipes){
                angular.forEach(matchingRecipes, function (aRecipe) {
                    var innerRecipeObject = {};
                    innerRecipeObject.id = aRecipe._id;
                    innerRecipeObject.title = aRecipe.title;
                    innerRecipeObject.mainImage = aRecipe.mainImage;
                    innerRecipeObject.description = aRecipe.description;
                    innerRecipeObject.likes = aRecipe.likes;
                    $scope.data.recipesForCategory.push(innerRecipeObject);
                });
            });
        };

        $scope.init = function() {
            loadTopRecipes();
            // TODO hard coding this for now
            loadCategories('breakfast');
        };
    }
})();
