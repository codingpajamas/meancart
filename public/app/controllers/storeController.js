'use strict'

angular.module('starterApp') 
	.controller('storeController', function($scope, Auth){
		Auth.restrict();
	}) 
	.controller('storeReveiwsController', function($scope, Auth){
		Auth.restrict();
	}) 
	.controller('storeProductsController', function($scope, Auth){
		Auth.restrict();
	}) 
	.controller('storeUrlController', function($scope, Auth, $location, Store, $rootScope, $cacheFactory){ 
		$scope.objStore = null;
		$scope.objStoreProducts = []
		$scope.storeImg = '/uploads/none.jpg'
		$scope.isfollowed = false;

		var fullUrlPath = $location.path().replace(/^\/|\/$/g, '');
		var pageUrlPath = fullUrlPath.split("/")[0];
		var isStoreUrl = _.startsWith(pageUrlPath, '@')
 		
 		if(isStoreUrl){  
 			Store.getStoreByUrl(pageUrlPath.substring(1))
 				.success(function(data){
 					if(data.message){
 						$scope.objStore = data.message ? data.message : null; 
 						$scope.storeImg = $scope.objStore.store.avatar ? '/uploads/'+$scope.objStore._id+'/'+$scope.objStore.store.avatar : '/uploads/none.jpg';
 					
 						Store.getStoreProducts($scope.objStore._id)
 							.success(function(data){
 								$scope.objStoreProducts = data.success ? data.message : [];
 								$scope.isfollowed = _.indexOf($rootScope.rs_me.followed, $scope.objStore._id) != -1 ? true : false; 
 							})
 					} 
 				})
 		}

 		$scope.followStore = function(ev){
 			Store.follow($scope.objStore._id)
 				.success(function(data){
 					if(data.success){
 						// refresh the token since we updated our profile
						var httpCache = $cacheFactory.get('$http'); 
						httpCache.remove('/api/user/me');
						Auth.refreshToken() 
 						$scope.isfollowed = true;
 					}
 				})
 			return false;
 		}

 		$scope.unfollowStore = function(ev){
 			Store.unfollow($scope.objStore._id)
 				.success(function(data){
 					if(data.success){
 						// refresh the token since we updated our profile
						var httpCache = $cacheFactory.get('$http'); 
						httpCache.remove('/api/user/me');
						Auth.refreshToken() 
 						$scope.isfollowed = false;
 					}
 				})
 			return false;
 		}
	})  