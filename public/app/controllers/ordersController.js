'use strict'

angular.module('starterApp') 
	.controller('ordersController', function($scope, $location, Auth, Post){
		Auth.restrict(); 
	})
	.controller('ordersViewController', function($scope, $location, $routeParams, Auth, Post){
		Auth.restrict(); 
	})
	.controller('ordersAddController', function($scope, $location, Auth, Post){
		Auth.restrict(); 
	})
	.controller('ordersEditController', function($scope, $location, Auth, Post, $routeParams){
		Auth.restrict(); 
	})
	.controller('ordersDeleteController', function($scope, $location, Auth, Post, $routeParams){
		Auth.restrict();  
	})