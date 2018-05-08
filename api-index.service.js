(function () {
    'use strict';

    angular
        .module('index')
        .factory('index.apiIndex', factory);

    factory.$inject = ['$http'];

    function factory($http) {

        var service = {
            query: getUsers,
            user: {
                getData: getDataUser,
                getFollowers: getFollowersUser,
                getFollowing: getFollowingUser
            }
        };

        const url = 'https://api.github.com/';

        function getUsers(param) {
            return $http.get(url + 'search/users?q=' + param);
        }

        function getDataUser(userLogin) {
            return $http.get(url + 'users/' + userLogin);
        }

        function getFollowersUser(userLogin) {
            return $http.get(url + 'users/' + userLogin + '/followers');
        }

        function getFollowingUser(userLogin) {
            return $http.get(url + 'users/' + userLogin + '/following');
        }

        return service;
    }
})();
