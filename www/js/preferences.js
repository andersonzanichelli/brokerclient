angular.module('preferences', [])
    .controller('preferencesCtrl', function($scope){

    })
    .service('preferencesService', function(){
        var configuration = function(type, params){
            console.log(type);
            console.log(params);
        };

        return {
            configuration: configuration
        };
    })
    .directive('preferences', function(){
        return {
            restrict: 'E',
            templateUrl: 'views/config/preferences.html'
        };
    });