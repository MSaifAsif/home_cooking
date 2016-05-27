(function () {
    'use strict';

    angular
        .module('recipes')
        .directive('drvRecipeDisplaySteps', drvRecipeDisplaySteps);

    drvRecipeDisplaySteps.$inject = ['$parse', '$compile'];

    function drvRecipeDisplaySteps($parse, $compile) {
        var evenTemplate =   '<div class="media-left">' +
                                '<a href="#">' +
                                  '<img class="media-object" src="http://www.healthyseasonalrecipes.com/wp-content/uploads/2013/03/roasted-garlic-hummus-119.jpg" alt="aaa" height="200">' +
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
                                  '<img class="media-object" src="http://www.healthyseasonalrecipes.com/wp-content/uploads/2013/03/roasted-garlic-hummus-119.jpg" alt="aaa" height="200">' +
                                '</a>' +
                              '</div>';

        return {
            restrict: 'AE',
            replace: 'false',
            scope: {
                recipeDirection: '@',
                recipeNumber: '@'
            },
            link: function(scope, element, attrs) {
                var template;
                if (scope.recipeNumber % 2 === 0) {
                    console.log('even');
                    template = $compile(evenTemplate)(scope);
                } else {
                    console.log('odd');
                    template = $compile(oddTemplate)(scope);
                }
                element.append(template);
            }
        };
    }
})();