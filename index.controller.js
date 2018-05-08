(function () {
  'use strict';

  angular
    .module('index')
    .controller('HomeController', HomeController);

  HomeController.$inject = [
    '$log',
    'index.apiIndex',
    'core.loadingService'
  ];

  function HomeController($log, apiIndex, loading) {
    var vm = this;

    vm.searchUser = searchUser;
    vm.getDetails = getDetails;

    function searchUser(param) {
    	loading.start();
    	apiIndex
    		.query(param)
    		.then((success) => {
					vm.users = success.data.items;
					vm.errorSearch = null;
					loading.stop();
				})
				.catch(function (failure) {
          loading.stop();
          if (failure.status === 403) {
          	vm.errorSearch = 'Limit for searching users exceed. Please wait a few minutes and try again.';
          } else {
          	vm.errorSearch = failure.data.message;
          }
        });
		}

		function getDetails(user) {
			if (!user.registrationDate) {
				apiIndex
					.user
					.getData(user.login)
					.then((success) => {
						user.email = success.data.email;
						user.registrationDate = success.data.created_at;
						user.name = success.data.name;
						vm.errorDetails = null;
					})
					.catch(function (failure) {
            loading.stop();
            if (failure.status === 403) {
            	vm.errorDetails = "Limit for searching users details exceed. Please wait a few minutes and try again.";
            } else {
            	vm.errorDetails = failure.data.message;
            }
          });

				apiIndex
					.user
					.getFollowers(user.login)
					.then((success) => {
						user.followers = success.data.length;
						vm.errorFollowers = null;
					})
					.catch(function (failure) {
            loading.stop();
            if (failure.status === 403) {
            	vm.errorFollowers = "Limit for searching user's followers exceed. Please wait a few minutes and try again.";
            } else {
            	vm.errorFollowers = failure.data.message;
            }
          });

				apiIndex
					.user
					.getFollowing(user.login)
					.then((success) => {
						user.following = success.data.length;
						vm.errorFollowing = null;
					})
					.catch(function (failure) {
            loading.stop();
            if (failure.status === 403) {
            	vm.errorFollowing = "Limit for searching who the user follows exceed. Please wait a few minutes and try again.";
            } else {
            	vm.errorFollowing = failure.data.message;
            }
          });
			}
		}
  }
})();
