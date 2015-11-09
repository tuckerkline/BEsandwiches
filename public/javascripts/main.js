angular.module('sandwichApp', ['ngRoute'])

angular.module('sandwichApp')
    .service('authService', ['$http', function($http) {
        this.authCheck = function(cb) {
            $http.get('/me')
                .then (function(returnData) {
                    cb(returnData.data)
                })
        }


    }])


angular.module('sandwichApp')
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
	                templateUrl : '/html/login.html',
	                controller  : 'mainController'
	            })
			.when('/home', {
				templateUrl : '/html/home.html',
				controller  : 'homeController'
			})


	}])

angular.module('sandwichApp')
	.controller('mainController', ['$scope', '$rootScope', '$http', '$location', 'authService', function($scope, $rootScope, $http, $location, authService) {

        authService.authCheck(function(user) {
            // console.log(user)
            if (!user) {
                // console.log('no user, dude')
                $location.url('/')
            } else {
                 $scope.user = user
                 $rootScope.user = $scope.user

            }
        })

        $scope.signup = function(){
            $http({
                method : 'POST',
                url    : '/signup',
                data   : $scope.signupForm
            }).then(function(returnData){
                console.log(returnData)
                if ( returnData.data.success ) { 
                    $location.url("/map") 

                }
               
            })
        }

        $scope.login = function(){
            $http({
                method : 'POST',
                url    : '/login',
                data   : $scope.loginForm
            }).then(function(returnData){
                if ( returnData.data.success ) { 
                    $location.url("/map") 

                } 
                else { console.log(returnData)}
            })

        }

        $scope.logout = function() {
            $http.get('/logout')
                .then(function(){
                    $location.url('/')
                })

        }


    }])

