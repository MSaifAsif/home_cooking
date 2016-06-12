(function () {
    'use strict';

    angular
        .module('comments')
        .factory('CommentsService', CommentsService);

    CommentsService.$inject = [ '$resource' ];

    function CommentsService( $resource ) {
        // Comments service logic
        // ...

        // Public API
        return $resource('/api/v1/comments', {}, {
            save: {
                method: 'POST'
            },
            query: {
                method: 'GET',
                isArray: true,
                params: {
                    recipeId: '@recipeId'
                }
            },
            delete: {
                method: 'DELETE',
                params: {
                    commentId: '@commentId'
                }
            },
            patch: {
                method: 'PATCH',
                params: {
                    commentId: '@commentId'
                }
            }
        });
    }
})();