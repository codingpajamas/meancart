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
			});

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
				return {'name':'ikko'}
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

		return InterceptorFactory;
	})
	.controller('mainController', function($scope){

	})
	.controller('homeController', function($scope){

	})
	.controller('loginController', function($scope){
		$scope.submitLogin = function(){
			console.log($scope.login.username, $scope.login.password);
		}
	})
	.controller('registerController', function($scope){

	})