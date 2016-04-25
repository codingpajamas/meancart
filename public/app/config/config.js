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
			.when('/logout', {
				templateUrl : 		'app/partials/login.html',
				controller : 		'logoutController',
				controllerAs : 		'logout'
			})
			.when('/register', {
				templateUrl : 		'app/partials/register.html',
				controller : 		'registerController',
				controllerAs : 		'register'
			})
			.when('/forgot', {
				templateUrl : 		'app/partials/forgot.html',
				controller : 		'forgotController',
				controllerAs : 		'forgot'
			}) 
			.when('/profile', {
				templateUrl : 		'app/partials/profile.html',
				controller : 		'profileController',
				controllerAs : 		'profile'
			})
			.when('/manage/settings', {
				templateUrl : 		'app/partials/settings/index.html',
				controller : 		'settingsController',
				controllerAs : 		'settings'
			})

			/************* DASHBOARD ROUTES ***************/
			.when('/manage/dashboard', {
				templateUrl : 		'app/partials/dashboard.html',
				controller : 		'dashboardController',
				controllerAs : 		'dashboard'
			})

			/************* PRODUCTS ROUTES ***************/
			.when('/manage/products', {
				templateUrl : 		'app/partials/products/index.html',
				controller : 		'productsController',
				controllerAs : 		'products'
			})
			.when('/manage/products/add', {
				templateUrl : 		'app/partials/products/add.html',
				controller : 		'productsAddController',
				controllerAs : 		'productsadd'
			})
			.when('/manage/products/:id/edit', {
				templateUrl : 		'app/partials/products/edit.html',
				controller : 		'productsEditController',
				controllerAs : 		'productsedit'
			})
			.when('/manage/products/:id/delete', {
				templateUrl : 		'app/partials/products/delete.html',
				controller : 		'productsDeleteController',
				controllerAs : 		'productsdelete'
			})
			.when('/manage/products/:id', {
				templateUrl : 		'app/partials/products/view.html',
				controller : 		'productsViewController',
				controllerAs : 		'productsview'
			})

			/************* ORDERS ROUTES ***************/
			.when('/manage/orders', {
				templateUrl : 		'app/partials/orders/index.html',
				controller : 		'ordersController',
				controllerAs : 		'orders'
			})
			.when('/manage/orders/add', {
				templateUrl : 		'app/partials/orders/add.html',
				controller : 		'ordersAddController',
				controllerAs : 		'ordersadd'
			})
			.when('/manage/orders/edit/:id', {
				templateUrl : 		'app/partials/orders/edit.html',
				controller : 		'ordersEditController',
				controllerAs : 		'ordersedit'
			})
			.when('/manage/orders/delete/:id', {
				templateUrl : 		'app/partials/orders/delete.html',
				controller : 		'ordersDeleteController',
				controllerAs : 		'ordersdelete'
			})
			.when('/manage/orders/:id', {
				templateUrl : 		'app/partials/orders/view.html',
				controller : 		'ordersViewController',
				controllerAs : 		'ordersview'
			})


			/************* CUSTOMERS ROUTES ***************/
			.when('/manage/customers', {
				templateUrl : 		'app/partials/customers/index.html',
				controller : 		'customersController',
				controllerAs : 		'customers'
			})
			.when('/manage/customers/add', {
				templateUrl : 		'app/partials/customers/add.html',
				controller : 		'customersAddController',
				controllerAs : 		'customersadd'
			})
			.when('/manage/customers/edit/:id', {
				templateUrl : 		'app/partials/customers/edit.html',
				controller : 		'customersEditController',
				controllerAs : 		'customersedit'
			})
			.when('/manage/customers/delete/:id', {
				templateUrl : 		'app/partials/customers/delete.html',
				controller : 		'customersDeleteController',
				controllerAs : 		'customersdelete'
			})
			.when('/manage/customers/:id', {
				templateUrl : 		'app/partials/customers/view.html',
				controller : 		'customersViewController',
				controllerAs : 		'customersview'
			})


			/************* PRODUCT VIEW ROUTES ***************/
			.when('/p/:id', {
				templateUrl : 		'app/partials/products/view.html',
				controller : 		'productsController',
				controllerAs : 		'productsview'
			}) 


			/************* STORE ROUTES ***************/
			.when('/s/:id', {
				templateUrl : 		'app/partials/stores/index.html',
				controller : 		'storesController',
				controllerAs : 		'stores'
			}) 
			.when('/s/:id/reviews', {
				templateUrl : 		'app/partials/stores/reviews.html',
				controller : 		'storesController',
				controllerAs : 		'storesreviews'
			}) 
			.when('/s/:id/products', {
				templateUrl : 		'app/partials/stores/products.html',
				controller : 		'storesController',
				controllerAs : 		'storesproducts'
			}) 
 

		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('AuthInterceptor');
	})