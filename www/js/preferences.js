angular.module('preferences', [])
    .controller('preferencesCtrl', function(){
    })
    .service('preferencesService', function(){
        var data = {};

        var configuration = function(type, params){
            data.type = type;
            data.params = params;
        };

        var getParams = function(){
            return data.params;
        }

        return {
            configuration: configuration,
            getParams: getParams
        };
    })
    .directive('prefs', function(){
        return {
            restrict: 'E',
            templateUrl: 'view/config/prefs.html',
            controller: function ($scope, preferencesService) {
                $scope.create = function () {
                    var div = $('<div>');
                    $.each(preferencesService.getParams(), function (idx, obj) {
                        var container = $('<div>');
                        container.attr('id', 'container');

                        var el = $('<' + obj.element + '>');
                        el.attr('type', obj.type);
                        el.attr('name', obj.name);

                        if(obj.type === "number") {
                            el.addClass("number");
                        }

                        var label = $('<label>');
                        label.addClass('label');
                        label.append(obj.label);

                        if (obj.type === "checkbox") {
                            container.append(el);
                            container.append(label);
                        } else {
                            container.append(label);
                            container.append(el);
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