(function () {
    'use strict';

    angular
        .module('comments')
        .controller('EditCommentsController', EditCommentsController);

    EditCommentsController.$inject = ['$scope', 'CommentsFinderService', 'CommentsService'];

    function EditCommentsController($scope, CommentsFinderService, CommentsService) {
        var vm = this;
        $scope.data = [];
        $scope.data.editableComment = {};
        $scope.data.retrievedComments = [];

        function parseDateToHumanReadable(dateObj) {
            var date =  new Date(dateObj);
            return date.toDateString();
        }

        $scope.deleteComment = function(commentId){
            $scope.data.retrievedComments = [];
            var params = {
                commentId: commentId
            };
            CommentsService.delete(params, function(res){
                $scope.findComments();
            });
        };

        $scope.getEditCommentModal = function(commentId){
            console.log(commentId);
            var params = {
                commentId: commentId
            };
            CommentsFinderService.getCommentByCommentId.get(params, function(theCommentToEdit){
                $scope.data.editableComment.id = theCommentToEdit._id;
                $scope.data.editableComment.rating = theCommentToEdit.stars;
                $scope.data.editableComment.isApproved = theCommentToEdit.isApproved;
                $scope.data.editableComment.text = theCommentToEdit.text;
                $scope.data.editableComment.author = theCommentToEdit.author;
                $('#commentEditModel').modal();
            });
        };

        $scope.findComments = function(){
            var filtersData = {
                recipeId: $scope.data.recipeId
            };

            // first get count of results
            var q = CommentsFinderService.countCommentsMatchingFilters.get(filtersData, function(count){
                $scope.data.retrievedCommentsCount = count.total_comments;
            });


            CommentsFinderService.findCommentsMatchingFilters.query(filtersData, function(retrievedCmnts){
                angular.forEach(retrievedCmnts, function(aComment) {
                    var innerObject = {};
                    innerObject.id = aComment._id;
                    innerObject.rating = aComment.stars;
                    innerObject.createdDate = parseDateToHumanReadable(aComment.createdDate);
                    innerObject.isApproved = Boolean(aComment.isApproved) === true ? 'Approved' : 'Not approved';
                    innerObject.text = aComment.text;
                    innerObject.author = aComment.author;
                    $scope.data.retrievedComments.push(innerObject);
                });
            });
        };
    }
})();