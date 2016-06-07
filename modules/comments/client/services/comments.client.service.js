(function () {
  'use strict';

  angular
    .module('comments')
    .factory('commentsService', commentsService);

  commentsService.$inject = [/*Example: '$state', '$window' */];

  function commentsService(/*Example: $state, $window */) {
    // Comments service logic
    // ...

    // Public API
    return {
      someMethod: function () {
        return true;
      }
    };
  }
})();
