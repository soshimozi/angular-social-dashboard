var angular = require('angular');

require('angular-ui-router');

// bring in some angular global namespaces for injection
require('angular-router-browserify')(angular);
require( 'angular-bootstrap-npm' );


var app = angular.module('angular-social-media', ['ui.router', 'ui.bootstrap']);


app.constant('viewUrl', function(relativePath) {
    return '/view/' + relativePath ;
});
    
    
app.factory('httpRequestInterceptor', function($log, sessionService) {
    return {
        request: function($config) {
            var session = sessionService.getSession();
            if (session) {
                $config.headers.Authorization = 'Basic ' + session.token;
            }
            return $config;
        }
    };
});

app.factory('httpResponseInterceptor', function($rootScope, $q, $log, sessionService) {
    function isInvalidSessionError(response) {
        return response.status == 401;
    }

    return function (promise) {
        return promise.then(null, function(response) {
            if (isInvalidSessionError(response)) {
                $rootScope.$broadcast('session-expired');
            }

            return $q.reject(response);
        });
    };
});

app.run(function ($rootScope, $state, $log, $timeout, SessionService) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        // if the user is not authenticated and the state does not
        // allow anonymous access then redirect to /login

        function allowAnonymous(state) {
            return state.data && state.data.allowAnonymous;
        }

        if (!allowAnonymous(toState) && !SessionService.hasSession()) {
            event.preventDefault();
            $state.go('login');
            return;
        }
    });

    $rootScope.$on('session-expired', function () {
        
        SessionService.destroySession();
        $timeout(function () {
            $state.go('session-expired');
        }, 0);
    });
});



app.config(function ($stateProvider, $urlRouterProvider, viewUrl) {
    // Make sure to end urls with a trailing '/'
    // See https://github.com/angular-ui/ui-router/issues/50

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: viewUrl('login/index.html'),
        controller: 'LoginController',
        controllerAs: 'vm',
        data: {
            allowAnonymous: true
        }
    });

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: viewUrl('register/index.html'),
        controller: 'RegisterController',
        data: {
            allowAnonymous: true
        }
    });
    
    $stateProvider.state('session-expired', {
        templateUrl: viewUrl('session-expired.html'),
        data: {
            allowAnonymous: true
        }
    });    
    
    $stateProvider.state('protected', {
        url: '/protected',
        templateUrl: viewUrl('register/index.html'),
        controller: 'RegisterController',
    });    
    
    $stateProvider.state('feature', {
        url: '/features',
        templateUrl: viewUrl('feature/index.html'),
        data: {
            allowAnonymous: true
        }
    });
    
    // Catch-all state for invalid URLs
    // Note: This state must be defined last
    $stateProvider.state('otherwise', {
        url: '*path',
        controller: function ($state, sessionService) {

            $state.go('login');
        }
    });
});
 

require('./service');
require('./controller');
require('./views');

// get required components
//require('./factory');
require('./directive');