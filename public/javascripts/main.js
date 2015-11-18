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
            .when('/addSandwich', {
                templateUrl : '/html/addSandwich.html',
                controller  : 'addSandwichController'
            })
            //page showing sandwiches
            .when('/sandwiches', {
                templateUrl : '/html/sandwiches.html',
                controller  : 'sandwichesController'
            })
            .when('/selectedIngredient', {
                templateUrl : '/html/selectedIngredient.html',
                controller  : 'sandwichesController'
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
                    $location.url("/home") 

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
                    $location.url("/home") 

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

angular.module('sandwichApp')
	.controller('homeController', ['$scope', '$rootScope', '$http', '$location', 'authService', function($scope, $rootScope, $http, $location, authService) {

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

        $scope.greeting = 'hi'


    }])


    angular.module('sandwichApp')
    .controller('addSandwichController', ['$scope', '$rootScope', '$http', '$location', 'authService', function($scope, $rootScope, $http, $location, authService) {

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

        $scope.submitSandwich = function() {
            $scope.newSandwich.ingredients = $scope.newSandwich.ingredients.split(',')
            
 


            $http.post('/sandwichAdd', $scope.newSandwich)
                .then(function(returnData){
                    console.log(returnData)
                })


                // $scope.newSandwich.name = ""
                // $scope.newSandwich.recipe = ""
                // $scope.newSandwich.ingredients = ""
                // $scope.newSandwich.picture = ""

            // console.log('hi')
            // console.log($scope.newSandwich)
        }




    }])


    angular.module('sandwichApp')
    .controller('sandwichesController', ['$scope', '$rootScope', '$http', '$location', 'authService', function($scope, $rootScope, $http, $location, authService) {

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

        $scope.greeting = 'yo sandwiches page!!'

        $http({
            method : 'GET',
            url    : '/allsandwiches',
        }).then(function(returnData) {
            // console.log(returnData)
            $scope.sandwiches = returnData.data
        })

        $scope.showByIngredient = false;
        $scope.ingredientSelect = function (ingredientIndex, sandwichIndex) {
        // console.log(ingredientIndex)
        // console.log(sandwichIndex)
        $scope.showByIngredient = true;
        $scope.selectedIngredientSandwiches = []
        var ingredient = $scope.sandwiches[sandwichIndex].ingredients[ingredientIndex]
        

        for (var i = 0; i < $scope.sandwiches.length; i++) {
            for ( var j = 0; j < $scope.sandwiches[i].ingredients.length; j++)
                if ($scope.sandwiches[i].ingredients[j].toString().toLowerCase() === ingredient.toString().toLowerCase()) {
                    $scope.selectedIngredientSandwiches.push($scope.sandwiches[i])
                }
        }

        $scope.close = function() {
            $scope.showByIngredient = false
        }

        // console.log(ingredient)
        // console.log($scope.selectedIngredientSandwiches)
        $scope.selectedIngredientName = ingredient

    }



    }])

