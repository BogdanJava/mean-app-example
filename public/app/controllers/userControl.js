angular.module('userController', ['userServices'])

    .controller('regController', function ($http, $location, $timeout, User) {

        var app = this;

        this.regUser = function () {
            app.loading = true;
            app.errorMsg = false;

            User.create(app.regData).then((data) => {
                app.loading = false;
                if (data.data.success) {
                    app.successMsg = data.data.message;

                    //redirect to homepage
                    $timeout(() => {
                        $location.path('/');
                    }, 2000)
                } else {
                    app.errorMsg = data.data.message;
                }
            })
        }
    });