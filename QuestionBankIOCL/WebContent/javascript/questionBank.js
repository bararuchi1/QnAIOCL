var app = angular.module("myApp", [ "ngRoute" ]);

app.value("loginUrl","http://localhost:8080/QuestionBankIOCL/basicController/getLoginDetails");
app.config(function($routeProvider) {
	$routeProvider.when("/options", {
		templateUrl : "./Options.html"
	}).when("/insertData",{
		templateUrl:"./insertData.html"
	}).when("/getQnA",{
		templateUrl:"./QuestionAndAnswers.html"
	}).otherwise({
		templateUrl : "./Options.html"
	})
});

app.filter("unique", function() {
	  // we will return a function which will take in a collection
	  // and a keyname
	  return function(collection, keyname) {
	    // we define our output and keys array;
	    var output = [],
	      keys = [];

	    // we utilize angular's foreach function
	    // this takes in our original collection and an iterator function
	    angular.forEach(collection, function(item) {
	      // we check to see whether our object exists
	      var key = item[keyname];
	      // if it's not already part of our keys array
	      if (keys.indexOf(key) === -1) {
	        // add it to our keys array
	        keys.push(key);
	        // push this item to our final output array
	        output.push(item);
	      }
	    });
	    // return our array which should be devoid of
	    // any duplicates
	    return output;
	  };
	});


app.factory("serviceCallingFactory",["$http",function($http){
	var url="http://localhost:8080/QuestionBankIOCL/basicController/getLoginDetails";
	var loginResponseData={
			"demoWorkingService":function(){
				return $http({
					method:"post",
					url:"http://localhost:8080/QuestionBankIOCL/restApi/basicController/demoPost",
					headers: {
						   'Content-Type': 'application/json'
						 },
				data:{"1":"Dummy"}
				}).then(function(response){
					
					console.log("Success Response demoWorkingService"+JSON.stringify(response.data));
					return response.data;
				},function(response){
					
					console.log("Error Response demoWorkingService");
				})
			},
			"fetchQuestionDetails":function(data){
				return $http({
					method :"get",
					url:"http://localhost:8080/QuestionBankIOCL/restApi/basicController/fetchQuestionDetails/"+data,
					header:{
						 'Content-Type': 'application/json'
					}
					
				}).then(function(response){
					console.log("Success Response fetchQuestionDetails"+JSON.stringify(response.data));
					return response.data;
				},function(response){
					console.log("Error Response fetchQuestionDetails");
				})
			},
			"fetchProductList":function(){
				return $http({
					method:"get",
					url:"http://localhost:8080/QuestionBankIOCL/restApi/basicController/getProductCatagory",
					header:{
						'Content-type':'application/json'
					}
				}).then(function(response){
					console.log("fetchProductList success");
					return response.data;
				},function(response){
					console.log("Error fetching product list");
				})
			},
			"insertQuestionDetails":function(data){
				return $http(
				{
					method:"post",
					url:"http://localhost:8080/QuestionBankIOCL/restApi/basicController/insertQnAintoDB",
					header:{'Content-type':'application/json'},
					data:data
				}		
				).then(function(response){
					console.log("insertQuestionDetails success");
					return response.data;
				},function(response){
					console.log("insertQuestionDetails error");
				})
			}
			
	};
	return loginResponseData;
}])

