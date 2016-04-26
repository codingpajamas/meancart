'use strict'

angular.module('starterApp')
	.controller('mainController', function($scope, $rootScope, $location, $cookies, $cacheFactory, Auth){

		$rootScope.rs_me = null;
		$rootScope.rs_isManage = $cookies.get('omp_isManage');
		$rootScope.rs_hasStore = false;

		$rootScope.$on('$routeChangeStart', function(){
			$scope.isLoggedIn = Auth.isLoggedIn(); 

			if($scope.isLoggedIn){
				Auth.getUser()
					.success(function(data){
						$scope.rs_me = data.user;

						if(data.user && data.user.store){
							$scope.rs_hasStore = true;
						}else{
							$scope.rs_hasStore = false;
						}
					})
					.catch(function(response){
						console.log(response);
					})
			} 
		});

		$scope.manageStore = function(){
			$rootScope.rs_isManage = true;
			$cookies.put('omp_isManage', true);

			$location.path('/manage/products');
		} 

		$scope.manageout = function(){
			$rootScope.rs_isManage = false;
			$cookies.remove('omp_isManage');

			$location.path('/');
		}

		$scope.logout = function(){
			$rootScope.rs_isManage = false;
			$cookies.remove('omp_isManage');

			var httpCache = $cacheFactory.get('$http');  
			//httpCache.remove('api/path');  
			console.log(httpCache)

			Auth.logout();
			$scope.user = {};
			$location.path('/login');
		}
	})