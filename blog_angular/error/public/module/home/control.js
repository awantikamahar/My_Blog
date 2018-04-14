angular.module('routerApp').controller('homeController',['$scope',function ($scope) {
	console.log('homeController');


read();

function read(){
 $http.get('https://mayurapi.herokuapp.com/users/').then(function success(response){
  console.log(response)
  $scope.message = response;

 }, function error(response) {
  //$scope.message = reponse.first_name
  console.log(response)
 }
 ); 
}

}]) 