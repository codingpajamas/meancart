'use strict'

angular.module('starterApp')
	.controller('cartController', function($scope, $location, Auth, Cart){
		Auth.restrict();

		$scope.objCartlist = null;

		Cart.all().success(function(data){ 

			var objProducts = data.message.prods;
			var objCarts = data.message.carts;
			var objStores = data.message.stores;
			
			if(objProducts.length && objCarts.length){ 
				_.map(objProducts, function(objProd){
					var cartItem = _.find(objCarts, function(c){ return c.productid == objProd._id; }); 
					objProd['isOnSale'] = $scope.$parent.isOnSale(objProd.sale); 
					objProd['saleprice'] = $scope.$parent.getSalePrice(objProd);
					objProd['quantity'] = cartItem.quantity; 
					return objProd;
				})   
 
				_.map(objStores, function(objStore){
					objStore['cartItems'] = _.filter(objProducts, {store:{id:objStore._id}}) 
					return objStore;
				})

				$scope.objCartlist = objStores;
			}
		})
	}) 