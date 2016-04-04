'use strict'

angular.module('starterApp')
	.config(function($routeProvider, $locationProvider, $httpProvider){
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
			.when('/profile', {
				templateUrl : 		'app/partials/profile.html',
				controller : 		'profileController',
				controllerAs : 		'profile'
			})

			/************* POST ROUTES ***************/
			.when('/posts', {
				templateUrl : 		'app/partials/posts/index.html',
				controller : 		'postsController',
				controllerAs : 		'posts'
			})
			.when('/posts/add', {
				templateUrl : 		'app/partials/posts/add.html',
				controller : 		'postAddController',
				controllerAs : 		'postsadd'
			})
			.when('/posts/edit', {
				templateUrl : 		'app/partials/posts/edit.html',
				controller : 		'postEditController',
				controllerAs : 		'postsedit'
			})
			.when('/posts/delete', {
				templateUrl : 		'app/partials/posts/delete.html',
				controller : 		'postDeleteController',
				controllerAs : 		'postsdelete'
			})
			.when('/posts/:id', {
				templateUrl : 		'app/partials/posts/view.html',
				controller : 		'postViewController',
				controllerAs : 		'postsview'
			})


		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('AuthInterceptor');
	})