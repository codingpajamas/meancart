'use strict'

angular.module('starterApp')
	.factory('Store', function($http, $q){
		var StoreFactory = {};

		StoreFactory.getStoreByUrl = function(url){
			return $http.get('/api/stores/url/'+url).success(function(data){
				return data;
			})
		} 

		StoreFactory.getStoreByProductId = function(url){
			return $http.get('/api/stores/getbyproductid/'+url).success(function(data){
				return data;
			})
		} 

		StoreFactory.getStoreProducts = function(id){
			return $http.get('/api/stores/'+id+'/products').success(function(data){
				return data;
			})
		} 

		return StoreFactory;
	}) 