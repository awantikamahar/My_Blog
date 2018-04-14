/*angular.module('blogCreate',[]).controller('blogCreateController',function ($scope,$http) {
console.log("blogCreateController")

})*/
angular.module('blogCreate',['authService','ngTagsInput','blogService']).
controller('blogCreateController',function ($scope,$http,AuthUser,Blog) {
	var app = this
	 $scope.tags = [];
	console.log($scope.tags)
  $scope.loadTags = function(query) {
    return $http.get('http://127.0.0.1:8000/api/get-tag');
  }
	app.createBlog = function(blogData){
		var blog = {}
		/*combine user info with blog info*/
		/*console.log(AuthUser.getUser())*/
		var user = AuthUser.getUser()
		/*console.log(user)*/
		var user_id = JSON.parse(user)
		/*console.log(user_id.id)*/
/*		this.blogData['user'] = user_id.id
		console.log($scope.tags)*/

		blog['author'] = user_id.id
		blog['description'] = this.blogData.description
		blog['title'] = this.blogData.title
		blog['tags'] = $scope.tags
		console.log(blog)

		Blog.create(blog).then(function(res, err){
			if (res) {
				this.successMsg = res.data.message

			}
			else {
				this.errorMsg = err.data.message

			}
		})
	}




/*	{
"author":7,
"description":"description",
"title":"title",
"tags":["python","mysql"]
}*/




}) 