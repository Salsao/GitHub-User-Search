(function () {
  'use strict';

  angular
    .module('core')
    .factory('core.loadingService', loadingService);

  loadingService.$inject = ['$rootScope'];

  function loadingService($rootScope) {
    var numRequests = 0;

    return {
        start: show,
        stop: hide,
        forceStop: forceHide
    };

    function show() {
        numRequests += 1;
        $rootScope.loading = true;
    }

    function hide() {
        if (numRequests > 0) {
            numRequests -= 1;
        }
        $rootScope.loading = numRequests > 0;
    }

    function forceHide() {
        numRequests = 0;
        $rootScope.loading = false;
    }
  }
})();
