(function () {
  'use strict';

  angular
    .module('recipes')
    .factory('Recipesfinder', Recipesfinder);

  Recipesfinder.$inject = ['$resource'];

  function Recipesfinder($resource) {
    // Recipesfinder service logic
    // ...

    // Public API
    return {
      findByFilters: function (filtersObj) {
        
        return true;
      }
    };
  }
})();
