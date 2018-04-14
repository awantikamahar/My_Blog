/*angular.module('homeController',[]);
angular.module('userProfileController',[]);

angular.module('routerApp', ['homeController','ngRoute'])

.config(['$routeProvider',function ($routeProvider) {

	$routeProvider
		.when('/home',{
		controller:'homeController',
		templateUrl:'modules/home/views/index.html',
	})
		.when('/userProfile',{
		controller:'userProfileController',
		templateUrl:'modules/user_profile/views/indexUP.html',
	})

	.otherwise({redirectTo:'/home'});
}])
*/

angular.module('homeController',[]);


/*angular.module('routerApp', ['homeController','ngRoute']);
angular.module('userProfile', ['userProfileController','ngRoute']);*/

angular.module("routerApp", [
	'homeController','ngRoute'
	])

.config(['$routeProvider',function ($routeProvider) {

	$routeProvider
		.when('/home',{
		controller:'homeController',
		templateUrl:'/module/home/views/index.html',
	})

	.otherwise({redirectTo:'/home'});

	
}])