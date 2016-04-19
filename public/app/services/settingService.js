'use strict'

angular.module('starterApp')
	.factory('Setting', function($http, $q){
		var SettingFactory = {};

		SettingFactory.get = function(){
			return $http.get('/api/settings').success(function(data){
				return data;
			})
		}

		SettingFactory.set = function(inputs){
			return $http.post('/api/settings', inputs).success(function(data){
				return data;
			})
		}

		return SettingFactory;
	}) 