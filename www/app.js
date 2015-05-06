angular.module('app',
    [ 'ionic'
    , 'types'
    , 'config'
    , 'login'
    , 'signup'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                data: {
                    loggedIn: true
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login.html',
                controller: 'loginCtrl',
                data: {
                    loggedIn: false
                }
            })
            .state('index', {
                url: '/index',
                templateUrl: 'index.html'
            })
            .state('types', {
                url: '/types',
                templateUrl: 'view/types/types-list.html'
            })
            .state('config', {
                url: '/config',
                templateUrl: 'view/config/configuration.html'
            })
            .state('otherwise', {
                url: '/login',
                templateUrl: 'login.html',
                controller: 'loginCtrl',
                data: {
                    loggedIn: false
                }
            });
    })
    .controller('appCtrl', function($scope){
        $scope.login = function(){
            $scope.data = {};
            $scope.data.loggedIn = true;
        };
    });