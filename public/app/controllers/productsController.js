'use strict'

angular.module('starterApp') 
	.controller('productsController', function($scope, $location, Auth, Product){
		Auth.restrict();

		$scope.arrProducts = [];
		
		Product.all().success(function(data){ 
				$scope.arrProducts = data.message;
				console.log($scope.arrProducts)
			});

	})
	.controller('productsViewController', function($scope, $location, $routeParams, Auth, Product){
		Auth.restrict();

		$scope.objProduct = null;

		Product.view($routeParams.id)
			.success(function(data){ 
				if (true == data.success){ 
					$scope.objProduct = data.message; 
				}
			})
	})
	.controller('productsAddController', function($scope, $location, Auth, Product){
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

 			formData.append('name', $scope.productName)
 			formData.append('desc', $scope.productDescription) 
 			formData.append('price', $scope.productPrice) 

			Product.add(formData)
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
	.controller('productsEditController', function($scope, $location, Auth, Product, $routeParams){
		Auth.restrict();

		$scope.objProduct = null;
		$scope.isEditPostSuccess = false;
		$scope.isEditPostError = false;  

		Product.view($routeParams.id)
			.success(function(data){ 
				if (true == data.success){ 
					$scope.objProduct = data.message; 
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

 			formData.append('name', $scope.objProduct.name)
 			formData.append('desc', $scope.objProduct.desc)
 			formData.append('price', $scope.objProduct.price)
 			formData.append('image', $scope.objProduct.image) 

			Product.put($routeParams.id, formData)
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
	.controller('productsDeleteController', function($scope, $location, Auth, Product, $routeParams){
		Auth.restrict(); 

		$scope.objPost = null;
		$scope.isDeletePostSuccess = false;
		$scope.isDeletePostError = false; 

		Product.view($routeParams.id)
			.success(function(data){ 
				if (true == data.success){ 
					$scope.objPost = data.message; 
				}
			})

		$scope.deletePostSubmit = function(){
			Product.delete($routeParams.id)
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