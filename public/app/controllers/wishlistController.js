'use strict'

angular.module('starterApp')
	.controller('wishlistController', function($scope, $location, Auth){
		Auth.restrict();
	}) 