app.controller("homeController", [ "$scope", "$location", "$routeParams","serviceCallingFactory","$window",
		function($scope, $location, $routeParams,serviceCallingFactory,$window) {
			$scope.forms={};
			console.log('HomeController');
			$scope.errMsg="";
			$scope.submitButtonValue="Continue";
			$scope.qnaShow=false;
			$scope.qnaDisable=false;
			var APPtoken=sessionStorage.getItem('APP-token');
			
			$scope.userSessionUserType=APPtoken;
			$scope.submitAnotherButtonValue="Modify";
			$scope.anotherButton=true;//hide thge modify button
			console.log('APPtoken :'+APPtoken);
			$scope.questions=[{"questionId":"101","questionCatagory":"Mechanics"},{"questionId":"102","questionCatagory":"Mechanics"}];
			console.log("Questions "+$scope.questions[0].questionCatagory);
			$scope.checkInsertPageModified="NO";
		//	$scope.questions=
			$scope.logOut=function()
			{
				sessionStorage.removeItem("APP-token");
				 $window.location.href = 'http://localhost:8080/QuestionBankIOCL/';
			}
			$scope.checkSession=function()
			{
				var APPtype=$scope.userSessionUserType;
				if(APPtype==='ADMIN' || APPtype==='USER'){
					console.log('Session Value '+APPtype);
					
				}else{
					console.log('WrongSession');
					 $window.location.href = 'http://localhost:8080/QuestionBankIOCL/';
				}
			}
			$scope.callHomeUrl = function() {
				console.log('Change ng-view HomeOptionPage');
				console.log('localStorage.getItem'+sessionStorage.getItem('APP-token'));
				if (APPtoken == 'ADMIN'|| APPtoken =='USER') {
					$location.path("/options");
				} else {
					console.log("Session Wrong");
					 $window.location.href = 'http://localhost:8080/QuestionBankIOCL/';
				}
			}
			$scope.getQuestionList=function(data){
				$scope.errMsg="";
				console.log("fetchQuestionDetails"+data);
				serviceCallingFactory.fetchQuestionDetails(data).then(function(result){
					console.log("Fetch fetchQuestionDetails :"+JSON.stringify(result));
					var output={};
					if(Object.keys(result).length>0){
						$scope.questionAndAnswer=result;
						$location.path("/getQnA");
					}else{
						$scope.errMsg="No data found.";
						console.log($scope.errMsg);
						
					}
				})
			}
			$scope.getProductList=function(){
				console.log("getProductList");
				serviceCallingFactory.fetchProductList().then(function(result){
					console.log("Fetch fetchProductList :"+JSON.stringify(result));
				$scope.productList=result;
				
				})
				
			}
			
			$scope.callInsertQnASubmit = {
					
	    			submit : function(form,ButtonValue) {
	    				$scope.checkInsertPageModified="YES";
	    				console.log("JSON :"+JSON.stringify($scope.forms))
	        			if(!$scope.forms.count>0){
	        				$scope.ErrMsg="Number of Question field value can not be blank or negative";
	        				return false;
	        			}
	        			if($scope.forms.count>10){
	        				$scope.ErrMsg="More than 10 questions can not be insert at a time.";
	        				return false;
	        			}
	        			if(form.$valid && ButtonValue=='Continue'){
	        				console.log("callInsertQnASubmit"+JSON.stringify($scope.forms)+" Count :"+$scope.forms.count+" Form "+form);
	        					$scope.qnaShow=true;
	        					$scope.anotherButton=false;
	        					$scope.submitButtonValue="Submit";
	        					$scope.qnACount=$scope.forms.count;
	        					$scope.questionCount=true;//disable condition questionCount
	        					$scope.catagory=true;//disbale condition catagory

	        			}
	        			if(form.$valid&&ButtonValue=='Submit'){
	        				console.log("callInsertQnASubmit"+JSON.stringify($scope.forms));
	        			//Convert the json to bean format to send via http post\
	        				$scope.QuestionAnswersBeanClass=[];
	        				var values=$scope.forms.qnA;
	        				console.log("values "+$scope.forms.count+"===="+JSON.stringify(values));
	        				for (var key in values) {
	        				 //   console.log("Key: " + key);
	        				  //  console.log("Value: :" + JSON.stringify(values[key]));
	        				    
	        				    var tempObj={questionCatagory:$scope.forms.catagory,questionDesc:values[key].questions,questionAnswer:values[key].answers};
	        				  
	        				    $scope.QuestionAnswersBeanClass.push(tempObj);
	        				}
	        				  console.log("===>"+JSON.stringify($scope.QuestionAnswersBeanClass));
	        				
	        				  serviceCallingFactory.insertQuestionDetails($scope.QuestionAnswersBeanClass).then(function(result){
	        						console.log("Fetch insertQuestionDetails :"+JSON.stringify(result));
	        						if(result.ErrCode==1){
	        							$scope.SuccessMsg="Succesfully Inserted.";
	        							$scope.qnaDisable=true;
	        							$scope.submitAnotherButtonValue="Add More";
	        						}else{
	        							$scope.errMsg="Failed.Try Again"
	        						}
	        					
	        					})
	        				  
        			}
	        			
	    			}
	    		}
			$scope.callF=function(){
				//$scope.forms={};
				console.log("JSON form :"+JSON.stringify($scope.forms));
			}
			$scope.callButtonTwofunction=function(){
				var btnVal=$scope.submitAnotherButtonValue;
				if(btnVal=='Modify'){
					$scope.questionCount=false;//enable condition questionCount
					$scope.catagory=false;//enable condition catagory
					$scope.qnaShow=false;//hide the question answer block
					$scope.submitButtonValue="Continue";
					$scope.anotherButton=true;
				}
				console.log(btnVal=='Add More');
				if(btnVal=='Add More'){
				window.location.reload();
				}
				//console.log("JSON form :"+JSON.stringify($scope.forms));
			}
			$scope.goToInsertPage=function(){
				if($scope.checkInsertPageModified=="YES"){
					$location.path("/insertData");
					window.location.reload();
					}else{
						$location.path("/insertData");
					}
			}
		//	console.log("DemoWorkingService ::"+serviceCallingFactory.loginResponseData.demoWorkingService);
		}]);
