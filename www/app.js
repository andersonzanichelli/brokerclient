angular.module('app',
    [ 'ionic'
    , 'types'
    , 'config'])
    .config(function($stateProvider) {
        $stateProvider
            .state('types', {
                url: '/types',
                templateUrl: 'view/types/types-list.html'
            })
            .state('config', {
                url: '/config',
                templateUrl: 'view/config/configuration.html'
            });
    });