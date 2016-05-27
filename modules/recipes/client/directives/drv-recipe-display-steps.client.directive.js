(function () {
    'use strict';

    angular
        .module('recipes')
        .directive('drvRecipeDisplaySteps', drvRecipeDisplaySteps);

    drvRecipeDisplaySteps.$inject = ['$parse', '$compile'];

    function drvRecipeDisplaySteps($parse, $compile) {
        var evenTemplate =   '<div class="media-left">' +
                                '<a href="#">' +
                                  '<img class="media-object" src="{{directionImage}}" alt="aaa" height="200">' +
                                '</a>' +
                              '</div>' +
                              '<div class="media-body media-middle">' +
                                '<span class="para" >{{recipeDirection}}</span>' +
                              '</div>';

        var oddTemplate = '<div class="media-body media-middle">' +
                                '<span class="para" >{{recipeDirection}}</span>' +
                              '</div>' +
                              '<div class="media-right">' +
                                '<a href="#">' +
                                  '<img class="media-object" src="{{directionImage}}" alt="aaa" height="200">' +
                                '</a>' +
                              '</div>';

        return {
            restrict: 'AE',
            replace: 'false',
            scope: {
                recipeDirection: '@',
                recipeNumber: '@',
                directionImage: '@'
            },
            link: function(scope, element, attrs) {
                var template = scope.recipeNumber % 2 === 0 ? evenTemplate : oddTemplate;
                element.append($compile(template)(scope));
            }
        };
    }
})();