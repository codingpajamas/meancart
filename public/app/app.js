'use strict'

angular.module('starterApp', ['ngRoute', 'ngAnimate'])
	.config(function($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				templateUrl : 		'app/partials/home.html',
				controller : 		'homeController',
				controllerAs : 		'home'
			})
			.when('/login', {
				templateUrl : 		'app/partials/login.html',
				controller : 		'loginController',
				controllerAs : 		'login'
			})
			.when('/register', {
				templateUrl : 		'app/partials/register.html',
				controller : 		'registerController',
				controllerAs : 		'register'
			})
			.when('/dashboard', {
				templateUrl : 		'app/partials/dashboard.html',
				controller : 		'dashboardController',
				controllerAs : 		'dashboard'
			})

		$locationProvider.html5Mode(true);
	})
	.factory('Auth', function($http, $q, AuthToken){
		var AuthFactory = {};

		// login
		AuthFactory.login = function(username, password){
			return $http.post('/api/auth/login', {
				username: username,
				password: password
			}).success(function(data){
				AuthToken.setToken(data.token);
				return data;
			});
		};

		// logout
		AuthFactory.logout = function(){
			AuthToken.setToken();
		};

		// check if user login
		AuthFactory.isLoggedIn = function(){
			if(AuthToken.getToken()){
				return true;
			}else{
				return false;
			}
		}

		// get user info
		AuthFactory.getUser = function(){
			if(AuthToken.getToken()){ 
				return $http.get('/api/me', { cache: true });
			}else{ 
				return $q.reject({'message':'User has no token'})
			}
		}

		return AuthFactory;
	})
	.factory('AuthToken', function($window){
		var AuthTokenFactory = {};

		// get token
		AuthTokenFactory.getToken = function(){
			return $window.localStorage.getItem('token');
		};

		// set/clear token
		AuthTokenFactory.setToken = function(token){
			if(token){
				$window.localStorage.setItem('token', token);
			}else{
				$window.localStorage.removeItem('token');
			}
		}

		return AuthTokenFactory;
	})
	.factory('AuthInterceptor', function($q, AuthToken){
		var InterceptorFactory = {}

		// attach token to every request
		InterceptorFactory.request = function(config){
			var token = AuthToken.getToken();

			if(token){
				config.headers['x-access-token'] = token;
			}

			return config;
		}

		// redirect if token doesnt authenticate
		InterceptorFactory.responseError = function(response){
			if(response.status = 403){
				$location.path('/login');
			}

			return $q.reject(response);
		}

		return InterceptorFactory;
	})
	.controller('mainController', function($scope, $rootScope, $location, Auth){
		$rootScope.$on('$routeChangeStart', function(){
			$scope.isLoggedIn = Auth.isLoggedIn();

			Auth.getUser()
				.then(function(data){
					console.log(data);
				})
				.catch(function(response){
					console.log(response);
				})
		}); 

		$scope.logout = function(){
			Auth.logout();
			$scope.user = {};
			$location.path('/login');
		}
	})
	.controller('homeController', function($scope){

	})
	.controller('loginController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn){
			$location.path('/dashboard');
		}

		$scope.submitLogin = function(){
			Auth.login($scope.login.username, $scope.login.password)
				.success(function(data){
					$location.path('/dashboard');
				})
		}
	})
	.controller('registerController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn){
			$location.path('/dashboard');
		}
	})
	.controller('dashboardController', function($scope, $location, Auth){
		$scope.isLoggedIn = Auth.isLoggedIn();

		if($scope.isLoggedIn == false){
			$location.path('/login');
		}
	})