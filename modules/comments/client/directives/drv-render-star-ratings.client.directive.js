(function () {
    'use strict';

    angular
        .module('recipes')
        .directive('drvRenderStarRatings', drvRenderStarRatings);

    drvRenderStarRatings.$inject = ['$parse', '$compile'];

    function drvRenderStarRatings($parse, $compile) {

        return {
            restrict: 'E',
            replace: 'false',
            scope: {
                ratingValue: '@'
            },
             template: '<div class="rating">' +
                '<span ng-repeat="s in stars" ng-class="star" ng-click="toggle($index)">' +
                '<span class="glyphicon glyphicon-star-empty"> </span>' +
                // '\u2605' +
                '</span>' +
                '</div>',
            link: function(scope, element, attrs) {
                scope.stars = [];
                for (var i = 0; i < scope.ratingValue; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            }
        };
    }
})();