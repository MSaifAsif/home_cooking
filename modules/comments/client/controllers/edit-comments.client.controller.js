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
            $scope.data.retrievedComments = [];
            var params = {
                commentId: commentId
            };
            CommentsService.get(params, function(theComment){
                $scope.data.editableComment.id = theComment._id;
                $scope.data.editableComment.rating = theComment.stars;
                $scope.data.editableComment.isApproved = theComment.isApproved;
                $scope.data.editableComment.text = theComment.text;
                $scope.data.editableComment.author = theComment.author;
            });
            $('#commentEditModel').modal();
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
                angular.forEach(retrievedCmnts, function(aComments) {
                    var innerObject = {};
                    innerObject.id = aComments._id;
                    innerObject.rating = aComments.stars;
                    innerObject.createdDate = parseDateToHumanReadable(aComments.createdDate);
                    innerObject.isApproved = Boolean(aComments.isApproved) === true ? 'Approved' : 'Not approved';
                    innerObject.text = aComments.text;
                    innerObject.author = aComments.author;
                    $scope.data.retrievedComments.push(innerObject);
                });
            });
        };
    }
})();