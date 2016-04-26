'use strict'

angular.module('starterApp')
	.controller('cartController', function($scope, $location, Auth){
		Auth.restrict();
	}) 