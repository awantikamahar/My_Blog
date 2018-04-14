angular.module('blogList',['blogService'])
.controller('blogListController',function(Blog){
	this.successMessage = 'ERROR';
	var app = this;
	this.blogListing = function(){
		Blog.blogListing().then(function(data){

			app.blogs = data.data
			console.log(app.blogs)
		})

	}
this.blogListing();
})


.controller('blogInfoController',function($scope, $routeParams,Blog){

// console.log($routeParams.id)
// Blog.blogInfo($routeParams.id).then(function(data){
// 	console.log(data)
var app=this;
	if($routeParams.id){
		Blog.blogInfo($routeParams.id).then(function(data){
			if(data.data.status){
				console.log(data.data)
				app.blogObj = data.data.blog
			}else{
				app.errorMsg = 'Invalid Blog'
			}
		})
	}else{
	app.errorMsg = "Invalid Blog"
	}
	



})


/*var app=this;
	if($routeParams.id){
		Blog.blogInfo($routeParams.id).then(function(data){
			if(data.data.status){
				console.log(data.data)
				app.blogObj = data.data.blog
			}else{
				app.errorMsg = 'Invalid Blog'
			}
		})
	}else{
	app.errorMsg = "Invalid Blog"
	}
*/