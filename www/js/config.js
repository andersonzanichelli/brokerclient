angular.module('config', [])
    .controller('configCtrl', function($scope) {
        $scope.save = function() {
                var config = {
                    address: $scope.address,
                    port:    $scope.port
                };
                window.localStorage.setItem('configuration', JSON.stringify(config));
            };

        $scope.load = function() {
                $scope.data = JSON.parse(window.localStorage.getItem('configuration'));
            };
    })
    .directive('configuration', function(){
        return {
            restrict: 'E',
            templateUrl: 'view/config/configuration.html'
        };
    });