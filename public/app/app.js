angular.module('userApp', ['appRoutes', 'userController', 'userServices', 'authServices'
    , 'loginController', 'ngAnimate'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    });