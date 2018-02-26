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
    });