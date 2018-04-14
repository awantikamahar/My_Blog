
angular.module("BlogApp", ['appRoutes','mainCtrl','userController',
	'userService','authService','blogCreate','ngTagsInput','blogService','blogList'])


.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors')
})


