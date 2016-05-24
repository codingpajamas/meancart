'use strict'

angular.module('starterApp')
	.controller('cartController', function($scope, $location, Auth, Cart){
		Auth.restrict();

		$scope.objCartlist = null;

		Cart.all().success(function(data){ 

			var objProducts = data.message.prods;
			var objCarts = data.message.carts;
			
			if(objProducts.length && objCarts.length){ 
				_.map(objProducts, function(objProd){
					var cartItem = _.find(objCarts, function(c){ return c.productid == objProd._id; }); 
					objProd['quantity'] = cartItem.quantity; 
					return objProd;
				})   

				$scope.objCartlist = _.groupBy(objProducts, 'store.id') 
				console.log($scope.objCartlist) 
			}
		})
	}) 