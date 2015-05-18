angular.module('loading', [])
    .directive('loading', function () {
        return {
            restrict: 'E',
            replace:true,
            template: '<div id="loader"><img src="img/loader.gif" width="20" height="20" /></div>',
            link: function (scope, element, attr) {
                scope.$watch('loading', function (val) {
                    var div = element[0].id;
                    if (val)
                        document.getElementById(div).style.display = 'block';
                    else
                        document.getElementById(div).style.display = 'none';
                });
            }
        }
    });