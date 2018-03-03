angular.module('userController', ['userServices'])

    .controller('regController', function ($location, $timeout, User) {
        let app = this;
        this.regUser = function () {
            app.loading = true;
            app.errorMsg = false;

            User.create(app.regData).then((data) => {
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
        }
    })

    .controller('facebookController', function ($window, $routeParams, Auth, $location) {
        let app = this;

        if ($window.location.pathname == '/facebookerror') {
            app.errorMsg = 'Facebook e-mail not found'
        } else {
            Auth.facebook($routeParams.token);
            $location.path('/');
        }
    });