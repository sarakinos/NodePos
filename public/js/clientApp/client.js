var clientApp = angular.module('clientApp',['clientControllers','ngRoute']);

clientApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: '/public/js/clientApp/views/home.html',
        controller: 'HomeController'
      }).
      when('/orders', {
        templateUrl: '/public/js/clientApp/views/orders.html',
        controller: 'OrdersController'
      }).
      when('/tables', {
        templateUrl: '/public/js/clientApp/views/tables.html',
        controller: 'TablesController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);