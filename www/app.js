angular.module('app',
    [ 'ionic'
    , 'types'
    , 'config'
    , 'login'
    , 'signup'
    , 'loading'
    , 'preferences'])
    .config(function($stateProvider) {
        $stateProvider
            /*.state('app', {
                abstract: true,
                data: {
                    loggedIn: true
                }
            })*/
            .state('config', {
                url: '/config',
                templateUrl: 'view/config/configuration.html',
                controller: 'configCtrl'
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
            .state('preferences', {
                url: '/preferences',
                templateUrl: 'view/config/preferences.html'
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

        $scope.data = {};

        $scope.configServerAddress = function() {
            $scope.data.loggedIn = true;
            $scope.data.configOnly = true;
        }
    });