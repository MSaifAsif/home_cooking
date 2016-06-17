(function() {
    'use strict';

    angular
        .module('recipes')
        .controller('RecipesSearchController', RecipesSearchController);

    RecipesSearchController.$inject = ['$scope'];

    function RecipesSearchController($scope) {
        var vm = this;

        $scope.loadTopRecipes = function() {
            
        };

    }
})();
