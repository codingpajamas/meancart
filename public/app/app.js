'use strict'

angular.module('starterApp', ['ngRoute', 'ngAnimate', 'ngCookies'])
	.run(function($rootScope, $location){
		$rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
			var fullUrlPath = $location.path().replace(/^\/|\/$/g, '');
			var pageUrlPath = fullUrlPath.split("/")[0];
			$rootScope.pagePath = pageUrlPath;
		});
	})
	
	
	
	
	