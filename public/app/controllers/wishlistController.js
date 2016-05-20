'use strict'

angular.module('starterApp')
	.controller('wishlistController', function($scope, $location, Auth, Product, $cacheFactory){
		Auth.restrict();

		$scope.arrWishlists = null;

		Product.getWishlist().success(function(data){
			if(data.success && data.message && data.message.length){
				$scope.arrWishlists = data.message;
			}
		}); 

		$scope.removeFromWishlist = function(prodId){ 
			Product.removeWishlist(prodId)
				.success(function(data){
					if(data.success){
 						// refresh the token since we updated our profile
						var httpCache = $cacheFactory.get('$http'); 
						httpCache.remove('/api/user/me');
						Auth.refreshToken() 
 						
 						_.remove($scope.arrWishlists, _.find($scope.arrWishlists, {"_id":prodId}))
 					}
				})

			return false;
		}
	}) 