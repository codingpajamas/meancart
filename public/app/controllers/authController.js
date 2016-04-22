'use strict'

angular.module('starterApp')
	.controller('loginController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn(); 
		$scope.loginError = '';

		if($scope.isLoggedIn){
			$location.path('/dashboard');
		}

		$scope.submitLogin = function(){ 
			Auth.login($scope.login.username, $scope.login.password)
				.success(function(data){  
					if(data.status == 'success'){ 
						$location.path('/dashboard');
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
			$location.path('/dashboard');
		}

		$scope.submitRegister = function(){
			Register.send($scope.register.username, $scope.register.password, $scope.register.storename, $scope.register.fullname)
				.success(function(data){ 
					if(data.status == 'success'){ 
						$location.path('/login');
					}else{
						$scope.registerError = data.message;
					}
				})
		}
	})