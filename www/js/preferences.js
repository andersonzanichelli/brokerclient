angular.module('preferences', [])
    .controller('preferencesCtrl', function($scope, $http, configService){
        $scope.host = configService.load();
    })
    .service('preferencesService',function(){
        var data = {};

        var config = function(service, params) {
            data.service = service;
            data.params = params;
        };

        var params = function(){
          return data.params;
        };

        var service = function() {
            return data.service;
        }

        return {
            configuration: config,
            getParams: params,
            getService: service 
        }
    })
    .directive('preferences', function($compile){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'view/config/prefs.html',
            controller: function ($scope, $http, configService, preferencesService) {
                $scope.host = configService.load();
                //var email = configService.recoverEmail();

                $scope.savePreferences = function(){
                    var promisse = $http.post($scope.host + '/savePreferences', $scope.amount);

                    promisse.success(function(result){
                        console.log(result);
                    });

                    promisse.error(function(error){
                        console.log(error);
                    });
                };

                $scope.create = function(){
                    $scope.prefs = {};

                    var div = $('<div>');

                    var user = $('<input>');
                    user.attr('type', 'hidden');
                    user.attr('name', 'user');
                    user.attr('value', configService.recoverEmail());

                    var service = $('<input>');
                    service.attr('type', 'hidden');
                    service.attr('name', 'service');
                    service.attr('value', preferencesService.getService());

                    div.append(user);
                    div.append(service);

                    $.each(preferencesService.getParams(), function (idx, obj) {
                        var container = $('<div>');
                        container.attr('id', 'container');

                        var el = $('<' + obj.element + '>');
                        el.attr('type', obj.type);
                        el.attr('name', obj.name);

                        $scope.prefs[obj.name];

                        if(obj.type === "number") {
                            el.addClass("number");
                        }

                        var label = $('<label>');

                        if (obj.type === "checkbox") {
                            label.addClass('toogle');
                            label.append(obj.label);
                            container.append(el);
                            container.append(label);
                        } else {
                            el.attr('placeholder', obj.label);
                            label.addClass('item item-input');
                            label.append(el);
                            container.append(label);
                        }

                        if (obj.type === "select") {
                            for (var item in obj.content) {
                                var option = $('<option>');
                                option.val(item);
                                option.html(obj.content[item]);
                                el.append(option);
                            }
                        }

                        div.append(container);
                    });

                    $('#preferencia').html(div.html());
                }
            }
        };
    });