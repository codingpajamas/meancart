'use strict'

angular.module('starterApp') 
	.controller('productsController', function($scope, $location, Auth, Product){
		Auth.restrict(); 

		$scope.arrProducts = []; 
		Product.all().success(function(data){ 
				$scope.arrProducts = data.message; 
			});

	})
	.controller('productsViewController', function($scope, $location, $routeParams, Auth, Product){ 

		$scope.objProduct = null; 
		Product.view($routeParams.id)
			.success(function(data){ 
				if (true == data.success){ 
					$scope.objProduct = data.message; 
				}
			})
	})
	.controller('productsAddController', function($scope, $location, Auth, Product, Category){
		Auth.restrict();

		$scope.productMainCat = '';
		$scope.productSubCat = '';

		$scope.isAddPostSuccess = false;
		$scope.isAddPostError = false;  

		$scope.nProductImg1 = "";
		$scope.nProductImg2 = "";
		$scope.nProductImg3 = "";
		$scope.nProductImg4 = "";  

		$scope.mainCategories = Category.main();
		$scope.subCategories = []; 

		$scope.updateSubCat = function(){
			$scope.productSubCat = '';
			$scope.subCategories = Category.sub($scope.productMainCat) ? Category.sub($scope.productMainCat) : [];
		}

		// this needs refactoring!!!!
		$scope.addProductImage = function(el){ 
			switch(angular.element(el).attr('data-imgtype')){
				case "productImg1":
					$scope.nProductImg1 = el.files;
					break;
				case "productImg2":
					$scope.nProductImg2 = el.files;
					break;
				case "productImg3":
					$scope.nProductImg3 = el.files;
					break;
				case "productImg4":
					$scope.nProductImg4 = el.files;
					break; 
			}

			var reader = new FileReader();
			reader.onload = function(e) {
				$scope.$apply(function() { 
					angular.element(el).parent('div').css('background-image', 'url('+reader.result+')')
				});
			};

			// get <input> element and the selected file  
			var imgData = el.files[0];
			reader.readAsDataURL(imgData); 


			angular.element(el).parent('div').addClass('hasImage'); 
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
 			formData.append('maincat', $scope.productMainCat) 
 			formData.append('subcat', $scope.productSubCat) 

 			angular.forEach($scope.nProductImg1, function(file){
 				formData.append('nProductImg1', file)
 			});
 			angular.forEach($scope.nProductImg2, function(file){
 				formData.append('nProductImg2', file)
 			});
 			angular.forEach($scope.nProductImg3, function(file){
 				formData.append('nProductImg3', file)
 			});
 			angular.forEach($scope.nProductImg4, function(file){
 				formData.append('nProductImg4', file)
 			});

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

		$scope.removeProductImage = function(e){
			angular.element(e.target).parent('div').css('background-image', 'url(/assets/images/add.png)').removeClass('hasImage'); 
		}
	})
	.controller('productsEditController', function($scope, $location, Auth, Product, $routeParams, Category){
		Auth.restrict();

		$scope.objProduct = null;
		$scope.isEditPostSuccess = false;
		$scope.isEditPostError = false;  

		$scope.nProductImg1 = "";
		$scope.nProductImg2 = "";
		$scope.nProductImg3 = "";
		$scope.nProductImg4 = "";  

		$scope.productMainCat = '';
		$scope.productSubCat = '';

		$scope.mainCategories = Category.main();
		$scope.subCategories = []; 

		Product.view($routeParams.id)
			.success(function(data){ 
				if (true == data.success){ 
					$scope.objProduct = data.message;

					$scope.productMainCat = $scope.objProduct ? $scope.objProduct.category.main : '';
					$scope.subCategories = Category.sub($scope.productMainCat) ? Category.sub($scope.productMainCat) : [];
					$scope.productSubCat = $scope.objProduct ? $scope.objProduct.category.sub : '';
				}
			});
  
		$scope.updateMainCat = function(strMainCat){  
			$scope.productMainCat = strMainCat;
			$scope.productSubCat = '';
			$scope.subCategories = Category.sub($scope.productMainCat) ? Category.sub($scope.productMainCat) : [];
		}

		$scope.updateSubCat = function(strSubCat){  
			$scope.productSubCat = strSubCat;
			$scope.subCategories = Category.sub($scope.productSubCat) ? Category.sub($scope.productSubCat) : [];
		}

		// this needs refactoring!!!!
		$scope.editProductImage = function(el){ 
			switch(angular.element(el).attr('data-imgtype')){
				case "productImg1":
					$scope.nProductImg1 = el.files;
					break;
				case "productImg2":
					$scope.nProductImg2 = el.files;
					break;
				case "productImg3":
					$scope.nProductImg3 = el.files;
					break;
				case "productImg4":
					$scope.nProductImg4 = el.files;
					break; 
			}

			var reader = new FileReader();
			reader.onload = function(e) {
				$scope.$apply(function() { 
					angular.element(el).parent('div').css('background-image', 'url('+reader.result+')')
				});
			};

			// get <input> element and the selected file  
			var imgData = el.files[0];
			reader.readAsDataURL(imgData); 


			angular.element(el).parent('div').addClass('hasImage'); 
			$scope.$apply(); 
		} 
 

		$scope.editPostSubmit = function(){ 
			var formData = new FormData(); 
 			formData.append('name', $scope.objProduct.name)
 			formData.append('desc', $scope.objProduct.desc)
 			formData.append('price', $scope.objProduct.price)
 			formData.append('image', $scope.objProduct.image) 
 			formData.append('productImg1', $scope.objProduct.images.productImg1) 
 			formData.append('productImg2', $scope.objProduct.images.productImg2) 
 			formData.append('productImg3', $scope.objProduct.images.productImg3)
 			formData.append('productImg4', $scope.objProduct.images.productImg4) 
 			formData.append('maincat', $scope.productMainCat) 
 			formData.append('subcat', $scope.productSubCat) 

 			angular.forEach($scope.nProductImg1, function(file){
 				formData.append('nProductImg1', file)
 			});
 			angular.forEach($scope.nProductImg2, function(file){
 				formData.append('nProductImg2', file)
 			});
 			angular.forEach($scope.nProductImg3, function(file){
 				formData.append('nProductImg3', file)
 			});
 			angular.forEach($scope.nProductImg4, function(file){
 				formData.append('nProductImg4', file)
 			});

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

		$scope.removeProductImage = function(e){
			angular.element(e.target).parent('div').css('background-image', 'url(/assets/images/add.png)').removeClass('hasImage');
			$scope.objProduct.images[angular.element(e.target).attr('data-imgtype')] = "";
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