angular.module('userController',['userService']).controller('registerController',function ($http,
	User, $location, $timeout) {

 var app = this;
 this.regUser = function(regData){
 	User.create(this.regData).then(function(res, err){
 			if (res) { 
 				app.successMsg = res.data.message
 				$timeout(function() {
						$location.path('/')
					}, 2000); 					
 			}
 			else {
 				app.errorMsg = res.data.message
 			}
 	})
 console.log(this.regData)
 }

	
}) 