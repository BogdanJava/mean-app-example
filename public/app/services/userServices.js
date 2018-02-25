angular.module('userServices', [])

.factory('User', ($http) => {
   let userFactory = {};

   userFactory.create = (regData) => {
       return $http.post('/api/users', regData);
    };

   return userFactory;
});