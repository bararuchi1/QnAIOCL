console.log("Js page loaded");
var app = angular.module("loginApp", ["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/afterLogin",{
		templateUrl : "./MainPages/HomePage.html"
		//controller:"homeController"
	}).when("/some2",{
		
	})
})

app.factory("SessionService", [ "$http", function($http) {

	var service = {
		"login" : function(data) {
			console.log(data);
			sessionStorage.setItem('APP-token', data.userType);
			console.log("Session Value stored in localStorage "+data.userType);
		},
		"logout" : function() {
			localStorage.removeItem('APP-token');
			console.log("Session Value removed from localStorage ");
		}
	}
	return service;
}])
/*app.factory("serviceCallingFactory",["$http",function($http){
	var url="http://localhost:8080/QuestionBankIOCL/restApi/basicController/getLoginDetails";
	var data={ 'userName': 'Modiji','password': 'Amit@19','userType': 'ADMIN'};

	var loginResponseData=$http({
		method:"post",
		url:url,
		headers: {
			   'Content-Type': 'application/json'
			 },
	data :data
	}).then(function(response){
		
		console.log("Success Response");
		
	},function(response){
		
		console.log("Error Response");
	})
	return loginResponseData;
}])*/
app.factory("serviceCallingFactory",["$http",function($http){
	var url="http://localhost:8080/QuestionBankIOCL/basicController/getLoginDetails";
	var loginResponseData={
			"demoWorkingService":function(){
				return $http({
					method:"post",
					url:"http://localhost:8080/QuestionBankIOCL/restApi/basicController/demoPost",
					headers: {
						   'Content-Type': 'application/json'
						 }
				}).then(function(response){
					
					console.log("Success Response demoWorkingService"+JSON.stringify(response.data));
					//loginResponseData= response.data;
					return response.data;
					
				},function(response){
					
					console.log("Error Response demoWorkingService");
				})
			},
			"fetchLoginDetails":function(data){
				return $http({
					method:"post",
					url:"http://localhost:8080/QuestionBankIOCL/restApi/basicController/getLoginDetails",
					headers: {
						   'Content-Type': 'application/json'
						 },
				data:data
				}).then(function(response){
					
					console.log("Success Response fetchLoginDetails"+JSON.stringify(response.data));
					//loginResponseData= response.data;
					return response.data;
					
				},function(response){
					
					console.log("Error Response fetchLoginDetails");
				})
			}
			
	};
	return loginResponseData;
}])

app.controller("loginController", [ "$scope","SessionService","serviceCallingFactory","$location", "$routeParams","$window" ,
	function($scope,SessionService,serviceCallingFactory,$location,$routeParams,$window) {
	console.log("Inside loginController");
	
	$scope.setSession = function() {
		//var obj = { token: "John", age: 30, city: "New York" };	
		//$scope.data={"token":$scope.uname};
		//console.log("token"+);
		var data={userName:$scope.uname,password:$scope.password}
		serviceCallingFactory.fetchLoginDetails(data).then(function(result){
			console.log("Fetch Login Details :"+JSON.stringify(result));
			if(result.statusCode==1){
				SessionService.login(result);	
				 $window.location.href = './MainPages/HomePage.html';
			}else if(result.statusCode==0){
				$scope.loginStatus="Wrong username or password.Try Again."	
			}
			
		})
		
	}
	
	$scope.checkDemo=function(){
		//console.log("======"+JSON.stringify(serviceCallingFactory.demoWorkingService()));
		serviceCallingFactory.demoWorkingService().then(function(message){
			console.log(message.userName);
		})
	}
	
	
} ])