'use strict'

angular.module('starterApp')
	.controller('loginController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn(); 
		$scope.loginError = '';

		if($scope.isLoggedIn){
			$location.path('/manage/dashboard');
		}

		$scope.submitLogin = function(){ 
			Auth.login($scope.login.username, $scope.login.password)
				.success(function(data){  
					if(data.status == 'success'){ 
						$location.path('/manage/dashboard');
					}else{
						$scope.loginError = data.message;
					} 
				})
		}
	}) 
	.controller('registerController', function($scope, $location, Auth, Register){
		$scope.isLoggedIn = Auth.isLoggedIn();
		$scope.registerError = '';

		if($scope.isLoggedIn){
			$location.path('/manage/dashboard');
		}

		$scope.submitRegister = function(){
			Register.send($scope.register.username, $scope.register.password, $scope.register.fullname)
				.success(function(data){ 
					if(data.status == 'success'){ 
						$location.path('/login');
					}else{
						$scope.registerError = data.message;
					}
				})
		}
	})
	.controller('logoutController', function($scope, $rootScope, $location, $cookies, $cacheFactory, Auth){ 
		$scope.isManage = false;
		$cookies.remove('omp_isManage');

		var httpCache = $cacheFactory.get('$http');  
		httpCache.remove('/api/user/me');   

		Auth.logout();
		$scope.user = {};
		$location.path('/login');
	})