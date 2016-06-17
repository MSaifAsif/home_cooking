(function () {
    'use strict';

    //Setting up route
    angular
        .module('recipes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        // Recipes state routing
        $stateProvider
            .state('create-recipes', {
                url: '/recipes/create',
                templateUrl: 'modules/recipes/client/views/create-recipes.client.view.html',
                controller: 'CreateRecipesController',
                controllerAs: 'vm'
            })
            .state('recipes', {
                url: '/recipes',
                templateUrl: 'modules/recipes/client/views/recipes.client.view.html'
            })
            .state('edit-recipes', {
                url: '/recipes/edit',
                templateUrl: 'modules/recipes/client/views/edit-recipes.client.view.html',
                controller: 'EditRecipesController',
                controllerAs: 'vm'
            })
            .state('recipe-details-page', {
                url: '/pub/recipes/details/:recipeId',
                templateUrl: 'modules/recipes/client/views/pub/recipe-detail.client.view.html',
                controller: 'RecipesDetailController',
                controllerAs: 'vm'
            })
            .state('recipe-search-page', {
                url: '/pub/recipes/finder',
                templateUrl: 'modules/recipes/client/views/pub/recipe-search.client.view.html',
                controller: 'RecipesSearchController',
                controllerAs: 'vm'
            });
    }
})();