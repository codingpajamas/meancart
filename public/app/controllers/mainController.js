'use strict'

angular.module('starterApp')
	.controller('mainController', function($scope, $rootScope, $location, $cookies, $cacheFactory, Auth){

		$scope.me = null;
		$scope.isManage = $cookies.get('omp_isManage');
		console.log($scope.isManage)
		$scope.hasStore = false;

		$rootScope.$on('$routeChangeStart', function(){
			$scope.isLoggedIn = Auth.isLoggedIn(); 

			if($scope.isLoggedIn){
				Auth.getUser()
					.success(function(data){
						$scope.me = data.user;

						if(data.user && data.user.store){
							$scope.hasStore = true;
						}else{
							$scope.hasStore = false;
						}
					})
					.catch(function(response){
						console.log(response);
					})
			} 
		});

		$scope.manageStore = function(){
			$scope.isManage = true;
			$cookies.put('omp_isManage', true);

			$location.path('/manage/products');
		} 

		$scope.logout = function(){
			$scope.isManage = false;
			$cookies.remove('omp_isManage');

			var httpCache = $cacheFactory.get('$http');  
			//httpCache.remove('api/path');  
			console.log(httpCache)

			Auth.logout();
			$scope.user = {};
			$location.path('/login');
		}
	})