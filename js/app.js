var myApp = angular.module('demoApp', []);

myApp.filter('searchById', function() {
    return function(thought, thoughtid) {
        var quotes;
        var index = (thoughtid
            ? parseInt(thoughtid)
            : 0) - 1;
        if (thought.hasOwnProperty(index)) {
            quotes = (thought)[index].name;
        } else {
            quotes = 'Oops....thoughts not found';
        }
        return quotes;
    };
});

myApp.directive('passObject', [
    '$log',
    '$timeout',
    function($log, $timeout) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                obj: '='
            },
            templateUrl: 'thoughts.html',
            link: function(scope, elem, attrs) {
                scope.thoughtid = 1;
                scope.isDisabled = false;
                scope.visible = false;
                scope.$watch('obj.visible', function() {
                    (scope.obj.visible)
                        ? scope.isDisabled = true
                        : scope.isDisabled = false;
                });
                scope.$watch('thoughtid', function() {
                    scope.animationEnter();
                });
                scope.showall = function() {
                    scope.obj.visible = scope.obj.visible
                        ? false
                        : true;
                    if (scope.obj.visible) {
                        scope.showallAnimation();
                    }
                };
                scope.next = function() {
                    if (scope.thoughtid < scope.obj.thoughts.length) {
                        var id = parseInt(scope.thoughtid);
                        scope.thoughtid = id + 1;
                    }
                };
                scope.previous = function() {
                    if (scope.thoughtid > 1) {
                        var id = parseInt(scope.thoughtid);
                        scope.thoughtid = id - 1;
                    }
                };
                scope.animationEnter = function() {
                    var thoughtelem = $(elem).find('.singlethoughts');
                    thoughtelem.removeClass('is-visible');
                    $timeout(function() {
                        thoughtelem.addClass('is-visible')
                    }, 250);
                };
                scope.showallAnimation = function() {
                    var thoughtelem = $(elem).find('.total-quotes');
                    thoughtelem.removeClass('is-visible');
                    $timeout(function() {
                        thoughtelem.addClass('is-visible')
                    }, 250);
                }
            }
        };
    }
]);

myApp.controller('MyCtrl', function($scope) {
    $scope.obj = {
        prop: "world",
        thoughts: [
            {
                'id': 1,
                'name': 'first angular'
            }, {
                id: 2,
                name: 'second angular'
            }, {
                id: 3,
                name: 'third angular'
            }, {
                id: 4,
                name: 'fourth angular'
            }, {
                id: 5,
                name: 'fifth angular'
            }
        ]
    };
});
