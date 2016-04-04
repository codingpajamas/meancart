'use strict'

angular.module('starterApp')
	.factory('Post', function($http, $q){
		var PostFactory = {};

		PostFactory.add = function(title, body){
			return $http.post('/api/posts/add', {
				title: title,
				body: body
			}).success(function(data){
				return data;
			})
		}

		PostFactory.all = function(){
			return $http.get('/api/posts').success(function(data){
				return data;
			})
		}

		PostFactory.view = function(_id){
			return $http.get('/api/posts/'+_id).success(function(data){
				return data;
			})
		}

		return PostFactory;
	}) 