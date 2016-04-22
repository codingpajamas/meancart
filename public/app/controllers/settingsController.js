'use strict'

angular.module('starterApp') 
	.controller('settingsController', function($scope, $location, Auth, Setting){
		Auth.restrict();

		$scope.settings = null;

		Setting.get()
			.success(function(data){
				$scope.settings = data.message; 
			});

		$scope.submitSettings = function(){
			Setting.set($scope.settings)
				.success(function(data){
					//
				});			
		}
	}) 