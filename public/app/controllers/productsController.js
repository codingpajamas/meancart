'use strict'

angular.module('starterApp') 
	.controller('productsController', function($scope, $location, Auth, Product){
		Auth.restrict(); 

		$scope.arrProducts = []; 
		Product.all().success(function(data){ 
				$scope.arrProducts = data.message; 
			});

	})
	.controller('productsViewController', function($scope, $location, $routeParams, Auth, Product, Store, $rootScope, $cacheFactory, Cart){ 

		$scope.objProduct = null; 
		$scope.objStore = null;
		$scope.objRelatedProducts = null;
		$scope.isProductWishlisted = false;
		$scope.isProductInCart = false;
		$scope.intAddToCartQnty = 1;
		$scope.objCart = {
			quantity: 1,
			added: false
		}

		Product.viewByProdid($routeParams.id)
			.success(function(data){ 
				if (true == data.success){ 
					$scope.objProduct = data.success && data.message ? data.message : null; 
					
					Store.getStoreByProductId($scope.objProduct.store.id)
						.success(function(data){
							$scope.objStore = data.success && data.message ? data.message.store : null;
						});

					Product.getRelatedProducts($scope.objProduct._id)
						.success(function(data){
							$scope.objRelatedProducts = data.success && data.message && data.message.length ? data.message : null;
						})

					$scope.isProductWishlisted = _.find($rootScope.rs_me.wishlist, {productid:$scope.objProduct._id}) ? true : false;
					$scope.isProductInCart = $scope.$parent.isOnCart($scope.objProduct._id); 
				}
			})

		$scope.addToWishlist = function(prodId){ 
			Product.addWishlist(prodId)
				.success(function(data){
					if(data.success){
 						// refresh the token since we updated our profile
						var httpCache = $cacheFactory.get('$http'); 
						httpCache.remove('/api/user/me');
						Auth.refreshToken() 
 						$scope.isProductWishlisted = true; 
 					}
				})
		}

		$scope.removeFromWishlist = function(prodId){ 
			Product.removeWishlist(prodId)
				.success(function(data){
					if(data.success){
 						// refresh the token since we updated our profile
						var httpCache = $cacheFactory.get('$http'); 
						httpCache.remove('/api/user/me');
						Auth.refreshToken() 
 						$scope.isProductWishlisted = false; 
 					}
				})
		}

		$scope.addToCart = function(){
			Cart.add($scope.objProduct._id, $scope.objCart.quantity)
				.success(function(data){
					if(data.message && data.success){
						$scope.objCart.added = true;
					}
				})
		}
	})
	.controller('productsAddController', function($scope, $location, Auth, Product, Category){
		Auth.restrict();

		$scope.productMainCat = '';
		$scope.productSubCat = '';

		$scope.isAddPostSuccess = false;
		$scope.isAddPostError = false;  

		$scope.productTags = [];
		$scope.relatedProducts = [];

		$scope.nProductImg1 = "";
		$scope.nProductImg2 = "";
		$scope.nProductImg3 = "";
		$scope.nProductImg4 = "";  

		// test sale date
		$scope.productSaleStart = '05/08/2016';
		$scope.productSaleEnd = '05/18/2016';
		$scope.productSaleOff = 0;

		$scope.mainCategories = Category.main();
		$scope.subCategories = []; 

		Product.get().success(function(data){
			if (true == data.success){ 
				$scope.relatedProducts = data.message; 
			}
		})

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

 			var arrRelated = $scope.productRelated ? $scope.productRelated : []; 

 			formData.append('name', $scope.productName)
 			formData.append('desc', $scope.productDescription) 
 			formData.append('price', $scope.productPrice) 
 			formData.append('maincat', $scope.productMainCat) 
 			formData.append('subcat', $scope.productSubCat) 
 			formData.append('tags', JSON.stringify(_.map($scope.productTags, 'text')))
 			formData.append('related', JSON.stringify(arrRelated))
 			formData.append('saleOff', $scope.productSaleOff) 
 			formData.append('saleStart', $scope.productSaleStart) 
 			formData.append('saleEnd', $scope.productSaleEnd) 

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
	.controller('productsEditController', function($scope, $location, Auth, Product, $routeParams, Category, $filter){

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
		$scope.productTags = [];
		$scope.relatedProducts = [];
		$scope.productRelated = []; 

		Product.view($routeParams.id)
			.success(function(data){ 
				if (true == data.success){ 
					$scope.objProduct = data.message;

					$scope.productMainCat = $scope.objProduct ? $scope.objProduct.category.main : '';
					$scope.subCategories = Category.sub($scope.productMainCat) ? Category.sub($scope.productMainCat) : [];
					$scope.productSubCat = $scope.objProduct ? $scope.objProduct.category.sub : '';
					$scope.productRelated = $scope.objProduct ? $scope.objProduct.related : [];
					$scope.productTags = $scope.objProduct.tags;

					$scope.objProduct.sale.off = parseInt($scope.objProduct.sale.off);
					$scope.objProduct.sale.start = $scope.objProduct.sale.start ? $filter('date')($scope.objProduct.sale.start, 'MM/dd/yyyy') : '';
					$scope.objProduct.sale.end = $scope.objProduct.sale.end ? $filter('date')($scope.objProduct.sale.end, 'MM/dd/yyyy') : '';

					Product.get().success(function(data){
						if (true == data.success){ 
							_.remove(data.message, {_id:$scope.objProduct._id})
							$scope.relatedProducts = data.message;  
						}
					})
				}
			}); 

		$scope.updateTags = function(prodTags){
			$scope.productTags = prodTags;
		}

		$scope.updateRelatedProducts = function(relProds) {
			$scope.productRelated = relProds;
		}
  
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
 			formData.append('maincat', $scope.productMainCat) 
 			formData.append('subcat', $scope.productSubCat) 
 			formData.append('saleOff', $scope.objProduct.sale.off) 
 			formData.append('saleStart', $scope.objProduct.sale.start) 
 			formData.append('saleEnd', $scope.objProduct.sale.end) 

 			var arrRelated = $scope.productRelated ? $scope.productRelated : []; 
			formData.append('related', JSON.stringify(arrRelated));

 			var objTags = _.map($scope.productTags, 'text');
 			if(!objTags[0]){
 				objTags = JSON.stringify($scope.productTags, 'text')
 			}else{
 				objTags = JSON.stringify(_.map($scope.productTags, 'text'))
 			}

 			formData.append('tags', objTags)

 			if($scope.objProduct.images[0]['img1']){
 				formData.append('productImg1', $scope.objProduct.images[0]['img1']) 
 			}
 			if($scope.objProduct.images[0]['img2']){
 				formData.append('productImg2', $scope.objProduct.images[0]['img2']) 
 			}
 			if($scope.objProduct.images[0]['img3']){
 				formData.append('productImg3', $scope.objProduct.images[0]['img3'])
 			}
 			if($scope.objProduct.images[0]['img4']){
 				formData.append('productImg4', $scope.objProduct.images[0]['img4']) 
 			}

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
			switch(angular.element(e.target).attr('data-imgtype')){
				case "productImg1":
					$scope.objProduct.images[0]['img1'] = null
					break;
				case "productImg2":
					$scope.objProduct.images[0]['img2'] = null
					break;
				case "productImg3":
					$scope.objProduct.images[0]['img3'] = null
					break;
				case "productImg4":
					$scope.objProduct.images[0]['img4'] = null
					break; 
			}
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