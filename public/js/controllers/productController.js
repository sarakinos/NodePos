var productController = angular.module('productController',[]);

productController.controller('ProductController', ['productServices','$http','$scope', function(productServices,$http,$scope){
	
	var init = function(){
		$scope.order = 'name';
		productServices.getCategories().then(function(data){
			$scope.categories = data;
		});
	}
	$scope.orderFunction = function(value){
		$scope.order = value;
	}
	$scope.getCategoryObject = function(id){
		for(var i=0 ; i<$scope.categories.length ; i++){
			if($scope.categories[i]._id==id){
				return $scope.categories[i];
			}
		}
	}
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
		$scope.registerButton = true;
		$scope.editButton     = false;
		$scope.deleteButton   = false;
		$scope.heading        = "Registration";
		$scope.product  = {};

	}		
	$scope.showProductEdit = function(){
		$scope.registerButton = false;
		$scope.editButton     = true;
		$scope.deleteButton   = true;
		$scope.heading        = "Edit";
		$scope.product        = this.value;

		$scope.showProducts  = false;
		$scope.showRegister  = true;

		$scope.product.category = $scope.getCategoryObject(this.value.category);
	}
	$scope.registerProduct = function(){
		$scope.showProductView();
		productServices.addProduct($scope.product).then(function(data){
			$scope.showProductView();
		});
	}
	$scope.updateProduct = function(){
		$scope.showProductView();

		productServices.updateProduct($scope.product).then(function(data){
			$scope.showProductView();
		});
	}
	$scope.deleteProduct = function(){
		$scope.showProductView();

		productServices.deleteProduct($scope.product).then(function(data){
			$scope.showProductView();
		});
	}
	init();		
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
		},
		updateProduct :function(p){
			var req = {
			 method: 'POST',
			 url: '/api/product/update',
			 data: { 'product': p }
			};

			var promise = $http(req).then(function(response){
				return response;
			});
			return promise;
		},
		deleteProduct : function(p){
			var req = {
			 method: 'POST',
			 url: '/api/product/delete',
			 data: { 'product': p }
			};

			var promise = $http(req).then(function(response){
				return response;
			});
			return promise;
		},
		getCategories : function(){
			var promise = $http.get('/api/category/get').then(function(response){
				return response.data;
			});
			return promise;
		}
	}
	return productServices;
}]);
