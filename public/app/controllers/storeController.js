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
	.controller('storeUrlController', function($scope, Auth, $location, Store){ 
		$scope.objStore = null;
		$scope.storeImg = '/uploads/none.jpg'

		var fullUrlPath = $location.path().replace(/^\/|\/$/g, '');
		var pageUrlPath = fullUrlPath.split("/")[0];
		var isStoreUrl = _.startsWith(pageUrlPath, '@')
 		
 		if(isStoreUrl){  
 			Store.getStoreByUrl(pageUrlPath.substring(1))
 				.success(function(data){
 					$scope.objStore = data.message ? data.message : null; 
 					$scope.storeImg = $scope.objStore.store.avatar ? '/uploads/'+$scope.objStore._id+'/'+$scope.objStore.store.avatar : '/uploads/none.jpg';
 					console.log($scope.objStore)
 				})
 		}
	})  