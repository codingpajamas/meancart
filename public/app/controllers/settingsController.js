'use strict'

angular.module('starterApp') 
	.controller('settingsController', function($scope, $location, Auth){
		Auth.restrict(); 
	}) 