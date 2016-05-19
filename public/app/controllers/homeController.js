'use strict'

angular.module('starterApp')
	.controller('homeController', function($scope, Product, $rootScope, $window, $location, $cacheFactory, Auth){  
		$scope.boolIsHomeLoading = true;

	 	if($scope.isLoggedIn && $rootScope.rs_me && !$rootScope.rs_isManage && $scope.$parent.homeProducts.length == 0){
			Product.homeProducts().success(function(data){ 
					if(data.success){ 
						
						$scope.$parent.homeProducts = _.map(data.message, function(objProduct){
							objProduct['isWishListed'] = $scope.$parent.isWishlisted(objProduct['_id']); 
							return objProduct;
						});  
					}

					$scope.boolIsHomeLoading = false;
				});
	 	}else{
	 		$scope.boolIsHomeLoading = false;
	 	} 

		$scope.addToWishlist = function(prodId){ 
			Product.wishlist(prodId)
				.success(function(data){
					if(data.success){
 						// refresh the token since we updated our profile
						var httpCache = $cacheFactory.get('$http'); 
						httpCache.remove('/api/user/me');
						Auth.refreshToken()  
 						var intProDuctIndex = _.indexOf($scope.$parent.homeProducts, _.find($scope.$parent.homeProducts, {_id: prodId}));
						$scope.$parent.homeProducts[intProDuctIndex]['isWishListed'] = true;
 					}
				})
		}

		$scope.removeFromWishlist = function(prodId){ 
			Product.unwishlist(prodId)
				.success(function(data){
					if(data.success){
 						// refresh the token since we updated our profile
						var httpCache = $cacheFactory.get('$http'); 
						httpCache.remove('/api/user/me');
						Auth.refreshToken() 
 						var intProDuctIndex = _.indexOf($scope.$parent.homeProducts, _.find($scope.$parent.homeProducts, {_id: prodId}));
						$scope.$parent.homeProducts[intProDuctIndex]['isWishListed'] = false;
 					}
				})
		}

	 	$window.onscroll = function(){  
	 		var fullUrlPath = $location.path().replace(/^\/|\/$/g, '');
			var pageUrlPath = fullUrlPath.split("/")[0];

			if(!pageUrlPath && !$scope.boolIsHomeLoading){  
		 		var intOffset = this.pageYOffset + this.outerHeight;
		 		var intPageHeight = angular.element('body')[0].clientHeight;
		 		var intDistance = intPageHeight - intOffset; 

		 		if(intDistance < 500){
		 			$scope.boolIsHomeLoading = true;
		 			Product.homeProducts().success(function(data){ 
						if(data.success){
							_.map(data.message, function(objProd){ 
								objProd['isWishListed'] = $scope.$parent.isWishlisted(objProd['_id']); 
								$scope.$parent.homeProducts.push(objProd);
							})
						} 
						$scope.boolIsHomeLoading = false;
					});
		 		}
		 	}
	 	}
	})