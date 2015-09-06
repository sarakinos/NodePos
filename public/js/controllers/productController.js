var productController = angular.module('productController',[]);

productController.controller('ProductController', ['productServices','$http','$scope', function(productServices,$http,$scope){
	
	$scope.showProductView = function(){
		$scope.showProducts  = true;
		$scope.showRegister  = false;

		productServices.getProducts().then(function(data){
		$scope.products = data;
		$scope.product  = {};
	});
	}	
	$scope.showProductRegister = function(){
		$scope.showProducts  = false;
		$scope.showRegister  = true;
	}		
	$scope.registerProduct = function(){
		$scope.showProductView();

		productServices.addProduct($scope.product).then(function(data){
			$scope.showProductView()
		});
	}
}]);

productController
.factory('productServices', ['$http', function($http){
	var productServices = {
		getProducts : function(){
			var promise = $http.get('/api/product/get').then(function(response){
				return response.data;
			});
			return promise;
		},
		addProduct : function(p){
			var req = {
			 method: 'POST',
			 url: '/api/product/store',
			 data: { 'product': p }
			};

			var promise = $http(req).then(function(response){
				return response;
			});
			return promise;
		}
	}
	return productServices;
}]);
