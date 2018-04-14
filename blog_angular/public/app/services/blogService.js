angular.module('blogService',[])

.factory('Blog', function($http, $window){
	var userBlog = {};
	userBlog.create = function(blogData){

		return $http.post('http://127.0.0.1:8000/api/blog',blogData);
	}

	userBlog.blogListing = function(){
		return $http.get('http://127.0.0.1:8000/api/blogtag');
	}


	userBlog.blogInfo = function(id){
		return $http.get('http://127.0.0.1:8000/api/blog/'+id);
	}




return userBlog
})


