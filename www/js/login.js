angular.module('login', [])
    .controller('loginCtrl', function($scope, $http, configService){
        $scope.host = configService.load();
        $scope.message = '';

        $scope.login = function() {
            $scope.data.loggedIn = true;
            if ($scope.email && $scope.password) {
                $scope.loading = true;
                var user = {
                    "email": $scope.email,
                    "password": CryptoJS.SHA256($scope.password).toString()
                };
                var promisse = $http.get($scope.host + '/login/' + '/' + user['email'] + '/' + user['password']);

                promisse.success(function (data) {
                    $scope.loading = false;
                    if (data.logged)
                        $scope.data.loggedIn = true;
                    else
                        $scope.message = 'User or password did not match';
                }).error(function (error) {
                    $scope.message = 'Error on login.';
                    $scope.loading = false;
                });
            }
        }
    })
    .directive('login', function(){
        return {
            restrict: 'E',
            templateUrl: 'login.html'
        };
    });