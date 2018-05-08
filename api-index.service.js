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
        const accessToken = 'access_token=bf4081fb7e694b5676f6ffe6c791212fd6a8a82a';

        function getUsers(param) {
            return $http.get(url + 'search/users?q=' + param + '&' + accessToken);
        }

        function getDataUser(userLogin) {
            return $http.get(url + 'users/' + userLogin + '?' + accessToken);
        }

        function getFollowersUser(userLogin) {
            return $http.get(url + 'users/' + userLogin + '/followers?' + accessToken);
        }

        function getFollowingUser(userLogin) {
            return $http.get(url + 'users/' + userLogin + '/following?' + accessToken);
        }

        return service;
    }
})();