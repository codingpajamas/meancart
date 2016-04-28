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