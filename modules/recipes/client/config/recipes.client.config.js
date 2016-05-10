(function () {
    'use strict';

    // Recipes module config
    angular
        .module('recipes')
        .run(menuConfig);

    menuConfig.$inject = ['Menus'];

    function menuConfig(Menus) {
        // Config logic
        // ...
    }
})();