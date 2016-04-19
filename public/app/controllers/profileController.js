'use strict'

angular.module('starterApp')
	.controller('profileController', function($scope, $location, Auth){
		Auth.restrict();
	}) 