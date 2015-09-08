var homeController = angular.module('homeController',['socket.io']);

homeController.config(function ($socketProvider) {
    $socketProvider.setConnectionUrl('http://192.168.1.67:8080');
});

homeController.controller('HomeController', ['$scope','$socket', function($scope,$socket){

	function remove_duplicates(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    arr = [];
    for (var key in obj) {
        arr.push(key);
    }
    return arr;
	}

	$scope.clients = [];
        $socket.on('connected user', function (data) {
    		$scope.clients.push(data.username);
    		$scope.clients = remove_duplicates($scope.clients);

		});
		$socket.on('disconnected user', function (data) {
    		var index = $scope.clients.indexOf(data.username);
    		if (index > -1) {
			    $scope.clients.splice(index, 1);
			}

    	
		});

}]);