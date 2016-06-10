(function () {
    'use strict';

    //Setting up route
    angular
        .module('comments')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        // Comments state routing
        $stateProvider
            .state('comments', {
                url: '/comments',
                templateUrl: 'modules/comments/client/views/comments.client.view.html',
                controller: 'CommentsController',
                controllerAs: 'vm'
            })
            .state('edit-comments', {
                url: '/edit-comments',
                templateUrl: 'modules/comments/client/views/edit-comments.client.view.html',
                controller: 'EditCommentsController',
                controllerAs: 'vm'
            });
    }
})();