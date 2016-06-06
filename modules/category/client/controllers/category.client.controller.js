(function () {
    'use strict';

    angular
        .module('category')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$scope', 'CategoryService', 'Notification'];

    function CategoryController($scope, CategoryService, Notification) {
        var vm = this;

        initCategories();

        $scope.categories = [];

        function initCategories() {
            CategoryService.query(function (response) {
                angular.forEach(response, function (item) {
                    $scope.categories.push(item);
                });
                $scope.data.category = $scope.categories[0];
                Notification.success('Categories generated');
            });
        }
    }
})();