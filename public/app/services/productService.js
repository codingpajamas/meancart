'use strict'

angular.module('starterApp')
	.factory('Product', function($http, $q){
		var ProductFactory = {};

		ProductFactory.all = function(){
			return $http.get('/api/products').success(function(data){
				return data;
			})
		}

		ProductFactory.get = function(){
			return $http.get('/api/products/get').success(function(data){
				return data;
			})
		}

		ProductFactory.view = function(_id){
			return $http.get('/api/products/'+_id).success(function(data){
				return data;
			})
		}

		ProductFactory.getRelatedProducts = function(_id){
			return $http.get('/api/products/'+_id+'/related').success(function(data){
				return data;
			})
		}

		ProductFactory.viewByProdid = function(_id){
			return $http.get('/api/products/'+_id+'/prodid').success(function(data){
				return data;
			})
		}

		ProductFactory.add = function(fd){
			return $http.post('/api/products/add', fd, {
				transformRequest:angular.identity,
				headers:{'Content-Type':undefined}
			}).success(function(data){
				return data;
			})
		}

		ProductFactory.put = function(_id, fd){ 
			return $http.put('/api/products/'+_id, fd, {
				transformRequest:angular.identity,
				headers:{'Content-Type':undefined}
			}).success(function(data){
				return data;
			})
		}

		ProductFactory.delete = function(_id){
			return $http.delete('/api/products/'+_id).success(function(data){
				return data;
			})
		}

		ProductFactory.homeProducts = function(){
			return $http.get('/api/products/home').success(function(data){
				return data;
			})
		}

		return ProductFactory;
	}) 