(function () {
    'use strict';

    angular
        .module('recipes')
        .directive('drvRecipeDisplaySteps', drvRecipeDisplaySteps);

    drvRecipeDisplaySteps.$inject = ['$parse', '$compile'];

    function drvRecipeDisplaySteps($parse, $compile) {
        return {
            restrict: 'AE',
            replace: 'false',
            scope: {
                recipeDirection: '@',
                recipeNumber: '@'
            },
            // template: '<h3>{{recipeDirection}}</h3>',
            // templateUrl: function (tElement, tAttrs) {
            //     if (tAttrs) {
            //         console.log(tAttrs.recipeNumber);
            //         if (tAttrs.recipeNumber % 2 === 0) {
            //             return '../views/pub/fragments/recipe-even-step-template.html';
            //         } else {
            //             return '../views/pub/fragments/recipe-odd-step-template.html';
            //         }
            //     }
            // },
            link: function(scope, element, attrs) {
                // console.log(scope.recipeDirection);

                var template;
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