'use strict'

angular.module('starterApp')
	.controller('mainController', function($scope, $rootScope, $location, $cookies, $cacheFactory, Auth, Product){

		$rootScope.rs_me = null;
		$rootScope.rs_isManage = $cookies.get('omp_isManage');
		$rootScope.rs_hasStore = false;
		$rootScope.rs_hasProfile = false;

		$scope.homeProducts = []

		$rootScope.$on('$routeChangeStart', function(){
			$scope.isLoggedIn = Auth.isLoggedIn(); 

			if($scope.isLoggedIn){
				Auth.getUser()
					.success(function(data){
						$rootScope.rs_me = data.user;

						if(data.user && data.user.store){
							$rootScope.rs_hasStore = true;
						}else{
							$rootScope.rs_hasStore = false;
						}

						if(data.user && data.user.profile){
							$rootScope.rs_hasProfile = true;
						}else{
							$rootScope.rs_hasProfile = false;
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

		$scope.isWishlisted = function(prodId){
			if($rootScope.rs_me){ 
				return _.find($rootScope.rs_me.wishlist, {productid:prodId}) ? true : false;
			}else{
				return false;
			}
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