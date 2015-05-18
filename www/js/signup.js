angular.module('signup', [])
    .controller('signupCtrl', function($scope, $http, configService){
        $scope.host = configService.load();
        $scope.message = '';
        $scope.emailUsed = false;

        $scope.confirmation = function(){
            var pattern = /^[A-Za-z0-9]\w{6,12}$/;
            if(invalidadFields($scope)) {
                $scope.message = "Please, fill all fields.";
                return;
            }

            if($scope.password.match(pattern)) {
                if($scope.password === $scope.confirm) {
                    $scope.message = '';
                    $scope.signup();
                } else {
                    $scope.message = "The passwords didn't match";
                }
            } else
                $scope.message = "Please, use a password with numbers, letters and more than 6 chars"
        };

        $scope.signup = function(){
            console.log("fazer registro!");
        };

        $scope.validateEmail = function(){
            if($scope.email !== '') {
                $scope.loading = true;
                var promisse = $http({method: 'get', url: $scope.host + '/email/' + $scope.email});

                promisse.success(function(data){
                    if(emailUsed(data, $scope.email)) {
                        $scope.emailUsed = true;
                        $scope.message = "Email not available, it has been used.";
                    } else {
                        $scope.emailUsed = false;
                        $scope.message = "";
                    }
                    $scope.loading = false;
                }).error(function(error){
                    $scope.message = 'Error on connect to server.';
                    $scope.loading = false;
                });
            }
        };

        function invalidadFields(scope){
            return  scope.password === undefined || scope.password === '' ||
                    scope.email === undefined || scope.email === '' ||
                    scope.name === undefined || scope.name === '';
        }

        function emailUsed(data, email) {
            return data.length > 0 && data[0].email === email;
        }
    })
    .directive('signup', function(){
        return {
            restrict: 'E',
            templateUrl: 'view/signup.html'
        };
    });