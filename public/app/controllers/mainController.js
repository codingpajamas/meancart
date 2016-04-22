'use strict'

angular.module('starterApp')
	.controller('mainController', function($scope, $rootScope, $location, Auth){

		$scope.me = null;

		$rootScope.$on('$routeChangeStart', function(){
			$scope.isLoggedIn = Auth.isLoggedIn(); 

			if($scope.isLoggedIn){
				Auth.getUser()
					.success(function(data){
						$scope.me = data.user;
					})
					.catch(function(response){
						console.log(response);
					})
			} 
		}); 

		$scope.logout = function(){
			Auth.logout();
			$scope.user = {};
			$location.path('/login');
		}
	})