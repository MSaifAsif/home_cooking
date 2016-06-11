(function () {
    'use strict';

    angular
        .module('comments')
        .controller('EditCommentsController', EditCommentsController);

    EditCommentsController.$inject = ['$scope', 'CommentsFinderService', 'CommentsService'];

    function EditCommentsController($scope, CommentsFinderService, CommentsService) {
        var vm = this;
        $scope.data = [];
        $scope.data.retrievedComments = [];

        function parseDateToHumanReadable(dateObj) {
            var date =  new Date(dateObj);
            return date.toDateString();
        }

        $scope.deleteComment = function(commentId){
            var params = {
                commentId: commentId
            };
            CommentsService.delete(params, function(res){
                $scope.findComments();
            });
        };

        $scope.findComments = function(){
            var filters = {
                recipeId: $scope.data.recipeId
            };
            CommentsFinderService.findCommentsMatchingFilters.query(filters, function(retrievedCmnts){
                angular.forEach(retrievedCmnts, function(item) {
                    var innerObject = {};
                    innerObject.id = item._id;
                    innerObject.createdDate = parseDateToHumanReadable(item.createdDate);
                    innerObject.isApproved = Boolean(item.isApproved) === true ? 'Approved' : 'Not approved';
                    innerObject.text = item.text;
                    innerObject.author = item.text;
                    $scope.data.retrievedComments.push(innerObject);
                });
            });
        };
    }
})();