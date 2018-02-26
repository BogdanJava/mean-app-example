angular.module('loginController', ['authServices'])

    .controller('authController', function (Auth, $timeout, $location) {
        let app = this;

        if (Auth.isLoggedIn()) {
            console.log('Success: User is logged in.');
            Auth.getUser().then(function (data) {
                console.log(data);
            })
        } else {
            console.log('Failure: User is not logged in.');
        }

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
            $location.path('/logout');
            $timeout(() => {
                $location.path('/');
            }, 2000);
        }
    });