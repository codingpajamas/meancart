'use strict'

angular.module('starterApp')
	.controller('postsController', function($scope, $location, Auth, Post){
		$scope.arrPosts = [];
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		}  
		Post.all().success(function(data){ 
				$scope.arrPosts = data.message;
			});

	})
	.controller('postViewController', function($scope, $location, $routeParams, Auth, Post){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		}  

		Post.view($routeParams.id)
			.success(function(data){
				console.log(data)
			})
	})
	.controller('postAddController', function($scope, $location, Auth, Post){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		} 

		$scope.addPostSubmit = function(){
			Post.add($scope.postTitle, $scope.postContent)
				.success(function(data){ 
					console.log(data);
				});
		}
	})
	.controller('postEditController', function($scope, $location, Auth, Post){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		} 
	})
	.controller('postDeleteController', function($scope, $location, Auth, Post){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		} 
	})