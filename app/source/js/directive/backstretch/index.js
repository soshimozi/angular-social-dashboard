var angular = require('angular');

module.exports = function ($window) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
            var w = angular.element($window);
            
            console.log('window: ', w);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;
    
                console.log('window: ', w);
    
                scope.style = function () {
                    return {
                        'height': newValue.h + 'px',
                        'width': newValue.w + 'px'
                    };
                };
    
            }, true);
    
            w.bind('resize', function () {
                
                
                console.log('window: ', w);
                
                console.log('resize');
                
                scope.$apply();
            });
		}
	};
};