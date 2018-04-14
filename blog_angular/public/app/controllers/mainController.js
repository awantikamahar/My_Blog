angular.module('mainCtrl',['authService','blogService']).controller('mainController',
	function ($scope,$http,Auth,$timeout,Blog,$location, $rootScope, AuthUser, $window, $route) {

	var app=this;
	app.loadme = false;
	$rootScope.$on('$routeChangeStart', function(){
	if(Auth.isLogin()){
		app.isLoggedIn=true
		user = AuthUser.getUser()
		var user = JSON.parse(user)
		app.username = user.username
		app.email = user.email
		app.loadme = true;
	}else{
		app.isLoggedIn=false
		app.username = '';
		app.loadme = true;
	}
	if($location.hash()=='_#_') $location.hash(null)
	})


	var app = this;
	app.loadme = false;

	this.doLogin = function(loginData){
		Auth.login(this.loginData).then(
			function(res,err){
				if(res){
				app.loading = false;
				app.errorMsg = null;
				app.successMsg = 'Logged In Successfully'
				$timeout(function() {
						$location.path('/');
						app.loginData='';
						app.successMsg=false
					}, 2000);
			}else{
				app.loading = false;
					//create error message
				app.successMsg = null
				app.errorMsg = res.data.message
			}
			}
			)
	}

	this.logout = function(){
		Auth.logOut();
		console.log("logout")
		$route.reload();
		$timeout(function() {
			$location.path('/');
			app.loginData='';
			app.successMsg=false
		}, 2000);
	}


	
}) 