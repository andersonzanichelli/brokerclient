angular.module('config', [])
    .controller('configCtrl', function($scope, configService) {
        $scope.save = function() {
            var config = {
                address: $scope.address,
                port:    $scope.port
            };
            configService.save(config);
            $scope.load();
        };

        $scope.load = function() {
            $scope.host = configService.load();
        };

        $scope.load();
    })
    .directive('configuration', function(){
        return {
            restrict: 'E',
            templateUrl: 'view/config/configuration.html'
        };
    })
    .service('configService', function(){
        var storeEmail = function(email) {
            window.localStorage.setItem('email', email);
        }

        var recoverEmail = function() {
            return window.localStorage.getItem('email');
        }

        var save = function(config){
            window.localStorage.setItem('brokerconfig', JSON.stringify(config));
        };

        var load = function() {
            var host = '';
            var config = JSON.parse(window.localStorage.getItem('brokerconfig'));

            if(config !== null && config.address !== '' && config.address !== undefined) {
                if(temHttp(config.address))
                    host = config.address;
                else {
                    var number = parseInt(config.address.substring(0,1));
                    if(isNaN(number)) {
                        host = 'http://' + config.address;
                    } else {
                        host = config.address;
                    }
                }

                if(config.port) {
                    if(config.port !== undefined && config.port > 0)
                        host = host + ":" + config.port;
                }
            }

            return host;
        };

        function temHttp(address){
            return address.substring(0,7) === 'http://' || address.substring(0,8) === 'https://';
        }

        return {
            save: save,
            load: load,
            storeEmail: storeEmail,
            recoverEmail: recoverEmail
        };
    });