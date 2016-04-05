'use strict'

angular.module('starterApp')
	.controller('postsController', function($scope, $location, Auth, Post){
		Auth.restrict();

		$scope.arrPosts = [];
		
		Post.all().success(function(data){ 
				$scope.arrPosts = data.message;
			});

	})
	.controller('postViewController', function($scope, $location, $routeParams, Auth, Post){
		Auth.restrict();

		$scope.objPost = null;

		Post.view($routeParams.id)
			.success(function(data){ 
				if (true == data.success){ 
					$scope.objPost = data.message; 
				}
			})
	})
	.controller('postAddController', function($scope, $location, Auth, Post){
		Auth.restrict();

		$scope.isAddPostSuccess = false;
		$scope.isAddPostError = false; 

		$scope.addPostSubmit = function(){
			Post.add($scope.postTitle, $scope.postContent)
				.success(function(data){  
					if (true == data.success){
						$scope.isAddPostSuccess = true;
						$scope.isAddPostError = false; 
					}else{
						$scope.isAddPostSuccess = false;
						$scope.isAddPostError = true;
					}
				});
		}
	})
	.controller('postEditController', function($scope, $location, Auth, Post, $routeParams){
		Auth.restrict();

		$scope.objPost = null;
		$scope.isEditPostSuccess = false;
		$scope.isEditPostError = false; 


		Post.view($routeParams.id)
			.success(function(data){ 
				if (true == data.success){ 
					$scope.objPost = data.message; 
				}
			})

		$scope.editPostSubmit = function(){  
			Post.put($routeParams.id, $scope.objPost.title, $scope.objPost.body)
				.success(function(data){ 
					if (true == data.success){
							$scope.isEditPostSuccess = true;
							$scope.isEditPostError = false; 
						}else{
							$scope.isEditPostSuccess = false;
							$scope.isEditPostError = true;
						}
				})
		}
	})
	.controller('postDeleteController', function($scope, $location, Auth, Post, $routeParams){
		Auth.restrict(); 

		$scope.objPost = null;
		$scope.isDeletePostSuccess = false;
		$scope.isDeletePostError = false; 

		Post.view($routeParams.id)
			.success(function(data){ 
				if (true == data.success){ 
					$scope.objPost = data.message; 
				}
			})

		$scope.deletePostSubmit = function(){
			Post.delete($routeParams.id)
				.success(function(data){ 
					if (true == data.success){
							$scope.isDeletePostSuccess = true;
							$scope.isDeletePostError = false; 
						}else{
							$scope.isDeletePostSuccess = false;
							$scope.isDeletePostError = true;
						}
				});

			return false;
		}
	})