'use strict';

angular.module('tagwords').factory('TagwordService', ['$resource',
    function ($resource) {
        // Tagwordsservice service logic
        // ...

        // Public API
        return $resource('/api/v1/tagwords', {}, {
            query: {
                method: 'GET'
            }
        });
    }
]);