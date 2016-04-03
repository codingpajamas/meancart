'use strict'

angular.module('starterApp')
	.controller('dashboardController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		}
	})