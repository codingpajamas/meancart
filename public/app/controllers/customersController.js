'use strict'

angular.module('starterApp') 
	.controller('customersController', function($scope, $location, Auth, Post){
		Auth.restrict(); 
	})
	.controller('customersViewController', function($scope, $location, $routeParams, Auth, Post){
		Auth.restrict(); 
	})
	.controller('customersAddController', function($scope, $location, Auth, Post){
		Auth.restrict(); 
	})
	.controller('customersEditController', function($scope, $location, Auth, Post, $routeParams){
		Auth.restrict(); 
	})
	.controller('customersDeleteController', function($scope, $location, Auth, Post, $routeParams){
		Auth.restrict();  
	})