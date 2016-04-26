'use strict'

angular.module('starterApp') 
	.controller('settingsController', function($scope, $rootScope, $location, $cookies, $cacheFactory, Auth, Setting){
		Auth.restrict();

		$scope.settings = null;
		$scope.isSettingsSuccess = false;
		$scope.isSettingsError = false

		Setting.get()
			.success(function(data){
				$scope.settings = data.message; 
			});

		$scope.submitSettings = function(){
			Setting.set($scope.settings)
				.success(function(data){
					if(data.success){
						$scope.isSettingsSuccess = true;
						$scope.isSettingsError = false; 

						// check if creating a store - redirect to manage
						if(!$rootScope.rs_isManage){ 
							// turn manage mode
							$rootScope.rs_isManage = true;
							$cookies.put('omp_isManage', true); 

							// refresh the token since we updated our profile
							Auth.refreshToken() 
							
							// redirect to manage page
							$location.path('/manage/products'); 
						}
					}else{
						$scope.isSettingsSuccess = false;
						$scope.isSettingsError = true;
					}
				});			
		}
	}) 