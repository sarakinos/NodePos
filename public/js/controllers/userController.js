var userController = angular.module('userController',[]);

userController.controller('UserController', ['userServices','$http','$scope', function(userServices,$http,$scope){
	$scope.order = 'name';
	$scope.orderFunction = function(value){
		$scope.order = value;
	}
	$scope.showUserView = function(){
		$scope.showUsers  = true;
		$scope.showRegister  = false;

		userServices.getUsers().then(function(data){
		$scope.users = data;
		$scope.user  = {};
	});
	}	
	$scope.showUserRegister = function(){
		$scope.registerButton = true;
		$scope.editButton     = false;
		$scope.deleteButton   = false;
		$scope.heading        = "Registration";
		$scope.showUsers      = false;
		$scope.showRegister   = true;

		$scope.user  = {};
	}		
	$scope.showUserEdit = function(){
		$scope.registerButton = false;
		$scope.editButton     = true;
		$scope.deleteButton   = true;
		$scope.heading        = "Edit";
		$scope.user           = this.value.local;
		$scope.user._id       = this.value._id;

		$scope.showUsers  = false;
		$scope.showRegister  = true;
	}
	$scope.registerUser = function(){
		$scope.showUserView();

		//Set admin value to false if the user havent interacted with the checkbox
		if($scope.user.admin==undefined) $scope.user.admin = false;

		userServices.addUser($scope.user).then(function(data){
			$scope.showUserView();
		});
	}
	$scope.updateUser = function(){
		$scope.showUserView();

		userServices.updateUser($scope.user).then(function(data){
			$scope.showUserView();
		});
	}
	$scope.deleteUser = function(){
		$scope.showUserView();

		userServices.deleteUser($scope.user).then(function(data){
			$scope.showUserView();
		});
	}		
}]);

userController
.factory('userServices', ['$http', function($http){
	var userServices = {
		getUsers : function(){
			var promise = $http.get('/api/user/get').then(function(response){
				return response.data;
			});
			return promise;
		},
		addUser : function(u){
			var req = {
			 method: 'POST',
			 url: '/api/user/store',
			 data: { 'user': u }
			};

			var promise = $http(req).then(function(response){
				return response;
			});
			return promise;
		},
		updateUser :function(u){
			var req = {
			 method: 'POST',
			 url: '/api/user/update',
			 data: { 'user': u }
			};

			var promise = $http(req).then(function(response){
				return response;
			});
			return promise;
		},
		deleteUser : function(u){
			var req = {
			 method: 'POST',
			 url: '/api/user/delete',
			 data: { 'user': u }
			};

			var promise = $http(req).then(function(response){
				return response;
			});
			return promise;
		}
	}
	return userServices;
}]);
