(function () {
    'use strict';

    angular
        .module('comments')
        .controller('CommentsController', CommentsController);

    CommentsController.$inject = ['$scope', 'CommentsService', '$stateParams', 'Notification'];

    function CommentsController($scope, CommentsService, $stateParams, Notification) {
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
            var newComment = new CommentsService();
            console.log($scope.data.commentAuthorName);
            newComment.recipeId = $stateParams.recipeId;
            newComment.text = $scope.data.commentText;
            if (!!$scope.data.commentAuthorName || $scope.data.commentAuthorName === '') {
                newComment.author = 'anonymous';
            } else {
                newComment.author = $scope.data.commentAuthorName;
            }
            newComment.stars = $scope.data.commentStars;
            newComment.isApproved = false;
            newComment.$save(function(data){
                // reload the comments section
                // TODO this is not working
                $scope.createCommentForm.$setPristine();
                // $scope.getCommentsForRecipe();
                Notification.info('Comment sent for approval');
            });
        };
    }
})();