(function () {
    'use strict';

    angular
        .module('comments')
        .factory('CommentsFinderService', CommentsFinderService);

    CommentsFinderService.$inject = [ '$resource' ];

    function CommentsFinderService( $resource ) {
        // Comments service logic
        // ...

        // Public API
        return {
            findCommentsMatchingFilters: $resource('/api/v1/comments/find', {}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        recipeId: '@recipeId'
                    }
                }
            }),
            countCommentsMatchingFilters: $resource('/api/v1/comments/count', {}, {
                get: {
                    method: 'GET',
                    params: {
                        recipeId: '@recipeId'
                    }
                }
            })
        };
    }
})();