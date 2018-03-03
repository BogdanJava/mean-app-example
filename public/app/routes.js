angular.module('appRoutes', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })
            .when('/about', {
                templateUrl: 'app/views/pages/about.html',
            })
            .when('/register', {
                templateUrl: 'app/views/pages/user/register.html',
                controller: 'regController',
                controllerAs: 'register'
            })
            .when('/login', {
                templateUrl: 'app/views/pages/user/login.html',
                controller: 'authController',
                controllerAs: 'login'
            })
            .when('/logout', {
                templateUrl: 'app/views/pages/user/logout.html'
            })
            .when('/profile', {
                templateUrl: 'app/views/pages/user/profile.html'
            })
            .when('/facebook/:token', {
                templateUrl: 'app/views/pages/user/social/social.html',
                controller: 'facebookController',
                controllerAs: 'facebook'
            })
            .when('/facebookerror', {
                templateUrl: 'app/views/pages/user/login.html',
                controller: 'facebookController',
                controllerAs: 'facebook'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    });