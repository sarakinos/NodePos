var categoryController = angular.module('categoryController',[]);

categoryController.controller('CategoryController', ['categoryServices','$http','$scope', function(categoryServices,$http,$scope){
	$scope.order = 'name';
	$scope.orderFunction = function(value){
		$scope.order = value;
		console.log($scope.order);
	}
	$scope.showCategoryView = function(){
		$scope.showCategories  = true;
		$scope.showRegister    = false;

		categoryServices.getCategories().then(function(data){
		$scope.categories = data;
		$scope.category  = {};
	});
	}	
	$scope.showCategoryRegister = function(){
		$scope.showCategories  = false;
		$scope.showRegister    = true;
		$scope.registerButton  = true;
		$scope.editButton      = false;
		$scope.deleteButton    = false;
		$scope.heading         = "Registration";
		$scope.category        = {};

	}		
	$scope.showCategoryEdit = function(){
		$scope.registerButton  = false;
		$scope.editButton      = true;
		$scope.deleteButton    = true;
		$scope.heading         = "Edit";
		$scope.category        = this.value;

		$scope.showCategories  = false;
		$scope.showRegister    = true;
	}
	$scope.registerCategory = function(){
		$scope.showCategoryView();

		categoryServices.addCategory($scope.category).then(function(data){
			$scope.showCategoryView()
		});
	}
	$scope.updateCategory = function(){
		$scope.showCategoryView();

		categoryServices.updateCategory($scope.category).then(function(data){
			$scope.showCategoryView();
		});
	}
	$scope.deleteCategory = function(){
		$scope.showCategoryView();

		categoryServices.deleteCategory($scope.category).then(function(data){
			$scope.showCategoryView();
		});
	}		
}]);

categoryController
.factory('categoryServices', ['$http', function($http){
	var categoryServices = {
		getCategories : function(){
			var promise = $http.get('/api/category/get').then(function(response){
				return response.data;
			});
			return promise;
		},
		addCategory : function(c){
			var req = {
			 method: 'POST',
			 url: '/api/category/store',
			 data: { 'category': c }
			};

			var promise = $http(req).then(function(response){
				return response;
			});
			return promise;
		},
		updateCategory :function(c){
			var req = {
			 method: 'POST',
			 url: '/api/category/update',
			 data: { 'category': c }
			};

			var promise = $http(req).then(function(response){
				return response;
			});
			return promise;
		},
		deleteCategory : function(c){
			var req = {
			 method: 'POST',
			 url: '/api/category/delete',
			 data: { 'category': c }
			};

			var promise = $http(req).then(function(response){
				return response;
			});
			return promise;
		}
	}
	return categoryServices;
}]);
