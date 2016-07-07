(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Authentication', 'RecipeSearchService'];

    function HomeController($scope, Authentication, RecipeSearchService) {
        var vm = this;
        // This provides Authentication context.
        $scope.authentication = Authentication;

        // scope level vars
        $scope.data = {};
        $scope.data.featuredRecipes = [];

        $scope.getFeaturedRecipes = function() {
            RecipeSearchService.getTopFeaturedRecipes.query(function(featRecipes){
                angular.forEach(featRecipes, function (aRecipe) {
                    var innerRecipeObject = {};
                    innerRecipeObject.id = aRecipe._id;
                    innerRecipeObject.title = aRecipe.title;
                    innerRecipeObject.mainImage = aRecipe.mainImage;
                    innerRecipeObject.description = aRecipe.description;
                    innerRecipeObject.likes = aRecipe.likes;
                    $scope.data.featuredRecipes.push(innerRecipeObject);
                });
            });
        };

        function init(){
            $scope.getFeaturedRecipes();
        }

        init();

    }
})();