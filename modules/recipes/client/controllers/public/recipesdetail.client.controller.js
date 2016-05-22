(function() {
  'use strict';

  angular
    .module('recipes')
    .controller('RecipesDetailController', RecipesDetailController);

  RecipesDetailController.$inject = ['$scope'];

  function RecipesDetailController($scope) {
    var vm = this;

    // Recipes detail controller controller logic
    // ...

    init();

    function init() {
    }
  }
})();
