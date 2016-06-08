(function () {
    'use strict';

    angular
        .module('comments')
        .factory('CommentsService', CommentsService);

    CommentsService.$inject = [ /*Example: '$state', '$window' */ ];

    function CommentsService( /*Example: $state, $window */ ) {
        // Comments service logic
        // ...

        // Public API
        return {
            someMethod: function () {
                return true;
            }
        };
    }
})();