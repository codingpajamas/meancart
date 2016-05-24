'use strict'

angular.module('starterApp')
	.controller('cartController', function($scope, $location, Auth, Cart){
		Auth.restrict();

		Cart.all().success(function(data){
			console.log(data.message)
			//console.log(data.message['573d286abcc08048201139f6'][0].quantity)
		})
	}) 