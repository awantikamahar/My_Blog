var app = angular.module('appRoutes',['ngRoute','authService'])
	.config(function($routeProvider, $locationProvider){
		$routeProvider
			.when('/',{
			templateUrl:'app/views/pages/home.html',
			controller : 'blogListController',
			controllerAs : 'blogHome',
			})
			
			.when('/login',{
			
			templateUrl: '/app/views/pages/users/login.html',
			authenticated : false,
			})

			.when('/register',{
			
			templateUrl: '/app/views/pages/users/register.html',
			controller : 'registerController',
			controllerAs : 'register',
			authenticated : false,
			})

			.when('/blogcreate',{
			
			templateUrl: '/app/views/pages/blog/blogCreate.html',
			controller : 'blogCreateController',
			controllerAs : 'blogCreate',
			authenticated : true,

			})

		
			.when('/blog/:id',{
			// $routeParams
			templateUrl: '/app/views/pages/blog/blogInfo.html',
			controller : 'blogInfoController',
			controllerAs : 'blogInfo',
			authenticated : true,

			})


			.otherwise({redirectTo:'/'});
			$locationProvider.html5Mode({
				enabled : true,
			requireBase : false,
			});
	});

app.run(['$rootScope','Auth','$location', function($rootScope, Auth, $location){
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		// console.log(next.$$route.authenticated);
		// console.log(Auth.isLogin())
		if(next.$$route.authenticated==true){
			if(!Auth.isLogin()){
				event.preventDefault();
				$location.path('/')
			}
		}
		else if(next.$$route.authenticated==false){
			console.log('should\'nt be authenticated')
			if(Auth.isLogin()){
				event.preventDefault();
				$location.path('/blogcreate')
			}
		}
	});
}]);