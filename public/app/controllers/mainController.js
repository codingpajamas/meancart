'use strict'

angular.module('starterApp')
	.controller('mainController', function($scope, $rootScope, $location, Auth){
		$rootScope.$on('$routeChangeStart', function(){
			$scope.isLoggedIn = Auth.isLoggedIn();

			Auth.getUser()
				.then(function(data){
					//console.log(data);
				})
				.catch(function(response){
					//console.log(response);
				})
		}); 

		$scope.logout = function(){
			Auth.logout();
			$scope.user = {};
			$location.path('/login');
		}
	})