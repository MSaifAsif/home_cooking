'use strict';

angular.module('category').factory('CategoryService', ['$resource',
    function ($resource) {
        // Category service logic
        // ...

        // Public API
        return $resource('/api/v1/category', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: true
            }
        });
    }
]);