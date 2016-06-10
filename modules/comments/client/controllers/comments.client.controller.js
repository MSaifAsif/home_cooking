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
            $scope.data.comments = [];
            var filtersData = {
                recipeId: $stateParams.recipeId
            };
            CommentsService.query(filtersData, function (resComment) {
                angular.forEach(resComment, function (item) {
                    $scope.data.comments.push(item);
                });
            });
        };

        $scope.addCommentForRecipe = function() {
            console.log('Saving new comment');
            var newComment = new CommentsService();
            newComment.recipeId = $stateParams.recipeId;
            newComment.text = $scope.data.commentText;
            newComment.author = $scope.data.commentAuthor;
            newComment.stars = $scope.data.commentStars;
            newComment.$save(function(data){
                // reload the comments section
                // TODO this is not working
                $scope.createCommentForm.$setPristine();
                $scope.getCommentsForRecipe();
            });
        };
    }
})();