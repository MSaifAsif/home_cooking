(function () {
    'use strict';

    angular
        .module('category')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$scope', 'CategoryService'];

    function CategoryController($scope, CategoryService) {
        var vm = this;

        initCategories();

        $scope.categories = [];

        function initCategories() {
            CategoryService.query(function (response) {
                angular.forEach(response, function (item) {
                    $scope.categories.push(item);
                });
            });
        }
    }
})();