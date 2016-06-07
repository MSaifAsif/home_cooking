(function() {
  'use strict';

  angular
    .module('comments')
    .controller('CommentsController', CommentsController);

  CommentsController.$inject = ['$scope'];

  function CommentsController($scope) {
    var vm = this;

    // Comments controller logic
    // ...

    init();

    function init() {
    }
  }
})();
