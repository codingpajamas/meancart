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
					objProd['cartid'] = cartItem._id; 
					return objProd;
				})    
 
				_.map(objStores, function(objStore){
					objStore['cartItems'] = _.filter(objProducts, {store:{id:objStore._id}}) 
					return objStore;
				})

				$scope.objCartlist = objStores;
				console.log($scope.objCartlist)
			}
		});

		$scope.updateCartItem = function(intCartQnty, cartid){
			if(intCartQnty){
				console.log(intCartQnty, cartid)
				Cart.update(cartid, intCartQnty)
					.success(function(data){
						console.log(data)
					})
			}
		}

		$scope.removeCartItem = function(cartId, $parentIndex, $index){
			Cart.delete(cartId).success(function(data){
				if(data.success){ 
					_.remove($scope.objCartlist[$parentIndex]['cartItems'], _.find($scope.objCartlist[$parentIndex]['cartItems'], {"cartid":cartId})) 

				}
			}) 
			return false;
		} 
	}) 




/*
* create cart model 
* add [add to cart] button on product page
^ create cart service 
* create Cart route API
* create cart/add cart method in cart api
* create addToCart functionality in productctrl
* create getcart method in cart api
* display carts in cart page
* create sale checker
  display products in cart when viewing a store
  cart page per store
* add remove button in cart item
* add removeFromCart functionality in cartctrl
  update cart item in product page if product exist in cart
  update quantity in cart page
* add updateCart functionality in cartCtrl
* create updatecart method in cart  api
  add submit button
  add submit functionality in cartCtrl
  add submitCart method in cart api
  create is in cart checker
  add cart icon in product card
 */