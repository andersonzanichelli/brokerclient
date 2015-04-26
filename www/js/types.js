angular.module('types', [])
    .controller('typeCtrl', function($scope, $http, configService){

        $scope.init = function(){
            $scope.data = {};
            var host = configService.load();

            if(host !== '') {
                console.error('>>>> Host: ' + host);
                var promisse = $http({method: 'GET', url: host});

                promisse.success(function(data){
                    console.error('>>>>> Success');
                    $scope.data.types = data;
                }).error(function(error){
                    console.error('Fail!');
                    $scope.data.error = 'Error on connect to server.';
                });
            } else {
                $scope.data.error = 'Error on connect to server.';
            }
        };

    })
    .directive('typesList', function(){
       return {
          restrict: 'E',
          templateUrl: 'view/types/types-list.html'
       };
    });


/*

 $http.get('https://cors-test.appspot.com/test').then(function(resp) {
 console.log('Success', resp);
 // For JSON responses, resp.data contains the result
 }, function(err) {
 console.error('ERR', err);
 // err.status will contain the status code
 })

*/