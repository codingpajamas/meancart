'use strict'

angular.module('starterApp')
	.factory('Store', function($http, $q){
		var StoreFactory = {};

		StoreFactory.getStoreByUrl = function(url){
			console.log(url)
			return $http.get('/api/stores/url/'+url).success(function(data){
				return data;
			})
		} 

		return StoreFactory;
	}) 