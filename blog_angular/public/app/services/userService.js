angular.module('userService',[])
.factory('User',function($http){
 var userFactory = {};
 userFactory.create = function(regData) {
 	return $http.post('http://127.0.0.1:8000/api/register',regData );

 }
return userFactory



})