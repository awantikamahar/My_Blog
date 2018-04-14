angular.module('authService',[])

.factory('Auth', function($http, $window,AuthToken,AuthUser){
	authFactory={};

	authFactory.login=function(loginData){
		return $http.post('http://127.0.0.1:8000/api/login', loginData).then(function(data){
			AuthToken.setToken(data.data.token);
			AuthUser.setUser(data.data.user);
			console.log(data);
			return data
		})
	}

	authFactory.isLogin = function(){
		if (AuthToken.getToken())  {
			return true;
		}
		else {
			return false;
		}
	}
	authFactory.logOut = function(){
		AuthToken.setToken()
		}
	return authFactory
})
.factory('AuthToken',function($window){

	 authTokenFactory = {};
	 authTokenFactory.setToken = function(token){
	 	if (token) {
	 		$window.localStorage.setItem('token',token)
	 	}
	 	else {
	 		$window.localStorage.removeItem('token')
	 	}
	 	 }
	 	authTokenFactory.getToken = function(){
	 		return 	$window.localStorage.getItem('token')		  	
	 	}
	return authTokenFactory;


})

.factory('AuthUser', function($window){
	authUserFactory = {};
	authUserFactory.setUser = function(user){
		if (user) {
			$window.localStorage.setItem('user', JSON.stringify(user))
		}
		else {
		$window.localStorage.removeItem('user')	
		}
		}
	authUserFactory.getUser = function() {
		return $window.localStorage.getItem('user')
	}
return authUserFactory;
})

//passed it from app.js
//config interceptors
//token authentication.
.factory('AuthInterceptors', function(AuthToken){
 var authInterceptorsObj = {}
 authInterceptorsObj.request = function(config){
 	token= AuthToken.getToken()
 	if (token) config.headers['Authorization'] = 'JWT ' + token 
 		return config
 }
return authInterceptorsObj


})

//$window.localStorage.setItem('user', JSON.stringify(user))

