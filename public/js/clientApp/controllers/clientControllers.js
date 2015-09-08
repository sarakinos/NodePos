var clientControllers = angular.module('clientControllers',['socket.io']);

clientControllers.config(function ($socketProvider) {
    $socketProvider.setConnectionUrl('http://192.168.1.67:8080');
});

clientControllers.controller('HomeController', ['$scope','$socket', function($scope,$socket){
		$scope.user = window.user;
        $socket.emit('Connected Client', $scope.user);

}])
.controller('OrdersController', ['$scope','$socket', function($scope,$socket){
	$scope.showOrderAdd = true;

	$scope.addOrder = function(){
		$scope.order.u_id   = $scope.user.id;
		$scope.order.status = 'open';
		$socket.emit('OrderPosted',$scope.order);
	}
	

}])
.controller('TablesController', ['$scope','$socket', function($scope,$socket){


}]);