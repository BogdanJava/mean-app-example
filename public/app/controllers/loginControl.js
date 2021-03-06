angular.module('loginController', ['authServices'])

    .controller('authController', function ($window, Auth, $timeout, $location, $rootScope) {
        let app = this;
        app.loadMe = false;

        $rootScope.$on('$routeChangeStart', () => {
            if (Auth.isLoggedIn()) {
                app.isLoggedIn = true;
                Auth.getUser().then(function (data) {
                    app.username = data.data.username;
                    app.email = data.data.email;
                })
            } else {
                app.isLoggedIn = false;
            }
            app.loadMe = true;
            if ($location.hash() == '_=_') {
                $location.hash(null);
            }
        });

        this.vk = function () {
            $window.location = $window.location.protocol + '//' + $window.location.host
                + '/auth/vkontakte';
        };

        this.facebook = function () {
            $window.location = $window.location.protocol + '//' + $window.location.host
                + '/auth/facebook'
        };

        this.doLogin = function () {
            app.loading = true;
            app.errorMsh = false;

            Auth.login(app.loginData).then((data) => {
                app.loading = false;
                if (data.data.success) {
                    app.successMsg = data.data.message;
                    $timeout(() => {
                        $location.path('/');
                    }, 2000);
                } else {
                    app.errorMsg = data.data.message;
                }
            })
        };

        this.logout = function () {
            Auth.logout();
            app.username = null;
            $location.path('/logout');
            $timeout(() => {
                $location.path('/');
            }, 2000);
        }
    });