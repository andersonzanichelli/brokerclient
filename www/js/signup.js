angular.module('signup', [])
    .controller('signupCtrl', function($scope, $http, configService){
        $scope.host = configService.load();
        $scope.message = '';
        $scope.success = '';
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
                    var user = {
                        "name": $scope.name,
                        "email": $scope.email,
                        "password": CryptoJS.SHA256($scope.password).toString()
                    };
                    if($scope.emailUsed) {
                        $scope.message = "Email not available, it has been used.";
                        return;
                    }
                    $scope.signup(user);
                } else {
                    $scope.message = "The passwords didn't match";
                }
            } else
                $scope.message = "Please, use a password with numbers, letters and more than 6 chars"
        };

        $scope.signup = function(user){
            var promisse = $http.get($scope.host + '/signup/' + user['name'] + '/' + user['email'] + '/' + user['password']);

            promisse.success(function(data){
                if(data["insert"] == true){
                    $scope.success = 'Success on save the user.';
                }
            }).error(function(error){
                $scope.message = 'Error on trying to save the user.';
            });
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