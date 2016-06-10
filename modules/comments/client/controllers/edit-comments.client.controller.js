(function () {
    'use strict';

    angular
        .module('comments')
        .controller('EditCommentsController', EditCommentsController);

    EditCommentsController.$inject = ['$scope', 'CommentsFinderService'];

    function EditCommentsController($scope, CommentsFinderService) {
        var vm = this;
        $scope.data = [];
        $scope.data.retrievedComments = [];

        function parseDateToHumanReadable(dateObj) {
            var date =  new Date(dateObj);
            return date.toDateString();
        }

        $scope.findComments = function(){
            var filters = {
                recipeId: $scope.data.recipeId
            };
            CommentsFinderService.findCommentsMatchingFilters.query(filters, function(retrievedCmnts){
                angular.forEach(retrievedCmnts, function(item) {
                    var innerObject = {};
                    innerObject.createdDate = parseDateToHumanReadable(item.createdDate);
                    innerObject.isApproved = Boolean(item.isApproved) === true ? 'Active' : 'Not active';
                    innerObject.text = item.text;
                    innerObject.author = item.text;
                    $scope.data.retrievedComments.push(innerObject);
                });
            });
        };
    }
})();