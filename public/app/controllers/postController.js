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

		$scope.filesChanged = function(el){
			$scope.files = el.files
			$scope.$apply();
		}

		$scope.addPostSubmit = function(){
			var formData = new FormData(); 
 			angular.forEach($scope.files, function(file){
 				formData.append('images', file)
 			}) 

 			formData.append('title', $scope.postTitle)
 			formData.append('body', $scope.postContent) 

			Post.add(formData)
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


		$scope.filesChanged = function(el){
			$scope.files = el.files
			$scope.$apply();
		}
 

		$scope.editPostSubmit = function(){  
 			var formData = new FormData(); 
 			angular.forEach($scope.files, function(file){
 				formData.append('images', file)
 			}) 

 			formData.append('title', $scope.objPost.title)
 			formData.append('body', $scope.objPost.body)
 			formData.append('image', $scope.objPost.image) 

			Post.put($routeParams.id, formData)
				.success(function(data){ 
					if (true == data.success){
							$scope.isEditPostSuccess = true;
							$scope.isEditPostError = false; 

							$scope.objPost = data.message;
						}else{
							$scope.isEditPostSuccess = false;
							$scope.isEditPostError = true;
						}
				})
		}

		$scope.removePostImage = function(){
			$scope.objPost.image = 'none.jpg'
			console.log($scope.objPost.image)
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