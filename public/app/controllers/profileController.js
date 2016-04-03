'use strict'

angular.module('starterApp')
	.controller('profileController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		}
	}) 