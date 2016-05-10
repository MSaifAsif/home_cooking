(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('RecipesController', RecipesController);

    RecipesController.$inject = ['$scope'];

    function RecipesController($scope) {
        var vm = this;

        // Recipes controller logic
        // ...

        init();

        function init() {
            console.log('Initializing');

        }
    }
})();