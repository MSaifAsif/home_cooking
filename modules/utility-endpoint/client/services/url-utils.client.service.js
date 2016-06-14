(function () {
    'use strict';

    angular
        .module('comments')
        .factory('UrlUtilsService', UrlUtilsService);

    UrlUtilsService.$inject = [  ];

    function UrlUtilsService( ) {
        // UrlUtility service logic
        // ...

        // Public API
        return {
            encodeString: function (token) {
                return encodeURI(token);
            },
            decodeString: function (token) {
                return decodeURI(token);
            }
        };
    }
})();