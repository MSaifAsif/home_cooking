(function () {
    'use strict';

    angular
        .module('recipes')
        .directive('drvRecipeSingleFileUpload', drvRecipeSingleFileUpload);

    drvRecipeSingleFileUpload.$inject = ['$parse'];

    function drvRecipeSingleFileUpload($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.drvRecipeSingleFileUpload);
                element.bind('change', onChangeHandler);
            }
        };
    }
})();