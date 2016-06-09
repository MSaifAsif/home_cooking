(function () {
    'use strict';

    angular
        .module('comments')
        .controller('CommentsController', CommentsController);

    CommentsController.$inject = ['$scope', 'CommentsService', '$stateParams'];

    function CommentsController($scope, CommentsService, $stateParams) {
        var vm = this;
        $scope.data.comments = []; 

        $scope.getCommentsForRecipe = function() {
            var filtersData = {
                recipeId: $stateParams.recipeId
            };
            CommentsService.query(filtersData, function (resComment) {
                angular.forEach(resComment, function (item) {
                    $scope.data.comments.push(item);
                });
            });
        };
    }
})();