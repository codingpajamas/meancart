'use strict'

angular.module('starterApp')
	.controller('homeController', function($scope, Product, $rootScope, $window, $location){  
		$scope.boolIsHomeLoading = true;

	 	if($scope.isLoggedIn && $rootScope.rs_me && !$rootScope.rs_isManage && $scope.$parent.homeProducts.length == 0){
			Product.homeProducts().success(function(data){ 
					if(data.success){
						$scope.$parent.homeProducts = data.message;
					}
					$scope.boolIsHomeLoading = false;
				});
	 	}else{
	 		$scope.boolIsHomeLoading = false;
	 	}

	 	$window.onscroll = function(){  
	 		var fullUrlPath = $location.path().replace(/^\/|\/$/g, '');
			var pageUrlPath = fullUrlPath.split("/")[0];

			if(!pageUrlPath && !$scope.boolIsHomeLoading){  
		 		var intOffset = this.pageYOffset + this.outerHeight;
		 		var intPageHeight = angular.element('body')[0].clientHeight;
		 		var intDistance = intPageHeight - intOffset; 

		 		if(intDistance < 500){
		 			$scope.boolIsHomeLoading = true;
		 			Product.homeProducts().success(function(data){ 
						if(data.success){
							_.map(data.message, function(objProd){ 
								$scope.$parent.homeProducts.push(objProd);
							})
						} 
						$scope.boolIsHomeLoading = false;
					});
		 		}
		 	}
	 	}
	})