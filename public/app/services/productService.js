'use strict'

angular.module('starterApp')
	.factory('Product', function($http, $q){
		var ProductFactory = {};

		ProductFactory.add = function(fd){
			return $http.post('/api/products/add', fd, {
				transformRequest:angular.identity,
				headers:{'Content-Type':undefined}
			}).success(function(data){
				return data;
			})
		}

		ProductFactory.all = function(){
			return $http.get('/api/products').success(function(data){
				return data;
			})
		}

		ProductFactory.view = function(_id){
			return $http.get('/api/products/'+_id).success(function(data){
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

		return ProductFactory;
	}) 