'use strict'

angular.module('starterApp')
	.controller('homeController', function($scope, Product, $rootScope, $window){  
	 	if($scope.isLoggedIn && $rootScope.rs_me && !$rootScope.rs_isManage && $scope.$parent.homeProducts.length == 0){
			Product.all().success(function(data){ 
					if(data.success){
						$scope.$parent.homeProducts = data.message; 
					}
				});
	 	}

	 	$window.onscroll = function(){
	 		var intOffset = this.pageYOffset + this.outerHeight;
	 		var intPageHeight = angular.element('body')[0].clientHeight;
	 		var intDistance = intPageHeight - intOffset; 

	 		if(intDistance < 500){
	 			console.log(intPageHeight,intOffset)
	 			console.log('loading new')
	 		}
	 	}
	})