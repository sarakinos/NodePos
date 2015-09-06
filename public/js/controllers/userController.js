var userController = angular.module('userController',[]);

userController.controller('UserController', ['userServices','$http','$scope', function(userServices,$http,$scope){
	
	$scope.showUserView = function(){
		$scope.showUsers  = true;
		$scope.showRegister  = false;

		userServices.getUsers().then(function(data){
		$scope.users = data;
		$scope.user  = {};
	});
	}	
	$scope.showUserRegister = function(){
		$scope.showUsers  = false;
		$scope.showRegister  = true;
	}		
	$scope.registerUser = function(){
		$scope.showUserView();

		userServices.addUser($scope.user).then(function(data){
			$scope.showUserView()
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
		}
	}
	return userServices;
}]);
