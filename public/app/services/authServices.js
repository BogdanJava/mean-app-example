angular.module('authServices', [])

    .factory('Auth', ($http, AuthToken) => {
        let authFactory = {};

        authFactory.login = (loginData) => {
            return $http.post('/api/authenticate', loginData)
                .then(function (data) {
                    AuthToken.setToken(data.data.token);
                    return data;
                });
        };

        //Auth.logout();
        authFactory.logout = () => {
            AuthToken.removeToken();
        };

        //Auth.isLoggedIn();
        authFactory.isLoggedIn = function () {
            return AuthToken.getToken() != null;
        };

        //Auth.getUser();
        authFactory.getUser = function () {
            if (AuthToken.getToken()) {
                return $http.post('/api/me');
            } else {
                $q.reject({message: 'User has no token'});
            }
        };

        //AuthToken.facebook(token);
        authFactory.facebook = function (token) {
            AuthToken.setToken(token);
        };

        return authFactory;
    })

    .factory('AuthToken', ($window) => {
        let authTokenFactory = {};

        //AuthToken.setToken(token);
        authTokenFactory.setToken = function (token) {
            $window.localStorage.setItem('token', token);
        };

        authTokenFactory.removeToken = function () {
            $window.localStorage.removeItem('token');
        };

        //AuthToken.getToken();
        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        return authTokenFactory;
    })

    .factory('AuthInterceptors', function (AuthToken) {
        let authInterceptorsFactory = {};

        authInterceptorsFactory.request = function (config) {
            let token = AuthToken.getToken();

            if (token) {
                config.headers['x-access-token'] = token;
            }

            return config;
        };

        return authInterceptorsFactory;
    });