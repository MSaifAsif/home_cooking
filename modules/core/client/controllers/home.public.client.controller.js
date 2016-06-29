(function () {
    'use strict';

    angular
        .module('recipes')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Authentication'];

    function HomeController($scope, Authentication) {
        var vm = this;
        // This provides Authentication context.
        $scope.authentication = Authentication;

    }
})();