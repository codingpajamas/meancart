'use strict'

angular.module('starterApp')
	.controller('postsController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		} 
	})
	.controller('postViewController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		} 
	})
	.controller('postAddController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		} 
	})
	.controller('postEditController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		} 
	})
	.controller('postDeleteController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		} 
	})