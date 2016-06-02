'use strict'

angular.module('starterApp')
	.controller('mainController', function($scope, $rootScope, $location, $cookies, $cacheFactory, Auth, Product){

		$rootScope.rs_me = null;
		$rootScope.rs_isManage = $cookies.get('omp_isManage');
		$rootScope.rs_hasStore = false;
		$rootScope.rs_hasProfile = false;

		$scope.homeProducts = []
		$scope.homePageNum = 1;
		$scope.homeProductsEnd = false;

		$rootScope.$on('$routeChangeStart', function(){
			$scope.isLoggedIn = Auth.isLoggedIn(); 

			if($scope.isLoggedIn){
				Auth.getUser()
					.success(function(data){
						$rootScope.rs_me = data.user ? data.user : null;
						$rootScope.rs_me.cart = data.cart && data.user ? data.cart : [];  

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

		$scope.isOnSale = function(objSale){
			return objSale && parseInt(objSale.off) && moment().isBetween(new Date(objSale.start), new Date(objSale.end)) ? true : false;
		}

		$scope.isOnCart = function(prodId){ 
			if($rootScope.rs_me){ 
				return _.includes($rootScope.rs_me.cart, prodId) ? true : false;
			}else{
				return false;
			}
		}

		$scope.getSalePrice = function(objProd){
			return $scope.isOnSale(objProd.sale) ? (objProd.price - (objProd.price*parseInt(objProd.sale.off)/100)) :  objProd.price;
		}

		$scope.logout = function(){
			$rootScope.rs_isManage = false;
			$scope.homeProducts = [];
			$cookies.remove('omp_isManage');

			var httpCache = $cacheFactory.get('$http');  
			//httpCache.remove('api/path');  
			console.log(httpCache)

			Auth.logout();
			$scope.user = {};
			$location.path('/login');
		}
	})